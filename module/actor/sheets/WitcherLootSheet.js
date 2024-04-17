import { buttonDialog } from "../../scripts/chat.js";
import { calc_currency_weight } from "../../scripts/witcher.js";

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
    context.system = context.actor.system;
    context.weapons = context.actor.getList("weapon");
    context.armors = context.actor.items.filter(function (item) {
      return item.type == "armor" ||
        (item.type == "enhancement" && item.system.type == "armor" && item.system.applied == false)
    });
    context.enhancements = context.items.filter(i => i.type == "enhancement" && i.system.type != "armor" && !i.system.applied);
    context.runeItems = context.enhancements.filter(e => e.system.type == "rune");
    context.glyphItems = context.enhancements.filter(e => e.system.type == "glyph");

    context.totalWeight = context.items.weight() + calc_currency_weight(context.actor.system.currency);
    context.totalCost = context.items.cost();

    this._prepareLoot(context);
    this._prepareCrafting(context);
    this._prepareSubstances(context);
    this._prepareValuables(context);

    context.isGM = game.user.isGM

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

  _prepareSubstances(context) {
    let actor = context.actor;

    context.substancesVitriol = actor.getSubstance("vitriol");
    context.vitriolCount = context.substancesVitriol.sum("quantity");
    context.substancesRebis = actor.getSubstance("rebis");
    context.rebisCount = context.substancesRebis.sum("quantity");
    context.substancesAether = actor.getSubstance("aether");
    context.aetherCount = context.substancesAether.sum("quantity");
    context.substancesQuebrith = actor.getSubstance("quebrith");
    context.quebrithCount = context.substancesQuebrith.sum("quantity");
    context.substancesHydragenum = actor.getSubstance("hydragenum");
    context.hydragenumCount = context.substancesHydragenum.sum("quantity");
    context.substancesVermilion = actor.getSubstance("vermilion");
    context.vermilionCount = context.substancesVermilion.sum("quantity");
    context.substancesSol = actor.getSubstance("sol");
    context.solCount = context.substancesSol.sum("quantity");
    context.substancesCaelum = actor.getSubstance("caelum");
    context.caelumCount = context.substancesCaelum.sum("quantity");
    context.substancesFulgur = actor.getSubstance("fulgur");
    context.fulgurCount = context.substancesFulgur.sum("quantity");
  }

  _prepareCrafting(context) {
    context.allComponents = context.actor.getList("component");
    context.craftingMaterials = context.allComponents.filter(i => i.system.type == "crafting-material" || i.system.type == "component");
    context.ingotsAndMinerals = context.allComponents.filter(i => i.system.type == "minerals");
    context.hidesAndAnimalParts = context.allComponents.filter(i => i.system.type == "animal-parts");
  }

  _prepareValuables(context) {
    let items = context.actor.items;
    context.valuables = items.filter(i => i.type == "valuable");

    context.clothingAndContainers = context.valuables.filter(i => i.system.type == "clothing" || i.system.type == "containers");
    context.general = context.valuables.filter(i => i.system.type == "genera" || i.system.type == "general" || !i.system.type);
    context.foodAndDrinks = context.valuables.filter(i => i.system.type == "food-drink");
    context.toolkits = context.valuables.filter(i => i.system.type == "toolkit");
    context.questItems = context.valuables.filter(i => i.system.type == "quest-item");

    context.mounts = items.filter(i => i.type == "mount");
    context.mountAccessories = items.filter(i => i.type == "valuable" && i.system.type == "mount-accessories");
   }

   activateListeners(html) {
    super.activateListeners(html);

    html.find(".inline-edit").change(this._onInlineEdit.bind(this));
    html.find(".item-edit").on("click", this._onItemEdit.bind(this));
    html.find(".item-show").on("click", this._onItemShow.bind(this));
    html.find(".item-weapon-display").on("click", this._onItemDisplayInfo.bind(this));
    html.find(".item-armor-display").on("click", this._onItemDisplayInfo.bind(this));
    html.find(".item-valuable-display").on("click", this._onItemDisplayInfo.bind(this));
    html.find(".item-delete").on("click", this._onItemDelete.bind(this));
    html.find(".item-buy").on("click", this._onItemBuy.bind(this));
    html.find(".item-hide").on("click", this._onItemHide.bind(this));
    html.find(".add-item").on("click", this._onItemAdd.bind(this));
    html.find(".item-substance-display").on("click", this._onSubstanceDisplay.bind(this));

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

  async _onItemAdd(event) {
    let element = event.currentTarget
    let itemData = {
      name: `new ${element.dataset.itemtype}`,
      type: element.dataset.itemtype
    }

    if (element.dataset.itemtype == "component") {
      if (element.dataset.subtype == "alchemical") {
        itemData.system = { type: element.dataset.subtype }
      } else if (element.dataset.subtype) {
        itemData.system = { type: "substances", substanceType: element.dataset.subtype }
      } else {
        itemData.system = { type: "component", substanceType: element.dataset.subtype }
      }
    }

    if (element.dataset.itemtype == "valuable") {
      itemData.system = { type: "general" };
    }

    if (element.dataset.itemtype == "diagram") {
      itemData.system = { type: "alchemical", level: "novice", isFormulae: true };
    }

    await Item.create(itemData, { parent: this.actor })
  }

  async _addItem(actor, Additem, numberOfItem, forcecreate = false) {
    let foundItem = (actor.items).find(item => item.name == Additem.name);
    if (foundItem && !forcecreate) {
      await foundItem.update({ 'system.quantity': Number(foundItem.system.quantity) + Number(numberOfItem) })
    }
    else {
      let newItem = { ...Additem };

      if (numberOfItem) {
        newItem.system.quantity = Number(numberOfItem)
      }
      await actor.createEmbeddedDocuments("Item", [newItem]);
    }
  }

  async _removeItem(actor, itemId, quantityToRemove) {
    actor.removeItem(itemId, quantityToRemove)
  }

  _onInlineEdit(event) {
    event.preventDefault();
    let element = event.currentTarget;
    let itemId = element.closest(".item").dataset.itemId;   
    let item = this.actor.items.get(itemId);
    let field = element.dataset.field;
    // Edit checkbox values
    let value = element.value
    if (value == "false") {
      value = true
    }
    if (value == "true" || value == "checked") {
      value = false
    }

    return item.update({ [field]: value });
  }

  _onItemEdit(event) {
    event.preventDefault();
    let itemId = event.currentTarget.closest(".item").dataset.itemId;
    let item = this.actor.items.get(itemId);

    item.sheet.render(true)
  }

  async _onItemShow(event) {
    event.preventDefault;
    let itemId = event.currentTarget.closest(".item").dataset.itemId;
    let item = this.actor.items.get(itemId);

    new Dialog({
      title: item.name,
      content: `<img src="${item.img}" alt="${item.img}" width="100%" />`,
      buttons: {}
    }, {
      width: 520,
      resizable: true
    }).render(true);
  }

  async _onItemDelete(event) {
    event.preventDefault();
    let itemId = event.currentTarget.closest(".item").dataset.itemId;
    return await this.actor.items.get(itemId).delete();
  }

  async _onItemBuy(event) {
    event.preventDefault();
    let itemId = event.currentTarget.closest(".item").dataset.itemId;
    let item = this.actor.items.get(itemId);
    let coinOptions = `
      <option value="crown" selected> ${game.i18n.localize("WITCHER.Currency.crown")} </option>
      <option value="bizant"> ${game.i18n.localize("WITCHER.Currency.bizant")} </option>
      <option value="ducat"> ${game.i18n.localize("WITCHER.Currency.ducat")} </option>
      <option value="lintar"> ${game.i18n.localize("WITCHER.Currency.lintar")} </option>
      <option value="floren"> ${game.i18n.localize("WITCHER.Currency.floren")} </option>
      <option value="oren"> ${game.i18n.localize("WITCHER.Currency.oren")} </option>
      `;
    let percentOptions = `
      <option value="50">50%</option>
      <option value="100"selected>100%</option>
      <option value="125">125%</option>
      <option value="150">150%</option>
      <option value="175">175%</option>
      <option value="200">200%</option>
      `;

    let content = `
      <script>
        function calcTotalCost() {
          var qtyInput = document.getElementById("itemQty");
          var ItemCostInput = document.getElementById("customCost");
          var costTotalInput = document.getElementById("costTotal");
          costTotalInput.value = ItemCostInput.value * qtyInput.value
        }
        function applyPercentage() {
          var qtyInput = document.getElementById("itemQty");
          var percentage = document.getElementById("percent");
          var ItemCostInput = document.getElementById("customCost");
          ItemCostInput.value = Math.ceil(${item.system.cost} * (percentage.value / 100))

          var costTotalInput = document.getElementById("costTotal");
          costTotalInput.value = ItemCostInput.value * qtyInput.value
        }
      </script>

      <label>${game.i18n.localize("WITCHER.Loot.InitialCost")}: ${item.system.cost}</label><br />
      <label>${game.i18n.localize("WITCHER.Loot.HowMany")}: <input id="itemQty" onChange="calcTotalCost()" type="number" class="small" name="itemQty" value=1> /${item.system.quantity}</label> <br />
      <label>${game.i18n.localize("WITCHER.Loot.ItemCost")}</label> <input id="customCost" onChange="calcTotalCost()" type="number" name="costPerItemValue" value=${item.system.cost}>${game.i18n.localize("WITCHER.Loot.Percent")}<select id="percent" onChange="applyPercentage()" name="percentage">${percentOptions}</select><br /><br />
      <label>${game.i18n.localize("WITCHER.Loot.TotalCost")}</label> <input id="costTotal" type="number" class="small" name="costTotalValue" value=${item.system.cost}> <select name="coinType">${coinOptions}</select><br />
      `
    let Characteroptions = `<option value="">other</option>`
    for (let actor of game.actors) {
      if (actor.testUserPermission(game.user, "OWNER")) {
        if (actor == game.user.character) {
          Characteroptions += `<option value="${actor._id}" selected>${actor.name}</option>`
        } else {
          Characteroptions += `<option value="${actor._id}">${actor.name}</option>`
        }
      };
    }
    content += `To Character : <select name="character">${Characteroptions}</select>`
    let cancel = true
    let numberOfItem = 0;
    let totalCost = 0;
    let characterId = "";
    let coinType = "";

    let dialogData = {
      buttons: [
        [`${game.i18n.localize("WITCHER.Button.Continue")}`, (html) => {
          numberOfItem = html.find("[name=itemQty]")[0].value;
          totalCost = html.find("[name=costTotalValue]")[0].value;
          coinType = html.find("[name=coinType]")[0].value;
          characterId = html.find("[name=character]")[0].value;
          cancel = false
        }]],
      title: game.i18n.localize("WITCHER.Loot.BuyTitle"),
      content: content
    }
    await buttonDialog(dialogData)
    if (cancel) {
      return
    }

    let buyerActor = game.actors.get(characterId)
    let token = buyerActor.token ?? buyerActor.getActiveTokens()[0]
    if (token) {
      buyerActor = token.actor
    }
    let hasEnoughMoney = true
    if (buyerActor) {
      hasEnoughMoney = buyerActor.system.currency[coinType] >= totalCost
    }

    if (!hasEnoughMoney) {
      ui.notifications.error("Not Enough Coins");
    } else {
      this._removeItem(this.actor, itemId, numberOfItem)
      if (buyerActor) {
        this._addItem(buyerActor, item, numberOfItem)
      }

      if (buyerActor) {
        buyerActor.update({ [`system.currency.${coinType}`]: buyerActor.system.currency[coinType] - totalCost }) 
       }
      this.actor.update({ [`system.currency.${coinType}`]: Number(this.actor.system.currency[coinType]) + Number(totalCost) })
    }
  }

  _onItemHide(event) {
    event.preventDefault();
    let itemId = event.currentTarget.closest(".item").dataset.itemId;
    let item = this.actor.items.get(itemId);
    item.update({ "system.isHidden": !item.system.isHidden })
  }

  _onItemDisplayInfo(event) {
    event.preventDefault();
    let section = event.currentTarget.closest(".item");
    let editor = $(section).find(".item-info")
    editor.toggleClass("invisible");
  }

  _onSubstanceDisplay(event) {
    event.preventDefault();
    let section = event.currentTarget.closest(".substance");
    this.actor.update({ [`system.pannels.${section.dataset.subtype}IsOpen`]: !this.actor.system.pannels[section.dataset.subtype+'IsOpen']});
  }
}