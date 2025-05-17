<script lang="ts">
    let { children } = $props();
</script>
<style>
    .mdsvex-page {
        margin: 1em auto;
        max-width: 900px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
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
</style>
<div class="mdsvex-page">
    {@render children()}
</div>
<svelte:head>
    <title>AmpMod</title>
</svelte:head>