<script>
    import { NumberCtrl, MarkdownCtrl } from "$lib/ui/ctrls"

    let {
        item=$bindable()
    } = $props()
</script>

{#snippet tagline(item)}
<i>
    {item.type}
    {#if item.weight}
        {#each Object.entries(item.weight) as [unit, weight]}
            | {weight}{unit}.
        {/each}
    {/if}
    {#if item.cost}
        {#each Object.entries(item.cost) as [unit, price]}
            | {price} {unit}
        {/each}
    {/if}
</i>
{/snippet}

<div class=item-view>
    <h2>{item.name}</h2>
    {@render tagline(item)}
    

    <MarkdownCtrl
        bind:value={item.description}
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
</style>