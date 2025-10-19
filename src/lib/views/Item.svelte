<script>
    import { TextCtrl, NumberCtrl, MarkdownCtrl, ChoiceCtrl, SwitchCtrl, EditToggle, Break } from "$lib/ui/ctrls";
    import { AttackView, ActionView } from "$lib/views";
    import ItemSchema from "$lib/schemas/item.schema.json";
    import { itemTypes, recursiveDefaults } from "$lib/schemas";
    import { getContext, setContext } from "svelte";
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

    setContext("snippets", {tagline: tagline})
    
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
        {#if item.weight}
            |
            {#if item.weight}
                <NumberCtrl 
                    label="Weight"
                    bind:value={item.weight.lb}
                    edit={edit}
                />
                lb.
            {/if}
        {/if}
        {#if item.cost}
            |
            <Break shown={edit} />
            {#each Object.keys(ItemSchema.properties.cost.properties) as unit}
                {#if item.cost[unit] || edit}
                    <NumberCtrl 
                        label="Price ({unit})"
                        bind:value={item.cost[unit]}
                        edit={edit}
                    />
                    {unit}
                {/if}
            {/each}
        {/if}
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
    <div class=tagline>
        {@render tagline(item)}
    </div>
    {#if item.description || edit}
        <MarkdownCtrl
            bind:value={item.description}
            edit={edit}
        />
    {/if}
    {#each Object.entries(item.grants?.attacks || []) as [i, attack]}
        <AttackView 
            bind:attack={item.grants.attacks[i]}
            edit={edit}
        />
    {/each}
    {#each Object.entries(item.grants?.actions || []) as [i, action]}
        <ActionView 
            bind:action={item.grants.actions[i]}
            edit={edit}
        />
    {/each}
    <ParamsComponent
        bind:item={item}
        bind:edit={edit}
    />
    <SwitchCtrl
        bind:value={item.equipped}
        labels={{
            NO: "Backpack",
            YES: "Equipped"
        }}
        edit={edit}
    />
</div>

<style>
    .heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .item-view {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .tagline {
        position: relative;
        margin-top: -1rem;
    }
</style>