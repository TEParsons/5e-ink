<script>
    import { SlotsCtrl } from "$lib/ui/ctrls"

    let {
        trait=$bindable()
    } = $props()
</script>


<h2>{trait.name}</h2>
<p>{trait.description}</p>

{#if trait.spellslots}
    <SlotsCtrl 
        bind:value={trait.spellslots.current}
        bind:total={trait.spellslots.total}
    />
{/if}