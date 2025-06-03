<script lang="ts">
    export let tabs: { label: string, content: any }[] = [];
    export let active = 0;
    $: setActive = (i: number) => active = i;
</script>

<div class="left-tabbed">
    <div class="tab-list">
        {#each tabs as tab, i}
            <button
                class="tab {active === i ? 'active' : ''}"
                on:click={() => setActive(i)}
                tabindex={active === i ? 0 : -1}
            >
                {tab.label}
            </button>
        {/each}
    </div>
    <div class="tab-content">
        {#if tabs[active]}
            {#if typeof tabs[active].content === 'string'}
                <div>{@html tabs[active].content}</div>
            {:else}
                <svelte:component this={tabs[active].content} />
            {/if}
        {/if}
    </div>
</div>

<style>
    .left-tabbed {
        display: flex;
        background: var(--footer-background);
        border-radius: 12px;
        border: 1px solid var(--border-color);
        font-family: var(--font-stack);
        min-height: 300px;
        overflow: hidden;
    }

    .tab-list {
        display: flex;
        flex-direction: column;
        background: var(--background-color);
        border-right: 1px solid var(--border-color);
        min-width: 180px;
        padding: 0.5em 0;
    }

    .tab {
        background: none;
        border: none;
        outline: none;
        text-align: left;
        padding: 1em 1.5em;
        font-size: 1.05em;
        color: var(--text-color);
        cursor: pointer;
        transition: background 0.15s, color 0.15s;
        border-left: 4px solid transparent;
        font-family: inherit;
    }

    .tab:hover, .tab:focus {
        background: rgba(89, 192, 89, 0.07);
        color: var(--accent-color);
    }

    .tab.active {
        background: var(--footer-background);
        color: var(--accent-color);
        border-left: 4px solid var(--accent-color);
        font-weight: bold;
    }

    .tab-content {
        flex: 1 1 0;
        padding: 2em;
        color: var(--text-color);
        background: var(--footer-background);
        min-width: 0;
        font-size: 1em;
    }

    @media (max-width: 700px) {
        .left-tabbed {
            flex-direction: column;
        }
        .tab-list {
            flex-direction: row;
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            min-width: 0;
        }
        .tab {
            border-left: none;
            border-bottom: 4px solid transparent;
            padding: 0.75em 1em;
        }
        .tab.active {
            border-bottom: 4px solid var(--accent-color);
            border-left: none;
        }
    }
</style>