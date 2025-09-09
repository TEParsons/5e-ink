<script>
    import { getContext } from "svelte";
    import { SlotsCtrl } from "$lib/ui/ctrls";
    import Spell from "./Spell.svelte"

    let stats = getContext("stats")
</script>

<div class=page>
    {#each Object.keys(stats.spells) as level}
        <div class=level-header>
            <h2>
                {level === "cantrips" ? "Cantrips" : `${level[0].toUpperCase()}${level.slice(1)} level`}
            </h2>
            {#if "slots" in stats.spells[level]}
                <SlotsCtrl 
                    bind:value={stats.spells[level].slots.current}
                    total={stats.spells[level].slots.total}
                />
            {/if}
        </div>
        <div class=spell-list>
            {#each stats.spells[level].spells as spell}
                <Spell spell={spell} level={level}/>
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