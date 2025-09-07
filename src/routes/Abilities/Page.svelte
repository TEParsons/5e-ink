<script>
    import { getContext } from "svelte";
    
    import AbilityScore from "./AbilityScore.svelte";
    import SkillScore from "./SkillScore.svelte";

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
        padding: 1rem;
        box-sizing: border-box;
        border: 1px solid var(--overlay);
        border-radius: .5rem;
    }
</style>