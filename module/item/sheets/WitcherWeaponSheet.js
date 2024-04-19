
import { genId } from "../../scripts/witcher.js";
import WitcherItemSheet from "./WitcherItemSheet.js";

export default class WitcherWeaponSheet extends WitcherItemSheet {

  get template() {
    return `systems/TheWitcherTRPG/templates/sheets/weapon-sheet.hbs`;
  }

  /** @override */
  getData() {
    const data = super.getData();

    let appliedId = false;
    this.item.system.effects.forEach(effect => {
      if (effect.id == undefined) {
        appliedId = true
        effect.id = genId()
      }
    });

    return data;
  }
}