<script>
    import { ChoiceCtrl, Option } from "$lib/ui/ctrls";
    import Choice from "$lib/ui/ctrls/Choice.svelte";
    import { getContext } from "svelte";

    let stats = getContext("stats");

    let species = {
        dragonborn: {
            name: "dragonborn",
            movement: {
                "walk": 30
            },
            size: "medium"
        },
        dwarf: {
            name: "dwarf",
            movement: {
                walk: 25
            },
            size: "medium"
        },
        elf: {
            name: "elf",
            movement: {
                walk: 30
            },
            size: "medium"
        },
        gnome: {
            name: "gnome",
            movement: {
                walk: 25
            },
            size: "small"
        },
        goliath: {
            name: "goliath",
            movement: {
                walk: 35
            },
            size: "medium"
        },
        halfling: {
            name: "halfling",
            movement: {
                walk: 30
            },
            size: "small"
        },
        orc: {
            name: "orc",
            movement: {
                walk: 30
            },
            size: "medium"
        },
        human: {
            name: "human",
            movement: {
                walk: 30
            },
            size: "medium",
        },
        tiefling: {
            name: "tiefling",
            movement: {
                walk: 30
            },
            size: "medium"
        }
    }

    let subtypes = {
        dragonborn: [
            "black",
            "blue",
            "brass",
            "bronze",
            "copper",
            "gold",
            "green",
            "red",
            "silver",
            "white"
        ],
        dwarf: [
            "hill",
            "mountain"
        ],
        elf: [
            "drow",
            "high",
            "wood"
        ],
        goliath: [
            "cloud",
            "fire",
            "frost",
            "hill",
            "stone",
            "storm"
        ],
        human: [
            "standard",
            "variant"
        ],
        tiefling: [
            "abyssal",
            "cthonic",
            "infernal"
        ]      
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