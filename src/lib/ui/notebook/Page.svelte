<script>
    import { onMount, onDestroy, getContext } from 'svelte';
    import Tooltip from '../tooltip/Tooltip.svelte';

    let {
        /** @prop @type {String} Label for this page's tab */
        label,
        /** @prop @type {String|undefined} Path to an icon for this page's tab */
        icon=undefined,
        /** @prop @type {boolean} Should this page start off with focus? */
        initial=false,
        /** @interface @type {Array<HTMLElement>} Contents of this page */
        children=undefined
    } = $props()

    // get context
    let siblings = getContext("siblings")
    // get own handle
    let handle;
    // get own index
    let index = $derived(siblings.all.indexOf(handle))

    let selected = $derived(siblings.current === index)
    
    // register self with notebook on mount
    onMount(() => {
        siblings.all.push(handle)
    })
    // show self if no page is shown
    $effect(() => {
        if (siblings.current === undefined && initial) {
            siblings.current = index;
        }
    })
    // unregister on destroy
    onDestroy(() => {
        if (siblings.all[index] !== undefined) {
            delete siblings.all[index]
        }
        if (siblings.data[index] !== undefined) {
            delete siblings.data[index]
        }
    })

    let closeHovered = $state.raw(false)
</script>

<!-- tab button for this page -->
<button
    class="notebook-tab"
    class:current={selected}
    onclick={() => siblings.current = index}
    ondragover={() => siblings.current = index}
    bind:this={handle}
>
    {#if icon}
        <svg>
            <use xlink:href={icon}></use>
        </svg>
    {/if}
    <span class=label>
        {label}
    </span>
</button>
{#if selected}
    <div 
        class="notebook-page"
        class:listbook={siblings.book === "listbook"}
        class:notebook={siblings.book === "notebook"}
    >
        {@render children?.()}
    </div>
{/if}

<style>
    .notebook-tab {
        display: grid;
        font-family: var(--emoji);
        grid-template-columns: [icon] min-content [label] 1fr [close] min-content;
        gap: .5rem;
        border: none;
        padding: 1rem;
        margin: 0;
    }
    .notebook-tab .label {
        grid-column-start: label;
        text-wrap: nowrap;
    }
    .notebook-tab {
        grid-row-start: tabs;
        text-align: center;
        background-color: var(--crust);
        color: var(--text-on-crust);
    }
    .notebook-tab.current {
        background-color: var(--base);
        color: var(--text-on-base);
        z-index: 2;
    }
    .notebook-page {
        position: relative;
        height: auto;
        overflow-y: auto;
        width: 100%;
        overflow-x: auto;
        padding: .5rem .5rem 3rem .5rem;
        box-sizing: border-box;
        background-color: var(--base);
        z-index: 1;
    }
    .notebook-page.notebook {
        grid-row-start: pages;
        grid-column-start: start;
        grid-column-end: end;
    }
    

</style>