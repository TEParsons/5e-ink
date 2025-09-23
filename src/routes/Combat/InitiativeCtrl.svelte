<script>
    import { score2modifier, getScore } from "$lib/utils.js";
    import { getContext } from "svelte";

    let stats = getContext("stats");

    let modifier = $derived(score2modifier(getScore(stats, "dex")))
</script>

<span
    id=initiative
>
    {modifier >= 0 ? `+${modifier}` : `${modifier}`}
</span>

<style>
    #initiative {
        font-size: 1.5rem;
    }
</style>