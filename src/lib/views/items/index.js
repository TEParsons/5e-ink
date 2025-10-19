import { default as container } from "./Container.svelte";
import { default as consumable } from "./Consumable.svelte";
import { default as misc } from "./Misc.svelte";


export var params = {
    consumable: consumable,
    container: container,
    misc: misc
}