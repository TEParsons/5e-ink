<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency } from "$lib/utils";
    import Markdown from "$lib/ui/Markdown.svelte";

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

        // calculate modifier
        let modifier = score2modifier(
            weapon.params.range.range ? stats.scores.dex : stats.scores.str
        ) + Math.floor(
            level2proficiency(
                totalLevels(stats.class)
            ) * stats.proficiencies.weapons.includes(weapon.params.weapontype)
        )

        return (
            `***${weapon.name}.** `
            + `${weapon.params.attacktype[0].toUpperCase() + weapon.params.attacktype.slice(1)} weapon attack:* `
            + `${modifier >= 0 ? `+${modifier}` : `${modifier}`} to hit, ${range}. *Hit*: ${weapon.params.damage} damage.`
        )
    }
</script>

<h1>{weapon.name}</h1>
{#if weapon.weight}
    <i>{weapon.weight}lbs.</i>
{/if}

<Markdown 
    value={weaponDesc(weapon)}
/>

{#each String(weapon.description).split("\n") as line}
    <p>{line}</p>
{/each}