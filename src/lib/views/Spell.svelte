<script>
    import { getContext } from "svelte";
    import SpellSchema from "$lib/schemas/spell.schema.json";
    import { TextCtrl, MarkdownCtrl, SlotsCtrl, ChoiceCtrl, Option, EditToggle } from "$lib/ui/ctrls";
    import { getTotalSlots, sentenceCase } from "$lib/utils"

    let {
        spell=$bindable()
    } = $props()

    let stats = getContext("stats");
    let edit = $state.raw(false);

    let totalSlots = $derived(
        getTotalSlots(stats, spell.level)
    )

</script>

<div class=spell-view>
    <h1>
        <TextCtrl 
            bind:value={spell.name}
            edit={edit}
        />
        <EditToggle 
            bind:value={edit}
        />
    </h1>
    <i>
        <ChoiceCtrl
            label="Spell school"
            bind:value={spell.school}
            edit={edit}
        >
            {#each SpellSchema.properties.school.enum as opt}
                <Option
                    index={opt}
                    data={opt}
                >
                    {sentenceCase(opt)}
                </Option>
            {/each}
        </ChoiceCtrl>
        {#if spell.level === "cantrip"}
            cantrip
        {:else}
            spell (
            <ChoiceCtrl
                label="Spell level"
                bind:value={spell.level}
                edit={edit}
            >
                {#each SpellSchema.properties.level.enum as opt}
                    <Option
                        index={opt}
                        data={opt}
                    >
                        {sentenceCase(opt)}
                    </Option>
                {/each}
            </ChoiceCtrl>
            level)
        {/if}
    </i>
    <MarkdownCtrl 
        bind:value={spell.description}
        edit={edit}
    />

    {#if stats.current.slots[spell.level] !== undefined}
        <h4>
            {`${spell.level[0].toUpperCase()}${spell.level.slice(1)} level`} slots
        </h4>
        <SlotsCtrl 
            bind:value={stats.current.slots[spell.level]}
            bind:total={totalSlots}
        />
    {/if}
</div>

<style>
    h1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: .5rem;
        margin: 0;
    }
</style>