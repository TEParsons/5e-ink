<script>
    import { getContext } from "svelte";
    import { totalLevels, score2modifier, level2proficiency } from "$lib/utils";
    import { DetailsCtrl } from "$lib/ui/ctrls"
    import Markdown from "$lib/ui/Markdown.svelte";

    let stats = getContext("stats");

    let actions = $derived.by(() => {
        let output = [];

        // get bonus action spells
        for (let level of Object.values(stats.spells)) {
            for (let spell of level.spells) {
                if (spell.time.type === "reaction") {
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


<div class=reactions-ctrl>
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
    .reactions-ctrl {
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