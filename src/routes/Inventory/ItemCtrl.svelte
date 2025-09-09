<script>
    import { getContext } from "svelte";
    import { DetailsCtrl, SwitchCtrl } from "$lib/ui/ctrls"

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
        CANCEL: evt => {}
    }}
>
    {#snippet summary()}
        <div class=item-label>
            {item.name}
        </div>
    {/snippet}

    <h2>{item.name}</h2>
    <i>{item.type}, {item.weight}lbs.</i>
    {#each item.description.split("\n") as line}
    <p>{line}</p>
    {/each}

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