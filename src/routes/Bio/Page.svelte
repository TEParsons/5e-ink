<script>
    import { getContext } from "svelte";
    import { NumberCtrl, TextCtrl } from "$lib/ui/ctrls";
    import SpeciesCtrl from "./Species.svelte";
    import AlignmentCtrl from "./Alignment.svelte";
    import PronounsCtrl from "./Pronouns.svelte";

    let stats = getContext("stats")
</script>

<div class=page>
    <div class=header>
        <img class=avatar src={stats.details.avatar} alt={stats.details.name} />
        <h1>
            <TextCtrl
                bind:value={stats.details.name}
            />
        </h1>
        <div class=levels>
            {#each Object.keys(stats.levels) as cls}
                <div class=level-ctrl>
                    Level <NumberCtrl 
                        bind:value={stats.levels[cls]}
                        min=1
                        max=30
                        interval=1
                    /> {cls}
                </div>
            {/each}
        </div>
    </div>
    <div>
        <h3>Demographics</h3>
        <div class=demographics>
            <span class=label>Species</span>
            <SpeciesCtrl />
            <span class=label>Alignment</span>
            <AlignmentCtrl />
            <span class=label>Pronouns</span>
            <PronounsCtrl />
        </div>

        <h3>Backstory</h3>
        <TextCtrl bind:value={stats.details.backstory} />
        
        <h3>Personality</h3>
        <h4>Traits</h4>
        <TextCtrl bind:value={stats.details.personality.traits} />
        <h4>Ideals</h4>
        <TextCtrl bind:value={stats.details.personality.ideals} />
        <h4>Bonds</h4>
        <TextCtrl bind:value={stats.details.personality.bonds} />
        <h4>Flaws</h4>
        <TextCtrl bind:value={stats.details.personality.flaws} />

        <h3>Organisations</h3>
        <dl>
            {#each Object.entries(stats.details.organisations) as [name, relation]}
                <div>
                    <dt>{name}</dt> 
                    <dd>{relation}</dd>
                </div>
            {/each}
        </dl>
        <h3>Allies</h3>
        <dl>
            {#each Object.entries(stats.details.allies) as [name, relation]}
                <div>
                    <dt>{name}</dt> 
                    <dd>{relation}</dd>
                </div>
            {/each}
        </dl>
        <h3>Enemies</h3>
        <dl>
            {#each Object.entries(stats.details.enemies) as [name, relation]}
                <div>
                    <dt>{name}</dt> 
                    <dd>{relation}</dd>
                </div>
            {/each}
        </dl>
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

    .header .levels {
        display: flex;
        flex-direction: column;
        align-items: start;
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

    p {
        margin-top: 0;
    }

    dt {
        font-weight: bold;
        font-style: italic;
        display: inline;
    }

    dd {
        margin-left: .5rem;
        display: inline;
    }
</style>