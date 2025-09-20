<script>
    import { setContext } from "svelte";

    import AbilitiesPage from "./Abilities/Page.svelte";
    import SpellsPage from "./Spells/Page.svelte";
    import CombatPage from "./Combat/Page.svelte";
    import InventoryPage from "./Inventory/Page.svelte";
    import BioPage from "./Bio/Page.svelte";
    import SettingsPage from "./Settings/Page.svelte";

    import Cerys from "$lib/cerys.json";
    import Yiig from "$lib/yiig.json";
    import Paran from "$lib/paran.json";
    import { Notebook, NotebookPage } from "$lib/ui/notebook";

    let stats = $state(Paran);
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
        >
            <AbilitiesPage />
        </NotebookPage>
        <NotebookPage
            label="⚔︎"
        >
            <CombatPage />
        </NotebookPage>
        {#if caster}
            <NotebookPage
                label="✨"
            >
                <SpellsPage />
            </NotebookPage>
        {/if}
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
