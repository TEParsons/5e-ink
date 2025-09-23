<script>
    import { level2proficiency, totalLevels, score2modifier, getScore } from "$lib/utils.js"
    import { getContext } from "svelte";
    
    let stats = getContext("stats");

    let modifiers = $derived.by(() => {
        let output = {};
        
        for (let key of Object.keys(stats.class)) {
            output[key] = score2modifier(getScore(stats, stats.class[key].spellcasting))
        }

        return output
    })
    
    let attacks = $derived.by(() => {
        let output = {};

        for (let key of Object.keys(stats.class)) {
            output[key] = modifiers[key] + level2proficiency(Object.keys(stats.class[key].levels).length)
            console.log(modifiers[key], Object.keys(stats.class[key].levels).length)
        }

        return output
    })

    let saves = $derived.by(() => {
        let output = {};

        for (let key of Object.keys(stats.class)) {
            output[key] = 8 + attacks[key]
        }

        return output
    })
</script>


<div class=stats>
    <div class=stat-output>
        <span class=label>
            Modifier
        </span>
        {#each Object.entries(modifiers) as [cls, modifier]}
            <div class=value>
                {modifier >= 0 ? `+${modifier}` : `${modifier}`}
                {#if Object.keys(modifiers).length > 1}
                    <span class=label>({cls})</span>
                {/if}
            </div>
        {/each}
    </div>
    <div class=stat-output>
        <span class=label>
            Attack
        </span>
        {#each Object.entries(attacks) as [cls, attack]}
            <div class=value>
                {attack >= 0 ? `+${attack}` : `${attack}`}
                {#if Object.keys(attacks).length > 1}
                    <span class=label>({cls})</span>
                {/if}
            </div>
        {/each}
    </div>
    <div class=stat-output>
        <span class=label>
            Save DC
        </span>
        {#each Object.entries(saves) as [cls, save]}
            <div class=value>
                {save >= 0 ? `+${save}` : `${save}`}
                {#if Object.keys(saves).length > 1}
                    <span class=label>({cls})</span>
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
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

    .stat-output .label,
    .stat-output .value .label {
        font-size: 1rem;
    }

    .stat-output .value {
        white-space: nowrap;
        font-size: 1.5rem;
    }
</style>