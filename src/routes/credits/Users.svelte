<script context="module" lang="ts">
	export interface UserProps {
		image: string;
		text: string;
		href?: string;
	}
</script>

<script lang="ts">
	export let users: {
		image: string;
		text: string;
		href?: string;
	}[] = [];
</script>

<div class="users">
	{#each users as user (user.image + user.text)}
		<a href={user.href} target="_blank" rel="noreferrer" class="user">
			<img src={user.image} alt="" width="60" height="60" loading="lazy" />
			<div>{user.text}</div>
		</a>
	{/each}
</div>

<style>
	.users {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.user {
		display: flex;
		align-items: center;
		width: 300px;
		padding: 4px;
		border-radius: 4px;
		font-size: 1.25rem;
		color: inherit !important;
		text-decoration: none;
		transition: background 0.2s;
	}
	.user:hover {
		background: rgba(0, 0, 0, 0.1);
	}
	.user img {
		margin-right: 12px;
	}
</style>
