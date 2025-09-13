<script>
    import { getContext } from "svelte";
    import { ListCtrl } from "$lib/ui/ctrls";
    import { prefersReducedMotion } from "svelte/motion";

    let stats = getContext("stats")
    let prefs = getContext("prefs")

    let languages = $derived.by(() => {
        let output = [];

        // class languages
        for (let cls of Object.values(stats.class)) {
            output.push(...cls.proficiencies.languages)
        }

        // species languages
        output.push(...stats.species.proficiencies.languages)

        return output
    })

    let tools = $derived.by(() => {
        let output = [];

        // class languages
        for (let cls of Object.values(stats.class)) {
            output.push(...cls.proficiencies.tools)
        }

        // species languages
        output.push(...stats.species.proficiencies.tools)

        return output
    })
</script>

<div class=proficiencies>
    <h3>Proficiencies</h3>
    <div>
        {#if prefs.edit}
            {#each Object.keys(stats.class) as cls}
                <ListCtrl 
                    label="Languages from class ({cls}):"
                    bind:value={stats.class[cls].proficiencies.languages}
                />
            {/each}
            <ListCtrl 
                label="Languages from species ({stats.species.name})"
                bind:value={stats.species.proficiencies.languages}
            />
        {:else}
            <ListCtrl 
                value={languages}
                label="Languages"
                edit={false}
            />
        {/if}
    </div>
    <div>
        {#if prefs.edit}
            {#each Object.keys(stats.class) as cls}
                <ListCtrl 
                    label="Tools from class ({cls})"
                    bind:value={stats.class[cls].proficiencies.tools}
                />
            {/each}
            <ListCtrl 
                label="Tools from species ({stats.species.name}):"
                bind:value={stats.species.proficiencies.tools}
            />
        {:else}
            <ListCtrl 
                label="Tools"
                value={tools}
                edit={false}
            />
        {/if}
    </div>
</div>

<style>
    .proficiencies {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
</style>