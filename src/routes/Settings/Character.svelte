<script>
    import { Filesystem, Directory } from "@capacitor/filesystem";
    import { ChoiceCtrl, Option } from "$lib/ui/ctrls";
    import { characters, current } from "$lib/characters";
</script>

<ChoiceCtrl
    bind:value={current.index}
    onselect={(evt, index, data) => Object.assign(current.stats, characters[current.index])}
    edit
>
    {#await Filesystem.readdir({
        directory: Directory.Documents
    })}
        Loading characters...
    {:then characters}
        {#each Object.entries(characters).filter(
            ([i, file]) => file.endsWith(".json")
        ).map(
            ([i, file]) => [i, file, import(file)] /* @vite-ignore */
        ) as [i, file, profile]}
            <Option
                data={{
                    file: file,
                    profile: profile
                }}
                index={i}
            >
                <div class=profile-option>
                    <img class=avatar src={profile.details.avatar} alt={profile.details.name} />
                    {profile.details.name}
                </div>
            </Option>
        {/each}
    {:catch err}
        <!-- this will always be shown if not on mobile -->
        {#each Object.entries(characters) as [i, profile]}
            <Option
                data={i}
                index={i}
            >
                <div class=profile-option>
                    <img class=avatar src={profile.details.avatar} alt={profile.details.name} />
                    {profile.details.name}
                </div>
            </Option>
        {/each}
    {/await}
</ChoiceCtrl>

<style>
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