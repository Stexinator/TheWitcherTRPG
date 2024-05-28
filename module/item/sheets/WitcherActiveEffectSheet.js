
import WitcherItemSheet from "./WitcherItemSheet.js";
import { WITCHER } from "../../setup/config.js";

export default class WitcherEffectSheet extends WitcherItemSheet {

  get template() {
    return `systems/TheWitcherTRPG/templates/sheets/effect-sheet.hbs`;
  }

  /** @override */
  getData() {
    const data = super.getData();

    data.activeEffectConfig = {
      stats: Object.keys(WITCHER.statMap).filter(stat => WITCHER.statMap[stat].origin == "stats").map(stat => WITCHER.statMap[stat]),
      derivedStats: Object.keys(WITCHER.statMap).filter(stat => WITCHER.statMap[stat].origin == "derivedStats" || WITCHER.statMap[stat].origin == "coreStats").map(stat => WITCHER.statMap[stat])
    }

    return data;
  }
}