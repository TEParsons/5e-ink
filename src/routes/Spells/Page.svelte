<script>
    import { getContext } from "svelte";
    import { SlotsCtrl } from "$lib/ui/ctrls";
    import { getTotalSlots, getAdvancements, sentenceCase } from "$lib/utils";
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
        {#each getAdvancements(stats) as advancement}
            {#each Object.keys(advancement.casting?.cantrips || []) as i}
                <Spell 
                    bind:spell={advancement.casting.cantrips[i]}
                />
            {/each}
        {/each}
    </div>

    {#each Object.keys(stats.current.slots) as level}
        {#if stats.current.slots[level] !== undefined}
            <div class=level-header>
                <h2>
                    {`${sentenceCase(level)} level`}
                </h2>
                <SlotsCtrl 
                    bind:value={stats.current.slots[level]}
                    total={getTotalSlots(stats, level)}
                />
            </div>
            <div class=spell-list>
                {#each getAdvancements(stats) as advancement}
                    {#each Object.entries(advancement.casting?.spells || []) as [i, spell]}
                        {#if spell.level === level}
                            <Spell 
                                bind:spell={advancement.casting.spells[i]}
                            />
                        {/if}
                    {/each}
                {/each}
            </div>
        {/if}
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