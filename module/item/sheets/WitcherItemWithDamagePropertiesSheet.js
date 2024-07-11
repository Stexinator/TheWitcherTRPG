import { genId } from "../../scripts/witcher.js";
import WitcherItemSheet from "./WitcherItemSheet.js";

export default class WitcherItemWithDamagePropertiesSheet extends WitcherItemSheet {

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".add-effect").on("click", this._onAddEffect.bind(this));
    html.find(".edit-effect").on("blur", this._onEditEffect.bind(this));
    html.find(".remove-effect").on("click", this._oRemoveEffect.bind(this));

    html.find("input").focusin(ev => this._onFocusIn(ev));
  }

  _onAddEffect(event) {
    event.preventDefault();
    let newList = this.item.system.damageProperties.effects ?? []
    newList.push({ id: genId(), percentage: 0 })
    this.item.update({ 'system.damageProperties.effects': newList });
  }

  _onEditEffect(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;

    let field = element.dataset.field;
    let value = element.value

    if (value == "on") {
      value = element.checked;
    }

    let effects = this.item.system.damageProperties.effects
    let objIndex = effects.findIndex((obj => obj.id == itemId));
    effects[objIndex][field] = value

    this.item.update({ 'system.damageProperties.effects': effects });

  }

  _oRemoveEffect(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;
    let newList = this.item.system.damageProperties.effects.filter(item => item.id !== itemId)
    this.item.update({ 'system.damageProperties.effects': newList });
  }

}