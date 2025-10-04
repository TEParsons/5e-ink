<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency, getProficiencies, getScore, sentenceCase } from "$lib/utils";
    import { MarkdownCtrl, SlotsCtrl, ChoiceCtrl, Option, NumberCtrl } from "$lib/ui/ctrls";
    import ItemView from "./Item.svelte";
    import WeaponSchema from "$lib/schemas/items/weapon.schema.json";
    import { recursiveDefaults } from "$lib/schemas";

    let stats = getContext("stats");
    let prefs = getContext("prefs");

    let {
        weapon,
        edit=$bindable()
    } = $props();

    // limit ranged options according to attack type
    $effect(evt => {
        // is attack ranged?
        let ranged = weapon.params.attacktype === "ranged"
        // get defaults
        let schema = WeaponSchema.properties.distance.properties
        // set values (and defaults) according to ranged
        weapon.params.distance.reach = ranged ? undefined : weapon.params.distance.reach || schema.reach.default
        weapon.params.distance.range = ranged ? weapon.params.distance.range || schema.range.default : undefined
        weapon.params.distance.maxrange = ranged ? weapon.params.distance.maxrange || schema.maxrange.default : undefined
    })

    // proficiency bonus derived from total levels and weapon type proficiency
    let proficiency = $derived(
        Math.floor(
            level2proficiency(
                totalLevels(stats.class)
            ) * getProficiencies(stats, "weapons").includes(weapon.params.weapontype)
        )
    )
    // modifier to damage (add proficiency for modifier to hit)
    let modifier = $derived(
        score2modifier(
            getScore(
                stats, 
                {
                    melee: "str",
                    ranged: "dex",
                    finesse: "dex"
                }[weapon.params.attacktype]
            ) 
        )
    )

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
        // calculate damage
        let dice = []
        for (let [die, num] of Object.entries(weapon.params.damage.dice)) {
            dice.push(`${num}${die}`)
        }
        let damage = dice.join(" + ")
        if (modifier > 0) {
            damage += `+${modifier}`
        } else if (modifier < 0) {
            damage += `${modifier}`
        }

        return (
            `***${weapon.name}.** `
            + `${sentenceCase(weapon.params.attacktype)} weapon attack:* `
            + `${modifier + proficiency >= 0 ? `+${modifier + proficiency}` : `${modifier + proficiency}`} to hit, `
            + `${range}. `
            + `*Hit*: ${damage} ${weapon.params.damage.type} damage.`
        )
    }
</script>

<div class=weapon-view>
    <ItemView 
        bind:item={weapon}
        bind:edit={edit}
    />
    
    
</div>