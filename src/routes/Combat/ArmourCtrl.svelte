<script>
    import { getProficiencies, score2modifier, getScore } from "$lib/utils";
    import { getContext } from "svelte";

    let stats = getContext("stats");

    let ac = $derived.by(() => {
        let output = 0;
        // what armour are we wearing?
        let armour;
        for (let item of stats.inventory.items) {
            if (item.type === "armour" && item.equipped) {
                armour = item
            }
        }
        // add ac from armour
        if (armour) {
            // get base ac
            output += armour.params.ac
            // add modifier according to category
            if (armour.params.type === "light" && getProficiencies(stats, "armour").includes("light")) {
                output += score2modifier(getScore(stats, "dex"))
            }
            if (armour.params.type === "medium" && getProficiencies(stats, "armour").includes("medium")) {
                output += Math.min(score2modifier(getScore(stats, "dex")), 2)
            }
            // do we have any bonus?
            if (armour.params.bonus) {
                output += armour.params.bonus
            }
        } else {
            // unarmoured
            output += 10
            // add modifier according to class
            if ("barbarian" in stats.class) {
                output += score2modifier(getScore(stats, "con"))
            }
            if ("monk" in stats.class) {
                output += score2modifier(getScore(stats, "wis"))
            }
        }
        // do we have a shield?
        let shield;
        for (let item of stats.inventory.items) {
            if (item.type === "shield" && item.equipped) {
                shield = item
            }
        }
        // add ac from shield
        if (shield) {
            output += 2
        }
        
        return output
    })
</script>

<span 
    id=ac
>
    {ac}
</span>

<style>
    #ac {
        font-size: 1.5rem;
    }
</style>