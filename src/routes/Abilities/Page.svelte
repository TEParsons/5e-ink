<script>
    import { getContext } from "svelte";
    
    import AbilityScore from "./AbilityScore.svelte";
    import SkillScore from "./SkillScore.svelte";
    import { TraitView } from "$lib/views";
    import ProficiencyGroup from "./ProficiencyGroup.svelte";
    import { DetailsCtrl, SlotsCtrl } from "$lib/ui/ctrls";
    import { getAllSkills, getAdvancements, sourceIcons, getPools } from "$lib/utils";

    let stats = getContext("stats")

    let proficiency = $derived(
        level2proficiency(totalLevels(stats.class))
    )
</script>

<div class=page>
    <div id=ability-scores>
        {#each Object.keys(stats.scores) as key}
            <AbilityScore
                id={key}
            />
        {/each}
    </div>

    <h3>Skills</h3>
    <div id=skill-scores>
        {#each Object.keys(getAllSkills(stats)) as key}
            <SkillScore
                id={key}
            />
        {/each}
    </div>

    <h3>Traits</h3>
    <div class=traits-ctrl>
        {#each Object.entries(getAdvancements(stats, false)) as [source, advancements]}
            {#each advancements as advancement}
                {#each Object.entries(advancement.traits || []) as [i, trait]}
                    {#if trait?.tags?.includes("narrative")}
                        <DetailsCtrl>
                            {#snippet summary()}
                                    <span class=icon>{sourceIcons[source]}</span>
                                    <span class=trait-label>{trait.name}</span>
                            {/snippet}

                            <TraitView 
                                bind:trait={advancement.traits[i]}
                            />
                        </DetailsCtrl>
                    {/if}
                {/each}
            {/each}
        {/each}
    </div>

    <h3>Pools</h3>
    <div class=pools-ctrl>
        {#each Object.entries(getPools(stats)) as [index, pool]}
            <div class=pool-ctrl>
                <SlotsCtrl 
                    bind:value={stats.current.pools[index]}
                    total={pool.total}
                />
                <b>{pool.name}</b>
            </div>
        {/each}
    </div>

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

    .traits-ctrl {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .pools-ctrl {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    .pool-ctrl {
        display: flex;
        flex-direction: row;
        gap: .5rem;
    }
</style>