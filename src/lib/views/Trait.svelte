<script>
    import { SlotsCtrl } from "$lib/ui/ctrls"

    let {
        trait=$bindable()
    } = $props()
</script>


<h2>{trait.name}</h2>
<p>{trait.description}</p>

{#if trait.slots}
    <SlotsCtrl 
        bind:value={trait.slots.current}
        bind:total={trait.slots.total}
    />
{/if}