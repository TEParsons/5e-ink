<script>
    import Dialog from "../Dialog.svelte";
    import { getContext, untrack } from "svelte";

    let prefs = getContext("prefs");
    
    let {
        label=undefined,
        value=$bindable(),
        edit=prefs.edit
    } = $props()

    let options = {
        0: {icon: "none", label: "Not proficient"},
        0.5: {icon: "half", label: "Semi-proficient"},
        1: {icon: "full", label: "Proficient"},
        2: {icon: "expert", label: "Expert proficient"},
    }

    let order = [
        0, 0.5, 1, 2
    ]

    let dialog = $state({
        shown: false,
        restore: undefined
    });

    $effect((evt) => {
        if (dialog.shown) {
            dialog.restore = untrack(() => $state.snapshot(value));
        }
    })
</script>

<button
    class=proficiency-ctrl
    onclick={evt => dialog.shown = edit && true}
    aria-label={options[value || 0].icon}
>
    <svg class=icon>
        <use xlink:href="assets/proficiency/{options[value || 0].icon}.svg" />
    </svg>
</button>

<Dialog
    bind:shown={dialog.shown}
    buttons={{
        OK: evt => {},
        CANCEL: evt => value = dialog.restore
    }}
>
    {#if label}
        <h2 class=label>{label}</h2>
    {/if}
    {#each order as option}
        <button
            class=option
            class:selected={value === option}
            onclick={evt => value = option}
        >
            <svg class=icon>
                <use xlink:href="assets/proficiency/{options[option].icon}.svg" />
            </svg>
            {options[option].label}
        </button>
    {/each}
</Dialog>

<style>
    .proficiency-ctrl {
        border: none;
        background: transparent;
        padding: 0;
        color: var(--crust);
        line-height: 1em;
    }

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