<script>
    import { untrack } from "svelte";
    import Dialog from "../Dialog.svelte";

    let {
        value=$bindable(),
        label=undefined,
        min=0,
        max=undefined,
        interval=1
    } = $props()

    let dialog = $state({
        restore: undefined,
        shown: false
    })

    $effect((evt) => {
        if (dialog.shown) {
            dialog.restore = untrack(() => $state.snapshot(value));
        }
    })
</script>

<button
    class="input number"
    onclick={evt => dialog.shown=true}
>
    {value}
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
    <div
        class="dialog-content"
    >
        <button
            class="ctrl"
            onclick={evt => value = Math.min(value + interval, max || Infinity)}
        >
            +
        </button>
        <button
            class="ctrl"
            onclick={evt => value = Math.max(value - interval, min)}
        >
            -
        </button>
        <div
            class="output number"
        >
            {value}
        </div>
        
    </div>
</Dialog>

<style>
    .label {
        margin: .5rem 0;
    }

    .input.number {
        color: var(--crust);
        background-color: var(--base);
        border: none;
        outline: none;
        border-bottom: 1px solid var(--crust);
        border-radius: 0;
        padding: .5rem 1rem;
        margin: 0.25rem 0;
    }

    .dialog-content {
        display: grid;
        grid-template-rows: [start] min-content [minus] min-content;
        grid-template-columns: [start] min-content [output] 1fr [end];
        gap: .5rem;
        align-items: center;
    }

    .dialog-content .ctrl {
        grid-column-start: start;
        line-height: 1rem;
        font-family: var(--mono);
        background-color: var(--crust);
        color: var(--text-on-crust);
        padding: .5rem;
    }

    .output.number {
        grid-column-start: output;
        grid-row-start: start;
        grid-row-end: span 2;
        padding: 1rem;
        font-size: 1.5rem;
    }

    button {
        border: none;
        outline: none;
        border-radius: .5rem;
    }


</style>