<script>
    import { getContext } from "svelte";
    import { NumberCtrl } from "$lib/ui/ctrls";

    let stats = getContext("stats");
    let prefs = getContext("prefs");

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
        aria-label="->"
    >
        <svg class=icon>
            <use xlink:href="assets/ui/sortcoins.svg" />
        </svg>
    </button>
    {#each order as unit}
        <div class=unit>
            <NumberCtrl
                label={unit}
                bind:value={stats.inventory.currency[unit]}
                min=0
                interval=1
                edit
            />
            <svg
                class=coin
            >
                <use xlink:href="assets/coins/{unit}.svg" />
            </svg> 
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

    .sort-btn svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    .sort-btn {
        background-color: transparent;
        color: var(--crust);
        border: none;
        outline: none;
        border-radius: .5rem;
        padding: 0;
        line-height: 1rem;
        font-family: var(--emoji);
        margin-right: 1rem;
    }
</style>