<script>
    import { getContext, onMount } from "svelte";

    let {
        callback,
        label="+"
    } = $props()

    let hovered = $state.raw(false)

    let siblings = getContext("siblings")
    // tell parent that this button exists
    siblings.buttons += 1
</script>


<button
    onclick={callback}
>
    {label}
</button>

<style>
    button {
        position: relative;
        color: var(--text-on-crust);
        background-color: var(--crust);        
        z-index: 2;
        border-radius: 0;
    }

</style>