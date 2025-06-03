<script lang="ts">
	import { onMount } from 'svelte';
	import { isLoggedIn } from '$stores/session';
	import { Cat } from '@lucide/svelte';

	let username: string = '';
	let password: string = '';
	let confirmPassword: string = '';
	let email: string = '';

	const commonPasswords: string[] = [
		'123456',
		'password',
		'secret',
		'dragon',
		'ampmod',
		'ultiblocks',
		'letmein',
		'qwerty',
		'abc123',
		'monkey',
		'iloveyou',
		'123456789',
		'12345678',
		'incorrect'
	];

	function isUsernameValidLength(name: string): boolean {
		return name.length >= 3 && name.length <= 20;
	}

	function doesUsernameContainValidChars(name: string): boolean {
		return /^[a-zA-Z0-9_-]+$/.test(name) || name == '';
	}

	function isUsernameNotTaken(name: string): boolean {
		return name.toLowerCase() !== 'ampelectrecuted'; // Replace with actual check
	}

	function isUsernameAppropriate(name: string): boolean {
		return !name.toLowerCase().includes('badusername'); // Replace with actual check
	}

	function isPasswordValidLength(pw: string): boolean {
		return pw.length >= 6;
	}

	function isPasswordNotCommon(pw: string): boolean {
		return !commonPasswords.includes(pw);
	}

	function handleJoin(): void {
		const isUsernameOkay =
			isUsernameValidLength(username) &&
			doesUsernameContainValidChars(username) &&
			isUsernameNotTaken(username) &&
			isUsernameAppropriate(username);
		const isPasswordOkay = isPasswordValidLength(password) && isPasswordNotCommon(password);

		if (!isUsernameOkay) {
			alert('Username does not meet the requirements.');
			return;
		}

		if (!isPasswordOkay) {
			alert('Password does not meet the requirements.');
			return;
		}

		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		// Handle join logic here
		console.log({ username, password, email });
	}

	function loginWithScratch(): void {
		const redirectAfterAuth = encodeURIComponent(
			'https://your-frontend-domain.com/scratch-auth-callback'
		);
		const authUrl = `https://auth.itinerary.eu.org/auth/?redirect=${redirectAfterAuth}&name=AmpMod`;
		window.location.href = authUrl;
	}
</script>

<svelte:head>
	<title>Join AmpMod</title>
</svelte:head>

<div class="join-form">
	<h1>Join AmpMod</h1>
	{#if $isLoggedIn}
		You already seem to be logged into AmpMod.
	{:else}
		<form on:submit|preventDefault={handleJoin}>
			<div class="join-form-flex">
				<div class="label-with-link">
					<label for="username">Username</label>
					<a href="" class="scratch-link" on:click|preventDefault={loginWithScratch}
						><Cat size=18 /> Join with Scratch</a
					>
				</div>
				<input id="username" type="text" bind:value={username} required />
				<p>Must:</p>
				<ul class="requirements">
					<li class:valid={isUsernameValidLength(username)}>
						{isUsernameValidLength(username) ? '✅' : '❌'}
						Be 3-20 characters long
					</li>
					<li class:valid={doesUsernameContainValidChars(username)}>
						{doesUsernameContainValidChars(username) ? '✅' : '❌'}
						Contain only letters, numbers, hyphens and underscores
					</li>
					<li class:valid={isUsernameNotTaken(username)}>
						{isUsernameNotTaken(username) ? '✅' : '❌'}
						Not be taken
					</li>
					<li class:valid={isUsernameAppropriate(username)}>
						{isUsernameAppropriate(username) ? '✅' : '❌'}
						Be appropriate
					</li>
					<li>ℹ️ Not be your real name</li>
				</ul>
			</div>
			<div class="join-form-flex">
				<label for="password">Password</label>
				<input id="password" type="password" bind:value={password} required />
				<p>Must:</p>
				<ul class="requirements">
					<li class:valid={isPasswordValidLength(password)}>
						{isPasswordValidLength(password) ? '✅' : '❌'}
						Be at least 6 characters long
					</li>
					<li class:valid={isPasswordNotCommon(password)}>
						{isPasswordNotCommon(password) ? '✅' : '❌'}
						Not be a common password
					</li>
					<li class:valid={password.toLowerCase() == username.toLowerCase()}>
						{password.toLowerCase() != username.toLowerCase() ? '✅' : '❌'}
						Not be your username
					</li>
				</ul>
			</div>
			<div class="join-form-flex">
				<label for="confirmPassword">Confirm Password</label>
				<input id="confirmPassword" type="password" bind:value={confirmPassword} required />
				{#if password !== confirmPassword && confirmPassword}
					<p class="error">❌ Passwords do not match!</p>
				{/if}
			</div>
			<div class="join-form-flex">
				<label for="email">Email (optional)</label>
				<input id="email" type="email" bind:value={email} />
			</div>
			<div class="terms-checkbox-container">
				<input type="checkbox" id="termscheck" required />
				<label for="termscheck">
                    I agree to AmpMod's <a href="/terms" target="_blank">Terms of Use</a> and
                    <a href="/privacy" target="_blank">Privacy Policy</a>.
                </label>
			</div>
			<button type="submit">Join</button>
		</form>
	{/if}
</div>

<style>
	.join-form {
		max-width: 600px;
		margin: 64px auto;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}

	.join-form h1 {
		text-align: center;
	}

	.join-form form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.join-form button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 8px;
		background-color: #59c059;
		color: white;
		cursor: pointer;
		font-weight: bold;
	}

	.join-form button:hover {
		background-color: #59a052;
	}

	.join-form .join-form-flex {
		display: flex;
		flex-direction: column;
	}

	.join-form label {
		margin-bottom: 0.5rem;
	}

	.join-form input {
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.requirements {
		margin-top: 0.25rem;
		padding-left: 1rem;
		color: #777;
		font-size: 0.9rem;
		list-style: none;
	}

	.requirements li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.error {
		color: red;
		margin-top: 0.25rem;
		font-size: 0.9rem;
	}

	.label-with-link {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.scratch-link {
		color: #855cd6;
		text-decoration: none;
		cursor: pointer;
		font-weight: bold;
	}

	.terms-checkbox-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
