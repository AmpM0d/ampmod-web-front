<script lang="ts">
    let { children } = $props();
</script>
<style>
    .mdsvex-page {
        margin: 1em auto;
        padding: 1em;
        max-width: 1000px;
        font-family: var(--font-stack);
        font-size: 1.02em;
    }

    .mdsvex-page :global hr {
        margin: 2em 0;
        border: none;
        border-top: 1px solid #ccc;
    }

	.mdsvex-page :global a {
		color: #59C059;
		text-decoration: none;
        font-weight: bold;
	}
    .mdsvex-page :global a:hover {
        filter: brightness(0.9);
    }
</style>
<div class="mdsvex-page">
    {@render children()}
</div>
<svelte:head>
    <title>AmpMod</title>
</svelte:head>