<script>
    import { score2modifier } from "$lib/utils.js";
    import { getContext } from "svelte";

    let stats = getContext("stats");
</script>

<span
    id=initiative
>
    {score2modifier(stats.scores.dex)}
</span>

<style>
    #initiative {
        font-size: 1.5rem;
    }
</style>