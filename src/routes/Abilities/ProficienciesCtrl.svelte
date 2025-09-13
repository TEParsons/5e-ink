<script>
    import { getContext } from "svelte";
    import { ListCtrl } from "$lib/ui/ctrls";

    let stats = getContext("stats")

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
        <b>Languages:</b>
        <ListCtrl 
            value={languages}
            edit={false}
        />
    </div>
    <div>
        <b>Tools:</b>
        <ListCtrl 
            value={tools}
            edit={false}
        />
    </div>
</div>

<style>
    .proficiencies {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
</style>