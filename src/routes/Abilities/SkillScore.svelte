<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency, getSkillMultiplier, getAllSkills, sentenceCase, getScore } from "$lib/utils"
    import { ProficiencyCtrl } from "$lib/ui/ctrls"

    let {
        id
    } = $props()

    let stats = getContext("stats")

    let base = getAllSkills(stats)[id]

    let label = {
        athletics: "Athletics",
        acrobatics: "Acrobatics",
        sleightOfHand: "Sleight of hand",
        stealth: "Stealth",
        arcana: "Arcana",
        history: "History",
        investigation: "Investigation",
        nature: "Nature",
        religion: "Religion",
        animalHandling: "Animal handling",
        insight: "Insight",
        medicine: "Medicine",
        perception: "Perception",
        survival: "Survival",
        deception: "Deception",
        intimidation: "Intimidation",
        performance: "Performance",
        persuasion: "Persuasion",
    }[id]

    let proficiency = $derived(
        level2proficiency(
            totalLevels(stats.class)
        )
    )

    let modifier = $derived(
        score2modifier(getScore(stats, base)) + Math.floor(proficiency * getSkillMultiplier(stats, id))
    )
</script>

<div
    class=skill-score
>
    <ProficiencyCtrl
        label={sentenceCase(id)}
        value={getSkillMultiplier(stats, id)}
    />

    <output
        for={id}
    >
        {modifier >= 0 ? `+${modifier}` : `${modifier}`}
    </output>

    <label
        for={id}
    >
        {sentenceCase(id)} ({base})
    </label>
    
    
    
</div>

<style>
    .skill-score {
        display: grid;
        gap: .5rem;
        grid-template-columns: min-content min-content max-content min-content;
        align-items: center;
        line-height: 1em;
    }
    .skill-score:not(:first-child) {
        border-top: 1px solid var(--mantle);
        padding-top: .5rem;
    }

    output {
        font-weight: bold;
    }
</style>