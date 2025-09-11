<script>
    import { getContext } from "svelte";
    import { DetailsCtrl, SlotsCtrl } from "$lib/ui/ctrls";

    let {
        spell,
        slots=$bindable(),
        level="cantrips"
    } = $props()

    let stats = getContext("stats");

</script>
    
<h1>
    {spell.name}
</h1>
{#each spell.description.split("\n") as line}
    <p>{line}</p>
{/each}
{#if level !== "cantrips"}
    <h4>
        {`${level[0].toUpperCase()}${level.slice(1)} level`} slots
    </h4>
    <SlotsCtrl 
        bind:value={slots}
        bind:total={stats.spells[level].slots.total}
    />
{/if}