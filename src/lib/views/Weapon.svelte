<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency, getProficiencies } from "$lib/utils";
    import { MarkdownCtrl } from "$lib/ui/ctrls";

    let {
        weapon
    } = $props();

    let stats = getContext("stats");

    function weaponDesc(weapon) {
        // construct range string
        let range
        if (weapon.params.attacktype === "ranged") {
            range = `range ${weapon.params.range.range}ft./${weapon.params.range.maxrange}ft.`
        } else {
            range = `reach ${weapon.params.range.reach}ft.`
            if (weapon.params.range.thrown) {
                range += ` (throw range ${weapon.params.range.thrown})`
            }
        }
        // figure out what stat to use
        let stat = stats.scores.str
        if (["ranged", "finesse"].includes(weapon.params.attacktype)) {
            stat = stats.scores.dex
        }
        // calculate modifier
        let modifier = score2modifier(stat) + Math.floor(
            level2proficiency(
                totalLevels(stats.class)
            ) * getProficiencies(stats, "weapons").includes(weapon.params.weapontype)
        )

        return (
            `***${weapon.name}.** `
            + `${weapon.params.attacktype[0].toUpperCase() + weapon.params.attacktype.slice(1)} weapon attack:* `
            + `${modifier >= 0 ? `+${modifier}` : `${modifier}`} to hit, ${range}. *Hit*: ${weapon.params.damage} damage.`
        )
    }
</script>
<div class=weapon-view>
<h1>{weapon.name}</h1>
    {#if weapon.weight}
        <i>{weapon.weight}lbs.</i>
    {/if}

    <MarkdownCtrl 
        value={weaponDesc(weapon)}
        edit={false}
    />

    <MarkdownCtrl 
        bind:value={weapon.description}
    />
</div>