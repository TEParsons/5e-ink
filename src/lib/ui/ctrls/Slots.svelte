<script>
    import { getContext } from "svelte";

    let prefs = getContext("prefs");

    let {
        used=$bindable(),
        total=$bindable(),
        edit=prefs.edit
    } = $props()  
    $inspect(used) 
</script>

<div class=spellslots>
    {#each Array(total).keys() as n}
        <button
            onclick={(evt) => {
                if (n < (total - used)) {
                    used += 1
                } else {
                    used -= 1
                }
            }}
            aria-label="slot"
        >
            <svg class=icon>
                <use xlink:href="assets/proficiency/{n < (total - used) ? "full" : "none"}.svg" />
            </svg>
        </button>
    {/each}
    {#if edit}
        <button 
            class=totals-ctrl
            onclick={evt => total -= 1}
        >
            -
        </button>
        <button 
            class=totals-ctrl
            onclick={evt => total += 1}
        >
            +
        </button>
    {/if}
</div>

<style>
    .spellslots {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
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

    button.totals-ctrl {
        background-color: var(--crust);
        color: var(--text-on-crust);
        border-radius: .5rem;
        width: 2rem;
        padding: .5rem;
        line-height: 1rem;
    }
</style>