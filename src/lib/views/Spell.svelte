<script>
    import { getContext } from "svelte";
    import { MarkdownCtrl, SlotsCtrl } from "$lib/ui/ctrls";

    let {
        spell=$bindable(),
        slots=$bindable(),
        level="cantrips"
    } = $props()

    let stats = getContext("stats");

</script>

<div class=spell-view>
    <h1>
        {spell.name}
    </h1>
    <MarkdownCtrl 
        bind:value={spell.description}
    />

    {#if level !== "cantrips"}
        <h4>
            {`${level[0].toUpperCase()}${level.slice(1)} level`} slots
        </h4>
        <SlotsCtrl 
            bind:value={slots}
            bind:total={stats.spells[level].slots.total}
        />
    {/if}
</div>