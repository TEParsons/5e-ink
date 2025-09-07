<script>
    import { getContext } from "svelte";
    import HealthCtrl from "./HealthCtrl.svelte";
    import ArmourCtrl from "./ArmourCtrl.svelte";
    import MovementCtrl from "./MovementCtrl.svelte";
    import InitiativeCtrl from "./InitiativeCtrl.svelte"

    let stats = getContext("stats")
</script>

<div class=page>
    <div class=stats>
        <div class=stat-output>
            <span class=label>
                Armour
            </span>
            <ArmourCtrl />
        </div>
        <div class=stat-output>
            <span class=label>
                Initiative
            </span>
            <InitiativeCtrl />
        </div>
        <div class=stat-output>
            <span class=label>
                Movement
            </span>
            <MovementCtrl />
        </div>
    </div>
    
    <HealthCtrl />
</div>

<style>
    .page {
        display: grid;
        gap: 1rem;
        margin: auto;
        max-width: 20cm;
        padding: 1rem;
    }

    .stats {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: stretch;
        gap: 1rem;
    }

    .stat-output {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        border: 2px solid var(--mantle);
        padding: .5rem;
        border-radius: .5rem;
    }
</style>