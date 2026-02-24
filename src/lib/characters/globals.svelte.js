import Cerys from "./cerys.json";
import Paran from "./paran.json";
import Yiig from "./yiig.json";


export var characters = $state({
    cerys: Cerys,
    paran: Paran,
    yiig: Yiig
});

export var current = $state({
    index: undefined,
    stats: {}
})