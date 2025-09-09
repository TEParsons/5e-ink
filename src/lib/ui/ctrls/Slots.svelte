<script>
    import { getContext } from "svelte";

    let prefs = getContext("prefs");

    let {
        value=$bindable(),
        total,
        edit=prefs.edit
    } = $props()
</script>

<div class=slots>
    {#each Array(total).keys() as n}
        <button
            class:available={total - n < value}
            onclick={(evt) => {
                if (total - n < value) {
                    value -= 1
                } else {
                    value += 1
                }
            }}
            aria-label="slot"
        >
            <svg class=icon>
                <use xlink:href="assets/proficiency/{total - n < value ? "none" : "full"}.svg" />
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