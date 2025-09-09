<script>
    let {
        value=$bindable(),
        multiline=false
    } = $props()

    let ctrl = $state.raw();

    $effect(() => {
        if (value) {
            ctrl.style.height = "";
            ctrl.style.height = `calc(${ctrl.scrollHeight}px + .5rem)`;
        }
    })

</script>


<textarea 
    class="input text"
    bind:value={value}
    bind:this={ctrl}
></textarea>


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
</style>