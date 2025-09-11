<script>
    import { getContext, onMount, untrack } from "svelte";
    import { SlotsCtrl } from "$lib/ui/ctrls";

    let stats = getContext("stats")

    let deathSaves = $state.raw(4);
    // reset saves on load
    onMount(() => deathSaves = 4);

    // on stablisation, reset health
    $effect(() => {
        if (deathSaves === 1) {
            untrack(() => stats.health.current = 1)
        }
    })
</script>

<h3>Death saves</h3>
<div class=death-saves-ctrl>
    <span 
        class=death-save-label
        style:opacity={(deathSaves-1)/3}
    >Dead</span>
    <SlotsCtrl
        bind:value={deathSaves}
        total={6}
        edit={false}
    />
    <span 
        class=death-save-label
        style:opacity={(7-deathSaves)/3}
    >Stable</span>
</div>

<style>
    .death-saves-ctrl {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
    }
</style>