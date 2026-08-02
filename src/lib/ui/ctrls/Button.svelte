<script>
    let {
        label=undefined,
        icon=undefined,
        onclick=evt => {},
        confirmation=false,
        handle=$bindable()
    } = $props()

    let confirming = $state.raw(false);
</script>

<button
    bind:this={handle}
    onclick={evt => {
        if (confirmation) {
            if (confirming) {
                onclick(evt)
                confirming = false
            } else {
                confirming = true
            }
        } else {
            onclick(evt)
        }        
    }}
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
        {#if confirming}
            Confirm?
        {:else}
            {label}
        {/if}
    {/if}
</button>

<svelte:window onclick={evt => {
    // cancel confirmation if clicked off button
    if (confirming && evt.target !== handle) {
        confirming = false
    }
}} />

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