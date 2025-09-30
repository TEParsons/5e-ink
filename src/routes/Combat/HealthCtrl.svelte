<script>
    import { getContext } from "svelte";
    import { totalLevels, classLevels, traitsByTag, score2modifier, getScore } from "$lib/utils.js";
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
        // start at 0
        let hp = 0
        // add hp rolls
        for (let cls of Object.keys(stats.class)) {
            for (let lvl of Object.values(stats.class[cls].levels)) {
                if (lvl.hitdie !== undefined) {
                    // if roll is recorded, use it
                    hp += lvl.hitdie + score2modifier(getScore(stats, "con"))
                } else {
                    // if no roll for this level, use the average
                    hp += Math.floor(stats.class[cls].hitdie / 2) + score2modifier(getScore(stats, "con"))
                }
            }
        }
        // apply traits which affect maxhealth
        for (let trait of traitsByTag(stats, "buff")) {
            if (trait.effect?.maxhp) {
                // add flat change
                hp += trait.effect.maxhp.flat || 0
                // add per level change
                hp += (trait.effect.maxhp.perlevel * totalLevels(stats.class) - 1) || 0
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
            bind:value={
                () => total - stats.current.damage,
                (value) => stats.current.damage = total - value
            }
            edit
        /> 
        <span>/ {total}</span>
    </div>
    <div class=health-bar>
        <div class=current-health
            style:right="{stats.current.damage * 100 / total}%"
        ></div>
    </div>
    {#if stats.current.damage > total}
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
