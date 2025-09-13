<script>
    import { getContext } from "svelte";
    import { DetailsCtrl } from "$lib/ui/ctrls"

    let {
        tag
    } = $props()

    let stats = getContext("stats");

    let traits = $derived.by(() => {
        let output = []

        // get class traits
        for (let [name, cls] of Object.entries(stats.class)) {
            for (let trait of cls.traits) {
                if (trait.tags.includes("combat")) {
                    output.push({
                        type: "class",
                        label: `${trait.name} (${name})`,
                        icon: "💼",
                        trait: trait
                    })
                }
            }      
        }

        // get species traits
        for (let trait of stats.species.traits) {
            if (trait.tags.includes("combat")) {
                output.push({
                    type: "species",
                    label: `${trait.name} (${stats.species.name})`,
                    icon: "🧬",
                    trait: trait
                })
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