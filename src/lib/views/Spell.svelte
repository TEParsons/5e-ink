<script>
    import { getContext } from "svelte";
    import { MarkdownCtrl, SlotsCtrl } from "$lib/ui/ctrls";
    import { getTotalSlots } from "$lib/utils"

    let {
        spell=$bindable()
    } = $props()

    let stats = getContext("stats");

    let totalSlots = $derived(
        getTotalSlots(stats, spell.level)
    )

</script>

<div class=spell-view>
    <h1>
        {spell.name}
    </h1>
    <MarkdownCtrl 
        bind:value={spell.description}
    />

    {#if spell.level in stats.current.slots}
        <h4>
            {`${spell.level[0].toUpperCase()}${spell.level.slice(1)} level`} slots
        </h4>
        <SlotsCtrl 
            bind:value={stats.current.slots[spell.level]}
            bind:total={totalSlots}
        />
    {/if}
</div>