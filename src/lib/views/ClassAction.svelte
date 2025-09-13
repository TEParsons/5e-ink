<script>
    import { getContext } from "svelte";
    import { DetailsCtrl, SlotsCtrl } from "$lib/ui/ctrls";
    import Markdown from "$lib/ui/Markdown.svelte";

    let {
        action,
        slots=$bindable()
    } = $props()

    let stats = getContext("stats");

</script>
    
<h1>
    {action.name}
</h1>
<Markdown 
    value={action.description}
/>
<h4>
    Slots
</h4>
{#if action.slots}
    <SlotsCtrl 
        bind:value={slots.current}
        bind:total={slots.total}
    />
{/if}