<script lang="ts">
	import Alert from '$components/alert/Alert.svelte';
	import Hero from '$components/hero/Hero.svelte';
	import Intro from '$components/intro/Intro.svelte';
	import ProjectList from '$components/project-list/ProjectList.svelte';
	import { isLoggedIn } from '$stores/session';
	import { Heart, Bug, TriangleAlert } from 'lucide';
</script>

<svelte:head>
	<title>AmpMod - An advanced programming language</title>
</svelte:head>

<Alert
	id="amwfbeta-1"
	button={{
		uri: 'https://ampmod.flarum.cloud/t/bugs-and-glitches',
		text: 'Report a bug'
	}}
	icon={Bug}
	background="#ff4d4d"
>
	The AmpMod website is in alpha, and there will certainly be bugs. Please report any bugs you encounter.
</Alert>
<Alert
	id="please-contribute"
	button={{
		uri: 'https://codeberg.org/ampmod/dev-docs/wiki',
		text: 'Dev docs'
	}}
	icon={Heart}
	background="#855cd6"
>
	If you have at least some knowledge of JavaScript and Git, please consider contributing to AmpMod.
</Alert>

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
<ProjectList title="Featured projects" />
<ProjectList title="Top liked projects" />
<ProjectList title="Most recently approved projects" />

<style>
	.intro-layout {
		display: flex;
		gap: 20px; /* Adjust the gap as needed */
		max-width: 950px;
		margin: auto;
		align-items: center;
		background-color: var(--background-color);
		color: var(--text-color);
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
