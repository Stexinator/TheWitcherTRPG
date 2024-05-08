import WitcherCharacterSheet from "../actor/sheets/WitcherCharacterSheet.js";
import WitcherMonsterSheet from "../actor/sheets/WitcherMonsterSheet.js";
import WitcherLootSheet from "../actor/sheets/WitcherLootSheet.js";

import WitcherItemSheet from "../item/sheets/WitcherItemSheet.js";
import WitcherWeaponSheet from "../item/sheets/WitcherWeaponSheet.js";
import WitcherDiagramSheet from "../item/sheets/WitcherDiagramSheet.js";
import WitcherContainerSheet from "../item/sheets/WitcherContainerSheet.js";
import WitcherMysterySheet from "../actor/sheets/investigation/WitcherMysterySheet.js";
import WitcherClueSheet from "../item/sheets/investigation/WitcherClueSheet.js";
import WitcherObstacleSheet from "../item/sheets/investigation/WitcherObstacleSheet.js";

export const registerSheets = () => {
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("witcher", WitcherItemSheet, { makeDefault: true });
    Items.registerSheet("witcher", WitcherWeaponSheet, { 
        makeDefault: true,
        types: ['weapon']
    });
    Items.registerSheet("witcher", WitcherDiagramSheet, { 
        makeDefault: true,
        types: ['diagrams']
    });
    Items.registerSheet("witcher", WitcherContainerSheet, { 
        makeDefault: true,
        types: ['container']
    });

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("witcher", WitcherCharacterSheet, { 
        makeDefault: true,
        types: ['character']
    });
    Actors.registerSheet("witcher", WitcherMonsterSheet, { 
        makeDefault: true,
        types: ['monster']
    });
    Actors.registerSheet("witcher", WitcherLootSheet, { 
        makeDefault: true,
        types: ['loot']
    });

    Actors.registerSheet("witcher", WitcherMysterySheet, { 
        makeDefault: true,
        types: ['mystery']
    });
    Items.registerSheet("witcher", WitcherClueSheet, { 
        makeDefault: true,
        types: ['clue']
    });
    Items.registerSheet("witcher", WitcherObstacleSheet, { 
        makeDefault: true,
        types: ['obstacle']
    });
}