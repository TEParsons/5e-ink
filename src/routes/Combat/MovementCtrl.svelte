<script>
    import { getContext } from "svelte";
    
    let stats = getContext("stats");

    let swim = $derived.by(() => {
        // assume no swim for now
        let output = undefined;

        return output
    })
    let fly = $derived.by(() => {
        // assume no fly
        let output = undefined;
        // aarakocra get 50ft flying (unless in >= medium armour)
        if (stats.species.name === "aarakocra") {
            if (["medium", "heavy"].includes(types[armour.params.armourtype].categ)) {
                output = 25
            } else {
                output= 50
            }
        }

        return output
    })
    let climb = $derived.by(() => {
        // assume no fly for now
        let output = undefined;

        return output
    })
    let dig = $derived.by(() => {
        // assume no fly for now
        let output = undefined;

        return output
    })
</script>

<div 
    class=movement-ctrl
>
    <span 
        id=movement
    >
        {stats.species.movement}ft.
    </span>
    {#if swim !== undefined}
        <span 
            id=movement-swim
        >
            🐟 {swim}ft.
        </span>
    {/if}
    {#if fly !== undefined}
        <span 
            id=movement-fly
        >
            🕊️ {fly}ft.
        </span>
    {/if}
</div>
<style>
    .movement-ctrl {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #movement {
        font-size: 1.5rem;
    }
</style>