<script lang="ts">
    import { theme } from '$stores/theme';
    import LeftTabbed from '$components/tabbed/LeftTabbed.svelte';
    import Profile from './Profile.svelte';
    import Account from './Account.svelte';
    import DangerZone from './Danger.svelte';
    import { isLoggedIn } from '$stores/session';
    import { goto } from '$app/navigation';
	$effect(() => {
	  if (!$isLoggedIn) {
		goto('/');
	  }
	});

    const tabs = [
        { label: 'Profile', content: Profile },
        { label: 'Account', content: Account },
        { label: 'Danger Zone', content: DangerZone }
    ];
</script>

<svelte:head>
    <title>Settings - AmpMod</title>
</svelte:head>

<div class="settings-page">
    <h1 class="settings-title">Settings</h1>
    {#if $isLoggedIn}
        <LeftTabbed {tabs} />
    {/if}
</div>

<style>
    .settings-page {
        max-width: 900px;
        margin: 40px auto 0 auto;
        padding: 2rem;
        color: var(--text-color);
        border-radius: 12px;
        font-family: var(--font-stack);
    }

    .settings-title {
        font-size: 2rem;
        margin-bottom: 2rem;
        font-weight: bold;
    }
</style>