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
        padding: 3em 10%;
        font-family: var(--font-stack);
        font-weight: bold;
    }

    .hero-content {
        max-width: 95%;
    }

    .hero-title {
        font-size: 1.8em;
        margin-bottom: 10px;
    }

    .hero-buttons {
        display: flex;
        gap: 10px;
    }

    .hero-button {
        padding: 10px 18px;
        font-size: 1.2rem;
        font-weight: bold;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;
    }

    .create-button {
        background-color: white;
        color: var(--accent-color);
    }

    .join-button {
        /* Less emphasis on the join button */
        border: 1px white solid;
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
        <div class="hero-title">Program complex games, tools, and more<br />
        Upload projects for the world to see</div>
        <div class="hero-buttons">
            <a href="https://ampmod.codeberg.page" class="hero-button create-button">Create</a>
            <a href="/join" class="hero-button join-button">Join</a>
            <a href="/about" class="hero-button join-button">About AmpMod</a>
        </div>
    </div>
    <div class="hero-image">
        <img src={appleCatIllustration} alt="Illustration of Apple Cat dropping a array block into an input" height=200 draggable=false />
    </div>
</div>