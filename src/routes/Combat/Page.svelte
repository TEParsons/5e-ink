<script>
    import { getContext } from "svelte";
    import HealthCtrl from "./HealthCtrl.svelte";
    import ArmourCtrl from "./ArmourCtrl.svelte";
    import MovementCtrl from "./MovementCtrl.svelte";
    import InitiativeCtrl from "./InitiativeCtrl.svelte";
    import ActionsCtrl from "./ActionsCtrl.svelte";
    import ReactionsCtrl from "./ReactionsCtrl.svelte";
    import { TraitsView } from "$lib/views";

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

    <TraitsView 
        tag="combat"
    />

    <h3>Actions</h3>
    <ActionsCtrl
        time="action"
    />

    <h3>Bonus Actions</h3>
    <ActionsCtrl
        time="bonusaction"
    />

    <h3>Reactions</h3>
    <ActionsCtrl
        time="reaction"
    />
</div>

<style>
    .page {
        display: grid;
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