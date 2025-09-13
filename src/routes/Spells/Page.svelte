<script>
    import { getContext } from "svelte";
    import { SlotsCtrl } from "$lib/ui/ctrls";
    import Spell from "./Spell.svelte"
    import SpellStatsCtrl from "./SpellStatsCtrl.svelte";

    let stats = getContext("stats");
    let prefs = getContext("prefs");
</script>

<div class=page>
    <SpellStatsCtrl />
    {#each ["cantrip"].concat(Object.keys(stats.casting.slots)) as level}
        <div class=level-header>
            <h2>
                {`${level[0].toUpperCase()}${level.slice(1)} level`}
            </h2>
            {#if level in stats.casting.slots}
                <SlotsCtrl 
                    bind:value={stats.casting.slots[level].current}
                    bind:total={stats.casting.slots[level].total}
                />
            {/if}
        </div>
        <div class=spell-list>
            {#each Object.entries(stats.casting.spells) as [i, spell]}
                {#if spell.level === level}
                    <Spell 
                        bind:spell={stats.casting.spells[i]} 
                    />
                {/if}
            {/each}
        </div>
    {/each}
</div>

<style>
    .page {
        margin: auto;
        max-width: 20cm;
        padding: 1rem;
    }
    .level-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .spell-list {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
</style>