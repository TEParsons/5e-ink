// icons describing the sources for advancements, actions, etc.
export var sourceIcons = {
    species: "🧬",
    background: "🎭",
    custom: "📖",
    class: "🎓",
    item: "👜",
    consumable: "🍄",
    weapon: "⚔︎",
    armour: "🛡",
    spell: "✨"
}


/**
 * Convert live values (e.g. $wis) to their calculated value.
 * 
 * @param {object} stats Overall stats object to use
 * @param {*} value Value to actualize
 */
export function actualize(stats, value) {
    // if an object, actualize all values
    if (typeof value === "object") {
        if (value instanceof Array) {
            // actualize each object in an array
            return value.map(
                item => actualize(stats, item)
            )
        } else {
            // actualize each value in an object
            return Object.fromEntries(
                Object.entries(value).map(
                    ([key, val]) => [key, actualize(stats, val)]
                )
            )
        }
    }
    // if not a string (or iterable which could contain strings), it's not a live value
    if (typeof value !== "string") {
        return value
    }
    // is it a core stat?
    if (["$str", "$con", "$dex", "$int", "$wis", "$chr"].includes(value.toLowerCase())) {
        return score2modifier(
            getScore(stats, value.slice(1))
        )
    }
    // is it total levels?
    if (value === "$lvl") {
        return Object.values(stats.class).reduce(
            (partial, cls) => partial + Object.keys(cls.levels).length,
            0
        )
    }
    // is it levels in a given class?
    if (value.startsWith("$lvl:")) {
        return stats.class[
            value.match(/\$lvl:(?<cls>\w+)/).groups.cls
        ].levels.length
    }
}


export function getAdvancements(stats, flatten=true) {
    let sources = {
        item: [],
        species: [],
        background: [],
        class: [],
        custom: [],
    }
    
    // from species
    sources.species.push(stats.species)
    // from subspecies
    sources.species.push(stats.species.subtype || {})
    // from background
    sources.background.push(stats.background || {})
    // from custom
    sources.custom.push(stats.custom || {})
    // from classes
    for (let cls in stats.class) {
        sources.class.push(...Object.values(stats.class[cls].levels))
        // from class subtype
        sources.class.push(...stats.class[cls].subtype?.advancements || [])
    }
    // from items
    for (let [i, item] in Object.entries(stats.inventory.items)) {
        sources.item.push(stats.inventory.items[i]?.grants || {})
    }
    
    // flatten if requested
    if (flatten) {
        sources = Object.values(sources).flat()
    }

    return sources
}


export function getPools(stats) {
    let pools = {};
    // find modifications from advancements
    for (let advancement of getAdvancements(stats)) {
        for (let [index, pool] of Object.entries(advancement?.pools || {})) {
            // add an entry if not one already
            if (!(index in pools)) {
                pools[index] = {
                    index: index,
                    name: index,
                    description: "",
                    total: 0
                }
            }
            // update name and description
            pools[index].name = pool.name || pools[index].name
            pools[index].description = pool.description || pools[index].name
            // update total
            pools[index].total += actualize(stats, pool.add) || 0
            pools[index].total = Math.max(actualize(stats, pool.set) || pools[index].total)
        }
    }

    return pools
}


export function sentenceCase(value) {
    // convert camelCase
    value = String(value).replaceAll(
        /([a-z])([A-Z])/g,
        matches => `${matches[0]} ${matches[1].toLowerCase()}`
    )
    // capitalise first letter
    value = value.replace(
        /^(\w)/,
        matches => matches[0].toUpperCase()
    )
    // value = value[0].toUpperCase() + value.slice(1)

    return value
}

export function totalLevels(classes) {
    return Object.values(classes).reduce(
        (partial, val) => partial + Object.keys(val.levels).length,
        0
    )
}

export function saveProficiencies(classes) {
    return Object.values(classes).reduce(
        (partial, val) => partial.concat(...val.proficiencies.saves),
        []
    )
}

export function classLevels(classes) {
    let output = [];

    for (let [key, cls] of Object.entries(classes)) {
        for (let i of Array(cls.levels).keys()) {
            output.push(key)
        }
    }

    return output
}

export function traitsByTag(stats, tag) {
    let output = [];

    for (let source of getAdvancements(stats)) {
        for (let trait of source.traits || []) {
            if (trait.tags.includes(tag)) {
                output.push(trait)
            }
        }
    }


    return output
}

export function score2modifier(score) {
    return Math.floor(score / 2) - 5
}

export function level2proficiency(level) {
    return Math.floor((level - 1) / 4) + 2
}

export function getProficiencies(stats, tag) {
    let output = [];
    
    // combine into a single array
    for (let source of getAdvancements(stats)) {
        if (source.proficiencies) {
            output.push(...(source.proficiencies[tag] || []))
        }
        
    }
    // remove duplicates
    output = output.filter((value, index, array) => array.indexOf(value) === index)

    return output
}

export function getTotalSlots(stats, level) {
    let spellslots = 0;
    
    for (let source of getAdvancements(stats)) {
        if (source.casting?.spellslots) {
            spellslots += source.casting?.spellslots[level] || 0
        }
    }

    return spellslots
}


export function getAllSkills(stats) {
    // start off with core skills
    let skills = {
        athletics: "str",
        acrobatics: "dex",
        sleightOfHand: "dex",
        stealth: "dex",
        arcana: "int",
        history: "int",
        investigation: "int",
        nature: "int",
        religion: "int",
        animalHandling: "wis",
        insight: "wis",
        medicine: "wis",
        perception: "wis",
        survival: "wis",
        deception: "chr",
        intimidation: "chr",
        performance: "chr",
        persuasion: "chr",
    }

    // add skills created by all sources
    for (let source of getAdvancements(stats)) {
        for (let [skill, base] of Object.entries(source.proficiencies?.skills?.create || {})) {
            skills[skill] = base
        }
    }

    return skills
}


export function getSkillMultiplier(stats, skill) {
    let sources = getAdvancements(stats);
    let multiplier = 0;

    // calculate
    for (let source of getAdvancements(stats)) {
        // set minimum
        if (source.proficiencies?.skills?.set) {
            multiplier = Math.max(multiplier, source.proficiencies.skills.set[skill] || 0)
        }
        // do any addition
        if (source.proficiencies?.skills?.add?.includes(skill)) {
            multiplier = [0.5, 1, 2, 2][
                [0, 0.5, 1, 2].indexOf(multiplier)
            ]
        }
    }

    return multiplier
}


export function getScore(stats, key) {
    let base = stats.scores[key];

    for (let source of getAdvancements(stats)) {
        // do any addition
        base += source.buffs?.scores?.[key]?.add || 0
        // do any setting
        base = Math.max(source.buffs?.scores?.[key]?.set || base)
    }

    return base
}