<script>
    import { getContext } from "svelte";
    import { DetailsCtrl, SlotsCtrl } from "$lib/ui/ctrls";

    let {
        spell,
        level="cantrips"
    } = $props()

    let stats = getContext("stats");

    let dialog = $state.raw();

    let timeLbl = $derived(`${spell.time.amount} ${{
        action: "Action",
        bonusaction: "Bonus Action",
        reaction: "Reaction"
    }[spell.time.type]}`)

    let temp = $state({
        slots: $state.snapshot(stats.spells[level].slots?.current)
    })
</script>

<DetailsCtrl
    buttons={{
        OK: evt => stats.spells[level].slots.current = $state.snapshot(temp.slots),
        CANCEL: evt => temp.slots = $state.snapshot(stats.spells[level].slots?.current)
    }}
    onopen={evt => temp.slots = $state.snapshot(stats.spells[level].slots?.current)}
>
    {#snippet summary()}
        <div class=spell-summary>
            <span class=name>{spell.name}</span>
            <span class=time>{timeLbl}</span>
        </div>
    {/snippet}
    
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
            bind:value={temp.slots}
            total={stats.spells[level].slots.total}
        />
    {/if}
    
    
</DetailsCtrl>


<style>
    .name {
        font-weight: bold;
    }

    .spell-summary {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        justify-content: space-between;
    }
</style>