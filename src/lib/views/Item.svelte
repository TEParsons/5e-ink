<script>
    import { TextCtrl, NumberCtrl, MarkdownCtrl, ChoiceCtrl, EditToggle } from "$lib/ui/ctrls";
    import ItemSchema from "$lib/schemas/item.schema.json";
    import { itemTypes, recursiveDefaults } from "$lib/schemas";
    import { getContext } from "svelte";
    import Option from "$lib/ui/ctrls/Option.svelte";
    import { params } from "$lib/views/items";

    let prefs = getContext("prefs");

    let {
        item=$bindable(),
        edit=$bindable()
    } = $props()

    let ParamsComponent = $derived(
        params[item.type]
    )
    
</script>

{#snippet tagline(item)}
    <i>
        <ChoiceCtrl
            label="Item type"
            bind:value={item.type}
            onselect={(evt, index, data) => item.params = recursiveDefaults(itemTypes[data])}
            edit={edit}
        >
            {#each ItemSchema.properties.type.enum as opt}
                <Option
                    index={opt}
                    data={opt}
                >
                    {opt}
                </Option>
            {/each}
        </ChoiceCtrl>
        |
        {#if item.weight}
            <NumberCtrl 
                label="Weight"
                bind:value={item.weight.lb}
                edit={edit}
            />
            lb.
        {/if}
        |
        {#each Object.keys(ItemSchema.properties.cost.properties) as unit}
            <!-- {#if item.cost[unit] || edit}
                <NumberCtrl 
                    label="Price ({unit})"
                    bind:value={item.cost[unit]}
                    edit={edit}
                />
                {unit}
            {/if} -->
        {/each}
    </i>
{/snippet}

<div class=item-view>
    <h2 class=heading>
        <TextCtrl 
            bind:value={item.name}
            edit={edit}
        />
        <EditToggle bind:value={edit} />
    </h2>
    {@render tagline(item)}
    

    <MarkdownCtrl
        bind:value={item.description}
        edit={edit}
    />

    {#if item.type === "container"}
        <div class=container-ctrl>
            <h3>Contents</h3>
            <div class=contents-ctrl>
                <div class=subitem>
                    {#each Object.keys(item.params.contents) as i}
                        <NumberCtrl 
                            bind:value={item.params.contents[i].params.quantity}
                            label="Quantity of {item.params.contents[i].name}"
                            max={item.params.capacity.weight.lb / item.params.contents[i].weight.lb || Infinity}
                            min={0}
                            edit
                        />
                        <h4>{item.params.contents[i].name}</h4>
                        ({@render tagline(item.params.contents[i])})
                        
                    {/each}
                </div>
            </div>
        </div>
    {/if}

    {#if item.params?.quantity !== undefined}
        <div class=quantity-ctrl>
            Quantity:
            <NumberCtrl 
                bind:value={item.params.quantity}
                label=Quantity
                min={0}
                edit
            />
        </div>
    {/if}
    
    <ParamsComponent
        bind:item={item}
        bind:edit={edit}
    />
</div>

<style>
    .quantity-ctrl {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: .5rem;
    }
    .contents-ctrl {
        display: flex;
        flex-direction: column;
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

    .heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
</style>