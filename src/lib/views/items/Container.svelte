<script>
    import { getContext } from "svelte";
    import Dialog from "$lib/ui/Dialog.svelte";
    import { NumberCtrl, TextCtrl } from "$lib/ui/ctrls";
    import { recursiveDefaults } from "$lib/schemas";
    import { ItemView } from "$lib/views";
    import ItemSchema from "$lib/schemas/item.schema.json";
    import ConsumableSchema from "$lib/schemas/items/consumable.schema.json";

    let {
        item=$bindable(),
        edit=$bindable()
    } = $props();

    let snippets = getContext("snippets")

    let showDlgs = $state({})
</script>

<div class=container-ctrl>
    <h3>Contents</h3>
    <div class=contents-ctrl>
        {#each Object.keys(item.params.contents) as i}
            <div class=subitem>
                <NumberCtrl 
                    bind:value={item.params.contents[i].params.quantity}
                    label="Quantity of {item.params.contents[i].name}"
                    max={item.params.capacity.weight.lb / item.params.contents[i].weight.lb || Infinity}
                    min={0}
                    edit
                />
                <h4>
                    <TextCtrl
                        bind:value={item.params.contents[i].name}
                        edit={edit}
                    />
                </h4>
                ({@render snippets.tagline(item.params.contents[i])})
                <button 
                    class=icon
                    onclick={showDlgs[i] = true}
                >
                    📋
                </button>
                <Dialog
                    bind:shown={showDlgs[i]}
                    buttons={{
                        CANCEL: evt => {}
                    }}
                >
                    <ItemView 
                        bind:item={item.params.contents[i]}
                        edit={edit}
                    />
                </Dialog>
            </div>
        {/each}
        {#if edit}
            <button
                class=add-item-btn
                onclick={evt => {
                    // create new subitem
                    let profile = recursiveDefaults(ItemSchema)
                    profile.params = recursiveDefaults(ConsumableSchema)
                    // append
                    item.params.contents.push(profile)
                }}
            >+ Add</button>
        {/if}
    </div>
</div>

<style>
    .contents-ctrl {
        display: flex;
        flex-direction: column;
    }

    .add-item-btn {
        padding: .5rem;
        background-color: var(--base);
        color: var(--crust);
        text-align: right;
    }

    .subitem {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        gap: .5rem;
    }
    .subitem h4 {
        margin-top: .5rem;
    }

    button {
        background-color: transparent;
        font-size: inherit;
        padding: 0;
        margin: 0;
    }
    .icon {
        font-family: var(--emoji);
    }
</style>