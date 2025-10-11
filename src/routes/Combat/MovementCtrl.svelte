<script>
    import { getAdvancements } from "$lib/utils";
    import { getContext } from "svelte";
    
    let stats = getContext("stats");

    let icons = {
        walk: undefined,
        swim: "🐟",
        fly: "🦅",
        burrow: "🦡",
        climg: "🐒",
        hover: "🚁"
    }

    let movement = $derived.by(() => {
        let output = {};
        // iterate through advancements
        for (let source of getAdvancements(stats)) {
            // look for buffs to movement
            for (let key of Object.keys(source.buffs?.movement || {})) {
                // make sure key exists
                output[key] = output[key] || 0
                // do any addition
                output[key] += source.buffs?.movement?.[key]?.add || 0
                // do any subtraction
                output[key] -= source.buffs?.movement?.[key]?.sub || 0
                // do any setting
                output[key] = Math.max(source.buffs?.movement?.[key]?.set || output[key])
            }
        }
        
        return output
    })
</script>

<div 
    class=movement-ctrl
>
    {#each Object.keys(movement) as key}
        {#if movement[key] && movement[key] > 0}
            <span
                style:font-size={key === "walk" ? "1.5rem" : "inherit"}
            >
                <span class=icon>{icons[key]}</span>
                {movement[key]}ft.
            </span>
        {/if}
    {/each}
</div>
<style>
    .movement-ctrl {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .icon {
        font-family: var(--emoji);
    }
</style>