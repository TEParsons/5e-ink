import json
from pathlib import Path


with Path("src/lib/cerys.json").open("r") as f:
    cerys = json.load(f)

for level in cerys['spells']:
    for spell in cerys['spells'][level]['spells']:
        spell['time'] = {
            'type': spell['time'].lower().replace("1 ", "").replace(" ", ""),
            'amount': 1
        }

with Path("src/lib/cerys.json").open("w") as f:
    json.dump(cerys, f, indent=4)