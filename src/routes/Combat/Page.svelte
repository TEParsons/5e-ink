<script>
    import { getContext } from "svelte";
    import { getAdvancements, sourceIcons } from "$lib/utils.js";
    import HealthCtrl from "./HealthCtrl.svelte";
    import ArmourCtrl from "./ArmourCtrl.svelte";
    import MovementCtrl from "./MovementCtrl.svelte";
    import InitiativeCtrl from "./InitiativeCtrl.svelte";
    import ActionCtrl from "./ActionCtrl.svelte";
    import { TraitView, SpellView, ActionView, AttackView, ItemView } from "$lib/views";
    import { DetailsCtrl } from "$lib/ui/ctrls";

    let stats = getContext("stats")
</script>

{#snippet actions(time)}
    <div class=actions-ctrl>
        <!-- from items -->
        {#each Object.entries(stats.inventory.items) as [i, item]}
            {#if item.equipped}
                <!-- consumables -->
                {#if item.type === "consumable" && item.params?.time?.type === time }
                    <ActionCtrl
                        bind:action={stats.inventory.items[i]}
                        icon={sourceIcons.consumable}
                    >
                        <ItemView 
                            bind:item={stats.inventory.items[i]}
                        />
                    </ActionCtrl>
                {/if}
            {/if}
        {/each}

        <!-- from advancements -->
        {#each Object.entries(getAdvancements(stats, false)) as [source, advancements]}
            {#each advancements as advancement}

                <!-- attacks -->
                {#each Object.entries(advancement.attacks || []) as [i, attack]}
                    {#if attack.time.type === time}
                        <ActionCtrl
                            bind:action={advancement.attacks[i]}
                            icon={sourceIcons.weapon}
                        >
                            <AttackView 
                                bind:attack={advancement.attacks[i]}
                            />
                        </ActionCtrl>
                    {/if}
                {/each}
                
                <!-- actions -->
                {#each Object.entries(advancement.actions || []) as [i, action]}
                    {#if action.time.type === time}
                        <ActionCtrl
                            bind:action={advancement.actions[i]}
                            icon={sourceIcons[source]}
                        >
                            <ActionView 
                                bind:action={advancement.actions[i]}
                            />
                        </ActionCtrl>
                    {/if}
                {/each}

                <!-- cantrips -->
                {#each Object.entries(advancement.casting?.cantrips || []) as [i, cantrip]}
                    {#if cantrip.time.type === time}
                        <ActionCtrl
                            bind:action={advancement.casting.cantrips[i]}
                            icon={sourceIcons.spell}
                        >
                            <SpellView 
                                bind:spell={advancement.casting.cantrips[i]}
                            />
                        </ActionCtrl>
                    {/if}
                {/each}

                <!-- spells -->
                {#each Object.entries(advancement.casting?.spells || []) as [i, spell]}
                    {#if spell.time.type === time && stats.current.spellslots[spell.level]}
                        <ActionCtrl
                            bind:action={advancement.casting.spells[i]}
                            icon="{sourceIcons.spell}{
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
                            }"
                        >
                            <SpellView 
                                bind:spell={advancement.casting.spells[i]}
                            />
                        </ActionCtrl>
                    {/if}
                {/each}

            {/each}
        {/each}
    </div>
{/snippet}

<div class=page>
    <div class=stats>
        <div class=stat-output>
            <span class=label>
                Armour
            </span>
            <ArmourCtrl />
        </div>
        <div class=stat-output>
            <span class=label>
                Initiative
            </span>
            <InitiativeCtrl />
        </div>
        <div class=stat-output>
            <span class=label>
                Movement
            </span>
            <MovementCtrl />
        </div>
    </div>
    
    <HealthCtrl />

    <h3>Traits</h3>
    <div class=list-ctrl>
        {#each Object.entries(getAdvancements(stats, false)) as [source, advancements]}
            {#each advancements as advancement}
                {#each Object.entries(advancement.traits || []) as [i, trait]}
                    {#if trait?.tags?.includes("combat")}
                        <DetailsCtrl>
                            {#snippet summary()}
                                    <span class=icon>{sourceIcons[source]}</span>
                                    <span class=trait-label>{trait.name}</span>
                            {/snippet}

                            <TraitView 
                                bind:trait={advancement.traits[i]}
                            />
                        </DetailsCtrl>
                    {/if}
                {/each}
            {/each}
        {/each}
    </div>

    <h3>Actions</h3>
    {@render actions("action")}

    <h3>Bonus Actions</h3>
    {@render actions("bonusaction")}

    <h3>Reactions</h3>
    {@render actions("reaction")}
</div>

<style>
    .page {
        display: grid;
        margin: auto;
        max-width: 20cm;
        padding: 1rem;
    }

    .stats {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: stretch;
        gap: 1rem;
    }

    .stat-output {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        border: 2px solid var(--mantle);
        padding: .5rem;
        border-radius: .5rem;
    }

    .list-ctrl {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .actions-ctrl {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
</style>