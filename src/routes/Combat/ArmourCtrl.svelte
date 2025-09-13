<script>
    import { getProficiencies } from "$lib/utils";
    import { getContext } from "svelte";

    let stats = getContext("stats");

    
    // data on each armour type
    let types = {
        leather: {
            categ: "light",
            base: 11,
        },
        padded: {
            categ: "light",
            base: 11,
        },
        studdedleather: {
            categ: "light",
            base: 12,
        },
        hide: {
            categ: "medium",
            base: 12
        },
        chainshirt: {
            categ: "medium",
            base: 13
        },
        scalemail: {
            categ: "medium",
            base: 14
        },
        breastplate: {
            categ: "medium",
            base: 14
        },
        halfplate: {
            categ: "medium",
            base: 15
        },
        ringmail: {
            categ: "heavy",
            base: 14
        },
        chainmail: {
            categ: "heavy",
            base: 16
        },
        splint: {
            categ: "heavy",
            base: 17
        },
        plate: {
            categ: "heavy",
            base: 18
        }
    }

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
            output += types[armour.params.armourtype].base
            // add modifier according to category
            if (types[armour.params.armourtype].categ === "light" && getProficiencies(stats, "armour").includes("light")) {
                output += stats.scores.dex
            }
            if (types[armour.params.armourtype].categ === "medium" && getProficiencies(stats, "armour").includes("medium")) {
                output += Math.min(stats.scores.dex, 2)
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
                output += stats.scores.con
            }
            if ("monk" in stats.class) {
                output += stats.scores.wis
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