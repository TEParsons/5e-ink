<script>
    import Dialog from "../Dialog.svelte";

    let {
        summary,
        buttons={
            OK: evt => {}
        },
        onopen=evt => {},
        children
    } = $props();

    let dialog = $state({
        shown: false
    })
</script>

<button
    class=details
    onclick={evt => dialog.shown = true}
>
    {@render summary()}
</button>

<Dialog
    bind:shown={dialog.shown}
    buttons={buttons}
    onopen={onopen}
>
    {@render children()}
</Dialog>

<style>
    .details {
        background-color: transparent;
        border: none;
        border: none;
        outline: none;
        border-bottom: 1px solid var(--mantle);
        padding: .5rem 1rem;
    }
    .details:first-of-type {
        border-top: 1px solid var(--mantle);
    }
</style>