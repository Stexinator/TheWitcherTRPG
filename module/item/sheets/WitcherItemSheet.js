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

    html.find(".add-component").on("click", this._onAddComponent.bind(this));
    html.find(".add-associated-item").on("click", this._onAddAssociatedItem.bind(this))
    html.find(".remove-associated-item").on("click", this._onRemoveAssociatedItem.bind(this))
    html.find(".remove-component").on("click", this._onRemoveComponent.bind(this));

    html.find("input").focusin(ev => this._onFocusIn(ev));
    html.find(".dragable").on("dragstart", (ev) => {
      let itemId = ev.target.dataset.id
      let item = this.actor.items.get(itemId);
      ev.originalEvent.dataTransfer.setData(
        "text/plain",
        JSON.stringify({
          item: item,
          actor: this.actor,
          type: "itemDrop",
        }),
      )
    });

    const newDragDrop = new DragDrop({
      dragSelector: `.dragable`,
      dropSelector: `.window-content`,
      permissions: { dragstart: this._canDragStart.bind(this), drop: this._canDragDrop.bind(this) },
      callbacks: { dragstart: this._onDragStart.bind(this), drop: this._onDrop.bind(this) }
    })
    this._dragDrop.push(newDragDrop);
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

  _onFocusIn(event) {
    event.currentTarget.select();
  }
}