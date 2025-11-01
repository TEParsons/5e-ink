<script>
    import { getContext, untrack } from "svelte";
    import { Button } from "$lib/ui/ctrls";
    import Dialog from "../Dialog.svelte";

    let prefs = getContext("prefs");

    let {
        value=$bindable(),
        temp=$bindable(null),
        label=undefined,
        min=-Infinity,
        max=Infinity,
        interval=1,
        edit=prefs.edit,
        allowTemp=false
    } = $props()    

    let dialog = $state({
        restore: undefined,
        shown: false
    })

    $effect(evt => {
        if (dialog.shown) {
            dialog.restore = untrack(() => $state.snapshot(value));
        }
    })

    $effect(evt => {
        // make sure verything is numeric
        if (typeof value === "string") {
            value = parseFloat(value)
        }
        if (typeof interval === "string") {
            interval = parseFloat(interval)
        }
        if (typeof max === "string") {
            max = parseFloat(max)
        }
        if (typeof min === "string") {
            min = parseFloat(min)
        }
    })

    let display = $derived(
        `${value} ${temp ? `+ ${temp}` : ""}`
    )
</script>

{#if edit}
    <button
        class="input number"
        onclick={evt => dialog.shown=true}
    >
        {display}
    </button>
{:else}
    <span>{display}</span>
{/if}

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
            onclick={evt => value = Math.min((value || 0) + interval, max)}
        >
            +
        </button>
        <button
            class="ctrl"
            onclick={evt => value = Math.max((value || 0) - interval, min)}
        >
            -
        </button>
        <div
            class="output number"
        >
            {value}
        </div>
    </div>
    {#if temp !== null}
        <div class="temp-ctrl dialog-content">
            {#if temp}
                <button
                    class="ctrl"
                    onclick={evt => temp += interval}
                >
                    +
                </button>
                <button
                    class="ctrl"
                    onclick={evt => temp -= interval}
                >
                    -
                </button>
                <div
                    class="output number"
                >
                    + {temp}
                </div>
            {:else}
                <Button
                    label="+ Add temp"
                    onclick={evt => temp = 1}
                />
            {/if}
        </div>
    {/if}
</Dialog>

<style>
    .label {
        margin: .5rem 0;
    }

    .input.number {
        color: var(--crust);
        font-size: inherit;
        font-weight: inherit;
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
