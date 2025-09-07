<script>
    import { getContext } from "svelte";
    import { NumberCtrl } from "$lib/ui/ctrls";

    let stats = getContext("stats");

    let dialog = $state.raw();

    let order = [
        "copper", "silver", "electrum", "gold", "platinum"
    ]

    function sort(evt) {
        // get total currency as copper
        let total = (
            stats.inventory.currency.copper
            + stats.inventory.currency.silver * 10
            + stats.inventory.currency.electrum * 50
            + stats.inventory.currency.gold * 100
            + stats.inventory.currency.platinum * 1000
        )
        // sort into currency units
        Object.assign(stats.inventory.currency, {
            copper: total % 10,
            silver: Math.floor(total % 50 / 10),
            electrum: Math.floor(total % 100 / 50),
            gold: Math.floor(total % 1000 / 100),
            platinum: Math.floor(total / 1000),
        })
    }
</script>

<div class=currency-ctrl>
    <button 
        class=sort-btn
        onclick={sort}
    >
        ⇥
    </button>
    {#each order as unit}
        <div class=unit>
            <NumberCtrl
                label={unit}
                bind:value={stats.inventory.currency[unit]}
                min=0
                interval=1
            />
            <img 
                class=coin
                src="assets/coins/{unit}.png" 
                alt={unit} 
            />
        </div>
    {/each}
</div>

<style>
    .currency-ctrl {
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        background: var(--base);
    }

    .unit {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        padding: .5rem;
        padding-top: 0;
    }

    .coin {
        display: inline;
        height: 1rem;
        width: 1rem;
    }

    .sort-btn {
        background-color: var(--base);
        color: var(--text-on-base);
        border: 1px solid var(--crust);
        outline: none;
        border-radius: .5rem;
        padding: .25rem .75rem;
        font-family: var(--emoji);
        margin-right: 1rem;
    }
</style>