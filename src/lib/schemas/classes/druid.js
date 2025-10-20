export let core = {
    "hitdice": {
        "die": 8,
        "rolls": []
    },
    "spellcasting": "wis",
    "proficiencies": {
        "armour": ["light", "medium", "shields"],
        "weapons": ["club", "dagger", "darts", "javelin", "mace", "quarterstaff", "scimitar", "sling", "spear"],
        "saves": ["int", "wis"],
        "tools": ["herbalism"],
        "languages": ["druidic"]
    },
    "traits": [
        {
            "name": "Ritual Casting",
            "tags": ["combat", "narrative"],
            "description": "You can cast a druid spell as a ritual if that spell has the ritual tag and you have the spell prepared."
        }
    ],
    "actions": []
}

export let advancements = {
    // wild shape & wild companion at lvl 2
    2: stats => {
        stats.actions.push({
            "name": "Wild Shape",
            "time": {
                "type": "action",
                "amount": 1
            },
            "spellslots": {
                "total": 2,
                "current": 2
            },
            "description": "Starting at second level, you can use your action to magically assume the shape of a beast that you have seen before. You can use this feature twice. You regain expended uses when you finish a short or long rest.\n\nYour druid level determines the beasts you can transform into, as shown in the Beast Shapes table. At second level, for example, you can transform into any beast that has a challenge rating of 1/4 or lower that doesn't have a flying or swimming speed.\n\nYou can stay in a beast shape for a number of hours equal to half your druid level (rounded down). You then revert to your normal form unless you expend another use of this feature. You can revert to your normal form earlier by using a bonus action on your turn. You automatically revert if you fall unconscious, drop to 0 hit points, or die.\n\nWhile you are transformed, the following rules apply:\n- Your game statistics are replaced by the statistics of the beast, but you retain your alignment, personality, and Intelligence, Wisdom, and Charisma scores. You also retain all of your skill and saving throw proficiencies, in addition to gaining those of the creature. If the creature has the same proficiency as you and the bonus in its stat block is higher than yours, use the creature's bonus instead of yours. If the creature has any legendary or lair actions, you can't use them.\n- When you transform, you assume the beast's hit points and Hit Dice. When you revert to your normal form, you return to the number of hit points you had before you transformed. However, if you revert as a result of dropping to 0 hit points, any excess damage carries over to your normal form, For example, if you take 10 damage in animal form and have only 1 hit point left, you revert and take 9 damage. As long as the excess damage doesn't reduce your normal form to 0 hit points, you aren't knocked unconscious.\n- You can't cast spells, and your ability to speak or take any action that requires hands is limited to the capabilities of your beast form. Transforming doesn't break your concentration on a spell you've already cast, however, or prevent you from taking actions that are part of a spell, such as Call Lightning, that you've already cast.\n- You retain the benefit of any features from your class, race, or other source and can use them if the new form is physically capable of doing so. However, you can't use any of your special senses, such as darkvision, unless your new form also has that sense.\n- You choose whether your equipment falls to the ground in your space, merges into your new form, or is worn by it. Worn equipment functions as normal, but the DM decides whether it is practical for the new form to wear a piece of equipment, based on the creature's shape and size. Your equipment doesn't change size or shape to match the new form, and any equipment that the new form can't wear must either fall to the ground or merge with it. Equipment that merges with the form has no effect until you leave the form."
        })
        stats.traits.push({
            "name": "Wild Companion",
            "tags": ["combat", "narrative"],
            "description": "As an action, you can expend a use of your Wild Shape feature to cast the Find Familiar spell, without material components.\n\nWhen you cast the spell in this way, the familiar is a fey instead of a beast, and the familiar disappears after a number of hours equal to half your druid level."
        })
    },
    // wild resurgence at lvl 5
    5: stats => stats.traits.push({
        "name": "Wild Resurgence",
        "tags": ["combat"],
        "description": "Once on each of your turns, if you have no uses of Wild Shape left, you can give yourself one use by expending a spell slot (no action required). In addition, you can expend one use of Wild Shape (no action required) to give yourself a level 1 spell slot, but you can't do so again until you finish a Long Rest."
    }),
    // timeless body & beast spells at lvl 18
    18: stats => {
        stats.traits.push({
            "name": "Timeless Body",
            "tags": ["narrative"],
            "description": "The primal magic that you wield causes you to age more slowly. For every 10 years that pass, your body ages only 1 year."
        })
        stats.traits.push({
            "name": "Beast Spells",
            "tags": ["combat", "narrative"],
            "description": "You can cast many of your druid spells in any shape you assume using Wild Shape. You can perform the somatic and verbal components of a druid spell while in a beast shape, but you aren't able to provide material components."
        })
    },
    // archdruid at lvl 20
    20: stats => stats.traits.push({
        "name": "Archdruid",
        "tags": ["combat", "narrative"],
        "description": "You can use your Wild Shape an unlimited number of times. Additionally, you can ignore the verbal and somatic components of your druid spells, as well as any material components that lack a cost and aren't consumed by a spell. You gain this benefit in both your normal shape and your beast shape from Wild Shape.",
    })
}

export default {
    core: core,
    advancements: advancements
}