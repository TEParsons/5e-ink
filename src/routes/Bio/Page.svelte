<script>
    import { getContext } from "svelte";
    import { NumberCtrl, TextCtrl, MarkdownCtrl, DictionaryCtrl, EditToggle } from "$lib/ui/ctrls";
    import SpeciesCtrl from "./Species.svelte";
    import AlignmentCtrl from "./Alignment.svelte";
    import PronounsCtrl from "./Pronouns.svelte";
    import LevelsCtrl from "../Levels/LevelsCtrl.svelte";

    let stats = getContext("stats")
    let edit = $state.raw(false)
</script>

<div class=page>
    <div class=header>
        <img class=avatar src={stats.details.avatar} alt={stats.details.name} />
        <h1>
            <TextCtrl
                bind:value={stats.details.name}
                edit={edit}
            />
            <EditToggle 
                bind:value={edit}
            />
        </h1>
        <LevelsCtrl />
        
    </div>
    <div>
        <h3>Demographics</h3>
        <div class=demographics>
            <span class=label>Species</span>
            <SpeciesCtrl 
                edit={edit}
            />
            <span class=label>Alignment</span>
            <AlignmentCtrl 
                edit={edit}
            />
            <span class=label>Pronouns</span>
            <PronounsCtrl 
                edit={edit}
            />
        </div>

        <h3>Backstory</h3>
        <MarkdownCtrl 
            bind:value={stats.details.backstory} 
            edit={edit}
        />
        
        <h3>Personality</h3>
        <h4>Traits</h4>
        <MarkdownCtrl 
            bind:value={stats.details.personality.traits} 
            edit={edit}
        />
        <h4>Ideals</h4>
        <MarkdownCtrl 
            bind:value={stats.details.personality.ideals} 
            edit={edit}
        />
        <h4>Bonds</h4>
        <MarkdownCtrl 
            bind:value={stats.details.personality.bonds} 
            edit={edit}
        />
        <h4>Flaws</h4>
        <MarkdownCtrl 
            bind:value={stats.details.personality.flaws} 
            edit={edit}
        />

        <h3>Organisations</h3>
        <DictionaryCtrl 
            bind:value={stats.details.organisations}
            edit={edit}
        />
        <h3>Allies</h3>
        <DictionaryCtrl 
            bind:value={stats.details.allies}
            edit={edit}
        />
        
        <h3>Enemies</h3>
        <DictionaryCtrl 
            bind:value={stats.details.enemies}
            edit={edit}
        />
    </div>
</div>

<style>
    .page {
        margin: auto;
        max-width: 20cm;
        padding: 1rem;
    }
    .header {
        display: grid;
        grid-template-columns: 8rem 1fr;
        grid-template-rows: min-content min-content 1fr;
        gap: .5rem 1rem;
        align-content: start;
        
    }

    .header h1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: .5rem;
        margin: 0;
    }
    .demographics {
        display: grid;
        grid-template-columns: [labels] min-content [ctrls] 1fr;
        align-items: center;
        justify-items: start;
        gap: 0 1rem;
    }
    .demographics .label {
        font-style: italic;
        grid-column-start: labels;
        justify-self: end;
    }

    

    .avatar {
        width: 100%;
        border-radius: 50%;
        grid-row-end: span 3;
    }

    h3, h4 {
        margin-top: 1rem;
        margin-bottom: 0.5rem;
    }
</style>