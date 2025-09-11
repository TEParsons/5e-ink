<script>
    import { setContext, getContext, untrack } from "svelte";
    import Dialog from "../Dialog.svelte";
    import TextCtrl from "./Text.svelte";

    let prefs = getContext("prefs");

    let {
        value=$bindable(),
        edit=prefs.edit,
        children=undefined
    } = $props()

    let keyCtrls = $state({});

    let editKeys = $state({});

    let renaming = $state({});
    for (let key of Object.keys(value)) {
        renaming[key] = key
    }
</script>

<div class=dictionary-ctrl>
    {#if edit}
        {#each Object.entries(value) as [key, val]}
            <div class="dictionary-item edit">
                <div class=dictionary-key>
                    <input 
                        bind:value={renaming[key]}
                    />
                    {#if renaming[key] !== key}
                        <button
                            onclick={evt => {
                                // rename key
                                value[$state.snapshot(renaming[key])] = value[key]
                                delete value[key]
                                // rename entry in renaming
                                renaming[renaming[key]] = renaming[key]
                                delete renaming[key]
                            }}
                        >
                            Apply
                        </button>
                    {/if}
                    <button
                        class=dictionary-delete-btn
                        onclick={evt => {
                            // remove key
                            delete value[key]
                            // remove entry in renaming
                            delete renaming[key]
                        }}
                    >✕</button>
                </div>
                <div class=dictionary-value>
                    <TextCtrl
                        bind:value={value[key]}
                        multiline
                    />
                </div>
            </div>
        {/each}
        <button
            class=dictionary-add-btn
            onclick={evt => {
                value['...'] = "";
                renaming['...'] = "...";
            }}
        >+</button>
    {:else}
        {#each Object.entries(value) as [key, val]}
            <div class=dictionary-item>
                <dt class=dictionary-key>{key}</dt> 
                <dd class=dictionary-value>{val}</dd>
            </div>
        {/each}
    {/if}
</div>

<style>
    .dictionary-ctrl {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: .5rem;
    }

    .dictionary-item.edit {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: .5rem;
    }

    .dictionary-key {
        font-weight: bold;
        font-style: italic;
    }

    .edit .dictionary-key {
        display: grid;
        grid-template-columns: 1fr min-content min-content;
        gap: .5rem;
    }

    button {
        background-color: var(--crust);
        color: var(--text-on-crust);
        border-radius: .5rem;
        padding: .5rem;
        line-height: 1rem;
    }

    input {
        font-weight: inherit;
        font-style: inherit;
        background-color: var(--base);
        border: none;
        outline: none;
        border-bottom: 1px solid var(--crust);
        border-radius: 0;
        padding: .25rem .5rem;
        margin-top: 1rem;
        box-sizing: border-box;
    }

    dt, dd {
        margin: 0;
        display: inline;
    }

    dt {
        margin-right: .5rem;
    }
</style>