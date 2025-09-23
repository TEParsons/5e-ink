<script>
    import { getContext } from "svelte";
    import { SlotsCtrl } from "$lib/ui/ctrls";
    import { getTotalSlots } from "$lib/utils";
    import Spell from "./Spell.svelte"
    import SpellStatsCtrl from "./SpellStatsCtrl.svelte";

    let stats = getContext("stats");
    let prefs = getContext("prefs");
</script>

<div class=page>
    <SpellStatsCtrl />

    <div class=level-header>
        <h2>Cantrips</h2>
    </div>
    <div class=spell-list>
        {#each Object.keys(stats.class) as cls}
            {#each Object.entries(stats.class[cls].levels) as [lvl, advancements]}
                {#each Object.entries(advancements.casting.cantrips || []) as [i, cantrip]}
                    <Spell 
                        bind:spell={stats.class[cls].levels[lvl].casting.cantrips[i]}
                    />
                {/each}
            {/each}
        {/each}
    </div>

    {#each Object.keys(stats.current.slots) as level}
        <div class=level-header>
            <h2>
                {`${level[0].toUpperCase()}${level.slice(1)} level`}
            </h2>
            <SlotsCtrl 
                bind:value={stats.current.slots[level]}
                total={getTotalSlots(stats, level)}
            />
        </div>
        <div class=spell-list>
            {#each Object.keys(stats.class) as cls}
                {#each Object.entries(stats.class[cls].levels) as [lvl, advancements]}
                    {#each Object.entries(advancements.casting.spells || []) as [i, spell]}
                        {#if spell.level === level}
                            <Spell 
                                bind:spell={stats.class[cls].levels[lvl].casting.spells[i]}
                            />
                        {/if}
                    {/each}
                {/each}
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