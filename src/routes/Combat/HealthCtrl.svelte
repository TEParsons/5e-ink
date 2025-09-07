<script>
    import { getContext } from "svelte";
    import { totalLevels, classLevels } from "$lib/utils.js";

    let stats = getContext("stats")

    let hitdice = {
        sorcerer: 6,
        wizard: 6,
        artificer: 8, 
        bard: 8, 
        cleric: 8, 
        druid: 8, 
        monk: 8, 
        rogue: 8, 
        warlock: 8,
        fighter: 10, 
        paladin: 10, 
        ranger: 10,
        barbarian: 12
    }

    let total = $derived.by(() => {
        // calculate starting hp
        let hp = hitdice[classLevels(stats.levels)[0]] + stats.scores.con
        // add hp rolls
        for (let [i, cls] of classLevels(stats.levels).slice(1).entries()) {
            if (i in stats.health.total.rolls.keys()) {
                // if roll is recorded, use it
                hp += stats.health.total.rolls[i]
            } else {
                // otherwise use average
                hp += Math.floor(hitdice[cls] / 2)
            }
        }
        // add 1hp per level if hill dwarf
        if (stats.health.total.modifiers.hilldwarf) {
            hp += totalLevels(stats.levels)
        }
        // add 2hp per level if tough feat
        if (stats.health.total.modifiers.tough) {
            hp += totalLevels(stats.levels) * 2
        }

        return hp
    })

    let dialogs = $state({
        damage: undefined,
        heal: undefined
    })

    let amounts = $state({
        damage: 1,
        heal: 1,
    })
</script>

<div class=health-ctrl>
    <div class=health-label>
        <span>Health</span>
        <span>{stats.health.current} / {total}</span>
    </div>
    <div class=health-bar>
        <div class=current-health
            style:right="{(total - stats.health.current) * 100 / total}%"
        ></div>
    </div>
    <div class=health-ctrls>
        <button 
            class=damage-btn
            onclick={(evt) => dialogs.damage.showModal()}
        >-</button>
        <button 
            class=heal-btn
            onclick={(evt) => dialogs.heal.showModal()}
        >+</button>
    </div>

    <dialog
        bind:this={dialogs.damage}
    >
        <div class=dialog-content>
            <input 
                type=number
                bind:value={amounts.damage}
            />
            <button 
                class=damage-btn
                onclick={(evt) => {
                    stats.health.current -= amounts.damage;
                    dialogs.damage.close()
                }}
            >Damage</button>
        </div>
    </dialog>

    <dialog
        bind:this={dialogs.heal}
    >
        <div class=dialog-content>
            <input 
                type=number
                bind:value={amounts.heal}
            />
            <button 
                class=heal-btn
                onclick={(evt) => {
                    stats.health.current += amounts.heal;
                    dialogs.heal.close()
                }}
            >Heal</button>
        </div>
    </dialog>
</div>

<style>
    .health-ctrls {
        display: flex;
        flex-direction: row;
        gap: .25rem;
        justify-content: end;
    }
    .heal-btn,
    .damage-btn {
        border: none;
        padding: .25rem 1rem;
        border-radius: .5rem;
        background-color: var(--crust);
        color: var(--text-on-crust);
    }

    .dialog-content {
        display: flex;
        flex-direction: row;
        gap: .5rem;
    }

    .health-ctrl {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: .25rem;
    }
    .health-label {
        display: grid;
        grid-template-columns: 1fr max-content;
        gap: .5rem;
    }
    .health-bar {
        position: relative;
        width: 100%;
        border: 1px solid var(--crust);
        box-sizing: border-box;
        height: 1rem;
    }
    .current-health {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: var(--crust);
    }
</style>