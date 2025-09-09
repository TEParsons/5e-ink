<script>
    import { ChoiceCtrl, Option } from "$lib/ui/ctrls";
    import Choice from "$lib/ui/ctrls/Choice.svelte";
    import { getContext } from "svelte";

    let stats = getContext("stats");

    let options = [
        "lawful good",
        "lawful neutral",
        "lawful evil",
        "neutral good",
        "true neutral",
        "neutral evil",
        "chaotic good",
        "chaotic neutral",
        "chaotic evil"
    ]
</script>

<Choice
    label="Alignment"
    bind:value={stats.details.alignment}
    onselect={(evt, index, data) => {
        stats.details.alignment = data
    }}
>
    {#each options as value}
        <Option
            index={value}
            data={value}
        >{value}</Option>
    {/each}
</Choice>