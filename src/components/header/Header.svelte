<script lang="ts">
	let searchQuery = '';
	import Logo from './logo.svg';
	import { isLoggedIn, username } from '$stores/session';
	import myStuffIcon from './mystuff.svg';
	import messagesIcon from './messages.svg';

	let isProfileOpen = false;

	function toggleProfile() {
		isProfileOpen = !isProfileOpen;
	}

	function closeProfile() {
		isProfileOpen = false;
	}
</script>

<style>
	header {
		display: flex;
		justify-content: center; /* Restored centered layout */
		align-items: center;
		height: 45px;
		background: #59C059; /* Restored AmpMod green */
		color: white;
		font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
		font-size: 14px;
		position: fixed;
		width: 100%;
		top: 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
		gap: 10px;
		z-index: 10;
	}

	nav {
		display: flex;
		gap: 8px; /* Slightly increased gap */
		align-items: center;
	}

	.header-link {
		color: white;
		text-decoration: none;
		font-weight: bold;
		padding: 0.75em;
		border-radius: 4px;
	}

	.header-image-link {
		padding: 0.75em 0.5em;
	}

	.header-image-link img {
		transition: transform 0.1s;
	}

	.header-image-link:hover img {
		transform: scale(1.1);
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
		margin-top: 46px;
	}

	.logo {
		transition: transform 0.1s;
		height: 28px;
	}

	.logo:hover {
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
		display: none;
		position: absolute;
		top: calc(100% + 5px); /* Positioned just below the border */
		right: 0;
		background: #59C059; /* Matching header background */
		color: white;
		border: 1px solid rgba(0, 0, 0, 0.2); /* Matching header border */
		border-top: none;
		border-radius: 0 0 4px 4px; /* Rounded bottom corners */
		z-index: 15;
		min-width: 120px;
		overflow: hidden;
	}

	.profile-options.open {
		display: block;
	}

	.profile-options a {
		display: block;
		padding: 0.6em 1em;
		text-decoration: none;
		color: white;
		font-weight: bold;
        width: 12em;
	}

	.profile-options a:hover {
		background: rgba(0, 0, 0, 0.05); /* Slightly lighter hover */
	}

	.profile-options hr {
		margin: 0;
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.2); /* Matching separator */
	}
</style>

<header>
	<a href="/">
		<img src={Logo} draggable=false height=28 alt="AmpMod" class="logo">
	</a>
	<nav>
		<a href="https://ampmod.codeberg.page/editor.html" class="header-link">Create</a>
		<a href="https://ampmod.codeberg.page/credits.html" class="header-link">Credits</a>
		<a href="https://ampmod.flarum.cloud" class="header-link">Discuss</a>
		<a href="https://codeberg.org/AmpMod" class="header-link">Contribute</a>
		<div class="search-bar">
			<input
				type="text"
				placeholder="Search for projects..."
				bind:value={searchQuery}
			/>
		</div>
		{#if $isLoggedIn}
		<a href="/messages" class="header-link header-image-link" title="Messages"><img src={messagesIcon} height=20 alt="Messages"></a>
		<a href="/mystuff" class="header-link header-image-link" title="My Stuff"><img src={myStuffIcon} height=20 alt="My Stuff"></a>
			<div class="profile-dropdown">
				<button class="profile-button" on:click={toggleProfile}>
					{$username} ▼
				</button>
				<div class="profile-options" class:open={isProfileOpen}>
					<a href={`/users/${$username}`} on:click={closeProfile}>Profile</a>
					<a href="/mystuff" on:click={closeProfile}>My Stuff</a>
					<a href="/settings" on:click={closeProfile}>Settings</a>
					<hr>
					<a href="/logout" on:click={closeProfile}>Log Out</a>
				</div>
			</div>
		{:else}
			<a href="/join" class="header-link">Join</a>
			<a href="#" class="header-link">Log in</a>
		{/if}
	</nav>
</header>
<div class="header-overlay-hack"></div>