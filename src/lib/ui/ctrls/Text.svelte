<script>
    import { getContext, onMount } from "svelte";

    let prefs = getContext("prefs");

    let {
        value=$bindable(),
        multiline=false,
        edit=prefs.edit
    } = $props()

    let ctrl = $state.raw();

    function resize(evt) {
        if (ctrl) {
            ctrl.style.height = "";
            ctrl.style.height = `calc(${ctrl.scrollHeight}px + .5rem)`;
        }
    }

    $effect(() => {
        if (value) {
            resize()
        }
    })

</script>

{#if edit}
    {#if multiline}
        <textarea 
            class="input text"
            onfocus={resize}
            bind:this={ctrl}
            bind:value={value}
        ></textarea>
    {:else}
        <input
            class="input text"
            type=text
            bind:value={value}
        />
    {/if}
{:else}
    {#if multiline}
        {#each String(value).split("\n") as line}
            <p>{line}</p>
        {/each}
    {:else}
        <span>{value}</span>
    {/if}
{/if}

<style>
    .input.text {
        font-family: var(--body);
        font-size: inherit;
        width: 100%;
        color: var(--crust);
        background-color: var(--base);
        border: none;
        outline: none;
        border-bottom: 1px solid var(--crust);
        border-radius: 0;
        padding: .25rem .5rem;
        box-sizing: border-box;
        resize: none;
        overflow: hidden;
        min-height: 1rem;
    }

    p {
        margin-top: 0;
        margin-bottom: .5rem;
    }
</style>