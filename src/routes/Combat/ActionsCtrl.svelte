<script>
    import { getContext } from "svelte";
    import { DetailsCtrl } from "$lib/ui/ctrls"
    import { WeaponView, SpellView, ClassActionView, ItemView } from "$lib/views";

    let {
        time
    } = $props()

    let stats = getContext("stats");

</script>


<div class=actions-ctrl>
    <!-- from items -->
    {#each Object.entries(stats.inventory.items) as [i, item]}
        {#if item.equipped}

            <!-- weapons -->
            {#if item.type === "weapon" && time === "action"}
                <DetailsCtrl>
                    {#snippet summary()}
                        <div class=action-summary>
                            <div class=icon>⚔︎</div>
                            <div class=action-label>{item.name} ({item.params.attacktype})</div>
                        </div>
                    {/snippet}

                    <WeaponView 
                        bind:weapon={stats.inventory.items[i]}
                    />
                </DetailsCtrl>
            {/if}

            <!-- consumables -->
            {#if item.type === "consumable" && item.params?.time?.type === time }
                <DetailsCtrl>
                    {#snippet summary()}
                        <div class=action-summary>
                            <div class=icon>✷</div>
                            <div class=action-label>{item.name} (item.params.attacktype)</div>
                        </div>
                    {/snippet}

                    <ItemView 
                        bind:weapon={stats.inventory.items[i]}
                    />
                </DetailsCtrl>
            {/if}
        {/if}
    {/each}

    <!-- from species -->
    {#each stats.species.actions as action}
        {#if action.time.type === time}
            <DetailsCtrl>
                {#snippet summary()}
                    <div class=action-summary>
                        <div class=icon>🧬</div>
                        <div class=action-label>{action.name} ({stats.species.name})</div>
                    </div>
                {/snippet}

                <h2>{action.name}</h2>
                <p>{action.description}</p>
            </DetailsCtrl>
        {/if}
    {/each}

    <!-- from class -->
    {#each Object.keys(stats.class) as cls}
        {#each Object.entries(stats.class[cls].levels) as [lvl, advancements]}
            
            <!-- class actions -->
            {#each Object.entries(advancements.actions || []) as [i, action]}
                {#if action.time.type === time}
                    <DetailsCtrl>
                        {#snippet summary()}
                            <div class=action-summary>
                                <div class=icon>💼</div>
                                <div class=action-label>{action.name} ({cls})</div>
                            </div>
                        {/snippet}

                        <ClassActionView 
                            bind:action={stats.class[cls].levels[lvl].actions[i]}
                            bind:slots={stats.class[cls].levels[lvl].actions[i].slots}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}

            <!-- cantrips -->
            {#each Object.entries(advancements.casting.cantrips || []) as [i, cantrip]}
                {#if cantrip.time.type === time}
                    <DetailsCtrl>
                        {#snippet summary()}
                            <div class=action-summary>
                                <div class=icon>✦</div>
                                <div class=action-label>{cantrip.name} (cantrip)</div>
                            </div>
                        {/snippet}

                        <SpellView 
                            bind:spell={stats.class[cls].levels[lvl].casting.cantrips[i]}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}

            <!-- spells -->
            {#each Object.entries(advancements.casting.spells || []) as [i, spell]}
                {#if spell.time.type === time}
                    <DetailsCtrl>
                        {#snippet summary()}
                            <div class=action-summary>
                                <div class=icon>✨</div>
                                <div class=action-label>{spell.name} ({spell.level} level)</div>
                            </div>
                        {/snippet}

                        <SpellView 
                            bind:spell={stats.class[cls].levels[lvl].casting.spells[i]}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}
        {/each}
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
        width: 1.5rem;
    }
</style>