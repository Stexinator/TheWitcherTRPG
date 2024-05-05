
export default class WitcherObstacleSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
      dragDrop: [{
        dragSelector: ".items-list .item",
        dropSelector: null
      }],
    });
  }

  get template() {
    return `systems/TheWitcherTRPG/templates/sheets/investigation/obstacle-sheet.hbs`;
  }

  /** @override */
  getData() {
    const data = super.getData();

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

   
  }
}