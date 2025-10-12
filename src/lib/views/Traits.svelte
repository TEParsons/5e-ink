<script>
    import { getContext } from "svelte";
    import { DetailsCtrl, SlotsCtrl } from "$lib/ui/ctrls"

    let {
        tag
    } = $props()

    let stats = getContext("stats");
</script>

<h3>Traits</h3>
<div class=traits-ctrl>

    <!-- from species -->
    {#each stats.species.traits as trait}
        {#if trait.tags.includes(tag)}
            <DetailsCtrl>
                {#snippet summary()}
                    <div class=trait-summary>
                        <div class=icon>🧬</div>
                        <div class=trait-label>{trait.name} ({stats.species.name})</div>
                    </div>
                {/snippet}

                <h2>{trait.name}</h2>
                <p>{trait.description}</p>

                {#if trait.slots}
                    <SlotsCtrl 
                        bind:value={trait.slots.current}
                        bind:total={trait.slots.total}
                    />
                {/if}
            </DetailsCtrl>
        {/if}
    {/each}

    <!-- from class -->
    {#each Object.keys(stats.class) as cls}
        {#each Object.entries(stats.class[cls].levels) as [lvl, advancements]}
            {#each Object.entries(advancements.traits || []) as [i, trait]}
                {#if trait.tags.includes(tag)}
                    <DetailsCtrl>
                        {#snippet summary()}
                            <div class=trait-summary>
                                <div class=icon>💼</div>
                                <div class=trait-label>{trait.name} ({cls})</div>
                            </div>
                        {/snippet}

                        <h2>{trait.name}</h2>
                        <p>{trait.description}</p>

                        {#if trait.slots}
                            <SlotsCtrl 
                                bind:value={trait.slots.current}
                                bind:total={trait.slots.total}
                            />
                        {/if}
                    </DetailsCtrl>
                {/if}
            {/each}
        {/each}
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