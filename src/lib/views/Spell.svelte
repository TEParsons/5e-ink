<script>
    import { getContext } from "svelte";
    import SpellSchema from "$lib/schemas/spell.schema.json";
    import { TextCtrl, MarkdownCtrl, SlotsCtrl, ChoiceCtrl, NumberCtrl, Option, EditToggle } from "$lib/ui/ctrls";
    import { getTotalSlots, sentenceCase } from "$lib/utils"

    let {
        spell=$bindable()
    } = $props();

    let allLevels = [
        "first",
        "second",
        "third",
        "fourth",
        "fifth",
        "sixth",
        "seventh",
        "eighth",
        "ninth"
    ]

    let stats = getContext("stats");
    let edit = $state.raw(false);

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
    <i class=subtitle>
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

    <div class=attribute>
        <b>Range</b>
        <span>
            {#if ["self", "touch"].includes(spell.range?.distance)}
                {sentenceCase(spell.range.distance)}
            {:else if spell.range?.distance}
                {spell.range.distance}ft.
            {/if}
        </span>
    </div>
    <div class=attribute>
        <b>Area</b>
        <span>
            {#each Object.keys(spell.range?.aoe || {}) as shape}
                {#if shape === "targets"}
                    <NumberCtrl 
                        bind:value={spell.range.aoe.targets} 
                    />
                    target{spell.range.aoe.targets > 1 ? "s" : ""}
                {/if}
                {#if ["radius", "cube", "cone"].includes(shape)}
                    <NumberCtrl 
                        bind:value={spell.range.aoe[shape]} 
                    />ft. {shape}
                {/if}
                {#if ["line", "rectangle", "cylinder"].includes(shape)}
                    <NumberCtrl 
                        bind:value={spell.range.aoe[shape].wide}
                    />
                    ft. x
                    <NumberCtrl 
                        bind:value={spell.range.aoe[shape].long}
                    />
                    ft. {shape}
                {/if}
            {/each}
        </span>
    </div>
    <div class=attribute>
        <b>Time</b> 
        <span>
            <NumberCtrl 
                bind:value={spell.time.amount}
                min=1
            />
            <ChoiceCtrl
                bind:value={spell.time.type}
            >
                {#each SpellSchema.properties.time.properties.type.enum as opt}
                    <Option
                        index={opt}
                        value={opt}
                    >
                        {sentenceCase(opt)}
                    </Option>
                {/each}
                {#if !SpellSchema.properties.time.properties.type.enum.includes(spell.time.type)}
                    <Option
                        index={spell.time.type}
                        value={spell.time.type}
                    >
                        {sentenceCase(spell.time.type)}
                    </Option>
                {/if}
            </ChoiceCtrl>
        </span>
    </div>
    <div class=attribute>
        <b>Duration</b>
        <span>
            <ChoiceCtrl
                bind:value={spell.duration.type}
            >
                <Option
                    index=instantaneous
                    value=instantaneous
                >
                    Instantaneous
                </Option>
                <Option
                    index=concentration
                    value=concentration
                >
                    Concentration
                </Option>
                <Option
                    index=dispell
                    value=dispell
                >
                    Until dispelled
                </Option>
            </ChoiceCtrl>
            {#if spell.duration.maximum}
                , up to
                {#each Object.keys(spell.duration.maximum) as unit}
                    <NumberCtrl 
                        bind:value={spell.duration.maximum[unit]}
                    />
                    {unit.slice(0, -1)}{(spell.duration.maximum > 1 ? "s" : "")}
                {/each}
            {/if}
        </span>
    </div>
    <div class=attribute>
        <b>Components</b> {spell.components.join(", ")}
    </div>

    <MarkdownCtrl 
        bind:value={spell.description}
        edit={edit}
    />

    {#if stats.current.spellslots[spell.level] !== undefined}
        <h4>
            {`${sentenceCase(spell.level)} level`} spell slots
        </h4>
        <SlotsCtrl 
            bind:used={stats.current.spellslots[spell.level]}
            total={getTotalSlots(stats, spell.level)}
        />
    {/if}

    

    {#if spell.upcast || edit}
        <h3>Upcast</h3>
        <MarkdownCtrl 
            bind:value={spell.upcast}
            edit={edit}
        />
        <div class=pools-ctrl>
            {#each allLevels.slice(
                allLevels.indexOf(spell.level) + 1
            ) as upcastLevel}
                {#if getTotalSlots(stats, upcastLevel)}
                    <div class=pool-ctrl>
                        <SlotsCtrl 
                            bind:used={stats.current.spellslots[upcastLevel]}
                            total={getTotalSlots(stats, upcastLevel)}
                        />
                        <b>
                            {`${sentenceCase(upcastLevel)} level`} spellslots
                        </b>
                    </div>
                {/if}
            {/each}
        </div>
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
    .subtitle {
        display: block;
        margin-top: 0;
        margin-block-end: 1rem;
    }
    .attribute {
        display: flex;
        flex-direction: row;
        gap: .5rem
    }
    .pools-ctrl {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        margin-bottom: 1rem;
    }
    .pool-ctrl {
        display: flex;
        flex-direction: row;
        gap: .5rem;
    }
</style>