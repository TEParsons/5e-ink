<script>
    import { getContext } from "svelte";

    let {
        level,
        value=$bindable()
    } = $props()

    let stats = getContext("stats")
</script>

<div class=slots>
    {#each Array(stats.spells[level].slots.total).keys() as n}
        <button
            class:available={stats.spells[level].slots.total - n < value}
            onclick={(evt) => {
                if (stats.spells[level].slots.total - n < value) {
                    value -= 1
                } else {
                    value += 1
                }
            }}
            aria-label="⚪︎"
        ></button>
    {/each}
</div>

<style>
    .slots {
        display: flex;
        flex-direction: row;
        gap: .25rem;
    }
    button {
        border: 1px solid var(--crust);
        border-radius: 50%;
        background-color: var(--crust);
        color: var(--overlay);
        width: 1rem;
        height: 1rem;
    }
    button.available {
        background-color: var(--base);
    }
</style>