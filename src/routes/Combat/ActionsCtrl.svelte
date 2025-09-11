<script>
    import { getContext } from "svelte";
    import { DetailsCtrl } from "$lib/ui/ctrls"
    import { WeaponView, SpellView } from "$lib/views";

    let {
        time
    } = $props()

    let stats = getContext("stats");

    // get relevant actions
    let actions = $derived.by(() => {
        let output = [];

        // get weapon attacks if we're doing actions
        if (time === "action") {
            for (let item of stats.inventory.items) {
                if (item.equipped && item.type === "weapon") {
                    output.push({
                        type: "weapon",
                        label: item.name,
                        icon: "⚔︎",
                        action: item
                    })
                }
            }
        }

        // get spells
        for (let level of Object.values(stats.spells)) {
            for (let spell of level.spells) {
                if (spell.time.type === time) {
                    output.push({
                        type: "spell",
                        label: `${spell.name} (${spell.level})`,
                        icon: "✨",
                        action: spell
                    })
                }
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
                    spell={action.action}
                />
            {/if}
            {#if action.type === "weapon"}
                <WeaponView 
                    weapon={action.action}
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