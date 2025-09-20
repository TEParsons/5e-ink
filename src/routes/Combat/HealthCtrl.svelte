<script>
    import { getContext } from "svelte";
    import { totalLevels, classLevels, traitsByTag, score2modifier } from "$lib/utils.js";
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
        let hp = Object.values(stats.class)[0].hitdice.die + score2modifier(stats.scores.con)
        // add hp rolls
        for (let cls of Object.keys(stats.class)) {
            for (let lvl of Array(stats.class[cls].levels).keys()) {
                if (lvl in stats.class[cls].hitdice.rolls.keys()) {
                    // if roll is recorded, use it
                    hp += stats.class[cls].hitdice.rolls[lvl] + score2modifier(stats.scores.con)
                } else {
                    // use the average
                    hp += Math.floor(stats.class[cls].hitdice.die / 2) + score2modifier(stats.scores.con)
                }
            }
        }
        // apply traits which affect maxhealth
        for (let traits of Object.values(traitsByTag(stats, "buff"))) {
            for (let trait of traits) {
                if (trait.effect?.maxhp) {
                    // add flat change
                    hp += trait.effect.maxhp.flat || 0
                    // add per level change
                    hp += (trait.effect.maxhp.perlevel * totalLevels(stats.class) - 1) || 0
                }
            }
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