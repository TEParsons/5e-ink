<script>
    import { setContext } from "svelte";

    import AbilitiesPage from "./Abilities/Page.svelte";
    import SpellsPage from "./Spells/Page.svelte";
    import CombatPage from "./Combat/Page.svelte";
    import InventoryPage from "./Inventory/Page.svelte";
    import BioPage from "./Bio/Page.svelte";
    import SettingsPage from "./Settings/Page.svelte";
    import { Notebook, NotebookPage } from "$lib/ui/notebook";
    import Yiig from "$lib/characters/yiig.json"

    let stats = $state(Yiig);
    setContext("stats", stats)

    let prefs = $state({
        printing: false,
        edit: false
    })
    setContext("prefs", prefs)

    // if no class has a spellcasting ability, we don't need a spells page
    let caster = $derived(
        Object.values(stats.class).every(val => val.spellcasting)
    )
</script>

<svelte:window 
    onbeforeprint={evt => prefs.printing = true}
    onafterprint={evt => prefs.printing = false}
/>
<svelte:head>
    <title>
        {prefs.printing ? stats.details.name : `5e Ink: ${stats.details.name}`}
    </title>
</svelte:head>

<div class=content>
    <Notebook>
        <NotebookPage
            label="📋"
            tooltip="Abilities"
            emoji
        >
            <AbilitiesPage />
        </NotebookPage>
        <NotebookPage
            label="⚔︎"
            tooltip="Combat"
            emoji
        >
            <CombatPage />
        </NotebookPage>
        {#if caster}
            <NotebookPage
                label="✨"
                tooltip="Spells"
                emoji
            >
                <SpellsPage />
            </NotebookPage>
        {/if}
        <NotebookPage
            label="🪎"
            tooltip="Inventory"
            emoji
        >
            <InventoryPage />
        </NotebookPage>
        <NotebookPage
            label="👤"
            tooltip="Biography"
            emoji
        >
            <BioPage />
        </NotebookPage>
        <NotebookPage
            label="≡"
            tooltip="Settings"
            emoji
            initial
        >
            <SettingsPage />
        </NotebookPage>
    </Notebook>
</div>

<style>
    .content {
        position: relative;
        min-height: 100vh;
        background-color: var(--base);
        color: var(--text-on-base);
    }
</style>
