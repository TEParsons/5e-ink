<script>
    import { getContext } from "svelte";
    import { ListCtrl } from "$lib/ui/ctrls";

    let prefs = getContext("prefs");
    let stats = getContext("stats");

    let {
        tag
    } = $props();

    let proficiencies = $derived.by(() => {
        let output = [];

        // class
        for (let cls of Object.values(stats.class)) {
            if (cls.proficiencies[tag]) {
                output.push(...cls.proficiencies[tag])
            }
        }

        // species
        if (stats.species.proficiencies[tag]) {
            output.push(...stats.species.proficiencies[tag])
        }

        return output
    })

    let label = tag[0].toUpperCase() + tag.slice(1)
</script>

<div>
    {#if prefs.edit}
        {#each Object.keys(stats.class) as cls}
            <ListCtrl 
                label="{label} from class ({cls}):"
                bind:value={stats.class[cls].proficiencies[tag]}
            />
        {/each}
        <ListCtrl 
            label="{label} from species ({stats.species.name})"
            bind:value={stats.species.proficiencies[tag]}
        />
    {:else}
        <ListCtrl 
            value={proficiencies}
            label={label}
            edit={false}
        />
    {/if}
</div>