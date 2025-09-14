<script>
    // NTS: Considering scrapping this? Maybe make a dedicated levelling interface like Roll20?


    import { getContext } from "svelte";
    import classes from "$lib/schemas/classes";
    import { NumberCtrl, ChoiceCtrl, Option } from "$lib/ui/ctrls";

    let {
        index
    } = $props()

    let stats = getContext("stats");

    $effect(() => {
        if (index in classes) {
            // get base stats
            stats.class[index] = {}
            Object.assign(stats.class[index], classes[index].core)
            for (let lvl in Array(stats.class[index].levels)) {
                if (lvl in classes[index].advancements) {
                    classes[index].advancements[lvl](
                        stats.class[index]
                    )
                }
            }
        }
    })

</script>

<div class=class-ctrl>
    <span>Level </span>
    <NumberCtrl 
        label="{index} level"
        bind:value={stats.class[index].levels}
        min=1
        max=30
    />
    <ChoiceCtrl
        label="Class",
        value={stats.class[index].name}
        onselect={(evt, i, data) => {
            // ignore if not changed
            if (data === stats.class[index].name) {
                return
            }
            // get base stats
            stats.class[index] = {}
            Object.assign(stats.class[index], classes[data].core)
            // level up
            for (let lvl in Array(stats.class[index].levels)) {
                if (lvl in classes[data].advancements) {
                    classes[data].advancements[lvl](
                        stats.class[index]
                    )
                }
            }
        }}
    >
        {#each Object.keys(classes) as cls}
            <Option
                index={cls}
                data={cls}
            >{cls}</Option>
        {/each}
    </ChoiceCtrl>
</div>

<style>
    .class-ctrl {
        display: flex;
        flex-direction: row;
        gap: .5rem;
    }
</style>