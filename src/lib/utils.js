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

export function score2modifier(score) {
    return Math.floor(score / 2) - 5
}

export function level2proficiency(level) {
    return Math.floor(level / 4) + 2
}