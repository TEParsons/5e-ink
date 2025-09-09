<script>
    import { getContext } from "svelte";

    let prefs = getContext("prefs");

    let {
        value=$bindable(),
        multiline=false,
        edit=prefs.edit
    } = $props()

    let ctrl = $state.raw();

    $effect(() => {
        if (ctrl && value) {
            ctrl.style.height = "";
            ctrl.style.height = `calc(${ctrl.scrollHeight}px + .5rem)`;
        }
    })

</script>

{#if edit}
    <textarea 
        class="input text"
        bind:value={value}
        bind:this={ctrl}
    ></textarea>
{:else}
    {#each String(value).split("\n") as line}
        <p>{line}</p>
    {/each}
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
    }

    p {
        margin-top: 0;
        margin-bottom: .5rem;
    }
</style>