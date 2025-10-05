<script>
    import { NumberCtrl } from "$lib/ui/ctrls";

    let {
        item=$bindable(),
        edit=$bindable()
    } = $props();
</script>


<div class=quantity-ctrl>
    Quantity:
    <NumberCtrl 
        bind:value={item.params.quantity}
        label=Quantity
        min={0}
        edit
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
</style>