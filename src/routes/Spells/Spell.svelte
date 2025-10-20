<script>
    import { getContext } from "svelte";
    import { DetailsCtrl, SlotsCtrl } from "$lib/ui/ctrls";
    import { SpellView } from "$lib/views";
    import { sentenceCase } from "$lib/utils";

    let {
        spell=$bindable()
    } = $props()

    let stats = getContext("stats");

    let dialog = $state.raw();

    let timeLbl = $derived(`${spell.time.amount} ${{
        action: "Action",
        bonusaction: "Bonus Action",
        reaction: "Reaction"
    }[spell.time.type] || sentenceCase(spell.time.type)}`)

    let restore = {
        spellslots: undefined
    }
</script>

<DetailsCtrl
    buttons={{
        OK: evt => {},
        CANCEL: evt => stats.current.spellslots[spell.level] = restore.spellslots
    }}
    onopen={evt => restore.spellslots = $state.snapshot(stats.current.spellslots[spell.level])}
>
    {#snippet summary()}
        <div class=spell-summary>
            <span class=name>{spell.name}</span>
            <span class=time>{timeLbl}</span>
        </div>
    {/snippet}
    
    <SpellView 
        bind:spell={spell}
    />
</DetailsCtrl>


<style>
    .spell-summary {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        justify-content: space-between;
        width: 100%;
    }
</style>