import WitcherActorSheet from "./WitcherActorSheet.js";
import { buttonDialog } from "../../scripts/chat.js";

export default class WitcherMonsterSheet extends ActorSheet {

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "actor"],
      width: 1120,
      height: 600,
      template: "systems/TheWitcherTRPG/templates/sheets/actor/actor-sheet.html",
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
    });
  }

   getData() {
    let context = super.getData();
    this._prepareLoot(context);
    return context;
  }

  _prepareLoot(context) {
    let items = context.actor.items;
    context.loots = items.filter(i => i.type == "component" ||
        i.type == "crafting-material" ||
        i.type == "enhancement" ||
        i.type == "valuable" ||
        i.type == "animal-parts" ||
        i.type == "diagrams" ||
        i.type == "armor" ||
        i.type == "alchemical" ||
        i.type == "enhancement" ||
        i.type == "mutagen");
  }
}