<script>
    import { NumberCtrl, MarkdownCtrl } from "$lib/ui/ctrls"

    let {
        item=$bindable()
    } = $props()
</script>


<h2>{item.name}</h2>
<i>{item.type}, {item.weight}lbs.</i>

<MarkdownCtrl
    bind:value={item.description}
/>

{#if item.params && "quantity" in item.params}
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

<style>
    .quantity-ctrl {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
        gap: .5rem;
    }
</style>