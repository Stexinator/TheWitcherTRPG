
import WitcherItemSheet from "./WitcherItemSheet.js";
import { WITCHER } from "../../setup/config.js";
import { genId } from "../../scripts/witcher.js";

export default class WitcherGlobalModifierSheet extends WitcherItemSheet {

  get template() {
    return `systems/TheWitcherTRPG/templates/sheets/globalModifier-sheet.hbs`;
  }

  /** @override */
  getData() {
    const data = super.getData();

    data.globalModifierConfig = {
      stats: Object.keys(WITCHER.statMap).filter(stat => WITCHER.statMap[stat].origin == "stats").map(stat => WITCHER.statMap[stat]),
      derivedStats: Object.keys(WITCHER.statMap).filter(stat => WITCHER.statMap[stat].origin == "derivedStats" || WITCHER.statMap[stat].origin == "coreStats").map(stat => WITCHER.statMap[stat]),
      special: WITCHER.specialModifier
    }

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".add-modifier-stat").on("click", this._onAddStatModifier.bind(this));
    html.find(".add-modifier-skill").on("click", this._onAddModifierSkill.bind(this));
    html.find(".add-modifier-derived").on("click", this._onAddModifierDerived.bind(this));
    html.find(".add-modifier-special").on("click", this._onAddModifierSpecial.bind(this));


    html.find(".remove-modifier-stat").on("click", this._onRemoveStatModifier.bind(this));
    html.find(".remove-modifier-skill").on("click", this._onRemoveModifierSkill.bind(this));
    html.find(".remove-modifier-derived").on("click", this._onRemoveModifierDerived.bind(this));
    html.find(".remove-modifier-special").on("click", this._onRemoveModifierSpecial.bind(this));

    html.find(".modifiers-edit").on("change", this._onEditStatModifier.bind(this));
    html.find(".modifiers-edit-skills").on("change", this._onModifierSkillsEdit.bind(this));
    html.find(".modifiers-edit-derived").on("change", this._onModifierDerivedEdit.bind(this));
    html.find(".modifiers-edit-special").on("change", this._onModifierSpecialEdit.bind(this));
  }

  _onAddStatModifier(event) {
    event.preventDefault();
    let newModifierList = []
    if (this.item.system.stats) {
      newModifierList = this.item.system.stats
    }
    newModifierList.push({ id: genId(), stat: "none", modifier: 0 })
    this.item.update({ 'system.stats': newModifierList });
  }

  _onEditStatModifier(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;
    let field = element.dataset.field;
    let value = element.value
    let modifiers = this.item.system.stats
    let objIndex = modifiers.findIndex((obj => obj.id == itemId));
    modifiers[objIndex][field] = value
    this.item.update({ 'system.stats': modifiers });
  }

  _onRemoveStatModifier(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;
    let newModifierList = this.item.system.stats.filter(item => item.id !== itemId)
    this.item.update({ 'system.stats': newModifierList });
  }

  _onAddModifierSkill(event) {
    event.preventDefault();
    let newModifierList = []
    if (this.item.system.skills) {
      newModifierList = this.item.system.skills
    }
    newModifierList.push({ id: genId(), skill: "none", modifier: 0 })
    this.item.update({ 'system.skills': newModifierList });
  }

  _onModifierSkillsEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;

    let field = element.dataset.field;
    let value = element.value
    let effects = this.item.system.skills
    let objIndex = effects.findIndex((obj => obj.id == itemId));
    effects[objIndex][field] = value
    this.item.update({ 'system.skills': effects });
  }

  _onRemoveModifierSkill(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;
    let newModifierList = this.item.system.skills.filter(item => item.id !== itemId)
    this.item.update({ 'system.skills': newModifierList });
  }

  _onAddModifierDerived(event) {
    event.preventDefault();
    let newModifierList = []
    if (this.item.system.derived) {
      newModifierList = this.item.system.derived
    }
    newModifierList.push({ id: genId(), derivedStat: "none", modifier: 0 })
    this.item.update({ 'system.derived': newModifierList });
  }

  _onModifierDerivedEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;

    let field = element.dataset.field;
    let value = element.value
    let effects = this.item.system.derived
    let objIndex = effects.findIndex((obj => obj.id == itemId));
    effects[objIndex][field] = value
    this.item.update({ 'system.derived': effects });
  }


  _onRemoveModifierDerived(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;
    let newModifierList = this.item.system.derived.filter(item => item.id !== itemId)
    this.item.update({ 'system.derived': newModifierList });
  }

  _onAddModifierSpecial(event) {
    event.preventDefault();
    let newModifierList = this.item.system.special ?? []
    newModifierList.push({ id: genId(), special: "", })
    this.item.update({ 'system.special': newModifierList });
  }

  _onModifierSpecialEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;

    let field = element.dataset.field;
    let value = element.value
    let special = this.item.system.special
    let objIndex = special.findIndex((obj => obj?.id == itemId));
    special[objIndex][field] = value
    this.item.update({ 'system.special': special });
  }

  _onRemoveModifierSpecial(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;
    let newModifierList = this.item.system.special.filter(item => item?.id !== itemId)
    this.item.update({ 'system.special': newModifierList });
  }
}