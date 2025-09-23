function getAdvancements(stats) {
    let sources = []
    // from species
    sources.push(stats.species)
    // from background
    sources.push(stats.background || {})
    // from custom
    sources.push(stats.custom || {})
    // from classes
    for (let cls in stats.class) {
        sources.push(...Object.values(stats.class[cls].levels))
        // from class subtype
        sources.push(...stats.class[cls].subtype?.advancements || [])
    }

    return sources
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
    let slots = 0;
    
    for (let source of getAdvancements(stats)) {
        if (source.casting?.slots) {
            slots += source.casting?.slots[level] || 0
        }
    }

    return slots
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
        if (source.scores) {
            base += source.scores[key] || 0
        }
    }

    return base
}