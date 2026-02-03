<script>
    import { onMount, onDestroy, getContext } from 'svelte';
    import Tooltip from '../tooltip/Tooltip.svelte';
    import { useSwipe } from 'svelte-gestures';

    let {
        /** @prop @type {String} Label for this page's tab */
        label,
        /** @prop @type {String} Tooltip for this page's tab (heading while printing) */
        tooltip="",
        /** @prop @type {boolean} Use an emoji for the page label? */
        emoji=false,
        /** @prop @type {function} Function to call when close button clicked (leave undefined for no close button) */
        close=undefined,
        /** @prop @type {String|undefined} Path to an icon for this page's tab */
        icon=undefined,
        /** @prop @type {boolean} Should this page start off with focus? */
        initial=false,
        /** @prop @type {boolean} Prevent this page from being showable */
        disabled=false,
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

{#if siblings.printing}
    <h1 
        class=print-header
        
    >
        <span
            style:font-family={emoji ? "var(--emoji)" : "var(--body"}
        >
            {label}
        </span>
        {tooltip}
    </h1>
    <div class=notebook-page>
        {@render children?.()}
    </div>
{:else}
    <!-- tab button for this page -->
    <button
        class="notebook-tab"
        class:current={selected}
        onclick={() => siblings.current = index}
        ondragover={() => siblings.current = index}
        disabled={disabled}
        bind:this={handle}
    >
        {#if icon}
            <svg>
                <use xlink:href={icon}></use>
            </svg>
        {/if}
        <span 
            class=label 
            style:font-family={emoji ? "var(--emoji)" : "var(--body"}>
            {label}
        </span>
        {#if close}
            <a
                class=close-btn
                href
                onclick={close}
            >⨉</a>
        {/if}
    </button>
    {#if selected}
        <div 
            {...useSwipe(
                evt => {
                    // we only care about swipes
                    if (evt.type === "swipe") {
                        if (evt.detail.direction === "left") {
                            // on swipe left, go to the next page
                            siblings.current = Math.min(index + 1, siblings.all.length - 1)
                        }
                        if (evt.detail.direction === "right") {
                            // on swipe right, go to the previous page
                            siblings.current = Math.max(index - 1, 0)
                        }
                    }
                }, 
                () => ({ timeframe: 300, minSwipeDistance: 50, touchAction: 'pan-y' }), 
                {}
            )}
            class="notebook-page"
            class:listbook={siblings.book === "listbook"}
            class:notebook={siblings.book === "notebook"}
        >
            {@render children?.()}
        </div>
    {/if}
{/if}


<style>
    .close-btn {
        text-decoration: none;
        color: var(--mantle);
    }
    .notebook-tab {
        display: grid;
        grid-template-columns: [icon] min-content [label] 1fr [close] min-content;
        gap: .5rem;
        border: none;
        padding: 1rem;
        margin: 0;
    }
    .notebook-tab:disabled {
        background-color: var(--mantle);
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
    
    .print-header {
        color: var(--base);
        background-color: var(--crust);
        padding: 1rem;
        text-align: center;
    }
    .print-header:not(:first-of-type) {
        break-before: page;
    }
</style>