import { Filesystem, Directory } from "@capacitor/filesystem";
// import preset chars
import Cerys from "./cerys.json";
import Yiig from "./yiig.json";
import Paran from "./paran.json";
import Brainworm from "./brainworm.json";


export var characters = $state([])

if (Directory) {
    // on mobile, get characters from documents
    Filesystem.readdir({
        directory: Directory.Documents
    }).then(
        files => file.filter(
            // only include JSON files
            file => file.endsWith(".json")
        ).forEach(
            // import and add each
            file => characters.push(
                import(file)
            )
        )
    )
} else {
    // in browser, use preset characters
    characters.push(...[
        Yiig,
        Paran,
        Brainworm,
        Cerys
    ])
}