<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency, saveProficiencies } from "$lib/utils";
    import { NumberCtrl, ProficiencyCtrl } from "$lib/ui/ctrls";

    let {
        id
    } = $props()

    let stats = getContext("stats")

    let label = {
        str: "Str",
        con: "Con",
        dex: "Dex",
        int: "Int",
        wis: "Wis",
        chr: "Chr"
    }[id]
    
    let proficiency = $derived(
        level2proficiency(
            totalLevels(stats.class)
        )
    )
    $inspect(proficiency)

    let modifier = $derived(
        score2modifier(stats.scores[id])
    )

    let save = $derived(
        modifier + (saveProficiencies(stats.class).includes(id) ? proficiency : 0)
    )
</script>


<div
    class=ability-score
>
    <label
        for={id}
    >
        {label}
    </label>
    <output
        class=modifier
        for={id}
    >
        {modifier >= 0 ? `+${modifier}` : `${modifier}`}
    </output>
    <div class=save-ctrl>
        <ProficiencyCtrl
            label="{label} Saves"
            value={saveProficiencies(stats.class).includes(id) ? 1 : 0}
            edit={false}
        />
        <output
            class=save
            for={id}
        >
            {save >= 0 ? `+${save}` : `${save}`}
        </output>
    </div>
    <NumberCtrl
        label={label}
        min=1
        max=30
        bind:value={stats.scores[id]}
    />
</div>

<style>
    .ability-score {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        border: 2px solid var(--mantle);
        padding: .5rem;
        border-radius: .5rem;
    }
    .save-ctrl {
        display: flex;
        flex-direction: row;
        gap: .25rem;
        align-items: center;
    }
    output.modifier {
        font-size: 1.5rem;
        color: var(--crust);
    }
</style>