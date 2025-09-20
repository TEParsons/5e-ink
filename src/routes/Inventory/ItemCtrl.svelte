<script>
    import { getContext } from "svelte";
    import { DetailsCtrl, SwitchCtrl } from "$lib/ui/ctrls";
    import { WeaponView, ItemView } from "$lib/views"

    let {
        item=$bindable()
    } = $props()

    let temp = $state({
        equipped: $state.snapshot(item.equipped)
    })
</script>


<DetailsCtrl
    buttons={{
        OK: evt => item.equipped = $state.snapshot(temp.equipped),
        CANCEL: evt => temp.equipped = $state.snapshot(item.equipped)
    }}
>
    {#snippet summary()}
        <div class=item-label>
            {item.name}
        </div>
    {/snippet}

    {#if item.type === "weapon"}
        <WeaponView 
            bind:weapon={item}
        />
    {:else}
        <ItemView 
            bind:item={item}
        />
    {/if}

    

    <SwitchCtrl
        bind:value={temp.equipped}
        labels={{
            NO: "Backpack",
            YES: "Equipped"
        }}
        edit
    />
    
</DetailsCtrl>

<style>
    .item-label {
        text-align: left;
    }
</style>