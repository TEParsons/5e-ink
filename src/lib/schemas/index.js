import { Ajv } from "ajv";
import AdvancementSchema from "./advancement.schema.json";
import SpellSchema from "./spell.schema.json";
import ActionSchema from "./action.schema.json";
import TraitSchema from "./trait.schema.json";
import ItemSchema from "./item.schema.json";
import WeaponItemSchema from "./items/weapon.schema.json";
import ArmourItemSchema from "./items/armour.schema.json";
import ToolItemSchema from "./items/tool.schema.json";
import ConsumableItemSchema from "./items/consumable.schema.json";

let ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true,
    schemas: [
        SpellSchema,
        ActionSchema,
        TraitSchema,
        AdvancementSchema,
        ItemSchema,
        WeaponItemSchema,
        ArmourItemSchema,
        ToolItemSchema,
        ConsumableItemSchema
    ]
});
// extra keyword to let me add notes
ajv.addKeyword("note");

export var schemas = {
    spell: ajv.compile(SpellSchema),
    action: ajv.compile(ActionSchema),
    trait: ajv.compile(TraitSchema),
    advancement: ajv.compile(AdvancementSchema),
    item: ajv.compile(ItemSchema),
}

/**
 * Does what ajv.validate({}) should do (insane that it doesn't)
 * 
 * @param schema
 */
export function recursiveDefaults(schema) {
    let output
    // if schema describes an object and defines properties, generate a default from them
    if (schema.type === "object") {
        // start off blank
        output = {}
        
        if (schema.properties) {
            // iterate through properties if we have them
            for (let [key, subschema] of Object.entries(schema.properties)) {
                // recur
                output[key] = recursiveDefaults(subschema) 
            }
        } else if (schema.additionalProperties) {
            // add one example of additional properties
            output["default"] = recursiveDefaults(schema.additionalProperties)
        }
    } else {
        // otherwise, use given default
        output = schema.default
    }

    return output
}