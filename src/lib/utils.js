export function totalLevels(classes) {
    return Object.values(classes).reduce(
        (partial, val) => partial + val.levels,
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
    let output = {
        species: []
    };

    // get class traits
    for (let [name, cls] of Object.entries(stats.class)) {
        output[name] = []
        for (let trait of cls.traits) {
            if (trait.tags.includes(tag)) {
                output[name].push(trait)
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
    return Math.floor(level / 4) + 2
}

export function getProficiencies(stats, tag) {
    let output = [];

    // get from class
    for (let cls of Object.keys(stats.class)) {
        output.push(...stats.class[cls].proficiencies[tag])
    }
    // get from species
    output.push(...stats.species.proficiencies[tag])

    return output
}