<script lang="ts">
        import { onMount, onDestroy } from 'svelte';
    
        let canvas: HTMLCanvasElement;
        let ctx: CanvasRenderingContext2D | null;
        let audioCtx: AudioContext | null;
        let previousFrames: ImageData[] = []; // Array to store previous frames
        const motionBlurLength = 30; // Number of previous frames to store
        const motionBlurAlphaStart = 0.9; // Starting alpha for the most recent past frame
    
        // Game variables
        const playerSize = 25;
        let playerX: number;
        let playerY: number;
        const jumpStrength = 14;
        const gravity = 1;
        let playerVelocityY = 0;
        let isJumping = false;
        let gameOverBounce = false;
        let gameOverTimeout: ReturnType<typeof setTimeout> | null = null;
    
        const obstacleWidth = 30;
        const obstacleBaseHeight = 20;
        const obstacleSpeed = 6;
        let obstacles: { x: number; y: number; width: number; height: number; counted?: boolean }[] = [];
        const obstacleInterval = 1500;
        let obstacleTimer: string | number | NodeJS.Timeout | undefined;
    
        const groundHeight = 50;
        const gameAspectRatio = 10 / 9;
        const targetFPS = 60; // Target FPS
        const deltaTime = 1000 / targetFPS; // Calculate deltaTime
        let lastTime = 0;
    
        let gameRunning = false;
        let score = 0;
        let animationFrameId: number;
        let containerWidth: number;
        let containerHeight: number;
        let titleScreen = true;
    
        let startButtonElement: HTMLDivElement; // Add for start button
        let gameThemeOscillators: OscillatorNode[] = [];
        let gameThemeGainNode: GainNode | null = null;
        let currentThemeNote = 0;
        let themeInterval: number;
    
        // Initialize game
        onMount(async () => {
            ctx = canvas.getContext('2d');
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            window.addEventListener('keydown', handleKeyDown);
    
            // Set initial player position
            playerX = canvas.width / 4;
            playerY = canvas.height - playerSize - groundHeight;
    
            // Load font and draw title screen after it's loaded
            if (typeof window !== 'undefined') {
            try {
                const WebFontModule = await import('webfontloader');
                const WebFont = WebFontModule.default;
    
                WebFont.load({
                google: {
                    families: ['Micro 5']
                },
                active: () => {
                    drawTitleScreen();
                }
                });
            } catch (error) {
                console.error('Error loading webfontloader:', error);
                drawTitleScreen(); // Fallback in case of loading error
            }
            } else {
            console.log('Not in a browser environment, skipping font loading.');
            drawTitleScreen(); // Potentially draw a fallback title
            }
        });
    
        // Clean up event listeners and timers
        onDestroy(() => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', resizeCanvas);
                window.removeEventListener('keydown', handleKeyDown);
                clearInterval(obstacleTimer);
                cancelAnimationFrame(animationFrameId);
                stopGameTheme();
                if (gameOverTimeout) {
                    clearTimeout(gameOverTimeout);
                }
            }
        });
    
        // Resize canvas
        function resizeCanvas() {
            if (canvas.parentElement) {
                const parentWidth = canvas.parentElement.clientWidth;
                const parentHeight = canvas.parentElement.clientHeight;
    
                let newWidth = parentWidth;
                let newHeight = parentWidth / gameAspectRatio;
    
                if (newHeight > parentHeight) {
                    newHeight = parentHeight;
                    newWidth = parentHeight * gameAspectRatio;
                }
    
                containerWidth = newWidth;
                containerHeight = newHeight;
    
                canvas.width = newWidth;
                canvas.height = newHeight;
    
                playerY = canvas.height - playerSize - groundHeight;
                previousFrames = []; // Clear previous frames on resize
                if (ctx) {
                    if (titleScreen) {
                        drawTitleScreen();
                    } else {
                        draw();
                    }
                }
            }
        }
    
        function jump() {
            isJumping = true;
            playerVelocityY = -jumpStrength;
            playJumpSound();
        }
    
        // Handle player input
        function handleKeyDown(event: KeyboardEvent) {
            if (!gameRunning) return;
    
            if ((event.key === ' ' || event.key === 'ArrowUp') && !isJumping) {
                jump();
            }
        }
    
        function playJumpSound() {
            if (!audioCtx) return;
    
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
    
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
    
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.1);
        }
    
        function playPlayerDownSound() {
            if (!audioCtx) return;
    
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
    
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
    
            oscillator.type = 'square';
    
            const startTime = audioCtx.currentTime;
            const duration = 0.5;
    
            oscillator.frequency.setValueAtTime(750, startTime);
            oscillator.frequency.exponentialRampToValueAtTime(150, startTime + duration * 0.5);
            oscillator.frequency.exponentialRampToValueAtTime(30, startTime + duration);
    
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        }
    
        function stopGameTheme() {
            gameThemeOscillators.forEach(oscillator => oscillator.stop());
            gameThemeOscillators = [];
            if (gameThemeGainNode) {
                gameThemeGainNode.disconnect();
                gameThemeGainNode = null;
            }
            if (themeInterval) {
                clearInterval(themeInterval);
            }
        }
    
    
        // Generate a new obstacle
        function generateObstacle() {
            const randomX = canvas.width + Math.random() * 100;
            const randomHeight = obstacleBaseHeight + Math.random() * 40;
            obstacles.push({
                x: randomX,
                y: canvas.height - randomHeight - groundHeight,
                width: obstacleWidth,
                height: randomHeight,
            });
        }
    
        // Start the timer for obstacle generation
        function startObstacleGeneration() {
            if (typeof window !== 'undefined') {
                obstacleTimer = setInterval(generateObstacle, obstacleInterval);
            }
        }
    
        // Update game state
        function update() {
            if (!gameRunning || !ctx) return;
    
            if (gameOverBounce) {
                playerVelocityY += gravity * 1.5; // Increase gravity for bounce
                playerY += playerVelocityY;
                playerX -= obstacleSpeed * 1.2; // Move offscreen faster
                if (playerY > canvas.height * 2) {
                    gameOverBounce = false;
                    if (gameOverTimeout === null) {
                        gameOverTimeout = setTimeout(() => {
                            gameOverTimeout = null;
                            stopGameTheme();
                        }, 800);
                    }
                }
                return;
            }
    
            playerVelocityY += gravity;
            playerY += playerVelocityY;
    
            if (playerY >= canvas.height - playerSize - groundHeight) {
                playerY = canvas.height - playerSize - groundHeight;
                isJumping = false;
                playerVelocityY = 0;
            }
    obstacles = obstacles
            .map((obstacle) => ({
                ...obstacle,
                x: obstacle.x - obstacleSpeed,
            }))
            .filter((obstacle) => obstacle.x + obstacle.width > 0);

    obstacles.forEach(obstacle => {
        if (!obstacle.counted && obstacle.x + obstacle.width < playerX) {
            score++;
            obstacle.counted = true;
        }
    });

        for (const obstacle of obstacles) {
            if (
                playerX < obstacle.x + obstacle.width &&
                playerX + playerSize > obstacle.x &&
                playerY < obstacle.y + obstacle.height &&
                playerY + playerSize > obstacle.y
            ) {
                gameRunning = false;
                gameOverBounce = true;
                playerVelocityY = -jumpStrength * 1.5; // Initial upward velocity for bounce
                clearInterval(obstacleTimer);
                cancelAnimationFrame(animationFrameId);
                playPlayerDownSound();
                break;
            }
        }
    }

    // Draw game elements
    function draw() {
        if (!ctx) return;

        // Draw previous frames with decreasing opacity
        for (let i = 0; i < previousFrames.length; i++) {
            const alpha = Math.max(0, motionBlurAlphaStart - (i / motionBlurLength) * 0.2); // Adjust 0.5 as needed
            ctx.globalAlpha = Math.max(0, alpha); // Ensure alpha doesn't go below 0
            ctx.putImageData(previousFrames[i], 0, 0);
        }
        ctx.globalAlpha = 1; // Reset alpha for current elements

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#343A40';
        ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(playerX, playerY, playerSize, playerSize);

        ctx.fillStyle = '#343A40';
        const eyeSize = playerSize / 5;
        const eyeOffsetX = playerSize / 4;
        const eyeOffsetY = playerSize / 4;
        ctx.fillRect(playerX + eyeOffsetX, playerY + eyeOffsetY, eyeSize, eyeSize);
        ctx.fillRect(playerX + 2 * eyeOffsetX, playerY + eyeOffsetY, eyeSize, eyeSize);

        ctx.fillStyle = '#1C1E21';
        obstacles.forEach((obstacle) => {
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

            const armWidth = obstacleWidth / 3;
            const armHeight = obstacle.height / 4;
            ctx.fillRect(obstacle.x - armWidth / 2, obstacle.y + obstacle.height / 3, armWidth, armHeight);
            ctx.fillRect(
                obstacle.x + obstacleWidth - armWidth / 2,
                obstacle.y + obstacle.height / 2,
                armWidth,
                armHeight
            );
        });

        ctx.fillStyle = '#343A40';
        ctx.font = '32px "Micro 5", monospace';
        ctx.fillText(`* ${score}`, 10, 30);

        if (!gameRunning && !titleScreen && gameOverTimeout === null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#343A40';
            ctx.font = '80px "Micro 5", monospace';
            ctx.textAlign = 'center';
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
            ctx.font = '40px "Micro 5", monospace';
            ctx.fillText('PRESS START', canvas.width / 2, canvas.height / 2 + 40);
            ctx.textAlign = 'start';
        }

        if (gameRunning && !gameOverBounce) {
            const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);
            previousFrames.unshift(currentFrame); // Add current frame to the beginning
            if (previousFrames.length > motionBlurLength) {
                previousFrames.pop(); // Remove the oldest frame if the history is too long
            }
        } else if (!gameRunning) {
            previousFrames = []; // Clear previous frames on game over/title screen
        }
    }

    //draw title screen
    function drawTitleScreen() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#343A40';
        ctx.font = '80px "Micro 5", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('404', canvas.width / 2, canvas.height / 2 - 20);

        ctx.font = '40px "Micro 5", monospace';
        ctx.fillText('NOT FOUND', canvas.width / 2, canvas.height / 2 + 40);

        ctx.fillText('PRESS START', canvas.width / 2, canvas.height / 2 + 80);
        ctx.textAlign = 'start';
    }

    // Main game loop
    function gameLoop(currentTime: number) {
        const deltaTime = currentTime - lastTime;

        if (deltaTime >= 1000 / targetFPS) {
            update();
            draw();
            lastTime = currentTime;
        }

        animationFrameId = requestAnimationFrame(gameLoop);
    }

    function initializeGame() {
        resizeCanvas();
        playerX = canvas.width / 4;
        playerY = canvas.height - playerSize - 20;
        obstacles = [];
        score = 0;
        gameRunning = true;
        gameOverBounce = false;
        if (gameOverTimeout) {
            clearTimeout(gameOverTimeout);
            gameOverTimeout = null;
        }
        playerVelocityY = 0;
        isJumping = false;
        lastTime = performance.now(); // Initialize lastTime
        if (obstacleTimer) {
            clearInterval(obstacleTimer);
        }
        startObstacleGeneration();
        animationFrameId = requestAnimationFrame(gameLoop); // Start the game loop
        previousFrames = []; // Clear previous frames on game restart
    }

    onMount(() => {
        window.addEventListener('resize', () => {
            resizeCanvas();
            if (titleScreen) {
                drawTitleScreen();
            } else {
                draw();
            }
        });
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', resizeCanvas);
        }
    });

    function handleStartClick() {
        if (titleScreen) {
            titleScreen = false;
            initializeGame();
        } else if (!gameRunning && gameOverTimeout === null) {
            initializeGame();
        }
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</svelte:head>

<div class="game-frame">
    <div class="top-bar">
        <span class="brand-name">ERROR BOY <span class="subtitle">pocket</span></span>
    </div>
    <div class="body">
        <div class="left-controls">
            <div class="dpad">
                <div class="up"></div>
                <div class="left"></div>
                <div class="center"></div>
                <div class="right"></div>
                <div class="down"></div>
            </div>
        </div>
        <div class="screen-container" style="width: {containerWidth}px; height: {containerHeight}px;">
            <canvas bind:this={canvas} style="width: 100%; height: 100%;"></canvas>
        </div>
        <div class="right-controls">
            <div class="buttons">
                <div class="b-button" on:click={jump()}>B</div>
                <div class="a-button">A</div>
            </div>
        </div>
    </div>
    <div class="bottom-controls">
        <div class="select-start">
            <div class="select-button">SELECT</div>
            <div class="start-button"  bind:this={startButtonElement} on:click={handleStartClick}>START</div>
        </div>
    </div>
</div>
<style>
    .game-frame {
        background: linear-gradient(135deg, #d0d0d0, #f0f0f0);
        border: 6px solid #b0b0b0;
        border-radius: 15px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4),
            -5px -5px 10px rgba(255, 255, 255, 0.6) inset;
    }

    .top-bar {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 15px;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5),
            -1px -1px 1px rgba(255, 255, 255, 0.8);
    }

    .brand-name {
        font-weight: bold;
        font-size: 1.8em;
        font-style: italic;
        color: #336;
        text-shadow: -2px -2px 2px rgba(255, 255, 255, 0.6),
            2px 2px 2px rgba(0, 0, 0, 0.4);
    }

    .brand-name .subtitle {
        font-size: 0.8em;
        font-style: normal;
    }

    .body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-bottom: 15px;
    }

    .left-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }

    .screen-container {
        background-color: #a8b078;
        border: 8px solid #6c757d;
        border-radius: 5px;
        overflow: hidden;
        aspect-ratio: 10 / 9;
        height: 16em;
        box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.3),
            inset -5px -5px 10px rgba(255, 255, 255, 0.5);
        position: relative;
    }

    canvas {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        image-rendering: pixelated;
        top: 0;
        left: 0;
    }

    .right-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }

    .dpad {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 10px;
    }

    .dpad div {
        position: absolute;
        background-color: #444;
        border-radius: 2px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4),
            -1px -1px 2px rgba(255, 255, 255, 0.3) inset;
    }

    .up {
        width: 20px;
        height: 20px;
        top: 0;
        left: 20px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .left {
        width: 20px;
        height: 20px;
        top: 20px;
        left: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .center {
        width: 20px;
        height: 20px;
        top: 20px;
        left: 20px;
        border-radius: 50%;
        background-color: #555;
        box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.4),
            inset -2px -2px 4px rgba(255, 255, 255, 0.3);
    }

    .right {
        width: 20px;
        height: 20px;
        top: 20px;
        left: 40px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .down {
        width: 20px;
        height: 20px;
        top: 40px;
        left: 20px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .buttons {
        display: flex;
        gap: 12px;
    }

    .a-button,
    .b-button {
        width: 32px;
        height: 32px;
        background: linear-gradient(to bottom right, #e74c3c, #c0392b);
        border-radius: 50%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.4),
            -2px -2px 4px rgba(255, 255, 255, 0.3) inset;
        text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
        cursor: pointer;
        border: none;
    }

    .a-button:hover,
    .b-button:hover {
        background: linear-gradient(to bottom right, #ef5350, #b30000);
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5),
            -1px -1px 3px rgba(255, 255, 255, 0.4) inset;
    }

    .b-button {
        margin-top: 12px;
    }

    .bottom-controls {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        width: 100%;
    }

    .select-start {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    .select-button,
    .start-button {
        background: linear-gradient(to bottom, #8e44ad, #7a2d91);
        color: white;
        padding: 8px 16px;
        border-radius: 5px;
        font-size: 12px;
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4),
            -2px -2px 4px rgba(255, 255, 255, 0.3) inset;
        cursor: pointer;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
        font-weight: bold;
    }

    .select-button:hover,
    .start-button:hover {
        background: linear-gradient(to bottom, #9b59b6, #6c3483);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5),
            -1px -1px 3px rgba(255, 255, 255, 0.4) inset;
    }
</style>
