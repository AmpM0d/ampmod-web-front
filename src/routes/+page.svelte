<script lang="ts">
	import Hero from '$components/hero/Hero.svelte';
	import Intro from '$components/intro/Intro.svelte';
	import ProjectList from '$components/project-list/ProjectList.svelte';
	import { isLoggedIn } from '$stores/session';
</script>

<svelte:head>
	<title>AmpMod - An advanced programming language</title>
</svelte:head>

{#if $isLoggedIn}
	<div class="intro-layout">
		<div class="intro-section">
			<Intro />
		</div>
		<div class="news-placeholder"></div>
	</div>
{:else}
	<Hero />
{/if}
<ProjectList />

<style>
	.intro-layout {
		display: flex;
		gap: 20px; /* Adjust the gap as needed */
		max-width: 950px;
		margin: auto;
		align-items: center;
	}

	.intro-section {
		flex: 1; /* Takes up one part of the available space */
		display: block;
	}

	.news-placeholder {
		flex: 1; /* Takes up one part of the available space */
		padding: 6px 20px;
		border: 1px solid #dcdcdc;
		border-radius: 10px;
		margin: 10px;
		display: block;
		height: 22em;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
</style>
