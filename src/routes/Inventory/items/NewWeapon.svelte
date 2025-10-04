<script>
    import { onMount } from "svelte";
    import ItemSchema from "$lib/schemas/item.schema.json";
    import WeaponSchema from "$lib/schemas/items/weapon.schema.json";
    import { recursiveDefaults } from "$lib/schemas";
    import Dialog from "$lib/ui/Dialog.svelte";
    import { ChoiceCtrl, Option, NumberCtrl } from "$lib/ui/ctrls"
    import { getScore, score2modifier, getProficiencies } from "$lib/utils.js";
    import { getContext } from "svelte";

    let {
        shown=$bindable()
    } = $props();

    let defaults = Object.assign(
        recursiveDefaults(ItemSchema), {
            type: "weapon",
            params: recursiveDefaults(WeaponSchema)
        }
    )
    defaults.params.distance.thrown = undefined
    defaults.params.ammunition = undefined

    let profile = $state(defaults)
    let stats = getContext("stats");

    let modifier = $derived(
        score2modifier(getScore(stats, {
            melee: "str",
            ranged: "dex",
            finesse: "dex"
        }[profile.params.attacktype])) 
        + getProficiencies(stats, "weapons").includes(profile.params.weapontype)
    )

    $effect(evt => {
        if (profile.params.attacktype === "ranged") {
            profile.params.distance.reach = undefined
            profile.params.distance.range |= 20
            profile.params.distance.maxrange |= 20
            profile.params.distance.thrown = undefined
        }
        if (profile.params.attacktype === "melee" || profile.params.attacktype === "finesse") {
            profile.params.distance.reach |= 5
            profile.params.distance.range = undefined
            profile.params.distance.maxrange = undefined
        }
    })
</script>

<Dialog
    buttons={{
        OK: evt => stats.inventory.items.push($state.snapshot(profile)),
        CANCEL: evt => {}
    }}
    onopen={evt => Object.assign(profile, defaults)}
    bind:shown={shown}
>
    <div class=new-weapon>
        <h2>Add weapon</h2>
        <h4 class=label>Weapon type</h4>
        <ChoiceCtrl
            label="Weapon type"
            bind:value={profile.params.weapontype}
            edit
        >
            {#each WeaponSchema.properties.weapontype.enum as opt}
                <Option
                    data={opt}
                    index={opt}
                >{opt}</Option>
            {/each}
        </ChoiceCtrl>
        
        <h4 class=label>Attack type</h4>
        <ChoiceCtrl
            label="Attack type"
            bind:value={profile.params.attacktype}
            edit
        >
            {#each WeaponSchema.properties.attacktype.enum as opt}
                <Option
                    data={opt}
                    index={opt}
                >{opt}</Option>
            {/each}
        </ChoiceCtrl>

        <h4 class=label>Distance</h4>
        {#if profile.params.attacktype === "melee" || profile.params.attacktype === "finesse"}
            <div class=ctrl>
                Reach
                <NumberCtrl 
                    label="Reach"
                    bind:value={profile.params.distance.reach}
                    edit
                />ft.
            </div>
            <div class=ctrl>
                <input 
                    type=checkbox 
                    onchange={evt => {
                        if (evt.target.checked) {
                            profile.params.distance.thrown = recursiveDefaults(WeaponSchema.properties.distance.properties.thrown)
                        } else {
                            profile.params.distance.thrown = undefined
                        }
                    }}
                />
                Throwable?
            </div>
            {#if profile.params.distance.thrown}
                <div class=ctrl>
                    Thrown range
                    <NumberCtrl 
                        label="Range"
                        bind:value={profile.params.distance.thrown.range}
                        edit
                    />ft.
                    /
                    <NumberCtrl 
                        label="Max range"
                        bind:value={profile.params.distance.thrown.maxrange}
                        edit
                    />ft.
                </div>
            {/if}
        {/if}
        {#if profile.params.attacktype === "ranged"}
            <div class=ctrl>
                Range
                <NumberCtrl 
                    label="Range"
                    bind:value={profile.params.distance.range}
                    edit
                />ft.
                /
                <NumberCtrl 
                    label="Max range"
                    bind:value={profile.params.distance.maxrange}
                    edit
                />ft.
            </div>
        {/if}

        <h4 class=label>Damage</h4>
        {#each Object.keys(WeaponSchema.properties.damage.properties) as die}
            {#if die !== "type"}
                <div class=ctrl>
                    <NumberCtrl 
                        label={die}
                        bind:value={profile.params.damage[die]}
                        edit
                    />{die}
                </div>
            {/if}
        {/each}
        <div class=ctrl>
            + {modifier}
        </div>
        <div class=ctrl>
                <ChoiceCtrl
                    label="Damage type"
                    bind:value={profile.params.damage.type}
                    edit
                >
                    {#each WeaponSchema.properties.damage.properties.type.enum as opt}
                        <Option
                            data={opt}
                            index={opt}
                        >{opt}</Option>
                    {/each}
                </ChoiceCtrl>
                damage
            </div>

        <h4 class=label>Ammunition</h4>
        <div class=ctrl>
            <input 
                type=checkbox 
                onchange={evt => {
                    if (evt.target.checked) {
                        profile.params.ammunition = recursiveDefaults(WeaponSchema.properties.ammunition)
                    } else {
                        profile.params.ammunition = undefined
                    }
                }}
            />
            Requires ammunition?
        </div>
        {#if profile.params.ammunition}
            <div class=ctrl>
                Total
                <NumberCtrl 
                    label="Total ammunition"
                    bind:value={profile.params.ammunition.total}
                    edit
                />
            </div>
            <div class=ctrl>
                Current
                <NumberCtrl 
                    label="Current ammunition"
                    bind:value={profile.params.ammunition.current}
                    edit
                />
            </div>
        {/if}
    </div>
</Dialog>

<style>
    .new-weapon {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        align-items: start;
    }

    .label {
        margin-bottom: -.25rem;
        margin-top: 0;
    }

    .ctrl {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        align-items: center;
    }
</style>