<script>
    import { getContext } from "svelte";
    import { totalLevels, classLevels, traitsByTag, score2modifier, getScore, getAdvancements } from "$lib/utils.js";
    import { NumberCtrl, Button } from "$lib/ui/ctrls";
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
        // get total levels
        let lvl = totalLevels(stats.class)
        // start at con * lvl
        let hp = score2modifier(getScore(stats, "con")) * lvl
        // add from each advancement
        for (let source of getAdvancements(stats)) {
            // do any addition
            hp += source.buffs?.maxhealth?.add || 0
            // do any setting
            hp = Math.max(source.buffs?.maxhealth?.set || hp)
            // do any perlevel addition
            hp += (source.buffs?.maxhealth?.perlevel || 0) * lvl
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
            bind:temp={stats.current.hptemp}
            edit
        /> 
        <span>/ {total}</span>
    </div>
    <div class=health-bar>
        <div class=current-health
            style:right="{(stats.current.damage - (stats.current.hptemp || 0)) * 100 / total}%"
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
