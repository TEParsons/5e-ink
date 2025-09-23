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
    {#each Object.entries(stats.species.actions || []) as [i, action]}
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

    <!-- from background -->
     {#each Object.entries(stats.background.actions || []) as [i, action]}
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

    <!-- from custom -->
     {#each Object.entries(stats.custom.actions || []) as [i, action]}
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
                                <div class=icon>✨</div>
                                <div class=action-label>{cantrip.name} ({cls})</div>
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
                                <div class=icon>✨{{
                                    "first": "❶", 
                                    "second": "❷", 
                                    "third": "❸", 
                                    "fourth": "❹", 
                                    "fifth": "❺", 
                                    "sixth": "❻", 
                                    "seventh": "❼",
                                    "eighth": "❽",
                                    "ninth": "❾"
                                }[spell.level]}</div>
                                <div class=action-label>{spell.name} ({cls})</div>
                            </div>
                        {/snippet}

                        <SpellView 
                            bind:spell={stats.class[cls].levels[lvl].casting.spells[i]}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}
        {/each}

        <!-- from class subtype -->
        {#each Object.entries(stats.class[cls].subtype?.advancements || []) as [adv, advancement]}
            <!-- class actions -->
            {#each Object.entries(advancement.actions || []) as [i, action]}
                {#if action.time.type === time}
                    <DetailsCtrl>
                        {#snippet summary()}
                            <div class=action-summary>
                                <div class=icon>💼</div>
                                <div class=action-label>{action.name} ({stats.class[cls].subtype.name})</div>
                            </div>
                        {/snippet}

                        <ClassActionView 
                            bind:action={stats.class[cls].subtype.advancements[adv].actions[i]}
                            bind:slots={stats.class[cls].subtype.advancements[adv].actions[i].slots}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}

            <!-- cantrips -->
            {#each Object.entries(advancement.casting?.cantrips || []) as [i, cantrip]}
                {#if cantrip.time.type === time}
                    <DetailsCtrl>
                        {#snippet summary()}
                            <div class=action-summary>
                                <div class=icon>✨</div>
                                <div class=action-label>{cantrip.name} ({stats.class[cls].subtype.name})</div>
                            </div>
                        {/snippet}

                        <SpellView 
                            bind:spell={stats.class[cls].subtype.advancements[adv].casting.cantrips[i]}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}

            <!-- spells -->
            {#each Object.entries(advancement.casting?.spells || []) as [i, spell]}
                {#if spell.time.type === time}
                    <DetailsCtrl>
                        {#snippet summary()}
                            <div class=action-summary>
                                <div class=icon>✨{{
                                    "first": "❶", 
                                    "second": "❷", 
                                    "third": "❸", 
                                    "fourth": "❹", 
                                    "fifth": "❺", 
                                    "sixth": "❻", 
                                    "seventh": "❼",
                                    "eighth": "❽",
                                    "ninth": "❾"
                                }[spell.level]}</div>
                                <div class=action-label>{spell.name} ({stats.class[cls].subtype.name})</div>
                            </div>
                        {/snippet}

                        <SpellView 
                            bind:spell={stats.class[cls].subtype.advancements[adv].casting.spells[i]}
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