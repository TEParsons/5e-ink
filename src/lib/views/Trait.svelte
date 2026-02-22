<script>
    import { SlotsCtrl } from "$lib/ui/ctrls"
    import { getPools } from "$lib/utils";
    import { getContext } from "svelte";

    let {
        trait=$bindable()
    } = $props()

    let stats = getContext("stats")
</script>


<h2>{trait.name}</h2>
<p>{trait.description}</p>

{#if trait.pool}
    {@const pool = getPools(stats)[trait.pool]}
    <h4>
        {pool.name}
    </h4>
    <SlotsCtrl
        bind:used={stats.current.pools[trait.pool]}
        total={pool.total}
    />
{/if}