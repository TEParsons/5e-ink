
export function titleCase(value) {
    return String(value)[0].toUpperCase() + String(value).slice(1)
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

    // from species
    for (let trait of stats.species.traits) {
        if (trait.tags.includes(tag)) {
            output.push(trait)
        }
    }
    // from class
    for (let cls in stats.class) {
        for (let [lvl, advancement] of Object.entries(stats.class[cls])) {
            for (let trait of advancement.traits || []) {
                if (trait.tags.includes(tag)) {
                    output.push(trait)
                }
            }
        }    
    }

    // get species traits
    for (let trait of stats.species.traits) {
        if (trait.tags.includes(tag)) {
            output.species.push(trait)
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
    let sources = [];
    let output = [];

    // get from species
    sources.push(stats.species.proficiencies)
    // todo: get from background
    // get from class levels
    for (let cls in stats.class) {
        for (let advancement of Object.values(stats.class[cls].levels)) {
            sources.push(advancement.proficiencies || {})
        }
    }
    
    // combine into a single array
    for (let source of sources) {
        output.push(...(source[tag] || []))
    }
    // remove duplicates
    output = output.filter((value, index, array) => array.indexOf(value) === index)

    return output
}

export function getTotalSlots(stats, level) {
    let slots = 0;

    // iterate through class levels
    for (let cls in stats.class) {
        for (let advancement of Object.values(stats.class[cls].levels)) {
            slots += advancement.casting?.slots[level] || 0
        }
    }

    return slots
}

export function getSkillMultiplier(stats, skill) {
    let sources = [];
    let multiplier = 0;
    // from species
    sources.push(stats.species)
    // todo: from background
    // from classes
    for (let cls in stats.class) {
        for (let advancement of Object.values(stats.class[cls].levels)) {
            sources.push(advancement)
        }
    }

    // calculate
    for (let source of sources) {
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

    console.log(skill, multiplier)

    return multiplier
}