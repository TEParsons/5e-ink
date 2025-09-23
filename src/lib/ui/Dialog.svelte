<script>
    import { untrack } from "svelte"
    let {
        buttons={
            OK: evt => {},
            CANCEL: evt => {},
        },
        onopen=evt => {},
        shown=$bindable(),
        children=undefined,
    } = $props()

    let handle = $state.raw();

    $effect(() => {
        if (handle && shown) {
            untrack(onopen);
            handle.showModal();
        } else if (handle) {
            handle.close();
        }
    })
</script>

<dialog
    bind:this={handle}
>
    <div
        class=dialog-content
    >
        {@render children?.()}
        <div
            class="dialog-ctrls"
        >
            {#if buttons.CANCEL}
            <button
                class="input"
                onclick={evt => {
                    buttons.CANCEL(evt)
                    shown = false;
                }}
            >
                Cancel
            </button>
            {/if}
            {#if buttons.OK}
                <button
                    class="primary"
                    onclick={evt => {
                        buttons.OK(evt)
                        shown = false;
                    }}
                >
                    Okay
                </button>
            {/if}
        </div>
    </div>
</dialog>

<style>
    dialog {
        border: 2px solid var(--mantle);
        background-color: var(--base);
        border-radius: 0;
        min-width: 50vw;
        max-width: calc(100vw - 2rem);
        padding: 1rem;
        box-sizing: border-box;
    }

    .dialog-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .dialog-ctrls {
        display: flex;
        flex-direction: row;
        justify-content: end;
        gap: .5rem;
        border-top: 1px solid var(--mantle);
        padding-top: 1rem;
    }

    .dialog-ctrls button {
        background-color: var(--base);
        color: var(--text-on-base);
        border: 1px solid var(--crust);
        outline: none;
        border-radius: .5rem;
        padding: .5rem;
    }
    .dialog-ctrls button.primary {
        background-color: var(--crust);
        color: var(--text-on-crust);
        border-color: transparent;
    }
</style>
