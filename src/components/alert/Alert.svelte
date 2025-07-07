<script lang="ts">
    let { id, background = "grey", foreground = "white", children, button = null, icon = null } = $props();
    import { XIcon, Icon } from '@lucide/svelte';
    import { slide } from 'svelte/transition';

    let hiddenAlerts: string[] = $state([]);
    if (typeof window !== 'undefined') {
        hiddenAlerts = JSON.parse(localStorage.getItem("amwf:hiddenAlerts") || "[]");
    }

    function removeAlert(id: any) {
        if (typeof window !== 'undefined') {
            const hiddenAlerts = JSON.parse(localStorage.getItem("amwf:hiddenAlerts") || "[]");
            if (!hiddenAlerts.includes(id)) {
                hiddenAlerts.push(id);
                localStorage.setItem("amwf:hiddenAlerts", JSON.stringify(hiddenAlerts));
            }
        }
        hiddenAlerts = [...hiddenAlerts, id];
    }
</script>

<style>
    .alert {
        padding: 8px;
        background: var(--alert-bg-param);
        color: var(--alert-fg-param);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: var(--font-stack);
    }

    .alert .text-container {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        vertical-align: center;
        flex-grow: 1;
        min-height: 40px; /* Ensures consistent height */
    }

    .alert .icon-container {
        margin-right: 10px;
        display: flex;
        align-items: center;
    }

    .alert .close-button {
        background: none;
        border: none;
        color: var(--alert-fg-param);
        font-size: 16px;
        cursor: pointer;
        padding: 0 10px;
        margin-left: auto;
    }

    .alert .button {
        border-radius: 9999px;
        background: var(--alert-fg-param);
        color: var(--alert-bg-param);
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        margin-left: 8px;
        text-decoration: none;
    }
</style>

{#if typeof window !== 'undefined' && !hiddenAlerts.includes(id)}
    <div
        class="alert"
        style="--alert-bg-param: {background}; --alert-fg-param: {foreground};"
        out:slide={{ duration: 400 }}
    >
        <div class="text-container">
            {#if icon}
                <div class="icon-container">
                    <Icon iconNode={icon} />
                </div>
            {/if}
            {@render children()}
            {#if button}
                <a href={button.uri} class="button">
                    {button.text}
                </a>
            {/if}
        </div>
        <button class="close-button" onclick={() => removeAlert(id)}>
            <XIcon />
        </button>
    </div>
{/if}
