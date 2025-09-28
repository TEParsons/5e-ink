<script>
    import { setContext } from "svelte";

    import AbilitiesPage from "./Abilities/Page.svelte";
    import SpellsPage from "./Spells/Page.svelte";
    import CombatPage from "./Combat/Page.svelte";
    import InventoryPage from "./Inventory/Page.svelte";
    import BioPage from "./Bio/Page.svelte";
    import SettingsPage from "./Settings/Page.svelte";
    import { Notebook, NotebookPage } from "$lib/ui/notebook";

    import Cerys from "$lib/cerys.json";
    import Yiig from "$lib/yiig.json";
    import Paran from "$lib/paran.json";
    import Brainworm from "$lib/brainworm.json";

    let stats = $state(Brainworm);
    setContext("stats", stats)

    let prefs = $state({
        edit: false
    })
    setContext("prefs", prefs)

    // if no class has a spellcasting ability, we don't need a spells page
    let caster = $derived(
        Object.values(stats.class).every(val => val.spellcasting)
    )

    
</script>

<div class=content>
    <Notebook>
        <NotebookPage
            label="📋"
            emoji
        >
            <AbilitiesPage />
        </NotebookPage>
        <NotebookPage
            label="⚔︎"
            emoji
        >
            <CombatPage />
        </NotebookPage>
        {#if caster}
            <NotebookPage
                label="✨"
                emoji
            >
                <SpellsPage />
            </NotebookPage>
        {/if}
        <NotebookPage
            label="🪎"
            emoji
        >
            <InventoryPage />
        </NotebookPage>
        <NotebookPage
            label="👤"
            emoji
        >
            <BioPage />
        </NotebookPage>
        <NotebookPage
            label="≡"
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
