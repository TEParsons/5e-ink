<script>
    import { getContext } from "svelte";
    import { DetailsCtrl } from "$lib/ui/ctrls"

    let {
        item=$bindable()
    } = $props()
</script>


<DetailsCtrl>
    {#snippet summary()}
        <div class=item-label>
            {item.name}
        </div>
    {/snippet}

    <h2>{item.name}</h2>
    <i>{item.type}, {item.weight}lbs.</i>
    <p><input type=checkbox bind:checked={item.equipped}/> Equipped?</p>
    {#each item.description.split("\n") as line}
    <p>{line}</p>
    {/each}
</DetailsCtrl>

<style>
    .item-label {
        text-align: left;
    }
</style>