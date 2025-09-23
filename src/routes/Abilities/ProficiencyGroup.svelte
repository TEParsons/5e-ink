<script>
    import { getContext } from "svelte";
    import { ListCtrl } from "$lib/ui/ctrls";
    import { getProficiencies } from "$lib/utils";

    let prefs = getContext("prefs");
    let stats = getContext("stats");

    let {
        tag
    } = $props();

    let proficiencies = $derived(getProficiencies(stats, tag))

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