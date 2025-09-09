<script>
    import { ChoiceCtrl, Option } from "$lib/ui/ctrls";
    import Choice from "$lib/ui/ctrls/Choice.svelte";
    import { getContext } from "svelte";

    let stats = getContext("stats");

    let options = [
        "they/them",
        "she/her",
        "he/him",
        "it/its"
    ]

    let other = $state.raw("");

    $effect(() => {
        if (!options.includes(stats.details.pronouns)) {
            // when other is selected and changes, update pronouns
            stats.details.pronouns = other
        }
    })
</script>

<Choice
    label="Alignment"
    bind:value={stats.details.pronouns}
    onselect={(evt, index, data) => {
        stats.details.pronouns = data
    }}
>
    {#each options as value}
        <Option
            index={value}
            data={value}
        >{value}</Option>
    {/each}
    <Option 
        index={other}
        data={other}
    >
        <input type=text class=other bind:value={other} />
    </Option>
</Choice>