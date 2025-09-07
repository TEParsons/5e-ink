<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency } from "$lib/utils";
    import { DetailsCtrl } from "$lib/ui/ctrls"
    import Markdown from "$lib/ui/Markdown.svelte";

    let stats = getContext("stats");

    function weaponDesc(weapon) {
        // construct range string
        let range
        if (weapon.params.attacktype === "ranged") {
            range = `range ${weapon.params.range.range}ft./${weapon.params.range.maxrange}ft.`
        } else {
            range = `reach ${weapon.params.range.reach}ft.`
            if (weapon.params.range.thrown) {
                range += ` (throw range ${weapon.params.range.thrown})`
            }
        }

        // calculate modifier
        let modifier = score2modifier(
            weapon.params.range.range ? stats.scores.dex : stats.scores.str
        ) + Math.floor(
            level2proficiency(
                totalLevels(stats.levels)
            ) * stats.proficiencies.weapons.includes(weapon.params.weapontype)
        )

        return (
            `***${weapon.name}.** `
            + `${weapon.params.attacktype[0].toUpperCase() + weapon.params.attacktype.slice(1)} weapon attack:* `
            + `${modifier >= 0 ? `+${modifier}` : `${modifier}`} to hit, ${range}. *Hit*: ${weapon.params.damage} damage.`
        )
    }

    let actions = $derived.by(() => {
        let output = [];

        // get weapon attacks
        for (let item of stats.inventory.items) {
            if (item.equipped && item.type === "weapon") {
                output.push({
                    type: "weapon",
                    name: item.name,
                    effect: weaponDesc(item),
                    description: item.description
                })
            }
        }

        // get action spells
        for (let level of Object.values(stats.spells)) {
            for (let spell of level.spells) {
                if (spell.time.type === "action") {
                    output.push({
                        type: "spell",
                        name: `${spell.name} (${spell.level})`,
                        effect: undefined,
                        description: spell.description
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
                        {#if action.type === "weapon"}
                        ⚔︎
                        {:else if action.type === "spell"}
                        ✨
                        {/if}
                    </div>
                    <div class=action-label>
                        {action.name}
                    </div>
                </div>
            {/snippet}

            {#if action.effect}
                <Markdown 
                    value={action.effect}
                />
            {/if}

            {#if action.description}
                <p>{action.description}</p>
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