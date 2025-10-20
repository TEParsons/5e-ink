<script>
    import { SlotsCtrl } from "$lib/ui/ctrls"

    let {
        trait=$bindable()
    } = $props()
</script>


<h2>{trait.name}</h2>
<p>{trait.description}</p>

{#if trait.pool}
    {@const pool = getPool(stats, trait.pool)}
    <h4>
        {pool.name}
    </h4>
    <SlotsCtrl
        bind:value={stats.current.pools[trait.pool]}
        total={pool.total}
    />
{/if}