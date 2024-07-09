import { genId } from "../../scripts/witcher.js";

export default class WitcherItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
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
    return `systems/TheWitcherTRPG/templates/sheets/${this.object.type}-sheet.hbs`;
  }

  /** @override */
  getData() {
    const data = super.getData();
    data.config = CONFIG.WITCHER;

    this.options.classes.push(`item-${this.item.type}`)
    data.data = data.item?.system
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".add-global-modifier").on("click", this._onAddGlobalModifier.bind(this));
    html.find(".edit-global-modifier").on("blur", this._onEditGlobalModifier.bind(this));
    html.find(".remove-global-modifier").on("click", this._oRemoveGlobalModifier.bind(this));

    html.find("input").focusin(ev => this._onFocusIn(ev));
  }

  _onAddGlobalModifier(event) {
    event.preventDefault();
    let newList = []
    if (this.item.system.globalModifiers) {
      newList = this.item.system.effects
    }
    newList.push("global modifier")
    this.item.update({ 'system.globalModifiers': newList });
  }

  _onEditGlobalModifier(event) {
    event.preventDefault();
    let element = event.currentTarget;

    let value = element.value
    let oldValue = element.defaultValue

    let modifiers = this.item.system.globalModifiers

    modifiers[modifiers.indexOf(oldValue)] = value;

    this.item.update({ 'system.globalModifiers': modifiers });

  }

  _oRemoveGlobalModifier(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;
    let newEffectList = this.item.system.globalModifiers.filter(modifier => modifier !== itemId)
    this.item.update({ 'system.globalModifiers': newEffectList });
  }

  _onFocusIn(event) {
    event.currentTarget.select();
  }
}