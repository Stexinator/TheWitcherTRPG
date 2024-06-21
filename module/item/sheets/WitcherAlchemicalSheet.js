
import WitcherItemSheet from "./WitcherItemSheet.js";

export default class WitcherAlchemicalSheet extends WitcherItemSheet {


  get template() {
    return `systems/TheWitcherTRPG/templates/sheets/alchemical-sheet.hbs`;
  }

  /** @override */
  getData() {
    const data = super.getData();

    data.config.Availability.WITCHER = "WITCHER.Item.AvailabilityWitcher";
    data.config.type = this.getTypes();

    return data;
  }

  getTypes() {
    return {
      alchemical: "WITCHER.Alchemy.Alchemical",
      potion: "WITCHER.Alchemy.Potion",
      decoction: "WITCHER.Alchemy.Decoction",
      oil: "WITCHER.Alchemy.Oil",
    }
  }
}