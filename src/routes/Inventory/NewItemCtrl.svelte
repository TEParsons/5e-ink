<script>
    import Dialog from "$lib/ui/Dialog.svelte";
    import { Button, SwitchCtrl } from "$lib/ui/ctrls";
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

<div
    class=add-item-btn
>
    <Button 
        label="+ Add"
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
    />
</div>


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
</Dialog>

<style>
    .add-item-btn {
        text-align: right;
    }
</style>