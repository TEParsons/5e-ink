<script>
    import { getContext } from "svelte";
    import { SwitchCtrl, ChoiceCtrl, Option } from "$lib/ui/ctrls";
    import schema from "$lib/schemas/character.schema.json"
    import { recursiveDefaults } from "$lib/schemas"
    import { characters } from "$lib/characters/index.svelte.js"

    let stats = getContext("stats");
    let prefs = getContext("prefs");

    function newCharacter(evt) {
        // wipe stats array
        for (var key in stats) delete stats[key];
        // assign defaults from schema
        Object.assign(
            stats, recursiveDefaults(schema)
        )
    }

    async function loadCharacter(evt) {
        // get file handle from system dialog
        let handle = await window.showOpenFilePicker({
            types: [
                {
                    description: "JSON Character Sheet",
                    accept: {
                        "text/json": [".json"]
                    }
                }
            ]
        });
        // get file blob from handle
        let file = await handle[0].getFile();
        // get content from file
        let content = await file.text();
        // parse JSON
        let data = JSON.parse(content);
        // validate and sanitize
        data = validate(data)
        // apply data
        Object.assign(stats, data)
    }

    async function saveCharacter(evt) {
        // get file handle from system dialog
        let handle = await window.showSaveFilePicker({
            types: [
                {
                    description: "JSON Character Sheet",
                    accept: {
                        "text/json": [".json"]
                    }
                }
            ],
            suggestedName: `${stats.details.name.replace(" ", "-")}.json`
        });
        // get file writable from handle
        let file = await handle.createWritable();
        // stringify JSON
        let content = JSON.stringify(stats, null, 4);
        // write to file
        file.seek(0);
        file.write(content);
        file.close();
    }
</script>


<div class=page>
    <svg 
        class=logo
        style:color="var(--text-on-base)"
    >
        <use xlink:href="assets/logo.svg" />
    </svg>
    <ChoiceCtrl
        onselect={(evt, index, data) => Object.assign(stats, data)}
        edit
    >
        {#each Object.entries(characters) as [i, profile]}
            <Option
                data={profile}
                index={i}
            >
                <div class=profile-option>
                    <img class=avatar src={profile.details.avatar} alt={profile.details.name} />
                    {profile.details.name}
                </div>
            </Option>
        {/each}
    </ChoiceCtrl>
    <!-- <SwitchCtrl 
        bind:value={prefs.edit}
        labels={{
            NO: "Play",
            YES: "Edit"
        }}
        edit
    /> -->
    <div class=file-ctrls>
        <!-- <button onclick={newCharacter}>New Character</button> -->
        <button onclick={loadCharacter}>Load Character</button>
        <button onclick={saveCharacter}>Save Character</button>
    </div>
</div>

<style>
    .page {
        margin: auto;
        max-width: 20cm;
        padding: 1rem;

        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .file-ctrls {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    button {
        background-color: var(--crust);
        color: var(--text-on-crust);
        border-radius: .5rem;
        padding: .5rem 1rem;
        border: none;
        outline: none;
    }

    .profile-option {
        display: grid;
        grid-template-columns: 2rem 1fr;
        gap: 1rem;
        align-items: center;
        justify-items: start;
    }

    .avatar {
        width: 100%;
        border-radius: 50%;
    }
</style>