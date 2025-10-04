<script>
    import Dialog from "$lib/ui/Dialog.svelte";
    import NewWeapon from "./items/NewWeapon.svelte";
    import { sentenceCase } from "$lib/utils.js";

    let {
        equipped
    } = $props()

    let showDlg = $state.raw(false);
    let show = $state({
        weapon: false
    });
</script>


<button
    class=add-item-btn
    onclick={evt => showDlg = true}
>+ Add</button>

<Dialog
    bind:shown={showDlg}
>
    {#each Object.keys(show) as key}
        <button
            class="option"
            onclick={evt => {
                // show relevant dialog
                show[key] = true;
                // close this dialog
                showDlg = false;
            }}
        >
            {sentenceCase(key)}
        </button>
    {/each}
</Dialog>

<NewWeapon 
    equipped={equipped}
    bind:shown={show.weapon}
/>

<style>
    .add-item-btn {
        padding: .5rem;
        background-color: var(--base);
        color: var(--crust);
        text-align: right;
    }

    .option {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .5rem;
        background-color: var(--base);
        color: var(--text-on-base);
        border: 1px solid var(--crust);
        border-radius: .5rem;
        padding: .5rem 1rem;
        text-align: left;
    }
</style>