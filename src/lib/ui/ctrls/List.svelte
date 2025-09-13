<script>
    import { getContext } from "svelte";
    import TextCtrl from "./Text.svelte";
    import NumberCtrl from "./Number.svelte";

    let prefs = getContext("prefs")

    let {
        value=$bindable(),
        label,
        valType="text",
        edit=prefs.edit
    } = $props();
</script>
<div 
    class=list-ctrl
    style:display={edit ? "flex" : "inline"}
>
    {#if edit}
        <h4>{label}</h4>
        {#each Object.keys(value) as i}
            <div class=list-item>
                {#if valType === "text"}
                    <TextCtrl 
                        bind:value={value[i]}
                        edit
                    />
                {/if}
                {#if valType === "number"}
                    <NumberCtrl 
                        bind:value={value[i]} 
                        edit
                    />
                {/if}
                <button 
                    class=delete-btn
                    onclick={evt => delete value[i]}
                >✕</button>
            </div>
        {/each}
        <button 
            class=add-btn
            onclick={evt => value.push("")}
        >+</button>
    {:else}
        <b>{label}:</b> {value.join(", ")}
    {/if}
</div>

<style>
    .list-ctrl {
        flex-direction: column;
        gap: .5rem;
    }

    .list-item {
        display: flex;
        flex-direction: row;
        gap: .5rem;
        align-items: start;
    }

    button {
        background-color: var(--crust);
        color: var(--text-on-crust);
        border-radius: .5rem;
    }
</style>