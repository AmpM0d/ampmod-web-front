<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import Spinner from '$components/spinner/Spinner.svelte';
	import ProjectList from '$components/project-list/ProjectList.svelte';
	import Modal from '$components/modal/Modal.svelte';
	import AppleCatRankup from './apple-cat-rankup.svg';
	import { UsersIcon, CircleFadingArrowUp } from '@lucide/svelte';
	import { isLoggedIn, username } from '$stores/session';

	let userData = $state<{
		name: string;
		image: string;
		bio: string;
		joindate: number;
		rank: number;
		linked_accounts: { scratch?: string; github?: string };
		is_following?: boolean;
	} | null>(null);

	const rankNames = $state({ 0: 'New AmpModder', 1: 'AmpModder', 2: 'Moderator', 3: 'Operator' });
	let error = $state<string | null>(null);
	let showRankUpModal = $state(false);

	const AMPMOD_WEB_BACK_URL = import.meta.env.VITE_AMPMOD_WEB_BACK_URL;
	const FAKE_DELAY = 1000;

	onMount(async () => {
		const username = page.params.username;
		try {
			const response = await fetch(`${AMPMOD_WEB_BACK_URL}/users/${username}/profile`);
			if (!response.ok) throw new Error('Failed to fetch user data');
			userData = await response.json();
		} catch (err) {
			error = `Whoops! Could not load user page. ${err}`;
			console.error(err);
		}
	});

	const formatDate = (ts: number) => new Date(ts * 1000).toLocaleDateString();
	const getTimeAgo = (ts: number) => {
		const now = Date.now();
		let diff = now - new Date(ts * 1000).getTime();
		const units = { year: 31536000, month: 2592000, day: 86400, hour: 3600, minute: 60, second: 1 };
		const parts: string[] = [];
		for (const unit in units) {
			const value = Math.floor(diff / (units as any)[unit] / 1000);
			if (value > 0) parts.push(`${value} ${unit}${value > 1 ? 's' : ''}`);
			diff -= value * (units as any)[unit] * 1000;
			if (parts.length === 2) break;
		}
		return parts.length > 0 ? parts.join(', ') + ' ago' : 'just now';
	};

	const openRankUpModal = () => (showRankUpModal = true);
	const closeRankUpModal = () => (showRankUpModal = false);
	const handleRankUp = async () => {
		console.log('Rank up!');
		closeRankUpModal();
		await new Promise((r) => setTimeout(r, FAKE_DELAY));
		userData.rank = 1;
	};
	const toggleFollow = async () => {
		if (!userData) return;
		await new Promise((r) => setTimeout(r, FAKE_DELAY));
		userData.is_following = !userData.is_following;
	};
</script>

<svelte:head><title>{userData?.name ?? page.params.username} on AmpMod</title></svelte:head>

