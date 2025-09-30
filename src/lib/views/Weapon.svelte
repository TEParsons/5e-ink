<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency, getProficiencies, getScore, sentenceCase } from "$lib/utils";
    import { MarkdownCtrl, SlotsCtrl } from "$lib/ui/ctrls";
    import ItemView from "./Item.svelte"

    let {
        weapon
    } = $props();

    let stats = getContext("stats");

    function weaponDesc(weapon) {
        // construct range string
        let range
        if (weapon.params.distance.range) {
            // get range
            range = `range ${weapon.params.distance.range}ft.`
            // add maxrange, if given
            if (weapon.params.distance.maxrange) {
                range += `/${weapon.params.distance.maxrange}ft.`
            }
        } else {
            // get reach
            range = `reach ${weapon.params.distance.reach}ft.`
            // get thrown, if given
            if (weapon.params.distance.thrown) {
                // get range
                range += ` (${weapon.params.distance.thrown.range}ft.`
                // add maxrange, if given
                if (weapon.params.distance.thrown.maxrange) {
                    range += `/${weapon.params.distance.thrown.maxrange}ft.`
                }
                range += ` thrown)`
            }
        }
        // figure out what stat to use
        let stat = getScore(stats, {
            melee: "str",
            ranged: "dex",
            finesse: "dex"
        }[weapon.params.attacktype])
        // calculate modifier
        let modifier = score2modifier(stat) + Math.floor(
            level2proficiency(
                totalLevels(stats.class)
            ) * getProficiencies(stats, "weapons").includes(weapon.params.weapontype)
        )
        // calculate damage
        let dice = []
        for (let [die, num] of Object.entries(weapon.params.damage.dice)) {
            dice.push(`${num}${die}`)
        }
        let damage = dice.join(" + ")
        if (score2modifier(stat) > 0) {
            damage += `+${score2modifier(stat)}`
        } else if (score2modifier(stat) < 0) {
            damage += `${score2modifier(stat)}`
        }

        return (
            `***${weapon.name}.** `
            + `${sentenceCase(weapon.params.attacktype)} weapon attack:* `
            + `${modifier >= 0 ? `+${modifier}` : `${modifier}`} to hit, ${range}. *Hit*: ${damage} ${weapon.params.damage.type} damage.`
        )
    }
</script>

<div class=weapon-view>
    <ItemView 
        bind:item={weapon}
    />
    <h3>Attack</h3>
    <MarkdownCtrl 
        value={weaponDesc(weapon)}
        edit={false}
    />
    {#if weapon.params.ammunition}
        <h4>Ammunition</h4>
        <SlotsCtrl 
            bind:value={weapon.params.ammunition.current}
            bind:total={weapon.params.ammunition.total}
        />
    {/if}
</div>