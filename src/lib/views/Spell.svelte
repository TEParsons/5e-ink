<script>
    import { getContext } from "svelte";
    import { MarkdownCtrl, SlotsCtrl } from "$lib/ui/ctrls";

    let {
        spell=$bindable(),
        slots=$bindable(),
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

    {#if spell.level in stats.casting.slots}
        <h4>
            {`${spell.level[0].toUpperCase()}${spell.level.slice(1)} level`} slots
        </h4>
        <SlotsCtrl 
            bind:value={slots}
            bind:total={stats.casting.slots[spell.level].total}
        />
    {/if}
</div>