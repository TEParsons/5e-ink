<script>
    import { marked } from "marked";
    import { getContext } from "svelte";
    import TextCtrl from "./Text.svelte";

    let prefs = getContext("prefs");

    let {
        value=$bindable(),
        edit=prefs.edit
    } = $props();
</script>

{#if edit}
    <TextCtrl
        bind:value={value}
        edit
    />
{:else}
    <div class=markdown>
        {@html marked(value)}
    </div>
{/if}