
import { genId } from "../witcher.js";
import WitcherItemSheet from "./WitcherItemSheet.js";

export default class WitcherDiagramSheet extends WitcherItemSheet {

  get template() {
    return `systems/TheWitcherTRPG/templates/sheets/diagrams-sheet.html`;
  }

  /** @override */
  getData() {
    const data = super.getData();
    return data;
  }

  async _onDrop(event) {
    let dragEventData = TextEditor.getDragEventData(event)
    let item = await fromUuid(dragEventData.uuid)

    if (item) {
      if (event.target.offsetParent.dataset.type == "associatedItem") {
        this.item.update({ 'system.associatedItem': item });
      } else {
        let newComponentList = []
        if (this.item.system.craftingComponents) {
          newComponentList = this.item.system.craftingComponents
        }
        newComponentList.push({ id: genId(), name: item.name, quantity: 1 })
        this.item.update({ 'system.craftingComponents': newComponentList });
      }
    }
  }

  _onEffectEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".list-item").dataset.id;

    let field = element.dataset.field;
    let value = element.value
    
    let components = this.item.system.craftingComponents
    let objIndex = components.findIndex((obj => obj.id == itemId));
    components[objIndex][field] = value
    this.item.update({ 'system.craftingComponents': components });
  }

  async _onRemoveAssociatedItem(event) {
    event.preventDefault();
    let newAssociatedItem = { id: "", name: "", img: "" };
    this.item.update({ 'system.associatedItem': newAssociatedItem });
  }

}