<div class="user-profile">
	{#if error}
		<p class="error">{error}</p>
	{:else if userData}
		<div class="header">
			<img src={userData.image} alt={`Profile of ${userData.name}`} class="avatar" />
			<div class="info">
				<h1>{userData.name}</h1>
				<p class="meta">
					{rankNames[userData.rank] || 'Unknown Rank'}
					| Joined
					<span titleContent={formatDate(userData.joindate)}>{getTimeAgo(userData.joindate)}</span>
					{#if userData.rank === 0}
						| <a href="#" class="rank-up" on:click|preventDefault={openRankUpModal}><CircleFadingArrowUp size=14 strokeWidth=3 /> Rank up</a>
					{/if}
				</p>
			</div>
			<div class="actions">
				{#if isLoggedIn && userData.name != $username}
				<button class={`follow ${userData.is_following ? 'unfollow' : ''}`} on:click={toggleFollow}>
					{userData.is_following ? 'Unfollow' : 'Follow'}
				</button>
				{/if}
			</div>
		</div>

		<div class="content">
			<div class="bio">
				<h2 class="title">About me</h2>{@html userData.bio ?? ''}
			</div>
			<div class="badges">
				<h2 class="title">Badges</h2>
				<div class="placeholder">No badges yet.</div>
			</div>
		</div>

		<ProjectList title="Uploaded projects" />

		{#if showRankUpModal}
			<Modal on:close={closeRankUpModal} titleContent="Become an AmpModder">
				<img src={AppleCatRankup} alt="Rank up illustration" draggable={false} class="rankup-img" />
				<p>AmpModders can use advanced extensions and do other neat stuff New AmpModders can't do!</p>
				<p>Confirm rank up to AmpModder?</p>
				<div class="modal-actions">
					<button class="primary" on:click={handleRankUp}>Rank up!</button>
					<button class="secondary" on:click={closeRankUpModal}>Cancel</button>
				</div>
			</Modal>
		{/if}
	{:else}
		<Spinner />
	{/if}
</div>


<style>
	.user-profile {
		max-width: 1000px;
		margin: 16px auto;
		border-radius: 8px;
		font-family: var(--font-stack);
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
		padding-bottom: 1rem;
	}
	.avatar {
		border-radius: 5px;
		width: 80px;
		height: 80px;
		object-fit: cover;
	}
	.info {
		flex-grow: 1;
	}
	.info h1 {
		margin: 0;
		font-size: 2rem;
	}
	.meta {
		font-size: 0.9rem;
		color: #777;
		margin-top: 0.2rem;
	}
	.rank-up {
		color: red;
		text-decoration: none;
	}
	.rank-up:hover {
		text-decoration: underline;
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.follow {
		padding: 0.5rem 1rem;
		border-radius: 5px;
		cursor: pointer;
		font-weight: bold;
		border: none;
		background-color: #007bff;
		color: white;
	}
	.follow:hover {
		background-color: #0056b3;
	}
	.follow.unfollow {
		background-color: #6c757d;
	}
	.follow.unfollow:hover {
		background-color: #545b62;
	}
	.admin {
		display: flex;
		gap: 0.5rem;
	}
	.admin button {
		padding: 0.5rem 1rem;
		border-radius: 5px;
		cursor: pointer;
		font-weight: bold;
		border: none;
		color: white;
	}
	.admin .ban {
		background-color: #dc3545;
	}
	.admin .ban:hover {
		background-color: #c82333;
	}
	.admin .warn {
		background-color: #ffc107;
		color: #212529;
	}
	.admin .warn:hover {
		background-color: #e0a800;
	}
	.admin .delete {
		background-color: #6c757d;
	}
	.admin .delete:hover {
		background-color: #545b62;
	}
	.content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 1rem;
	}
	.bio {
		color: #666;
		white-space: pre-wrap;
	}
	.title {
		font-size: 1.2rem;
		color: #333;
		margin-bottom: 0.5rem;
	}
	.badges .placeholder {
		border: 1px dashed #ccc;
		padding: 1rem;
		border-radius: 5px;
		text-align: left;
		color: #777;
	}
	.modal-actions {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-top: 1.5rem;
	}
	.modal-actions button {
		padding: 0.75rem 1.5rem;
		border-radius: 5px;
		cursor: pointer;
		font-weight: bold;
		border: none;
		color: white;
	}
	.modal-actions .primary {
		background-color: #007bff;
	}
	.modal-actions .primary:hover {
		background-color: #0056b3;
	}
	.modal-actions .secondary {
		background-color: #6c757d;
	}
	.modal-actions .secondary:hover {
		background-color: #545b62;
		color: white;
		border: none;
	}

	.rankup-img {
		display: block;
		margin: 1rem auto;
		max-width: 100%;
		height: auto;
	}
	.error {
		color: var(--error-text);
		text-align: center;
		padding: 1rem;
		background-color: var(--error-background);
		border: 1px solid var(--error-border);
		border-radius: 5px;
		margin-top: 1rem;
	}
</style>