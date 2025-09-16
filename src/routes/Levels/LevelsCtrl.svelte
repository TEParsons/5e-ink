<script>
    import { getContext } from "svelte";
    import LevelsDlg from "./LevelsDlg.svelte";

    let prefs = getContext("prefs");
    let stats = getContext("stats");

    let {
        edit=prefs.edit
    } = $props()

    let showDlg = $state.raw();
</script>

<div class=levels>
    {#each Object.keys(stats.class) as cls}
        <div class=level-ctrl>
            <span>Level {stats.class[cls].levels} {cls} </span>
            {#if stats.class[cls].subtype}
                <span>({stats.class[cls].subtype})</span>
            {/if}
        </div>
    {/each}
</div>

{#if edit}
    <button
        onclick={evt => showDlg = true}
    >Manage levels</button>
    <LevelsDlg 
        bind:shown={showDlg}
    />
{/if}

<style>
    .levels {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    button {
        background-color: var(--crust);
        color: var(--text-on-crust);
        border-radius: .5rem;
        padding: .5rem;
        line-height: 1rem;
    }
</style>