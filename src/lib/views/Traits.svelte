<script>
    import { getContext } from "svelte";
    import { DetailsCtrl } from "$lib/ui/ctrls"
    import { traitsByTag } from "$lib/utils.js"

    let {
        tag
    } = $props()

    let stats = getContext("stats");

    let traits = $derived.by(() => {
        let output = []

        for (let [source, traits] of Object.entries(traitsByTag(stats, tag))) {
            for (let trait of traits) {
                if (source === "class") {
                    output.push({
                        type: "class",
                        label: `${trait.name} (${name})`,
                        icon: "💼",
                        trait: trait
                    })
                }
                if (source === "species") {
                    output.push({
                        type: "species",
                        label: `${trait.name} (${stats.species.name})`,
                        icon: "🧬",
                        trait: trait
                    })
                }
            }
        }

        return output
    })
</script>

<h3>Traits</h3>
<div class=traits-ctrl>
    {#each traits as trait}
    <DetailsCtrl>
        {#snippet summary()}
            <div class=trait-summary>
                <div class=icon>
                    {trait.icon}
                </div>
                <div class=action-label>
                    {trait.label}
                </div>
            </div>
        {/snippet}

        <h2>{trait.trait.name}</h2>
        <p>{trait.trait.description}</p>
    </DetailsCtrl>
    {/each}
</div>

<style>
    .traits-ctrl {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .trait-summary {
        display: flex;
        flex-direction: row;
        justify-content: start;
        gap: .5rem;
    }

    .icon {
        font-family: var(--emoji);
    }
</style>