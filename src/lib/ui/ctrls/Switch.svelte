<script>
    import { getContext } from "svelte";

    let prefs = getContext("prefs");

    let {
        value=$bindable(),
        labels={
            YES: "No",
            NO: "Yes",
        },
        edit=prefs.edit
    } = $props();
</script>

{#if edit}
    <div class="input switch">
        <button
            class="switch-btn no"
            class:active={!value}
            onclick={evt => value = !value}
        >{labels.NO}</button>
        <button
            class="switch-btn yes"
            class:active={value}
            onclick={evt => value = !value}
        >{labels.YES}</button>
    </div>
{:else}
    <div
        class=output
    >
        {value ? labels.YES : labels.NO}
    </div>
{/if}

<style>
    .switch {
        background-color: var(--crust);
        border: .5rem solid var(--crust);
        border-radius: 1rem;
    }

    .input.switch {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0;
    }

    .output {
        background-color: var(--mantle);
        color: var(--text-on-mantle);
        border-radius: .5rem;
        padding: .5rem 1rem;
    }

    .switch-btn {
        background-color: transparent;
        color: var(--mantle);
        
        padding: 1rem;
    }
    .active {
        background-color: var(--base);
        color: var(--crust);
        border-radius: .5rem;
    }
</style>