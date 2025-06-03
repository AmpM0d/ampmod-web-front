<script lang="ts">
	let searchQuery = '';
	import Logo from './logo.svg';
	import { isLoggedIn, username } from '$stores/session';
	import { Mail, FolderOpen, ChevronDown, Sun, Moon, MenuIcon } from '@lucide/svelte';
	import { theme } from '$stores/theme';
	import { fade } from 'svelte/transition';

	let isProfileOpen = false;
	let isMenuOpen = false;

	function toggleProfile() {
		isProfileOpen = !isProfileOpen;
	}

	function closeProfile() {
		isProfileOpen = false;
	}

	function toggleTheme() {
		theme.update(current => (current === 'light' ? 'dark' : 'light'));
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<style>
	header {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 45px;
		background: var(--accent-color);
		color: white;
		font-family: var(--font-stack);
		font-size: 14px;
		position: fixed;
		width: 100%;
		top: 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
		gap: 10px;
		z-index: 10;
	}

	button {
		cursor: pointer;
		background: none;
		border: none;
		text-align: left;
		font-family: inherit;
		font-size: inherit;
	}

	nav {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.header-link {
		all: unset;
		color: white;
		text-decoration: none;
		font-weight: bold;
		padding: 0.75em;
		border-radius: 4px;
		cursor: pointer;
	}
	
	.header-image-link {
		height: 24px;
		padding: 4px 8px;
		transition: transform 0.1s;
	}

	.header-image-link:hover {
		transform: scale(1.2);
	}

	.header-link:not(.header-image-link):hover {
		background: rgba(0, 0, 0, 0.1);
	}

	.search-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.search-bar input {
		padding: 0.6em 1em;
		outline: none;
		border: none;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.1);
		width: 18em;
		color: white;
		transition: background 0.3s, color 0.3s, box-shadow 0.2s;
	}

	.search-bar input:focus {
		background: white;
		color: black;
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
	}

	.search-bar input::placeholder {
		opacity: 0.7;
	}

	.header-overlay-hack {
		margin-top: 45px;
	}

	.logo {
		transition: transform 0.1s;
		height: 28px;
	}

	.logo-link:hover .logo {
		transform: scale(1.05);
	}

	.profile-dropdown {
		position: relative;
	}

	.profile-button {
		background: none;
		border: none;
		color: white;
		font-weight: bold;
		cursor: pointer;
		padding: 0.75em 0.75em;
		border-radius: 4px;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.profile-button:hover {
		background: rgba(0, 0, 0, 0.1);
	}

	.profile-options {
		display: block;
		position: absolute;
		top: calc(100% + 5px); /* Positioned just below the border */
		right: 0;
		background: var(--accent-color); /* Matching header background */
		color: white;
		border: 1px solid rgba(0, 0, 0, 0.2); /* Matching header border */
		border-top: none;
		border-radius: 0 0 4px 4px; /* Rounded bottom corners */
		z-index: 15;
		width: 12em;
		overflow: hidden;
	}

	.profile-options a, .profile-options button {
		display: block;
		padding: 0.6em 1em;
		text-decoration: none;
		color: white;
		font-weight: bold;
		width: 100%;
	}

	.profile-options a:hover, .profile-options button:hover {
		background: rgba(0, 0, 0, 0.05); /* Slightly lighter hover */
	}

	.profile-options hr {
		margin: 0;
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.2); /* Matching separator */
	}

	.hamburger-menu {
		display: none;
		position: absolute;
		top: 45px;
		right: 0;
		background: var(--accent-color);
		color: white;
		border: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 4px;
		z-index: 15;
		width: 12em;
		overflow: hidden;
	}

	.hamburger-menu a {
		display: block;
		padding: 0.6em 1em;
		text-decoration: none;
		color: white;
		font-weight: bold;
	}

	.hamburger-menu a:hover {
		background: rgba(0, 0, 0, 0.05);
	}

	.hamburger-button {
		display: none;
		background: none;
		border: none;
		color: white;
		font-size: 1.5em;
		cursor: pointer;
		position: absolute;
		left: 10px;
	}

	@media (max-width: 900px) {
		.search-bar input {
			width: 40vw;
		}

		.profile-options {
			width: 100%;
			left: 0;
			right: 0;
		}

		.hamburger-button {
			display: block;
		}

		nav > a {
			display: none;
		}

		.hamburger-menu {
			display: block;
		}

		.nomobile {
			display: none;
		}
	}
</style>

<header>
	<button class="hamburger-button" on:click={toggleMenu}><MenuIcon /></button>
	<a href="/" class="logo-link">
		<img src={Logo} draggable=false height=28 alt="AmpMod" class="logo">
	</a>
	<nav>
		<div class="nomobile">
			<a href="https://ampmod.codeberg.page/editor.html" class="header-link">Create</a>
			<a href="https://ampmod.codeberg.page/credits.html" class="header-link">Credits</a>
			<a href="https://ampmod.flarum.cloud" class="header-link">Discuss</a>
			<a href="https://codeberg.org/AmpMod" class="header-link">Contribute</a>
		</div>
		<div class="search-bar">
			<input
				type="text"
				placeholder="Search for projects..."
				bind:value={searchQuery}
			/>
		</div>
		{#if $isLoggedIn}
		<a href="/messages" class="header-link header-image-link" title="Messages"><Mail /></a>
		<a href="/mystuff" class="header-link header-image-link" title="My Stuff"><FolderOpen /></a>
			<div class="profile-dropdown">
				<button class="profile-button" on:click={toggleProfile}>
					{$username} <ChevronDown size=16 />
				</button>
				{#if isProfileOpen}
					<div class="profile-options" transition:fade={{ duration: 100 }}>
						<a href={`/users/${$username}`} on:click={closeProfile}>Profile</a>
						<a href="/mystuff" on:click={closeProfile}>My Stuff</a>
						<a href="/settings" on:click={closeProfile}>Settings</a>
						<hr>
						<button on:click={toggleTheme}>{#if $theme == "dark"}Light{:else}Dark{/if} Theme</button>
						<a href="/logout" on:click={closeProfile}>Log Out</a>
					</div>
				{/if}
			</div>
		{:else}
			<button class="header-link header-image-link" on:click={toggleTheme} tabindex="0">{#if $theme == "dark"}<Sun fill="currentColor" />{:else}<Moon fill="currentColor" />{/if}</button>
			<a href="/join" class="header-link">Join</a>
			<a href="/login" class="header-link">Log in</a>
		{/if}
	</nav>
	{#if isMenuOpen}
		<div class="hamburger-menu" transition:fade={{ duration: 100 }}>
			<a href="https://ampmod.codeberg.page/editor.html">Create</a>
			<a href="https://ampmod.codeberg.page/credits.html">Credits</a>
			<a href="https://ampmod.flarum.cloud">Discuss</a>
			<a href="https://codeberg.org/AmpMod">Contribute</a>
		</div>
	{/if}
</header>
<div class="header-overlay-hack"></div>