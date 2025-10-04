<script>
    import { getContext, setContext } from "svelte";
    import CurrencyCtrl from "./CurrencyCtrl.svelte";
    import ItemCtrl from "./ItemCtrl.svelte";
    import NewItemCtrl from "./NewItemCtrl.svelte";

    let stats = getContext("stats");
</script>

<div class=page>
    <CurrencyCtrl />
    <h2>Equipped</h2>
    <div 
        class=items-list
        role=none
    >
        {#each Object.keys(stats.inventory.items) as i}
            {#if stats.inventory.items[i].equipped}
                <ItemCtrl bind:item={stats.inventory.items[i]} />
            {/if}
        {/each}
        <NewItemCtrl equipped />
    </div>
    <h2>Backpack</h2>
    <div 
        class=items-list
        role=none
    >
        {#each Object.keys(stats.inventory.items) as i}
            {#if !stats.inventory.items[i].equipped}
                <ItemCtrl bind:item={stats.inventory.items[i]} />
            {/if}
        {/each}
        <NewItemCtrl />
    </div>
</div>

<style>
    .page {
        margin: auto;
        max-width: 20cm;
        padding: 1rem;
    }
    .items-list {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border: 1px solid transparent;
        border-radius: .5rem;
    }
</style>