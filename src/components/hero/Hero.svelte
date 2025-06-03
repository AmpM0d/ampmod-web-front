<script>
    import appleCatIllustration from './apple-cat-hero.svg';
</script>
<style>
    .hero {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: var(--accent-color);
        color: white;
        padding: 3em 12em;
        font-family: "Pixelify Sans", var(--font-stack);
    }

    .hero-content {
        max-width: 90%;
    }

    .hero-title {
        font-size: 1.9em;
        margin-bottom: 10px;
    }

    .hero-buttons {
        display: flex;
        gap: 10px;
    }

    .hero-button {
        padding: 8px 16px;
        font-size: 1rem;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        text-decoration: none;
    }

    .create-button {
        background-color: white;
        color: #28a745;
    }

    .join-button {
        /* Less emphasis on the join button */
        border: 2px white solid;
        color: white;
        background: none;
    }

    :global {
        /* pixelify-sans-regular - latin */
        @font-face {
        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
        font-family: 'Pixelify Sans';
        font-style: normal;
        font-weight: 400;
        src: url('/fonts/pixelify-sans-v1-latin-regular.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
        }

        /* pixelify-sans-500 - latin */
        @font-face {
        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
        font-family: 'Pixelify Sans';
        font-style: normal;
        font-weight: 500;
        src: url('/fonts/pixelify-sans-v1-latin-500.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
        }

        /* pixelify-sans-600 - latin */
        @font-face {
        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
        font-family: 'Pixelify Sans';
        font-style: normal;
        font-weight: 600;
        src: url('/fonts/pixelify-sans-v1-latin-600.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
        }

        /* pixelify-sans-700 - latin */
        @font-face {
        font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
        font-family: 'Pixelify Sans';
        font-style: normal;
        font-weight: 700;
        src: url('/fonts/pixelify-sans-v1-latin-700.woff2') format('woff2'); /* Chrome 36+, Opera 23+, Firefox 39+, Safari 12+, iOS 10+ */
        }
    }
</style>

<div class="hero">
    <div class="hero-content">
        <div class="hero-title">Block coding with advanced features<br />
        Based off Scratch 3 and TurboWarp</div>
        <div class="hero-buttons">
            <button class="hero-button create-button">Create</button>
            <a href="/join" class="hero-button join-button">Join</a>
        </div>
    </div>
    <div class="hero-image">
        <img src={appleCatIllustration} alt="Illustration of Apple Cat dropping a array block into an input" height=200 draggable=false />
    </div>
</div>