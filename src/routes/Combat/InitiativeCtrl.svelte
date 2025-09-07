<script>
    import { score2modifier } from "$lib/utils.js";
    import { getContext } from "svelte";

    let stats = getContext("stats");

    let modifier = $derived(score2modifier(stats.scores.dex))
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