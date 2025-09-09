<script>
    import { ChoiceCtrl, Option } from "$lib/ui/ctrls";
    import Choice from "$lib/ui/ctrls/Choice.svelte";
    import { getContext } from "svelte";

    let stats = getContext("stats");

    let species = {
        human: {
            name: "human",
            movement: {
                walk: 30
            },
            size: "medium",
        },
        dwarf: {
            name: "dwarf",
            movement: {
                walk: 25
            },
            size: "small"
        }
    }
    let subtypes = {
        human: undefined,
        dwarf: ["hill"]
    }
</script>

<div class=species-ctrl>
<Choice
    label="Species"
    bind:value={stats.species.name}
    onselect={(evt, index, data) => {
        Object.assign(stats.species, data)
    }}
>
    {#each Object.entries(species) as [label, specie]}
        <Option
            index={label}
            data={specie}
        >
            {label[0].toUpperCase() + label.slice(1)}
        </Option>
    {/each}
</Choice>

{#if subtypes[stats.species.name]}
    <span>(</span>
    <Choice
        label="Species Subtype"
        bind:value={stats.species.subtype}
        onselect={(evt, index, data) => {
            stats.species.subtype = data
        }}
    >
        {#each subtypes[stats.species.name] as subtype}
            <Option
                index={subtype}
                data={subtype}
            >
                {subtype[0].toUpperCase() + subtype.slice(1)}
            </Option>
        {/each}
    </Choice>
    <span>)</span>
{/if}

</div>

<style>
    .species-ctrl {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
    }
</style>