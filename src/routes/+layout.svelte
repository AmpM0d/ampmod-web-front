<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isBanned } from '$stores/session';
	import { get } from 'svelte/store';
	import { page, navigating } from '$app/state';
	let { children } = $props();
	import Header from '$components/header/Header.svelte';
	import Footer from '$components/footer/Footer.svelte';
	import 'normalize.css';

	if (!import.meta.env.DEV) {
		console.log(
			'%cHACKER ALERT!',
			"color: red; font-size: 3em; font-weight: bold; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
		);
		console.log(
			"%cDo NOT paste anything into the console that someone you don't know asked you to! They can log in to your account, create inappropriate projects, delete your legitimate projects, and get your account banned!",
			"font-size: 18px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
		);
	}

	const banAllowedPages = [
		"/banned", // the ban information page itself, of course
		"/proj-guidelines", // project guidelines
		"/terms", // terms of use page
		"/privacy", // privacy policy page
		"/mirrors", // mirrors page
		"/banned/mental", /// mental health resources for users who are banned for expressing thoughts of self-harm
		"/join" // join page (for technical reasons)
	]

	$effect(() => {
	  if ($isBanned && !banAllowedPages.includes(page.url.pathname)) {
		goto('/banned');
	  }
	});
</script>

<div class="container">
    <Header />
    <main>
        {@render children()}
    </main>
    <Footer />
</div>

<style>
	/* Apply flexbox to the body */
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh; /* Ensure the body takes at least the full viewport height */
		margin: 0; /* Reset default body margin */
	}

	.container main {
		flex-grow: 1; /* Allow the main content to expand and push the footer down */
	}
</style>
