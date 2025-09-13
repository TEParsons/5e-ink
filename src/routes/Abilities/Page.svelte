<script>
    import { getContext } from "svelte";
    
    import AbilityScore from "./AbilityScore.svelte";
    import SkillScore from "./SkillScore.svelte";
    import { TraitsView } from "$lib/views";
    import ProficiencyGroup from "./ProficiencyGroup.svelte";

    let stats = getContext("stats")
</script>

<div class=page>
    <div id=ability-scores>
        {#each Object.keys(stats.scores) as key}
            <AbilityScore
                id={key}
            />
        {/each}
    </div>

    <div id=skill-scores>
        {#each Object.keys(stats.skills) as key}
            <SkillScore
                id={key}
            />
        {/each}
    </div>

    <TraitsView
        tag="narrative"
    />

    <div class=proficiencies>
        <h3>Proficiencies</h3>
        <ProficiencyGroup 
            tag="languages"
        />
        <ProficiencyGroup 
            tag="tools"
        />
        <ProficiencyGroup 
            tag="weapons"
        />
        <ProficiencyGroup 
            tag="armour"
        />
    </div>
    
</div>

<style>
    .page {
        display: grid;
        gap: 1rem;
        margin: auto;
        max-width: 20cm;
        padding: 1rem;
    }
    #ability-scores {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: stretch;
        gap: 1rem;
    }
    #skill-scores {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: .5rem;
        padding: .5rem;
        box-sizing: border-box;
        border: 1px solid var(--overlay);
        border-radius: .5rem;
    }
    .proficiencies {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
</style>