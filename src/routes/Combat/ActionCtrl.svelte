<script>
    import { DetailsCtrl } from "$lib/ui/ctrls";
    import { getPool } from "$lib/utils";
    import { getContext } from "svelte";

    let {
        action=$bindable(),
        icon,
        children
    } = $props()

    let stats = getContext("stats")

    let restore = {
        action: $state.snapshot(action),
        pool: undefined
    }
</script>


<DetailsCtrl
    onopen={evt => {
        // store action's state on open
        restore.action = $state.snapshot(action);
        if (action.pool) {
            restore.pool = $state.snapshot(stats.current.pools?.[action.pool])
        }
    }}
    buttons={{
        OK: evt => {},
        CANCEL: evt => {
            // reset action to its state on open
            Object.assign(action, restore.action)
            if (action.pool) {
                stats.current.pools[action.pool] = restore.pool
            }
        }
    }}
>
    {#snippet summary()}
        <div class=action-summary>
            <div class=icon>{icon}</div>
            <div class=action-label>{action.name}</div>
        </div>
    {/snippet}
    
    {@render children?.()}
</DetailsCtrl>

<style>
    .action-summary {
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: .5rem;
    }

    .action-label {
        text-align: left;
    }

    .icon {
        font-family: var(--emoji);
        width: 1rem;
        direction: rtl;
        text-align: right;
        padding: 0 .5rem;
    }
</style>