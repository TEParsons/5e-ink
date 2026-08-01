<script>
    let {
        value=$bindable(),
    } = $props()
</script>


<button
    onclick={evt => value = !value}
    aria-label="checkbox"
>
    <svg class=icon>
        <use xlink:href="assets/proficiency/{value ? "full" : "none"}.svg" />
    </svg>
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