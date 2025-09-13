<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency } from "$lib/utils"
    import { ProficiencyCtrl } from "$lib/ui/ctrls"

    let {
        id
    } = $props()

    let stats = getContext("stats")

    let base = {
        athletics: "str",
        acrobatics: "dex",
        sleightOfHand: "dex",
        stealth: "dex",
        arcana: "int",
        history: "int",
        investigation: "int",
        nature: "int",
        religion: "int",
        animalHandling: "wis",
        insight: "wis",
        medicine: "wis",
        perception: "wis",
        survival: "wis",
        deception: "chr",
        intimidation: "chr",
        performance: "chr",
        persuasion: "chr",
    }[id]

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
        score2modifier(stats.scores[base]) + Math.floor(proficiency * stats.skills[id])
    )
</script>

<div
    class=skill-score
>
    <ProficiencyCtrl
        label={label}
        bind:value={stats.skills[id]}
    />

    <output
        for={id}
    >
        {modifier >= 0 ? `+${modifier}` : `${modifier}`}
    </output>

    <label
        for={id}
    >
        {label}
    </label>
    
    
</div>

<style>
    .skill-score {
        display: grid;
        gap: .5rem;
        grid-template-columns: min-content min-content max-content;
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