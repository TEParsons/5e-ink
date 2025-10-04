<script>
    let {
        value=$bindable()
    } = $props();
</script>

<button 
    class="icon toggle" 
    onclick={evt => value = !value}
>
    {value ? "👁" : "✎"}
</button>

<style>
    .toggle {
        background-color: transparent;
        font-size: inherit;
        padding: 0;
        margin: 0;
    }
    .icon {
        font-family: var(--emoji);
    }
</style>