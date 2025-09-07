<script>
    import { setContext } from 'svelte';
    import Tooltip from '$lib/ui/tooltip/Tooltip.svelte';

    let {
        /** @prop @type {function} Function to execute when the page is changed */
        onselect=(index, data) => {},
        /** @interface @type {Array<HTMLElement>} Child elements of this notebook */
        children=undefined
    } = $props()

    let pages = $state({
        book: "notebook",
        current: undefined,
        buttons: 0,
        all: [],
        data: []
    })

    setContext("siblings", pages)
    $effect(() => {
        onselect(pages.current, pages.data[pages.current])
    })

    let addHovered = $state.raw(false)

</script>

<div 
    class=notebook
    style:grid-template-columns="[start] repeat({pages.all.length + pages.buttons}, 1fr) [end]"
>
    {@render children?.()}
</div>

<style>
    .notebook {
        display: grid;
        grid-template-rows: [tabs] max-content [pages] auto;
        gap: 0;
        justify-items: stretch;
        align-items: stretch;
        margin: auto;
        height: 100%;
        width: 100%;
    }
</style>