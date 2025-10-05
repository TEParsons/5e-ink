<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency, getProficiencies, getScore, sentenceCase } from "$lib/utils";
    import { MarkdownCtrl, SlotsCtrl, ChoiceCtrl, Option, NumberCtrl, Break } from "$lib/ui/ctrls";
    import WeaponSchema from "$lib/schemas/items/weapon.schema.json";
    import { recursiveDefaults } from "$lib/schemas";

    let stats = getContext("stats");
    let prefs = getContext("prefs");

    let {
        item=$bindable(),
        edit=$bindable()
    } = $props();

    // limit ranged options according to attack type
    $effect(evt => {
        // is attack ranged?
        let ranged = item.params.attacktype === "ranged"
        // get defaults
        let schema = WeaponSchema.properties.distance.properties
        // set values (and defaults) according to ranged
        item.params.distance.reach = ranged ? undefined : item.params.distance.reach || schema.reach.default
        item.params.distance.range = ranged ? item.params.distance.range || schema.range.default : undefined
        item.params.distance.maxrange = ranged ? item.params.distance.maxrange || schema.maxrange.default : undefined
    })

    // proficiency bonus derived from total levels and weapon type proficiency
    let proficiency = $derived(
        Math.floor(
            level2proficiency(
                totalLevels(stats.class)
            ) * getProficiencies(stats, "weapons").includes(item.params.weapontype)
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
                }[item.params.attacktype]
            ) 
        )
    )

    function weaponDesc(weapon) {
        // construct range string
        let range
        if (item.params.distance.range) {
            // get range
            range = `range ${item.params.distance.range}ft.`
            // add maxrange, if given
            if (item.params.distance.maxrange) {
                range += `/${item.params.distance.maxrange}ft.`
            }
        } else {
            // get reach
            range = `reach ${item.params.distance.reach}ft.`
            // get thrown, if given
            if (item.params.distance.thrown) {
                // get range
                range += ` (${item.params.distance.thrown.range}ft.`
                // add maxrange, if given
                if (item.params.distance.thrown.maxrange) {
                    range += `/${item.params.distance.thrown.maxrange}ft.`
                }
                range += ` thrown)`
            }
        }
        // calculate damage
        let dice = []
        for (let [die, num] of Object.entries(item.params.damage.dice)) {
            dice.push(`${num}${die}`)
        }
        let damage = dice.join(" + ")
        if (modifier > 0) {
            damage += `+${modifier}`
        } else if (modifier < 0) {
            damage += `${modifier}`
        }

        return (
            `***${item.name}.** `
            + `${sentenceCase(item.params.attacktype)} weapon attack:* `
            + `${modifier + proficiency >= 0 ? `+${modifier + proficiency}` : `${modifier + proficiency}`} to hit, `
            + `${range}. `
            + `*Hit*: ${damage} ${item.params.damage.type} damage.`
        )
    }
</script>

<h3>Attack</h3>
<p>
    <i><b>{item.name}.</b> 
    <Break shown={edit} />
    <ChoiceCtrl
        label="Attack type"
        bind:value={item.params.attacktype}
        edit={edit}
    >
        {#each WeaponSchema.properties.attacktype.enum as opt}
            <Option
                data={opt}
                index={opt}
            >{sentenceCase(opt)}</Option>
        {/each}
    </ChoiceCtrl>
    {#if edit}
        <ChoiceCtrl
            label="Weapon type"
            bind:value={item.params.weapontype}
            edit={edit}
        >
            {#each WeaponSchema.properties.weapontype.enum as opt}
                <Option
                    data={opt}
                    index={opt}
                >{opt}</Option>
            {/each}
        </ChoiceCtrl>
    {/if}
    weapon attack:</i>
    <Break shown={edit} />
    {#if modifier + proficiency >= 0}
        +{modifier + proficiency}
    {:else}
        -{modifier + proficiency}
    {/if}
    to hit, 
    {#if item.params.attacktype === "ranged"}
        range
        <NumberCtrl 
            label="Range"
            bind:value={item.params.distance.range}
            edit={edit}
        />
        ft. / 
        <NumberCtrl 
            label="Max range"
            bind:value={item.params.distance.maxrange}
            edit={edit}
        />
        ft.
    {:else}
        reach 
        <NumberCtrl 
            label="Reach"
            bind:value={item.params.distance.reach}
            edit={edit}
        />
        ft. 
        {#if edit}
            <input 
                type=checkbox
                bind:checked={
                    () => item.params.distance.thrown,
                    (value) => item.params.distance.thrown = value ? item.params.distance.thrown || recursiveDefaults(WeaponSchema.properties.distance.properties.thrown) : undefined
                }
            />
        {/if}
        {#if item.params.distance.thrown}
            (
            <NumberCtrl 
                label="Thrown range"
                bind:value={item.params.distance.thrown.range}
                edit={edit}
            />
            ft. / 
            <NumberCtrl 
                label="Max thrown range"
                bind:value={item.params.distance.thrown.maxrange}
                edit={edit}
            />
            ft. thrown)
        {/if}
    {/if}
    . 
    <Break shown={edit} />
    <i>Hit:</i> 
    <Break shown={edit} />
    {#each Object.keys(WeaponSchema.properties.damage.properties.dice.properties) as die}
        {#if item.params.damage.dice[die] || edit}
            <NumberCtrl 
                label={die}
                bind:value={item.params.damage.dice[die]}
                edit={edit}
            />{die}
        {/if}
    {/each}
    <Break shown={edit} />
    {#if modifier > 0}
        +{modifier}
    {:else if modifier < 0}
        {modifier}
    {/if}
    <ChoiceCtrl
        label="Damage type"
        bind:value={item.params.damage.type}
        edit={edit}
    >
        {#each WeaponSchema.properties.damage.properties.type.enum as opt}
            <Option
                data={opt}
                index={opt}
            >{opt}</Option>
        {/each}
    </ChoiceCtrl>
    damage.
</p>
{#if edit}
    <p>
        <input 
            type=checkbox
            bind:checked={
                () => item.params.ammunition,
                (value) => item.params.ammunition = value ? item.params.ammunition || recursiveDefaults(WeaponSchema.properties.ammunition) : undefined
            }
        /> Ammunition?
    </p>
{/if}
{#if item.params.ammunition}
    <h4>Ammunition</h4>
    <SlotsCtrl 
        bind:value={item.params.ammunition.current}
        bind:total={item.params.ammunition.total}
        edit={edit}
    />
{/if}

<style>
    h3, h4 {
        margin-top: .5em;
        margin-bottom: 0;
    }
    p {
        margin-top: 0;
        margin-bottom: .5em;
    }
</style>
