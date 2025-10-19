<script>
    import { getContext } from "svelte";
    import { getAdvancements, sourceIcons } from "$lib/utils.js";
    import { DetailsCtrl } from "$lib/ui/ctrls"
    import { SpellView, ActionView, AttackView, ItemView } from "$lib/views";

    let {
        time
    } = $props()

    let stats = getContext("stats");

    let restore = $state.raw({});

</script>


<div class=actions-ctrl>
    <!-- from items -->
    {#each Object.entries(stats.inventory.items) as [i, item]}
        {#if item.equipped}
            <!-- consumables -->
            {#if item.type === "consumable" && item.params?.time?.type === time }
                <DetailsCtrl
                    onopen={evt => restore = $state.snapshot(item)}
                    buttons={{
                        OK: evt => {},
                        CANCEL: evt => Object.assign(item, restore)
                    }}
                >
                    {#snippet summary()}
                        <div class=action-summary>
                            <div class=icon>{sourceIcons.consumable}</div>
                            <div class=action-label>{item.name} ({item.type})</div>
                        </div>
                    {/snippet}
                    
                    <ItemView 
                        bind:item={stats.inventory.items[i]}
                    />
                </DetailsCtrl>
            {/if}
        {/if}
    {/each}

    <!-- from advancements -->
    {#each Object.entries(getAdvancements(stats, false)) as [source, advancements]}
        {#each advancements as advancement}

            <!-- attacks -->
            {#each Object.entries(advancement.attacks || []) as [i, attack]}
                {#if attack.time.type === time}
                    <DetailsCtrl
                        onopen={evt => restore = $state.snapshot(attack)}
                        buttons={{
                            OK: evt => {},
                            CANCEL: evt => Object.assign(attack, restore)
                        }}
                    >
                        {#snippet summary()}
                            <span class=icon>{sourceIcons.weapon}</span>
                            <span class=trait-label>{attack.name}</span>
                        {/snippet}

                        <AttackView 
                            bind:attack={advancement.attacks[i]}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}
            
            <!-- actions -->
            {#each Object.entries(advancement.actions || []) as [i, action]}
                {#if action.time.type === time}
                    <DetailsCtrl
                        onopen={evt => restore = $state.snapshot(action)}
                        buttons={{
                            OK: evt => {},
                            CANCEL: evt => Object.assign(action, restore)
                        }}
                    >
                        {#snippet summary()}
                            <span class=icon>{sourceIcons[source]}</span>
                            <span class=trait-label>{action.name}</span>
                        {/snippet}

                        <ActionView 
                            bind:action={advancement.actions[i]}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}

            <!-- cantrips -->
            {#each Object.entries(advancement.casting?.cantrips || []) as [i, cantrip]}
                {#if cantrip.time.type === time}
                    <DetailsCtrl
                        onopen={evt => restore = $state.snapshot(cantrip)}
                        buttons={{
                            OK: evt => {},
                            CANCEL: evt => Object.assign(cantrip, restore)
                        }}
                    >
                        {#snippet summary()}
                            <div class=icon>{sourceIcons.spell}</div>
                            <div class=action-label>{cantrip.name}</div>
                        {/snippet}

                        <SpellView 
                            bind:spell={advancement.casting.cantrips[i]}
                        />
                    </DetailsCtrl>
                {/if}
            {/each}

            <!-- spells -->
            {#each Object.entries(advancement.casting?.spells || []) as [i, spell]}
                {#if spell.time.type === time}
                    <DetailsCtrl
                        onopen={evt => restore = $state.snapshot(spell)}
                        buttons={{
                            OK: evt => {},
                            CANCEL: evt => Object.assign(spell, restore)
                        }}
                    >
                        {#snippet summary()}
                            <div class=icon>{sourceIcons.spell}{
                                {
                                    "first": "❶", 
                                    "second": "❷", 
                                    "third": "❸", 
                                    "fourth": "❹", 
                                    "fifth": "❺", 
                                    "sixth": "❻", 
                                    "seventh": "❼",
                                    "eighth": "❽",
                                    "ninth": "❾"
                                }[spell.level]
                            }</div>
                            <div class=action-label>{spell.name}</div>
                        {/snippet}

                        <SpellView 
                            bind:spell={advancement.casting.spells[i]}
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