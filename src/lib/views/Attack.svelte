<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency, getProficiencies, getScore, sentenceCase } from "$lib/utils";
    import { TextCtrl, EditToggle, MarkdownCtrl, SlotsCtrl, ChoiceCtrl, Option, NumberCtrl, Break } from "$lib/ui/ctrls";
    import AttackSchema from "$lib/schemas/attack.schema.json";
    import { recursiveDefaults } from "$lib/schemas";

    let stats = getContext("stats");
    let prefs = getContext("prefs");

    let {
        attack=$bindable(),
        edit=prefs.edit
    } = $props();

    // proficiency bonus derived from total levels and weapon type proficiency
    let proficiency = $derived(
        Math.floor(
            level2proficiency(
                totalLevels(stats.class)
            ) * getProficiencies(stats, "weapons").includes(attack.weapontype)
        )
    )
    // modifier to damage (add proficiency for modifier to hit)
    let modifier = $derived(
        score2modifier(
            getScore(stats, attack.attackstat) 
        )
    )
</script>

{#if attack.description || edit}
    <MarkdownCtrl
        bind:value={attack.description}
        edit={edit}
    />
{/if}

<p>
    <i>
        <b>
            <TextCtrl 
                bind:value={attack.name}
                edit={edit}
            />.
        </b> 
        <Break shown={edit} />
        {attack.distance.range ? "Ranged" : "Melee"} 
        {#if edit}
            <ChoiceCtrl
                label="Weapon type"
                bind:value={attack.weapontype}
                edit={edit}
            >
                {#each AttackSchema.properties.weapontype.enum as opt}
                    <Option
                        data={opt}
                        index={opt}
                    >{opt}</Option>
                {/each}
            </ChoiceCtrl>
        {/if}
        weapon attack:
    </i>
    <Break shown={edit} />
    {#if modifier + proficiency >= 0}
        +{modifier + proficiency}
    {:else}
        -{modifier + proficiency}
    {/if}
    to hit, 
    {#if attack.distance.range || edit}
        <Break shown={edit} />
        range
        <NumberCtrl 
            label="Range"
            bind:value={attack.distance.range}
            edit={edit}
        />
        ft. / 
        <NumberCtrl 
            label="Max range"
            bind:value={attack.distance.maxrange}
            edit={edit}
        />
        ft.
    {/if}
    {#if !attack.distance.range || edit}
        <Break shown={edit} />
        reach 
        <NumberCtrl 
            label="Reach"
            bind:value={attack.distance.reach}
            edit={edit}
        />
        ft. 
        {#if edit}
            <input 
                type=checkbox
                bind:checked={
                    () => attack.distance.thrown,
                    (value) => attack.distance.thrown = value ? attack.distance.thrown || recursiveDefaults(AttackSchema.properties.distance.properties.thrown) : undefined
                }
            />
        {/if}
        {#if attack.distance.thrown}
            (
            <NumberCtrl 
                label="Thrown range"
                bind:value={attack.distance.thrown.range}
                edit={edit}
            />
            ft. / 
            <NumberCtrl 
                label="Max thrown range"
                bind:value={attack.distance.thrown.maxrange}
                edit={edit}
            />
            ft. thrown)
        {/if}
    {/if}
    . 
    <Break shown={edit} />
    <i>Hit:</i> 
    <Break shown={edit} />
    {#each Object.keys(AttackSchema.properties.damage.properties.dice.properties) as die}
        {#if attack.damage.dice[die] || edit}
            <NumberCtrl 
                label={die}
                bind:value={attack.damage.dice[die]}
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
        bind:value={attack.damage.type}
        edit={edit}
    >
        {#each AttackSchema.properties.damage.properties.type.enum as opt}
            <Option
                data={opt}
                index={opt}
            >{opt}</Option>
        {/each}
    </ChoiceCtrl>
    damage.
</p>

<style>
    p {
        margin-top: 0;
        margin-bottom: .5em;
    }
</style>
