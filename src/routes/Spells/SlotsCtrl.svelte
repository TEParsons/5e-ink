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
            aria-label="slot"
        >
            <svg class=icon>
                <use xlink:href="assets/proficiency/{stats.spells[level].slots.total - n < value ? "none" : "full"}.svg" />
            </svg>
        </button>
    {/each}
</div>

<style>
    .slots {
        display: flex;
        flex-direction: row;
        gap: .25rem;
    }
    button {
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--overlay);
        padding: 0;
        font-size: 1.5rem;
    }
</style>