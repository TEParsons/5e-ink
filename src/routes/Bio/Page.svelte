<script>
    import { getContext } from "svelte";
    import { NumberCtrl } from "$lib/ui/ctrls"

    let stats = getContext("stats")
</script>

<div class=page>
    <div class=header>
        <img class=avatar src={stats.bio.avatar} alt={stats.bio.name} />
        <h1>{stats.bio.name}</h1>
        <i class=tagline>{stats.species} | {stats.bio.characteristics.alignment} | {stats.bio.characteristics.pronouns}</i>
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
        <h3>Backstory</h3>
        {#each stats.bio.backstory.split("\n") as line}
        <p>{line}</p>
        {/each}
        <h3>Personality</h3>
        <dl>
            <div>
                <dt>Traits</dt>
                <dd>{stats.bio.personality.traits}</dd>
            </div>
            <div>
                <dt>Ideals</dt>
                <dd>{stats.bio.personality.ideals}</dd>
            </div>
            <div>
                <dt>Bonds</dt>
                <dd>{stats.bio.personality.bonds}</dd>
            </div>
            <div>
                <dt>Flaws</dt>
                <dd>{stats.bio.personality.flaws}</dd>
            </div>
        </dl>
        <h3>Organisations</h3>
        <dl>
            {#each Object.entries(stats.bio.organisations) as [name, relation]}
                <div>
                    <dt>{name}</dt> 
                    <dd>{relation}</dd>
                </div>
            {/each}
        </dl>
        <h3>Allies</h3>
        <dl>
            {#each Object.entries(stats.bio.allies) as [name, relation]}
                <div>
                    <dt>{name}</dt> 
                    <dd>{relation}</dd>
                </div>
            {/each}
        </dl>
        <h3>Enemies</h3>
        <dl>
            {#each Object.entries(stats.bio.enemies) as [name, relation]}
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
    .tagline {
        color: var(--mantle);
        font-size: 1rem;
        font-style: italic;
        line-height: 1rem;
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