<script>
    import { Filesystem, Directory } from "@capacitor/filesystem";
    import { ChoiceCtrl, Option } from "$lib/ui/ctrls";
    // import preset chars
    import Cerys from "$lib/characters/cerys.json";
    import Yiig from "$lib/characters/yiig.json";
    import Paran from "$lib/characters/paran.json";
    import Brainworm from "$lib/characters/brainworm.json";

    let {
        stats=$bindable()
    } = $props()
</script>

<ChoiceCtrl
    onselect={(evt, index, data) => Object.assign(stats, data.profile)}
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
        {#each Object.entries([Yiig, Paran, Brainworm, Cerys]) as [i, profile]}
            <Option
                data={{
                    file: undefined,
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