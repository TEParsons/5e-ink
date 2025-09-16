<script>
    import { getContext } from "svelte";
    import { NumberCtrl } from "$lib/ui/ctrls";

    let {
        cls
    } = $props()

    let stats = getContext("stats");


</script>

<div class=cls-mgr>
    <h2>
        Level
        <NumberCtrl 
            label="Level"
            bind:value={stats.class[cls].levels}
            min={0}
            max={30}
            edit
        />
    </h2>
    {#each [...Array(stats.class[cls].levels + 1).keys()].slice(1) as lvl}
        <h3>Level {lvl}</h3>
        {#if lvl > 1}
            <div>
                Hit die roll:
                <NumberCtrl 
                    bind:value={stats.class[cls].hitdice.rolls[lvl-2]}
                    min={1}
                    max={stats.class[cls].hitdice.die}
                />
            </div>
        {/if}
    {/each}
</div>

<style>
    .cls-mgr {
        padding: 1rem;
    }
</style>