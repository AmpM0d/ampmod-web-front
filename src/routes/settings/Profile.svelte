<script lang="ts">
    import ToggleSwitch from '$components/toggle-switch/ToggleSwitch.svelte';
    import { slide } from 'svelte/transition';
    import { username } from '$stores/session.js';
    import { Pencil } from '@lucide/svelte';
    import Spinner from '$components/spinner/Spinner.svelte';

    let privateToggle = false;
    let followToggle = false;
    let avatarUrl = '/ugctest.png';
    let uploading = false;
    let fileInput: HTMLInputElement;

    function onAvatarClick() {
        if (uploading) return;
        fileInput?.click();
    }

    function fileChanged(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            const reader = new FileReader();
            uploading = true;

            reader.onload = (e) => {
                // Fake API delay
                setTimeout(() => {
                    avatarUrl = e.target?.result as string;
                    uploading = false;
                }, 2000);
            };

            reader.readAsDataURL(file);
        }
    }
</script>

<h3>Information</h3>
<div class="user-info-header">
    <div class="avatar-container" on:click={onAvatarClick}>
        <img src={avatarUrl} alt="User Icon" class="avatar" />
        {#if uploading}
            <div class="uploading-overlay"><Spinner colour="#fff" /></div>
        {:else}
            <div class="overlay">
                <Pencil />
            </div>
        {/if}
    </div>
    <h1>{$username}</h1>
</div>

<input
    type="file"
    accept="image/*"
    class="hidden-file"
    on:change={fileChanged}
    bind:this={fileInput}
/>

<h3>Visibility</h3>
<ToggleSwitch id="private-toggle" bind:checked={privateToggle}>
    Make my profile private
</ToggleSwitch>

{#if privateToggle}
    <div transition:slide>
        <br />
        <ToggleSwitch id="private-follows-toggle" bind:checked={followToggle}>
            Allow people I follow to see my profile
        </ToggleSwitch>
    </div>
{/if}

<style>
    .user-info-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .avatar-container {
        position: relative;
        width: 80px;
        height: 80px;
        cursor: pointer;
    }

    .avatar {
        width: 100%;
        height: 100%;
        object-fit: stretch;
        border-radius: 4px;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
    }

    .avatar-container:hover .overlay {
        opacity: 1;
    }

    .uploading-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hidden-file {
        display: none;
    }
</style>