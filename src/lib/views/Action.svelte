<script>
    import { getContext } from "svelte";
    import { DetailsCtrl, SlotsCtrl, MarkdownCtrl } from "$lib/ui/ctrls";

    let {
        action=$bindable(),
        spellslots=$bindable()
    } = $props()

    let stats = getContext("stats");

</script>

<div class=class-action-view>
    <h1>
        {action.name}
    </h1>
    <MarkdownCtrl 
        value={action.description}
    />
    
    {#if action.spellslots}
        <h4>
            Slots
        </h4>
        <SlotsCtrl 
            bind:value={action.spellslots.current}
            bind:total={action.spellslots.total}
        />
    {/if}
</div>