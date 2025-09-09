<script>
    import { setContext, untrack } from "svelte";
    import Dialog from "../Dialog.svelte";

    let {
        label="",
        value=$bindable(),
        onselect = (evt, index, data) => {},
        children=undefined
    } = $props()

    let options = $state({
        onselect: onselect,
        selected: {
            index: value,
            data: undefined,
            children: undefined
        }
    })

    setContext("options", options);

    let dialog = $state({
        show: false,
        restore: undefined
    })

    $effect((evt) => {
        if (dialog.show) {
            dialog.restore = untrack(() => $state.snapshot(options.selected.index));
        }
    })
    
</script>

<button
    class="input choice"
    onclick={evt => dialog.show = true}
>
    {@render options.selected.children?.()}
</button>

<Dialog 
    bind:shown={dialog.show}
    buttons={{
        OK: evt => {},
        CANCEL: evt => options.selected.index = dialog.restore
    }}
>
    {#if label}
        <h2 class=label>{label}</h2>
    {/if}
    <div class=options-array>
        {@render children?.()}
    </div>
</Dialog>

<style>
    .input {
        color: var(--crust);
        background-color: var(--base);
        border: none;
        outline: none;
        border-bottom: 1px solid var(--crust);
        border-radius: 0;
        padding: .5rem 1rem;
        margin: 0.25rem 0;
    }
    .options-array {
        padding: .5rem;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: .5rem;
    }
</style>