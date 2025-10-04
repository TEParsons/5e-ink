<script>
    import Dialog from "$lib/ui/Dialog.svelte";
    import { SwitchCtrl } from "$lib/ui/ctrls";
    import { ItemView } from "$lib/views";
    import ItemSchema from "$lib/schemas/item.schema.json";
    import { recursiveDefaults } from "$lib/schemas";
    import { sentenceCase } from "$lib/utils.js";
    import { getContext } from "svelte";

    let {
        equipped
    } = $props()

    let stats = getContext("stats");

    let showDlg = $state.raw(false);
    let profile = $state({});
</script>


<button
    class=add-item-btn
    onclick={evt => {
        // reset profile to defaults
        Object.assign(
            profile, recursiveDefaults(ItemSchema)
        )
        profile.type = "misc"
        profile.params = {}
        profile.equipped = equipped
        // show dialog
        showDlg = true;
    }}
>+ Add</button>


<Dialog
    buttons={{
        OK: evt => stats.inventory.items.push($state.snapshot(profile)),
        CANCEL: evt => {}
    }}
    bind:shown={showDlg}
>
    {#if showDlg}
        <ItemView 
            bind:item={profile}
            edit
        />
    {/if}

    <SwitchCtrl
        bind:value={profile.equipped}
        labels={{
            NO: "Backpack",
            YES: "Equipped"
        }}
        edit
    />
</Dialog>

<style>
    .add-item-btn {
        padding: .5rem;
        background-color: var(--base);
        color: var(--crust);
        text-align: right;
    }
</style>