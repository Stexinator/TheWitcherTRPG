
import { genId } from "../../scripts/witcher.js";
import WitcherItemSheet from "./WitcherItemSheet.js";

export default class WitcherWeaponSheet extends WitcherItemSheet {

  get template() {
    return `systems/TheWitcherTRPG/templates/sheets/weapon-sheet.hbs`;
  }

  /** @override */
  getData() {
    const data = super.getData();

    this.item.system.effects.forEach(effect => {
      if (effect.id == undefined) {
        effect.id = genId()
      }
    });

    return data;
  }
}