<script>
    import { setContext } from "svelte";

    import AbilitiesPage from "./Abilities/Page.svelte";
    import SpellsPage from "./Spells/Page.svelte";
    import CombatPage from "./Combat/Page.svelte";
    import InventoryPage from "./Inventory/Page.svelte";
    import BioPage from "./Bio/Page.svelte";
    import SettingsPage from "./Settings/Page.svelte";

    import Cerys from "$lib/cerys.json";
    import { Notebook, NotebookPage } from "$lib/ui/notebook";

    let stats = $state(Cerys);
    setContext("stats", stats)

    let prefs = $state({
        edit: false
    })
    setContext("prefs", prefs)

    
</script>

<div class=content>
    <Notebook>
        <NotebookPage
            label="📋"
        >
            <AbilitiesPage />
        </NotebookPage>
        <NotebookPage
            label="⚔︎"
        >
            <CombatPage />
        </NotebookPage>
        <NotebookPage
            label="✨"
        >
            <SpellsPage />
        </NotebookPage>
        <NotebookPage
            label="🪎"
        >
            <InventoryPage />
        </NotebookPage>
        <NotebookPage
            label="👤"
        >
            <BioPage />
        </NotebookPage>
        <NotebookPage
            label="≡"
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
