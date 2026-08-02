<script>
    let {
        label=undefined,
        icon=undefined,
        onclick=evt => {}
    } = $props()
</script>

<button
    onclick={onclick}
>
    {#if icon?.endsWith?.(".svg")}
        <svg class=icon>
            <use xlink:href={icon} />
        </svg>
    {:else if icon}
        <span class=icon>
            {icon}
        </span>
    {/if}
    {#if label}
        {label}
    {/if}
</button>

<style>
    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .25rem;
        background-color: transparent;
        color: var(--crust);
        padding: .5rem;
        border: none;
        outline: none;
        text-wrap: nowrap;
        font-family: var(--head);
    }

    .icon {
        font-size: 1.2rem;
        font-family: var(--emoji);
    }

    svg.icon {
        height: 1em;
        width: 1em;
    }
</style>