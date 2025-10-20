<script>
    import { getContext } from "svelte";
    import { getPool } from "$lib/utils";
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

    {#if action.pool}
        {@const pool = getPool(stats, action.pool)}
        <h4>
            {pool.name}
        </h4>
        <SlotsCtrl
            bind:value={stats.current.pools[action.pool]}
            total={pool.total}
        />
    {/if}
</div>