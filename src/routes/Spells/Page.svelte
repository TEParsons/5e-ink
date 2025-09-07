<script>
    import { getContext } from "svelte";
    import SlotsCtrl from "./SlotsCtrl.svelte"
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
                    level={level} 
                    bind:value={stats.spells[level].slots.current}
                />
            {/if}
        </div>
        <div class=spell-list>
            {#each stats.spells[level].spells as spell}
                <Spell spell={spell} />
            {/each}
        </div>
    {/each}
</div>

<style>
    .page {
        padding: 1rem;
    }
    .level-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-top: 1rem;
    }
    .level-header h2 {
        margin: 0;
    }

    .spell-list {
        display: flex;
        flex-direction: column;
        padding: 1rem 0;
    }
</style>