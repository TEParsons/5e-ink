<script>
    import { setContext } from "svelte";

    import AbilitiesPage from "./Abilities/Page.svelte";
    import SpellsPage from "./Spells/Page.svelte";
    import CombatPage from "./Combat/Page.svelte";
    import InventoryPage from "./Inventory/Page.svelte";
    import BioPage from "./Bio/Page.svelte";

    import Cerys from "$lib/cerys.json";
    import { Notebook, NotebookPage } from "$lib/ui/notebook";

    let stats = $state(Cerys)

    setContext("stats", stats)
</script>

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
</Notebook>

