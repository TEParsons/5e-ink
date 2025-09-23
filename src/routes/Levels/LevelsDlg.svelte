<script>
    import Dialog from "$lib/ui/Dialog.svelte"
    import ClassMgr from "./ClassMgr.svelte";
    import { sentenceCase } from "$lib/utils";
    import { Notebook, NotebookPage, ButtonTab } from "$lib/ui/notebook";
    import { getContext } from "svelte";

    let {
        shown=$bindable()
    } = $props()

    let stats = getContext("stats")

    let restore = $state.snapshot(stats.class);
</script>


<Dialog
    bind:shown={shown}
    onopen={evt => restore = $state.snapshot(stats.class)}
    buttons={{
        OK: evt => {},
        CANCEL: evt => stats.class = restore
    }}
>
    <div class=notebook-container>
        <Notebook>
            {#each Object.keys(stats.class) as cls}
                <NotebookPage
                    label={sentenceCase(cls)}
                    close={evt => delete stats.class[cls]}
                    initial
                >
                    <ClassMgr 
                        cls={cls}
                    />
                </NotebookPage>
            {/each}
            <ButtonTab
            
            ></ButtonTab>
        </Notebook>
    </div>
</Dialog>

<style>
    .notebook-container {
        width: 80vw;
        min-height: 20rem;
    }
</style>