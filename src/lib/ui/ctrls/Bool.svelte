<script>
    import { Icon } from "@svelte/einkui/icon";

    let {
        value=$bindable(),
    } = $props()
</script>


<button
    onclick={evt => value = !value}
    aria-label="checkbox"
>
    <Icon 
        src="/assets/proficiency/{value ? "full" : "none"}.svg#root"
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