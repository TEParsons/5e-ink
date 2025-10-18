<script>
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