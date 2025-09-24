import { Ajv } from "ajv";
import AdvancementSchema from "./advancement.schema.json";
import SpellSchema from "./spell.schema.json";
import ActionSchema from "./action.schema.json";
import TraitSchema from "./trait.schema.json";

let ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    schemas: [
        SpellSchema,
        ActionSchema,
        TraitSchema,
        AdvancementSchema
    ]
});
// extra keyword to let me add notes
ajv.addKeyword("note");

export var schemas = {
    spell: ajv.compile(SpellSchema),
    action: ajv.compile(ActionSchema),
    trait: ajv.compile(TraitSchema),
    advancement: ajv.compile(AdvancementSchema)
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