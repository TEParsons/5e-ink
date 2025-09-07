<script>
    import Dialog from "../Dialog.svelte";
    import { untrack } from "svelte";

    let {
        label=undefined,
        value=$bindable()
    } = $props()

    let options = {
        0: {icon: "⚪︎", label: "⚪︎ Not proficient"},
        0.5: {icon: "◐︎", label: "◐︎ Semi-proficient"},
        1: {icon: "⏺︎", label: "⏺︎ Proficient"},
        2: {icon: "⚉︎", label: "⚉︎ Expert proficient"},
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
    onclick={evt => dialog.shown = true}
>
    {options[value || 0].icon}
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
            {options[option].label}
        </button>
    {/each}
</Dialog>

<style>
    .proficiency-ctrl {
        border: none;
        background: transparent;
        font-size: 1.5rem;
        padding: 0;
        color: var(--crust);
        line-height: 1em;
    }


    .option {
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