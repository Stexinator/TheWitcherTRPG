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
    html.find(".add-effect").on("click", this._onAddEffect.bind(this));
    html.find(".list-edit").on("blur", this._onEffectEdit.bind(this));
    html.find(".remove-effect").on("click", this._oRemoveEffect.bind(this));

    html.find(".add-global-modifier").on("click", this._onAddGlobalModifier.bind(this));
    html.find(".edit-global-modifier").on("blur", this._onEditGlobalModifier.bind(this));
    html.find(".remove-global-modifier").on("click", this._oRemoveGlobalModifier.bind(this));

    html.find("input").focusin(ev => this._onFocusIn(ev));
  }

  _onAddEffect(event) {
    event.preventDefault();
    let newEffectList = []
    if (this.item.system.effects) {
      newEffectList = this.item.system.effects
    }
    newEffectList.push({ id: genId(), name: "effect", percentage: "" })
    this.item.update({ 'system.effects': newEffectList });
  }

  _onEffectEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;

    let field = element.dataset.field;
    let value = element.value

    if (value == "on") {
      value = element.checked;
    }

    let effects = this.item.system.effects
    let objIndex = effects.findIndex((obj => obj.id == itemId));
    effects[objIndex][field] = value

    this.item.update({ 'system.effects': effects });

  }

  _oRemoveEffect(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;
    let newEffectList = this.item.system.effects.filter(item => item.id !== itemId)
    this.item.update({ 'system.effects': newEffectList });
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