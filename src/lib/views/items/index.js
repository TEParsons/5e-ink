import { default as weapon } from "./Weapon.svelte";
import { default as container } from "./Container.svelte";
import { default as consumable } from "./Consumable.svelte";
import { default as misc } from "./Misc.svelte";


export var params = {
    weapon: weapon,
    consumable: consumable,
    container: container,
    misc: misc
}