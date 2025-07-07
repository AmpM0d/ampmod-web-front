<script lang="ts">
	import { goto } from '$app/navigation';
	import { isBanned } from '$stores/session';
	import { page } from '$app/state';
	import { theme } from '$stores/theme';
	let { children } = $props();
	import Header from '$components/header/Header.svelte';
	import Footer from '$components/footer/Footer.svelte';
	import 'normalize.css';

	if (true) {
		console.warn(
			'%cSCAM ALERT! Do NOT paste anything into the console!',
			"color: red; font-size: 3em; font-weight: bold; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
		);
		console.log(
			"%cDo NOT paste anything into the console that someone you don't know asked you to! They can log in to your account, create inappropriate projects, delete your legitimate projects, and get your account banned! If you don't know what JavaScript is, exit now.",
			"font-size: 18px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
		);
	}

	const banAllowedPages = [
		"/banned", // the ban information page itself, of course
		"/proj-guidelines", // project guidelines
		"/terms", // terms of use page
		"/privacy", // privacy policy page
		"/mirrors", // mirrors page
		"/banned/mental" // mental health resources for users who are banned for expressing thoughts of self-harm
	]

	$effect(() => {
	  if ($isBanned && !banAllowedPages.includes(page.url.pathname)) {
		goto('/banned');
	  }
	});
</script>

<div class="container" class:dark={$theme === 'dark'}>
    <main>
        {@render children()}
    </main>
</div>

<style>
	:global(:root) {
		--background-color: white;
		--text-color: #121216;
		--accent-color: #59C059; /* Green, used in header, links, etc */
		--accent-transparent: #59C05922;
		--spinner-color: var(--accent-color);
		--footer-background: #f7f7f7; /* Footer background (see .footer-column, .container, etc) */
		--border-color: #dcdcdc; /* Used in project-list, cards, etc */
		--error-background: #ffeaea; /* Light red background for errors */
		--error-text: #ff4d4d; /* Error text color */
		--error-border: #ffb3b3; /* Error border color */
		--font-stack: "Helvetica Neue", Helvetica, Arial, sans-serif;
	}

	:global(.dark) {
		--background-color: #121212;
		--text-color: #fefefa;
		--spinner-color: #fff;
		--footer-background: #232323;
		--border-color: #333;
		--error-background: #2a0000;
		--error-text: #ffadad;
		--error-border: #b30000;
	}

	:global {
		*, *::before, *::after {
			box-sizing: border-box;
		}
	}

	/* Apply flexbox to the body */
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Ensure the body takes at least the full viewport height */
		margin: 0; /* Reset default body margin */
		background-color: var(--background-color);
		color: var(--text-color);
	}

	.container main {
		flex-grow: 1; /* Allow the main content to expand and push the footer down */
	}
</style>
