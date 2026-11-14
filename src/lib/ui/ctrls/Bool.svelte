<script>
    import Icon from "$lib/ui/Icon.svelte";

    let {
        value=$bindable(),
    } = $props()
</script>


<button
    onclick={evt => value = !value}
    aria-label="checkbox"
>
    <Icon 
        file="/assets/proficiency/{value ? "full" : "none"}.svg"
    />
</button>

<style>
    button {
        border: none;
        outline: none;
        background-color: transparent;
        color: var(--overlay);
        padding: 0;
        font-size: 1.5rem;
    }
</style>