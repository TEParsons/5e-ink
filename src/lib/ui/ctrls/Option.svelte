<script>

    import { getContext } from "svelte";

    let {
        index,
        data={},
        children=undefined
    } = $props()

    let options = getContext("options");

    $effect(() => {
        if (options.selected.index === index) {
            options.selected.data = data
            options.selected.children = children
        }
    })
</script>


<button
    class=option
    class:selected={options.selected.index === index}
    onclick={(evt) => {
        // update selected
        options.selected.index = index
        // run onselect method
        options.onselect(evt, index, data);
    }}
>
    {@render children()}
</button>

<style>
    .option {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5rem;
        background-color: var(--base);
        color: var(--text-on-base);
        border: 1px solid var(--crust);
        border-radius: .5rem;
        padding: .5rem 1rem;
        text-align: left;
    }
    .option.selected {
        background-color: var(--crust);
        color: var(--text-on-crust);
    }
</style>