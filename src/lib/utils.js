export function totalLevels(levels) {
    return Object.values(levels).reduce(
        (partial, val) => partial + val
    )
}

export function classLevels(levels) {
    let output = [];

    for (let [cls, lvl] of Object.entries(levels)) {
        for (let i of Array(lvl).keys()) {
            output.push(cls)
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