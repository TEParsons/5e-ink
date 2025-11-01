<script>
    let {
        label,
        onclick=evt => {}
    } = $props()
</script>

<button
    onclick={onclick}
>{label}</button>

<style>
    button {
        padding: .5rem;
        background-color: var(--base);
        color: var(--crust);
        text-wrap: nowrap;
    }
</style>