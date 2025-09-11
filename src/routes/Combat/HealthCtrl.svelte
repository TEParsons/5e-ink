<script>
    import { getContext } from "svelte";
    import { totalLevels, classLevels } from "$lib/utils.js";
    import { NumberCtrl } from "$lib/ui/ctrls";
    import DeathSavesCtrl from "./DeathSavesCtrl.svelte";

    let stats = getContext("stats")

    let hitdice = {
        sorcerer: 6,
        wizard: 6,
        artificer: 8, 
        bard: 8, 
        cleric: 8, 
        druid: 8, 
        monk: 8, 
        rogue: 8, 
        warlock: 8,
        fighter: 10, 
        paladin: 10, 
        ranger: 10,
        barbarian: 12
    }

    let total = $derived.by(() => {
        // calculate starting hp
        let hp = hitdice[classLevels(stats.levels)[0]] + stats.scores.con
        // add hp rolls
        for (let [i, cls] of classLevels(stats.levels).slice(1).entries()) {
            if (i in stats.health.total.rolls.keys()) {
                // if roll is recorded, use it
                hp += stats.health.total.rolls[i]
            } else {
                // otherwise use average
                hp += Math.floor(hitdice[cls] / 2)
            }
        }
        // add 1hp per level if hill dwarf
        if (stats.species.name === "dwarf" && stats.species.subtype === "hill") {
            hp += totalLevels(stats.levels)
        }
        // add 2hp per level if tough feat
        if (stats.health.total.modifiers.tough) {
            hp += totalLevels(stats.levels) * 2
        }

        return hp
    })

    let deathSaves = $state(4)
</script>

<div class=health-ctrl>
    <div class=health-label>
        <h3 style:flex-grow=1>Health</h3>
        <NumberCtrl 
            label="Health"
            bind:value={stats.health.current}
            edit
        /> 
        <span>/ {total}</span>
    </div>
    <div class=health-bar>
        <div class=current-health
            style:right="{(total - stats.health.current) * 100 / total}%"
        ></div>
    </div>
    {#if stats.health.current <= 0}
        <DeathSavesCtrl />
    {/if}
</div>

<style>
    .health-ctrl {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: .25rem;
        margin: 1rem 0;
    }
    .health-label {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5rem;
    }
    .health-bar {
        position: relative;
        width: 100%;
        border: 1px solid var(--crust);
        box-sizing: border-box;
        height: 1rem;
    }
    .current-health {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: var(--crust);
    }
</style>