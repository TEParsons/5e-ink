<script>
    import { DetailsCtrl } from "$lib/ui/ctrls";

    let {
        spell
    } = $props()

    let dialog = $state.raw()
</script>

<DetailsCtrl>
    {#snippet summary()}
        <div class=spell-summary>
            <span class=name>{spell.name}</span>
            <span class=time>{spell.time}</span>
        </div>
    {/snippet}
    
    <h1>
        {spell.name}
    </h1>
    {#each spell.description.split("\n") as line}
        <p>{line}</p>
    {/each}
</DetailsCtrl>


<style>
    .name {
        font-weight: bold;
    }

    .spell-summary {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        justify-content: space-between;
    }
</style>