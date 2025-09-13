<script>
    import { getContext } from "svelte";
    import { DetailsCtrl } from "$lib/ui/ctrls"
    import { WeaponView, SpellView, ClassActionView } from "$lib/views";

    let {
        time
    } = $props()

    let stats = getContext("stats");

    // get relevant actions
    let actions = $derived.by(() => {
        let output = [];
        
        for (let item of stats.inventory.items) {
            // get weapon attacks if we're doing actions
            if (item.type === "weapon" && time === "action" && item.equipped) {
                output.push({
                    type: "weapon",
                    label: item.name,
                    icon: "⚔︎",
                    action: item
                })
            }
            // get consumables
            if (item.type === "consumable" && item.params.time.type === time && item.equipped) {
                output.push({
                    type: "consumable",
                    label: `${item.name} (x${item.params.quantity})`,
                    icon: "✷",
                    action: item
                })
            }
        }

        // get class actions
        for (let [name, cls] of Object.entries(stats.class)) {
            for (let action of cls.actions) {
                if (action.time.type === time) {
                    output.push({
                        type: "class",
                        label: `${action.name} (${name})`,
                        icon: "💼",
                        action: action
                    })
                }
            }
        }

        // get species actions
        for (let action of stats.species.actions) {
            output.push({
                type: "species",
                label: `${action.name} (${stats.species.name})`,
                icon: "🧬",
                action: action
            })
        }

        // get spells
        for (let spell of Object.values(stats.casting.spells)) {
            if (spell.time.type === time) {
                output.push({
                    type: "spell",
                    label: `${spell.name} (${spell.level})`,
                    icon: "✨",
                    action: spell
                })
            }
        }

        return output
    })

</script>


<div class=actions-ctrl>
    {#each actions as action}
        <DetailsCtrl>
            {#snippet summary()}
                <div class=action-summary>
                    <div class=icon>
                        {action.icon}
                    </div>
                    <div class=action-label>
                        {action.label}
                    </div>
                </div>
            {/snippet}

            {#if action.type === "spell"}
                <SpellView 
                    bind:spell={action.action}
                />
            {/if}
            {#if action.type === "weapon"}
                <WeaponView 
                    bind:weapon={action.action}
                />
            {/if}
            {#if action.type === "consumable" || action.type === "species" }
                <h2>{action.action.name}</h2>
                <p>{action.action.description}</p>
            {/if}
            {#if action.type === "class"}
                <ClassActionView 
                    bind:action={action.action}
                    bind:slots={action.action.slots}
                />
            {/if}
        </DetailsCtrl>
    {/each}
</div>

<style>
    .actions-ctrl {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .action-summary {
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: .5rem;
    }

    .icon {
        font-family: var(--emoji);
    }
</style>