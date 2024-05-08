import { buttonDialog, rollDamage, extendedRoll } from "../../scripts/chat.js";
import { witcher } from "../../setup/config.js";
import { updateDerived, rollSkillCheck, genId, calc_currency_weight, addModifiers } from "../../scripts/witcher.js";
import { RollConfig } from "../../scripts/rollConfig.js";

import { ExecuteDefence } from "../../scripts/actions.js";

Array.prototype.sum = function (prop) {
  var total = 0
  for (var i = 0; i < this.length; i++) {
    if (this[i].system[prop]) {
      total += Number(this[i].system[prop])
    }
    else if (this[i].system?.system[prop]) {
      total += Number(this[i].system?.system[prop])
    }
  }
  return total
 }
Array.prototype.weight = function () {
  var total = 0
  for (var i = 0, _len = this.length; i < _len; i++) {
    if (this[i].system.weight && this[i].system.quantity && !this[i].system.isStored) {
      total += Number(this[i].system.quantity) * Number(this[i].system.weight)
    }
  }
  return Math.ceil(total)
 }
Array.prototype.cost = function () {
  var total = 0
  for (var i = 0, _len = this.length; i < _len; i++) {
    if (this[i].system.cost && this[i].system.quantity) {
      total += Number(this[i].system.quantity) * Number(this[i].system.cost)
    }
  }
  return Math.ceil(total)
 }

export default class WitcherActorSheet extends ActorSheet {

  statMap = witcher.statMap;
  skillMap = witcher.skillMap;

  /** @override */
  getData() {
    const context = super.getData();

    context.useAdrenaline = game.settings.get("TheWitcherTRPG", "useOptionalAdrenaline")
    context.displayRollDetails = game.settings.get("TheWitcherTRPG", "displayRollsDetails")
    context.useVerbalCombat = game.settings.get("TheWitcherTRPG", "useOptionalVerbalCombat")
    context.displayRep = game.settings.get("TheWitcherTRPG", "displayRep")

    context.config = CONFIG.witcher;
    CONFIG.Combat.initiative.formula = "1d10 + @stats.ref.current" + (context.displayRollDetails ? "[REF]" : "");

    const actorData = this.actor.toObject(false);
    context.system = actorData.system;
    context.items = context.actor.items.filter(i => !i.system.isStored);

    this._prepareGeneralInformation(context);
    this._prepareWeapons(context);
    this._prepareArmor(context);
    this._prepareSpells(context);
    this._prepareItems(context);

    context.isGM = game.user.isGM
    return context;
  }  

  _prepareGeneralInformation(context) {
    let actor = context.actor;

    context.oldNotes = actor.getList("note");
    context.notes = actor.system.notes;
    context.activeEffects = actor.getList("effect");
  }

  _prepareSpells(context) {
    context.spells = context.actor.getList("spell");

    context.noviceSpells = context.spells.filter(s => s.system.level == "novice" &&
      (s.system.class == "Spells" || s.system.class == "Invocations" || s.system.class == "Witcher"));

    context.journeymanSpells = context.spells.filter(s => s.system.level == "journeyman" &&
      (s.system.class == "Spells" || s.system.class == "Invocations" || s.system.class == "Witcher"));

    context.masterSpells = context.spells.filter(s => s.system.level == "master" &&
      (s.system.class == "Spells" || s.system.class == "Invocations" || s.system.class == "Witcher"));

    context.hexes = context.spells.filter(s => s.system.class == "Hexes");
    context.rituals = context.spells.filter(s => s.system.class == "Rituals");
    context.magicalgift = context.spells.filter(s => s.system.class == "MagicalGift");
  }

   /**
   * Organize and classify Items for Character sheets.
   */
   _prepareItems(context) {
    let items = context.items;

    context.enhancements = items.filter(i => i.type == "enhancement" && i.system.type != "armor" && !i.system.applied);
    context.runeItems = context.enhancements.filter(e => e.system.type == "rune");
    context.glyphItems = context.enhancements.filter(e => e.system.type == "glyph");
    context.containers = items.filter(i => i.type == "container");

    context.totalWeight = context.items.weight() + calc_currency_weight(context.actor.system.currency);
    context.totalCost = context.items.cost();
   }

   _prepareWeapons(context) {
    context.weapons = context.actor.getList("weapon");
    context.weapons.forEach((weapon) => {
      if (weapon.system.enhancements > 0 && weapon.system.enhancements != weapon.system.enhancementItemIds.length) {
        let newEnhancementList = []
        let enhancementItems = weapon.system.enhancementItems ?? []
        for (let i = 0; i < weapon.system.enhancements; i++) {
          let element = enhancementItems[i]
          if (element) {
            newEnhancementList.push(element)
          } else {
            newEnhancementList.push({})
          }
        }
        let item = context.actor.items.get(weapon._id);
        item.system.enhancementItems = newEnhancementList
      }
    });
   }

   _prepareArmor(context) {
    context.armors = context.items.filter(function (item) {
      return item.type == "armor" ||
        (item.type == "enhancement" && item.system.type == "armor" && item.system.applied == false)
    });

    context.armors.forEach((armor) => {
      if (armor.system.enhancements > 0 && armor.system.enhancements != armor.system.enhancementItemIds.length) {
        let newEnhancementList = []
        let enhancementItems = armor.system.enhancementItems ?? []
        for (let i = 0; i < armor.system.enhancements; i++) {
          let element = enhancementItems[i]
          if (element && JSON.stringify(element) != '{}') {
            newEnhancementList.push(element)
          } else {
            newEnhancementList.push({})
          }
        }
        let item = context.actor.items.get(armor._id);
        item.system.enhancementItems = newEnhancementList
      }
    });

   }

  // Helping functions
  /** Sanitizes description if it contains forbidden html tags. */
  sanitizeDescription(item) {
    if (!item.system.description) {
      return item;
    }

    const regex = /(<.+?>)/g;
    const whiteList = ["<p>", "</p>"];
    const tagsInText = item.system.description.match(regex);
    const itemCopy = JSON.parse(JSON.stringify(item));
    if (tagsInText.some(i => !whiteList.includes(i))) {
      const temp = document.createElement('div');
      temp.textContent = itemCopy.system.description;
      itemCopy.system.description = temp.innerHTML;
    }
    return itemCopy;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("input.stat-max").on("change", updateDerived(this.actor));

    let thisActor = this.actor;
    let skillMap = this.skillMap;

    html.find(".hp-value").change(this._onHPChanged.bind(this));
    html.find(".inline-edit").change(this._onInlineEdit.bind(this));
    html.find(".add-active-effect").on("click", this._onAddActiveEffect.bind(this));
    html.find(".skill-display").on("click", this._onSkillDisplay.bind(this));
    html.find(".spell-display").on("click", this._onSpellDisplay.bind(this));
    html.find(".life-event-display").on("click", this._onLifeEventDisplay.bind(this));
    html.find(".stat-modifier-display").on("click", this._onStatModifierDisplay.bind(this));
    html.find(".skill-modifier-display").on("click", this._onSkillModifierDisplay.bind(this));
    html.find(".derived-modifier-display").on("click", this._onDerivedModifierDisplay.bind(this));

    html.find(".init-roll").on("click", this._onInitRoll.bind(this));
    html.find(".crit-roll").on("click", this._onCritRoll.bind(this));
    html.find(".death-roll").on("click", this._onDeathSaveRoll.bind(this));
    html.find(".defence-roll").on("click", this._onDefenceRoll.bind(this));
    html.find(".heal-button").on("click", this._onHeal.bind(this));
    html.find(".verbal-button").on("click", this._onVerbalCombat.bind(this));
    html.find(".reputation-roll").on("click", this._onReputation.bind(this));
    html.find(".stat-roll").on("click", this._onStatSaveRoll.bind(this));
   
    html.find(".profession-roll").on("click", this._onProfessionRoll.bind(this));
    html.find(".spell-roll").on("click", this._onSpellRoll.bind(this));

    //item
    html.find(".add-item").on("click", this._onItemAdd.bind(this));
    html.find(".item-edit").on("click", this._onItemEdit.bind(this));
    html.find(".item-show").on("click", this._onItemShow.bind(this));
    html.find(".item-delete").on("click", this._onItemDelete.bind(this));

    html.find(".item-weapon-display").on("click", this._onItemDisplayInfo.bind(this));
    html.find(".item-armor-display").on("click", this._onItemDisplayInfo.bind(this));
    html.find(".item-valuable-display").on("click", this._onItemDisplayInfo.bind(this));   
    html.find(".item-spell-display").on("click", this._onItemDisplayInfo.bind(this));
    html.find(".item-substance-display").on("click", this._onSubstanceDisplay.bind(this));
    html.find(".item-roll").on("click", this._onItemRoll.bind(this));

    //Background-Tab
    html.find(".add-crit").on("click", this._onCritAdd.bind(this));
    html.find(".delete-crit").on("click", this._onCritRemove.bind(this));
    html.find(".add-note").on("click", this._onNoteAdd.bind(this));
    html.find(".delete-note").on("click", this._onNoteDelete.bind(this));

    html.find(".add-skill-modifier").on("click", this._onAddSkillModifier.bind(this));
    html.find(".add-modifier").on("click", this._onAddModifier.bind(this));
    html.find(".delete-stat").on("click", this._onModifierRemove.bind(this));
    html.find(".delete-skill-modifier").on("click", this._onSkillModifierRemove.bind(this));

    html.find(".list-mod-edit").on("blur", this._onModifierEdit.bind(this));
    html.find(".skill-mod-edit").on("blur", this._onSkillModifierEdit.bind(this));

    html.find(".enhancement-weapon-slot").on("click", this._chooseEnhancement.bind(this));
    html.find(".enhancement-armor-slot").on("click", this._chooseEnhancement.bind(this));

    html.find(".death-minus").on("click", this._removeDeathSaves.bind(this));
    html.find(".death-plus").on("click", this._addDeathSaves.bind(this));

    html.find("input").focusin(ev => this._onFocusIn(ev));

    html.find("#awareness-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.awareness) });
    html.find("#business-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.business) });
    html.find("#deduction-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.deduction) });
    html.find("#education-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.education) });
    html.find("#commonsp-rollable").on("click", function () { rollSkillCheck(thisActor,skillMap.commonsp) });
    html.find("#eldersp-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.eldersp) });
    html.find("#dwarven-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.dwarven) });
    html.find("#monster-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.monster) });
    html.find("#socialetq-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.socialetq) });
    html.find("#streetwise-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.streetwise) });
    html.find("#tactics-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.tactics) });
    html.find("#teaching-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.teaching) });
    html.find("#wilderness-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.wilderness) });
    //ref skills
    html.find("#brawling-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.brawling) });
    html.find("#dodge-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.dodge) });
    html.find("#melee-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.melee) });
    html.find("#riding-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.riding) });
    html.find("#sailing-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.sailing) });
    html.find("#smallblades-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.smallblades) });
    html.find("#staffspear-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.staffspear) });
    html.find("#swordsmanship-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.swordsmanship) });
    //dex skills
    html.find("#archery-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.archery) });
    html.find("#athletics-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.athletics) });
    html.find("#crossbow-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.crossbow) });
    html.find("#sleight-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.sleight) });
    html.find("#stealth-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.stealth) });
    //body skills
    html.find("#physique-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.physique) });
    html.find("#endurance-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.endurance) });
    //emp skills
    html.find("#charisma-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.charisma) });
    html.find("#deceit-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.deceit) });
    html.find("#finearts-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.finearts) });
    html.find("#gambling-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.gambling) });
    html.find("#grooming-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.grooming) });
    html.find("#perception-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.perception) });
    html.find("#leadership-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.leadership) });
    html.find("#persuasion-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.persuasion) });
    html.find("#performance-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.performance) });
    html.find("#seduction-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.seduction) });
    //cra skills
    html.find("#alchemy-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.alchemy) });
    html.find("#crafting-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.crafting) });
    html.find("#disguise-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.disguise) });
    html.find("#firstaid-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.firstaid) });
    html.find("#forgery-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.forgery) });
    html.find("#picklock-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.picklock) });
    html.find("#trapcraft-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.trapcraft) });
    //will skills
    html.find("#courage-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.courage) });
    html.find("#hexweave-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.hexweave) });
    html.find("#intimidation-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.intimidation) });
    html.find("#spellcast-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.spellcast) });
    html.find("#resistmagic-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.resistmagic) });
    html.find("#resistcoerc-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.resistcoerc) });
    html.find("#ritcraft-rollable").on("click", function () { rollSkillCheck(thisActor, skillMap.ritcraft) });

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

  async _removeDeathSaves(event) {
    event.preventDefault();
    this.actor.update({ "system.deathSaves": 0 });
  }

  async _addDeathSaves(event) {
    event.preventDefault();
    this.actor.update({ "system.deathSaves": this.actor.system.deathSaves + 1 });
  }

  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;
    const item = await Item.implementation.fromDropData(data);
    const itemData = item.toObject();

    // Handle item sorting within the same Actor
    if (this.actor.uuid === item.parent?.uuid) return this._onSortItem(event, itemData);

    if(this._isUniqueItem(itemData)) {
      await this._removeItemsOfType(itemData.type)
    }

    // dragData should exist for WitcherActorSheet, WitcherItemSheet.
    // It is populated during the activateListeners phase
    let witcherDragData = event.dataTransfer.getData("text/plain")
    let dragData = witcherDragData ? JSON.parse(witcherDragData) : data;

    // handle itemDrop prepared in WitcherActorSheet, WitcherItemSheet
    // need this to drop item from actor
    if (witcherDragData && dragData.type === "itemDrop") {
      let previousActor = game.actors.get(dragData.actor._id)
      let token = previousActor.token ?? previousActor.getActiveTokens()[0]
      if (token) {
        previousActor = token.actor
      }

      if (previousActor == this.actor) {
        return;
      }

      // Calculate the rollable amount of items to be dropped from actors' inventory
      if (typeof (dragData.item.system.quantity) === 'string' && dragData.item.system.quantity.includes("d")) {
        let messageData = {
          speaker: ChatMessage.getSpeaker({actor: this.actor}),
          flavor: `<h1>Quantity of ${dragData.item.name}</h1>`,
        }
        let roll = await new Roll(dragData.item.system.quantity).evaluate({ async: true })
        roll.toMessage(messageData)

        // Add items to the recipient actor
        this._addItem(this.actor, dragData.item, Math.floor(roll.total))

        // Remove items from donor actor
        if (previousActor) {
          await previousActor.items.get(dragData.item._id).delete()
        }
        return
      }

      if (dragData.item.system.quantity != 0) {
        if (dragData.item.system.quantity > 1) {
          let content = `${game.i18n.localize("WITCHER.Items.transferMany")}: <input type="number" class="small" name="numberOfItem" value=1>/${dragData.item.system.quantity} <br />`
          let cancel = true
          let numberOfItem = 0
          let dialogData = {
            buttons: [
              [`${game.i18n.localize("WITCHER.Button.Continue")}`, (html) => {
                numberOfItem = html.find("[name=numberOfItem]")[0].value;
                cancel = false
              }],
              [`${game.i18n.localize("WITCHER.Button.All")}`, () => {
                numberOfItem = dragData.item.system.quantity
                cancel = false
              }]
            ],
            title: game.i18n.localize("WITCHER.Items.transferTitle"),
            content: content
          }
          await buttonDialog(dialogData)

          if (cancel) {
            return
          } else {
            // Remove items from donor actor
            this._removeItem(previousActor, dragData.item._id, numberOfItem)
            if (numberOfItem > dragData.item.system.quantity) {
              numberOfItem = dragData.item.system.quantity
            }
            // Add items to the recipient actor
            this._addItem(this.actor, dragData.item, numberOfItem)
          }
        } else {
          // Add item to the recipient actor
          this._addItem(this.actor, dragData.item, 1)
          // Remove item from donor actor
          if (previousActor) {
            await previousActor.items.get(dragData.item._id).delete()
          }
        }
      }
    } else if (dragData && dragData.type === "Item") {
      // Adding items from compendia
      // We do not have the same dragData object in compendia as for Actor or Item
      let itemToAdd = item

      // Somehow previous item from passed data object is empty. Let's try to get item from passed event
      if (!itemToAdd) {
        let dragEventData = TextEditor.getDragEventData(event)
        itemToAdd = await fromUuid(dragEventData.uuid)
      }

      if (itemToAdd) {
        this._addItem(this.actor, itemToAdd, 1)
      }
    } else {
      super._onDrop(event, data);
    }
  }

  _isUniqueItem(itemData) {
    return false;
  }

  async _removeItemsOfType(type) {
    let actor = this.actor;
    actor.deleteEmbeddedDocuments("Item", actor.items.filter(item => item.type === type).map(item => item.id))
  }

  async _removeItem(actor, itemId, quantityToRemove) {
    actor.removeItem(itemId, quantityToRemove)
  }

  async _addItem(actor, Additem, numberOfItem, forcecreate = false) {
    let foundItem = (actor.items).find(item => item.name == Additem.name && item.type == Additem.type);
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

  async _chooseEnhancement(event) {
    let itemId = event.currentTarget.closest(".item").dataset.itemId;
    let item = this.actor.items.get(itemId)
    let type = event.currentTarget.closest(".item").dataset.type;

    let content = ""
    let enhancements = this.actor.getList("enhancement")
    if (type == "weapon") {
      enhancements = enhancements.filter(e => e.system.applied == false && (e.system.type == "rune" || e.system.type == "weapon"));
    } else {
      enhancements = enhancements.filter(e => e.system.applied == false && (e.system.type == "armor" || e.system.type == "glyph"));
    }

    let quantity = enhancements.sum("quantity")
    if (quantity == 0) {
      content += `<div class="error-display">${game.i18n.localize("WITCHER.Enhancement.NoEnhancement")}</div>`
    } else {
      let enhancementsOption = ``
      enhancements.forEach(element => {
        enhancementsOption += `<option value="${element._id}"> ${element.name}(${element.system.quantity}) </option>`;
      });
      content += `<div><label>${game.i18n.localize("WITCHER.Dialog.Enhancement")}: <select name="enhancement">${enhancementsOption}</select></label></div>`
    }

    new Dialog({
      title: `${game.i18n.localize("WITCHER.Enhancement.ChooseTitle")}`,
      content,
      buttons: {
        Cancel: {
          label: `${game.i18n.localize("WITCHER.Button.Cancel")}`,
          callback: () => { }
        },
        Apply: {
          label: `${game.i18n.localize("WITCHER.Dialog.Apply")}`,
          callback: (html) => {
            let enhancementId = undefined
            if (html.find("[name=enhancement]")[0]) {
              enhancementId = html.find("[name=enhancement]")[0].value;
            }
            let choosenEnhancement = this.actor.items.get(enhancementId)
            if (item && choosenEnhancement) {
              let newEnhancementList = []
              let added = false
              item.system.enhancementItems.forEach(element => {
                if ((JSON.stringify(element) === '{}' || !element) && !added) {
                  element = choosenEnhancement
                  added = true
                }
                newEnhancementList.push(element)
              });
              if (type == "weapon") {
                item.update({ 'system.enhancementItems': newEnhancementList })
              }
              else {
                let allEffects = item.system.effects
                allEffects.push(...choosenEnhancement.system.effects)
                if (choosenEnhancement.system.type == "armor" || choosenEnhancement.system.type == "glyph") {
                  item.update({
                    'system.enhancementItems': newEnhancementList,
                    "system.headStopping": item.system.headStopping + choosenEnhancement.system.stopping,
                    "system.headMaxStopping": item.system.headMaxStopping + choosenEnhancement.system.stopping,
                    "system.torsoStopping": item.system.torsoStopping + choosenEnhancement.system.stopping,
                    "system.torsoMaxStopping": item.system.torsoMaxStopping + choosenEnhancement.system.stopping,
                    "system.leftArmStopping": item.system.leftArmStopping + choosenEnhancement.system.stopping,
                    "system.leftArmMaxStopping": item.system.leftArmMaxStopping + choosenEnhancement.system.stopping,
                    "system.rightArmStopping": item.system.rightArmStopping + choosenEnhancement.system.stopping,
                    "system.rightArmMaxStopping": item.system.rightArmMaxStopping + choosenEnhancement.system.stopping,
                    "system.leftLegStopping": item.system.leftLegStopping + choosenEnhancement.system.stopping,
                    "system.leftLegMaxStopping": item.system.leftLegMaxStopping + choosenEnhancement.system.stopping,
                    "system.rightLegStopping": item.system.rightLegStopping + choosenEnhancement.system.stopping,
                    "system.rightLegMaxStopping": item.system.rightLegMaxStopping + choosenEnhancement.system.stopping,
                    'system.bludgeoning': choosenEnhancement.system.bludgeoning,
                    'system.slashing': choosenEnhancement.system.slashing,
                    'system.piercing': choosenEnhancement.system.piercing,
                    'system.effects': allEffects
                  })
                }
                else {
                  item.update({ 'system.effects': allEffects })
                }
              }
              let newName = choosenEnhancement.name + "(Applied)"
              let newQuantity = choosenEnhancement.system.quantity
              choosenEnhancement.update({
                'name': newName,
                'system.applied': true,
                'system.quantity': 1
              })
              if (newQuantity > 1) {
                newQuantity -= 1
                this._addItem(this.actor, choosenEnhancement, newQuantity, true)
              }
            }
          }
        }
      }
    }).render(true)
  }

  async _onAddSkillModifier(event) {
    let stat = event.currentTarget.closest(".skill").dataset.stat;
    let skill = event.currentTarget.closest(".skill").dataset.skill;
    let newModifierList = []
    if (this.actor.system.skills[stat][skill].modifiers) {
      newModifierList = this.actor.system.skills[stat][skill].modifiers
    }
    newModifierList.push({ id: genId(), name: "Modifier", value: 0 })

    this.actor.update({ [`system.skills.${this.skillMap[skill].attribute.name}.${skill}.modifiers`]: newModifierList });
  }

  async _onAddModifier(event) {
    event.preventDefault();
    let stat = event.currentTarget.closest(".stat-display").dataset.stat;

    if(stat == "reputation") {
      let newModifierList = this.actor.system.reputation.modifiers
      newModifierList.push({ id: genId(), name: "Modifier", value: 0 })
      this.actor.update({ [`system.${stat}.modifiers`]: newModifierList});
    }
    else {
      let newModifierList = this.actor.system[this.statMap[stat].origin][stat].modifiers;
      newModifierList.push({ id: genId(), name: "Modifier", value: 0 })
      this.actor.update({ [`system.${this.statMap[stat].origin}.${stat}.modifiers`]: newModifierList }); 
    }
  }

  async _onCritAdd(event) {
    event.preventDefault();
    const prevCritList = this.actor.system.critWounds;
    const newCritList = Object.values(prevCritList).map((details) => details);
    newCritList.push({
      id: genId(),
      effect: witcher.CritGravityDefaultEffect.Simple,
      mod: "None",
      description: witcher.CritDescription.SimpleCrackedJaw,
      notes: "",
    });
    this.actor.update({ "system.critWounds": newCritList });
  }

  async _onSkillModifierEdit(event) {
    let stat = event.currentTarget.closest(".skill").dataset.stat;
    let skill = event.currentTarget.closest(".skill").dataset.skill;

    let element = event.currentTarget;
    let itemId = element.closest(".list-modifiers").dataset.id;

    let field = element.dataset.field;
    let value = element.value
    let modifiers = this.actor.system.skills[stat][skill].modifiers;

    let objIndex = modifiers.findIndex((obj => obj.id == itemId));
    modifiers[objIndex][field] = value

    this.actor.update({ [`system.skills.${this.skillMap[skill].attribute.name}.${skill}.modifiers`]: modifiers });
  }

  async _onModifierEdit(event) {
    event.preventDefault();
    let stat = event.currentTarget.closest(".stat-display").dataset.stat;

    let element = event.currentTarget;
    let itemId = element.closest(".list-modifiers").dataset.id;

    let field = element.dataset.field;
    let value = element.value
    let modifiers = []

    if(stat == "reputation") {
      modifiers = this.actor.system.reputation.modifiers
    }
    else {
      modifiers = this.actor.system[this.statMap[stat].origin][stat].modifiers;
    }

    let objIndex = modifiers.findIndex((obj => obj.id == itemId));
    modifiers[objIndex][field] = value

    if(stat == "reputation") {
      this.actor.update({ [`system.${stat}.modifiers`]: modifiers});
    }
    else {
      this.actor.update({ [`system.${this.statMap[stat].origin}.${stat}.modifiers`]: modifiers }); 
    }

    updateDerived(this.actor);
  }

  async _onSkillModifierRemove(event) {
    let stat = event.currentTarget.closest(".skill").dataset.stat;
    let skill = event.currentTarget.closest(".skill").dataset.skill;

    let prevModList = this.actor.system.skills[stat][skill].modifiers;
    const newModList = Object.values(prevModList).map((details) => details);
    const idxToRm = newModList.findIndex((v) => v.id === event.target.dataset.id);
    newModList.splice(idxToRm, 1);

    this.actor.update({ [`system.skills.${this.skillMap[skill].attribute.name}.${skill}.modifiers`]: newModList });
  }

  async _onModifierRemove(event) {
    event.preventDefault();
    let stat = event.currentTarget.closest(".stat-display").dataset.stat;
    let type = event.currentTarget.closest(".stat-display").dataset.type;
    let prevModList = []
    if (type == "coreStat") {
      prevModList = this.actor.system.coreStats[stat].modifiers;
    } else if (type == "derivedStat") {
      prevModList = this.actor.system.derivedStats[stat].modifiers;
    } else if (type == "reputation") {
      prevModList = this.actor.system.reputation.modifiers;
    } else {
      prevModList = this.actor.system.stats[stat].modifiers;
    }
    const newModList = Object.values(prevModList).map((details) => details);
    const idxToRm = newModList.findIndex((v) => v.id === event.target.dataset.id);
    newModList.splice(idxToRm, 1);

    if(stat == "reputation") {
      this.actor.update({ [`system.${stat}.modifiers`]: newModList});
    }
    else {
      this.actor.update({ [`system.${this.statMap[stat].origin}.${stat}.modifiers`]: newModList }); 
    }
    
    updateDerived(this.actor);
  }

  async _onCritRemove(event) {
    event.preventDefault();
    const prevCritList = this.actor.system.critWounds;
    const newCritList = Object.values(prevCritList).map((details) => details);
    const idxToRm = newCritList.findIndex((v) => v.id === event.target.dataset.id);
    newCritList.splice(idxToRm, 1);
    this.actor.update({ "system.critWounds": newCritList });
  }

  async _onNoteAdd() {
    let notes = this.actor.system.notes
    notes.push({
      title: '',
      details: ''
    })
    this.actor.update({ "system.notes": notes });
  }

  async _onNoteDelete(event) {
    let noteIndex = event.currentTarget.dataset.noteIndex;
    let notes = this.actor.system.notes
    notes.splice(noteIndex, 1)
    this.actor.update({ "system.notes": notes });
  }

  async _onItemAdd(event) {
    let element = event.currentTarget
    let itemData = {
      name: `new ${element.dataset.itemtype}`,
      type: element.dataset.itemtype
    }

    switch (element.dataset.spelltype) {
      case "spellNovice":
        itemData.system = { class: "Spells", level: "novice" }
        break;
      case "spellJourneyman":
        itemData.system = { class: "Spells", level: "journeyman" }
        break;
      case "spellMaster":
        itemData.system = { class: "Spells", level: "master" }
        break;
      case "rituals":
        itemData.system = { class: "Rituals" }
        break;
      case "hexes":
        itemData.system = { class: "Hexes" }
        break;
      case "magicalgift":
        itemData.system = { class: "MagicalGift" }
        break;
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

  async _onAddActiveEffect() {
    let itemData = {
      name: `new effect`,
      type: "effect"
    }
    await Item.create(itemData, { parent: this.actor })
  }


  async _onSpellRoll(event, itemId = null) {

    let displayRollDetails = game.settings.get("TheWitcherTRPG", "displayRollsDetails")

    if (!itemId) {
      itemId = event.currentTarget.closest(".item").dataset.itemId;
    }
    let spellItem = this.actor.items.get(itemId);
    let rollFormula = `1d10`
    rollFormula += !displayRollDetails ? `+${this.actor.system.stats.will.current}` : `+${this.actor.system.stats.will.current}[${game.i18n.localize("WITCHER.StWill")}]`;
    switch (spellItem.system.class) {
      case "Witcher":
      case "Invocations":
      case "Spells":
        rollFormula += !displayRollDetails ? `+${this.actor.system.skills.will.spellcast.value}` : `+${this.actor.system.skills.will.spellcast.value}[${game.i18n.localize("WITCHER.SkWillSpellcastLable")}]`;
        break;
      case "Rituals":
        rollFormula += !displayRollDetails ? `+${this.actor.system.skills.will.ritcraft.value}` : `+${this.actor.system.skills.will.ritcraft.value}[${game.i18n.localize("WITCHER.SkWillRitCraftLable")}]`;
        break;
      case "Hexes":
        rollFormula += !displayRollDetails ? `+${this.actor.system.skills.will.hexweave.value}` : `+${this.actor.system.skills.will.hexweave.value}[${game.i18n.localize("WITCHER.SkWillHexLable")}]`;
        break;
    }

    let staCostTotal = spellItem.system.stamina;
    let customModifier = 0;
    let isExtraAttack = false

    let content = `<label>${game.i18n.localize("WITCHER.Dialog.attackExtra")}: <input type="checkbox" name="isExtraAttack"></label> <br />`
    if (spellItem.system.staminaIsVar) {
      content += `${game.i18n.localize("WITCHER.Spell.staminaDialog")}<input class="small" name="staCost" value=1> <br />`
    }

    let focusOptions = `<option value="0"> </option>`
    let secondFocusOptions = `<option value="0" selected> </option>`

    let useFocus = false
    if (this.actor.system.focus1.value > 0) {
      focusOptions += `<option value="${this.actor.system.focus1.value}" selected> ${this.actor.system.focus1.name} (${this.actor.system.focus1.value}) </option>`;
      secondFocusOptions += `<option value="${this.actor.system.focus1.value}"> ${this.actor.system.focus1.name} (${this.actor.system.focus1.value}) </option>`;
      useFocus = true
    }
    if (this.actor.system.focus2.value > 0) {
      focusOptions += `<option value="${this.actor.system.focus2.value}"> ${this.actor.system.focus2.name} (${this.actor.system.focus2.value}) </option>`;
      secondFocusOptions += `<option value="${this.actor.system.focus2.value}"> ${this.actor.system.focus2.name} (${this.actor.system.focus2.value}) </option>`;
      useFocus = true
    }
    if (this.actor.system.focus3.value > 0) {
      focusOptions += `<option value="${this.actor.system.focus3.value}"> ${this.actor.system.focus3.name} (${this.actor.system.focus3.value}) </option>`;
      secondFocusOptions += `<option value="${this.actor.system.focus3.value}"> ${this.actor.system.focus3.name} (${this.actor.system.focus3.value}) </option>`;
      useFocus = true
    }
    if (this.actor.system.focus4.value > 0) {
      focusOptions += `<option value="${this.actor.system.focus4.value}"> ${this.actor.system.focus4.name} (${this.actor.system.focus4.value}) </option>`;
      secondFocusOptions += `<option value="${this.actor.system.focus4.value}"> ${this.actor.system.focus4.name} (${this.actor.system.focus4.value}) </option>`;
      useFocus = true
    }

    if (useFocus) {
      content += ` <label>${game.i18n.localize("WITCHER.Spell.ChooseFocus")}: <select name="focus">${focusOptions}</select></label> <br />`
      content += ` <label>${game.i18n.localize("WITCHER.Spell.ChooseExpandedFocus")}: <select name="secondFocus">${secondFocusOptions}</select></label> <br />`
    }
    content += `<label>${game.i18n.localize("WITCHER.Dialog.attackCustom")}: <input class="small" name="customMod" value=0></label> <br /><br />`;
    let cancel = true
    let focusValue = 0
    let secondFocusValue = 0

    let dialogData = {
      buttons: [
        [`${game.i18n.localize("WITCHER.Button.Continue")}`, (html) => {
          if (spellItem.system.staminaIsVar) {
            staCostTotal = html.find("[name=staCost]")[0].value;
          }
          customModifier = html.find("[name=customMod]")[0].value;
          isExtraAttack = html.find("[name=isExtraAttack]").prop("checked");
          if (html.find("[name=focus]")[0]) {
            focusValue = html.find("[name=focus]")[0].value;
          }
          if (html.find("[name=secondFocus]")[0]) {
            secondFocusValue = html.find("[name=secondFocus]")[0].value;
          }
          cancel = false
        }]],
      title: game.i18n.localize("WITCHER.Spell.MagicCost"),
      content: content
    }

    await buttonDialog(dialogData)

    if (cancel) {
      return
    }
    let origStaCost = staCostTotal
    let newSta = this.actor.system.derivedStats.sta.value

    staCostTotal -= Number(focusValue) + Number(secondFocusValue)
    if (isExtraAttack) {
      staCostTotal += 3
    }

    let useMinimalStaCost = false
    if (staCostTotal < 1) {
      useMinimalStaCost = true
      staCostTotal = 1
    }

    newSta -= staCostTotal

    if (newSta < 0) {
      return ui.notifications.error(game.i18n.localize("WITCHER.Spell.notEnoughSta"));
    }

    this.actor.update({
      'system.derivedStats.sta.value': newSta
    });

    //todo check whether we need to spent 1 STA even if focus value > STA cost
    let staCostdisplay = `${origStaCost}[${game.i18n.localize("WITCHER.Spell.Short.StaCost")}]`

    if (isExtraAttack) {
      staCostdisplay += ` + 3[${game.i18n.localize("WITCHER.Dialog.attackExtra")}]`
    }

    staCostdisplay += ` - ${Number(focusValue) + Number(secondFocusValue)}[${game.i18n.localize("WITCHER.Actor.DerStat.Focus")}]`
    staCostdisplay += ` =  ${staCostTotal}`
    if (useMinimalStaCost) {
      staCostdisplay += `[${game.i18n.localize("WITCHER.MinValue")}]`
    }

    if (customModifier < 0) { rollFormula += !displayRollDetails ? `${customModifier}` : `${customModifier}[${game.i18n.localize("WITCHER.Settings.Custom")}]` }
    if (customModifier > 0) { rollFormula += !displayRollDetails ? `+${customModifier}` : `+${customModifier}[${game.i18n.localize("WITCHER.Settings.Custom")}]` }
    if (isExtraAttack) { rollFormula += !displayRollDetails ? `-3` : `-3[${game.i18n.localize("WITCHER.Dialog.attackExtra")}]` }

    let spellSource = ''
    switch (spellItem.system.source) {
      case "mixedElements": spellSource = "WITCHER.Spell.Mixed"; break;
      case "earth": spellSource = "WITCHER.Spell.Earth"; break;
      case "air": spellSource = "WITCHER.Spell.Air"; break;
      case "fire": spellSource = "WITCHER.Spell.Fire"; break;
      case "Water": spellSource = "WITCHER.Spell.Water"; break;
    }

    let messageData = {
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      flags: spellItem.getSpellFlags(),
      flavor: `<h2><img src="${spellItem.img}" class="item-img" />${spellItem.name}</h2>
          <div><b>${game.i18n.localize("WITCHER.Spell.StaCost")}: </b>${staCostdisplay}</div>
          <div><b>${game.i18n.localize("WITCHER.Mutagen.Source")}: </b>${game.i18n.localize(spellSource)}</div>
          <div><b>${game.i18n.localize("WITCHER.Spell.Effect")}: </b>${spellItem.system.effect}</div>`
    }
    if (spellItem.system.range) {
      messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Spell.Range")}: </b>${spellItem.system.range}</div>`
    }
    if (spellItem.system.duration) {
      messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Spell.Duration")}: </b>${spellItem.system.duration}</div>`
    }
    if (spellItem.system.defence) {
      messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Spell.Defence")}: </b>${spellItem.system.defence}</div>`
    }
    if (spellItem.system.preparationTime) {
      messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Spell.PrepTime")}: </b>${spellItem.system.preparationTime}</div>`
    }
    if (spellItem.system.difficultyCheck) {
      messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.DC")}: </b>${spellItem.system.difficultyCheck}</div>`
    }
    if (spellItem.system.components) {
      messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Spell.Components")}: </b>${spellItem.system.components}</div>`
    }
    if (spellItem.system.alternateComponents) {
      messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Spell.AlternateComponents")}: </b>${spellItem.system.alternateComponents}</div>`
    }
    if (spellItem.system.liftRequirement) {
      messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Spell.Requirements")}: </b>${spellItem.system.liftRequirement}</div>`
    }

    if (spellItem.system.causeDamages) {
      let effects = JSON.stringify(spellItem.system.effects)
      let locationJSON = JSON.stringify(this.actor.getLocationObject("randomSpell"))

      let dmg = spellItem.system.damage || "0"
      if(spellItem.system.staminaIsVar) {
        dmg = this.calcStaminaMulti(origStaCost, dmg)
      }

      messageData.flavor += `<button class="damage" data-img="${spellItem.img}" data-name="${spellItem.name}" data-dmg="${dmg}" data-location='${locationJSON}' data-effects='${effects}'>${game.i18n.localize("WITCHER.table.Damage")}</button>`;
    }

    if (spellItem.system.createsShield) {
      let shield = spellItem.system.shield || "0"
      if(spellItem.system.staminaIsVar) {
        shield = this.calcStaminaMulti(origStaCost, shield)
      } 

      messageData.flavor += `<button class="shield" data-img="${spellItem.img}" data-name="${spellItem.name}" data-shield="${shield}" data-actor="${this.actor.uuid}">${game.i18n.localize("WITCHER.Spell.Short.Shield")}</button>`;
    }

    if (spellItem.system.doesHeal) {
      let heal = spellItem.system.heal || "0"
      if(spellItem.system.staminaIsVar) {
        heal = this.calcStaminaMulti(origStaCost, heal)
      } 

      messageData.flavor += `<button class="heal" data-img="${spellItem.img}" data-name="${spellItem.name}" data-heal="${heal}" data-actor="${this.actor.uuid}">${game.i18n.localize("WITCHER.Spell.Short.Heal")}</button>`;
    }

    let config = new RollConfig()
    config.showCrit = true
    await extendedRoll(rollFormula, messageData, config)

    let token = this.actor.getControlledToken();

    if(token?.name) {
      await spellItem.createSpellVisualEffectIfApplicable(token);
      await spellItem.deleteSpellVisualEffect();
    }
  }

  calcStaminaMulti(origStaCost, value) {
    let staminaMulti = parseInt(origStaCost)
    value = value.replace("/STA", '')
    if(value.includes("d")) {
      let diceAmount = value.split('d')[0];
      let diceType = "d" + value.split('d')[1].replace("/STA", '')
      return (staminaMulti * diceAmount) + diceType;
    }
    else {
      return staminaMulti * value
    }
  }

  async _onProfessionRoll(event) {
    let displayRollDetails = game.settings.get("TheWitcherTRPG", "displayRollsDetails")
    let stat = event.currentTarget.closest(".profession-display").dataset.stat;
    let level = event.currentTarget.closest(".profession-display").dataset.level;
    let name = event.currentTarget.closest(".profession-display").dataset.name;
    let effet = event.currentTarget.closest(".profession-display").dataset.effet;
    let statValue = this.actor.system.stats[stat].current;
    let statName = `WITCHER.St${stat.charAt(0).toUpperCase()+ stat.slice(1)}`;

    let rollFormula = !displayRollDetails ? `1d10+${statValue}+${level}` : `1d10+${statValue}[${game.i18n.localize(statName)}]+${level}[${name}]`;
    new Dialog({
      title: `${game.i18n.localize("WITCHER.Dialog.profession.skill")}: ${name}`,
      content: `<label>${game.i18n.localize("WITCHER.Dialog.attackCustom")}: <input name="customModifiers" value=0></label>`,
      buttons: {
        continue: {
          label: game.i18n.localize("WITCHER.Button.Continue"),
          callback: async html => {
            let customAtt = html.find("[name=customModifiers]")[0].value;
            if (customAtt < 0) {
              rollFormula += !displayRollDetails ? `${customAtt}` : `${customAtt}[${game.i18n.localize("WITCHER.Settings.Custom")}]`
            }
            if (customAtt > 0) {
              rollFormula += !displayRollDetails ? `+${customAtt}` : `+${customAtt}[${game.i18n.localize("WITCHER.Settings.Custom")}]`
            }

            let messageData = {
              speaker: ChatMessage.getSpeaker({actor: this.actor}),
              flavor: `<h2>${name}</h2>${effet}`
            }

            let config = new RollConfig()
            config.showCrit = true
            await extendedRoll(rollFormula, messageData, config)
          }
        }
      }
    }).render(true)
  }

  async _onInitRoll(event) {
    this.actor.rollInitiative({ createCombatants: true, rerollInitiative: true })
  }

  async _onCritRoll(event) {
    let rollResult = await new Roll("1d10x10").evaluate({ async: true })
    let messageData = {
      speaker: ChatMessage.getSpeaker({actor: this.actor})
    }
    rollResult.toMessage(messageData)
  }

  async _onDeathSaveRoll(event) {
    let stunBase = Math.floor((this.actor.system.stats.body.max + this.actor.system.stats.will.max) / 2);
    if (this.actor.system.derivedStats.hp.value > 0) {
      stunBase = this.actor.system.coreStats.stun.current
    }
    if (stunBase > 10) {
      stunBase = 10;
    }
    stunBase -= this.actor.system.deathSaves

    let messageData = {
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      flavor: `
        <h2>${game.i18n.localize("WITCHER.DeathSave")}</h2>
        <div class="roll-summary">
            <div class="dice-formula">${game.i18n.localize("WITCHER.Chat.SaveText")} <b>${stunBase}</b></div>
        </div>
        <hr />`
    }

    let config = new RollConfig()
    config.reversal = true
    config.showSuccess = true
    config.threshold = stunBase

    await extendedRoll(`1d10`, messageData, config)
  }

  async _onDefenceRoll(event) {
    ExecuteDefence(this.actor)
  }

  async _onReputation(event) {
    let dialogTemplate = `
      <h1>${game.i18n.localize("WITCHER.Reputation")}</h1>`;
    if (this.actor.system.reputation.modifiers.length > 0) {
      dialogTemplate += `<label>${game.i18n.localize("WITCHER.Apply.Mod")}</label>`;
      this.actor.system.reputation.modifiers.forEach(mod => dialogTemplate += `<div><input id="${mod.name.replace(/\s/g, '')}" type="checkbox" unchecked/> ${mod.name}(${mod.value})</div>`)
    }
    new Dialog({
      title: game.i18n.localize("WITCHER.ReputationTitle"),
      content: dialogTemplate,
      buttons: {
        t1: {
          label: `${game.i18n.localize("WITCHER.ReputationButton.Save")}`,
          callback: (async html => {
            let statValue = this.actor.system.reputation.max

            this.actor.system.reputation.modifiers.forEach(mod => {
              const noSpacesName = mod.name.replace(/\s/g, '')
              if (html.find(`#${noSpacesName}`)[0].checked) {
                statValue += Number(mod.value)
              }
            });

            let messageData = { speaker: ChatMessage.getSpeaker({actor: this.actor}) }
            messageData.flavor = `
              <h2>${game.i18n.localize("WITCHER.ReputationTitle")}: ${game.i18n.localize("WITCHER.ReputationSave.Title")}</h2>
              <div class="roll-summary">
                <div class="dice-formula">${game.i18n.localize("WITCHER.Chat.SaveText")}: <b>${statValue}</b></div>
              </div>
              <hr />`

            let config = new RollConfig()
            config.showSuccess = true
            config.reversal = true
            config.threshold = statValue

            await extendedRoll(`1d10`, messageData, config)
          })
        },
        t2: {
          label: `${game.i18n.localize("WITCHER.ReputationButton.FaceDown")}`,
          callback: (async html => {
            let repValue = this.actor.system.reputation.max

            this.actor.system.reputation.modifiers.forEach(mod => {
              const noSpacesName = mod.name.replace(/\s/g, '')
              if (html.find(`#${noSpacesName}`)[0].checked) {
                repValue += Number(mod.value)
              }
            });

            let messageData = { speaker: ChatMessage.getSpeaker({actor: this.actor}) }
            let rollFormula = `1d10 + ${Number(repValue)}[${game.i18n.localize("WITCHER.Reputation")}] + ${Number(this.actor.system.stats.will.current)}[${game.i18n.localize("WITCHER.StWill")}]`
            messageData.flavor = `
              <h2>${game.i18n.localize("WITCHER.ReputationTitle")}: ${game.i18n.localize("WITCHER.ReputationFaceDown.Title")}</h2>
              <div class="roll-summary">
                <div class="dice-formula">${game.i18n.localize("WITCHER.context.Result")}: <b>${rollFormula}</b></div>
              </div>
              <hr />`

            await extendedRoll(rollFormula, messageData, new RollConfig())
          })
        }
      }
    }).render(true);
  }

  async _onHeal() {
    let dialogTemplate = `
      <h1>${game.i18n.localize("WITCHER.Heal.title")}</h1>
      <div class="flex">
        <div>
          <div><input id="R" type="checkbox" unchecked/> ${game.i18n.localize("WITCHER.Heal.resting")}</div>
          <div><input id="SF" type="checkbox" unchecked/> ${game.i18n.localize("WITCHER.Heal.sterilized")}</div>
        </div>
        <div>
          <div><input id="HH" type="checkbox" unchecked/> ${game.i18n.localize("WITCHER.Heal.healinghand")}</div>
            <div><input id="HT" type="checkbox" unchecked/> ${game.i18n.localize("WITCHER.Heal.healingTent")}</div>
        </div>
      </div>`;
    new Dialog({
      title: game.i18n.localize("WITCHER.Heal.dialogTitle"),
      content: dialogTemplate,
      buttons: {
        t1: {
          label: game.i18n.localize("WITCHER.Heal.button"),
          callback: async (html) => {
            let rested = html.find("#R")[0].checked;
            let sterFluid = html.find("#SF")[0].checked;
            let healHand = html.find("#HH")[0].checked;
            let healTent = html.find("#HT")[0].checked;

            let actor = this.actor;
            let rec = actor.system.coreStats.rec.current;
            let curHealth = actor.system.derivedStats.hp.value;
            let total_rec = 0;
            let maxHealth = actor.system.derivedStats.hp.max;
            //Calculate healed amount
            if (rested) {
              console.log("Spent Day Resting");
              total_rec += rec;
            }
            else {
              console.log("Spent Day Active");
              total_rec += Math.floor(rec / 2);
            }
            if (sterFluid) {
              console.log("Add Sterilising Fluid Bonus");
              total_rec += 2;
            }
            if (healHand) {
              console.log("Add Healing Hands Bonus");
              total_rec += 3;
            }
            if (healTent) {
              console.log("Add Healing Tent Bonus");
              total_rec += 2;
            }
            //Update actor health
            await actor.update({ "system.derivedStats.hp.value": Math.min(curHealth + total_rec, maxHealth) })
            setTimeout(() => {
              let newSTA = actor.system.derivedStats.sta.max;
              //Delay stamina refill to allow actor sheet to update max STA value if previously Seriously Wounded or in Death State, otherwise it would refill to the weakened max STA value
              actor.update({ "system.derivedStats.sta.value": newSTA });
            }, 400);

            ui.notifications.info(`${actor.name} ${game.i18n.localize("WITCHER.Heal.recovered")} ${rested ? game.i18n.localize("WITCHER.Heal.restful") : game.i18n.localize("WITCHER.Heal.active")} ${game.i18n.localize("WITCHER.Heal.day")}`)

            //Remove add one day for each Crit wound and removes it if equals to max days.
            const critList = Object.values(this.actor.system.critWounds).map((details) => details);
            let newCritList = []
            critList.forEach(crit => {
              crit.daysHealed += 1
              if (crit.healingTime <= 0 || crit.daysHealed < crit.healingTime) {
                newCritList.push(crit)
              }
            });
            this.actor.update({ "system.critWounds": newCritList });
          }
        },
        t2: {
          label: `${game.i18n.localize("WITCHER.Button.Cancel")}`,
        }
      },
    }).render(true);
  }

  async _onVerbalCombat() {
    let displayRollDetails = game.settings.get("TheWitcherTRPG", "displayRollsDetails")
    const dialogTemplate = await renderTemplate("systems/TheWitcherTRPG/templates/sheets/verbal-combat.html");
    new Dialog({
      title: game.i18n.localize("WITCHER.verbalCombat.DialogTitle"),
      content: dialogTemplate,
      buttons: {
        t1: {
          label: "Roll",
          callback: async (html) => {
            let verbal = document.querySelector('input[name="verbalCombat"]:checked').value;
            console.log(verbal)
            let vcName;
            let vcStatName;
            let vcStat;
            let vcSkillName;
            let vcSkill;
            let vcDmg;
            let effect;
            let modifiers;
            switch (verbal) {
              case "Seduce":
                vcName = "WITCHER.verbalCombat.Seduce";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpSeduction";
                vcSkill = this.actor.system.skills.emp.seduction.value;
                modifiers = this.actor.system.skills.emp.seduction.modifiers
                vcDmg = `1d6+${this.actor.system.stats.emp.current}[${game.i18n.localize(vcStatName)}]`
                effect = "WITCHER.verbalCombat.SeduceEffect"
                break;
              case "Persuade":
                vcName = "WITCHER.verbalCombat.Persuade";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpPersuasion";
                vcSkill = this.actor.system.skills.emp.persuasion.value;
                modifiers = this.actor.system.skills.emp.persuasion.modifiers;
                vcDmg = `1d6/2+${this.actor.system.stats.emp.current}[${game.i18n.localize(vcStatName)}]`
                effect = "WITCHER.verbalCombat.PersuadeEffect"
                break;
              case "Appeal":
                vcName = "WITCHER.verbalCombat.Appeal";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpLeadership";
                vcSkill = this.actor.system.skills.emp.leadership.value;
                modifiers = this.actor.system.skills.emp.leadership.modifiers;
                vcDmg = `1d10+${this.actor.system.stats.emp.current}[${game.i18n.localize(vcStatName)}]`
                effect = "WITCHER.verbalCombat.AppealEffect"
                break;
              case "Befriend":
                vcName = "WITCHER.verbalCombat.Befriend";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpCharisma";
                vcSkill = this.actor.system.skills.emp.charisma.value;
                modifiers = this.actor.system.skills.emp.charisma.modifiers;
                vcDmg = `1d6+${this.actor.system.stats.emp.current}[${game.i18n.localize(vcStatName)}]`
                effect = "WITCHER.verbalCombat.BefriendEffect"
                break;
              case "Deceive":
                vcName = "WITCHER.verbalCombat.Deceive";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpDeceit";
                vcSkill = this.actor.system.skills.emp.deceit.value;
                modifiers = this.actor.system.skills.emp.deceit.modifiers;
                vcDmg = `1d6+${this.actor.system.stats.int.current}[${game.i18n.localize("WITCHER.Actor.Stat.Int")}]`
                effect = "WITCHER.verbalCombat.DeceiveEffect"
                break;
              case "Ridicule":
                vcName = "WITCHER.verbalCombat.Ridicule";
                vcStatName = "WITCHER.Actor.Stat.Int";
                vcStat = this.actor.system.stats.int.current;
                vcSkillName = "WITCHER.SkIntSocialEt";
                vcSkill = this.actor.system.skills.int.socialetq.value;
                modifiers = this.actor.system.skills.int.socialetq.modifiers;
                vcDmg = `1d6+${this.actor.system.stats.will.current}[${game.i18n.localize("WITCHER.Actor.Stat.Will")}]`
                effect = "WITCHER.verbalCombat.RidiculeEffect"
                break;
              case "Intimidate":
                vcName = "WITCHER.verbalCombat.Intimidate";
                vcStatName = "WITCHER.Actor.Stat.Will";
                vcStat = this.actor.system.stats.will.current;
                vcSkillName = "WITCHER.SkWillIntim";
                vcSkill = this.actor.system.skills.will.intimidation.value;
                modifiers = this.actor.system.skills.will.intimidation.modifiers;
                vcDmg = `1d10+${this.actor.system.stats.will.current}[${game.i18n.localize("WITCHER.Actor.Stat.Will")}]`
                effect = "WITCHER.verbalCombat.IntimidateEffect"
                break;
              case "Ignore":
                vcName = "WITCHER.verbalCombat.Ignore";
                vcStatName = "WITCHER.Actor.Stat.Will";
                vcStat = this.actor.system.stats.will.current;
                vcSkillName = "WITCHER.SkWillResistCoer";
                vcSkill = this.actor.system.skills.will.resistcoerc.value;
                modifiers = [];
                vcDmg = `1d10+${this.actor.system.stats.emp.current}[${game.i18n.localize("WITCHER.Actor.Stat.Emp")}]`
                effect = "WITCHER.verbalCombat.None"
                break;
              case "Counterargue":
                vcName = "WITCHER.verbalCombat.Counterargue";
                vcStatName = "WITCHER.context.unavailable";
                vcStat = 0;
                vcSkillName = "WITCHER.context.unavailable";
                vcSkill = 0;
                modifiers = this.actor.system.skills.emp.persuasion.modifiers;
                vcDmg = `${game.i18n.localize("WITCHER.verbalCombat.CounterargueDmg")}`
                effect = "WITCHER.verbalCombat.CounterargueEffect"
                break;
              case "ChangeSubject":
                vcName = "WITCHER.verbalCombat.ChangeSubject";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpPersuasion";
                vcSkill = this.actor.system.skills.emp.persuasion.value;
                modifiers = this.actor.system.skills.emp.persuasion.modifiers;
                vcDmg = `1d6+${this.actor.system.stats.int.current}[${game.i18n.localize("WITCHER.Actor.Stat.Int")}]`
                effect = "WITCHER.verbalCombat.None"
                break;
              case "Disengage":
                vcName = "WITCHER.verbalCombat.Disengage";
                vcStatName = "WITCHER.Actor.Stat.Will";
                vcStat = this.actor.system.stats.will.current;
                vcSkillName = "WITCHER.SkWillResistCoer";
                vcSkill = this.actor.system.skills.will.resistcoerc.value;
                modifiers = this.actor.system.skills.will.resistcoerc.modifiers;
                vcDmg = game.i18n.localize("WITCHER.verbalCombat.None")
                effect = "WITCHER.verbalCombat.DisengageEffect"
                break;
              case "Romance":
                vcName = "WITCHER.verbalCombat.Romance";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpCharisma";
                vcSkill = this.actor.system.skills.emp.charisma.value;
                modifiers = this.actor.system.skills.emp.charisma.modifiers;
                vcDmg = game.i18n.localize("WITCHER.verbalCombat.None")
                effect = "WITCHER.verbalCombat.RomanceEffect"
                break;
              case "Study":
                vcName = "WITCHER.verbalCombat.Study";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpHumanPerc";
                vcSkill = this.actor.system.skills.emp.perception.value;
                modifiers = this.actor.system.skills.emp.perception.modifiers;
                vcDmg = game.i18n.localize("WITCHER.verbalCombat.None")
                effect = "WITCHER.verbalCombat.StudyEffect"
                break;
              case "ImplyPersuade":
                vcName = "WITCHER.verbalCombat.ImplyPersuade";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpPersuasion";
                vcSkill = this.actor.system.skills.emp.persuasion.value;
                modifiers = this.actor.system.skills.emp.persuasion.modifiers;
                vcDmg = game.i18n.localize("WITCHER.verbalCombat.None")
                effect = "WITCHER.verbalCombat.ImplyEffect"
                break;
              case "ImplyDeceit":
                vcName = "WITCHER.verbalCombat.ImplyDeceit";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpDeceit";
                vcSkill = this.actor.system.skills.emp.deceit.value;
                modifiers = this.actor.system.skills.emp.deceit.modifiers;
                vcDmg = game.i18n.localize("WITCHER.verbalCombat.None")
                effect = "WITCHER.verbalCombat.ImplyEffect"
                break;
              case "Bribe":
                vcName = "WITCHER.verbalCombat.Bribe";
                vcStatName = "WITCHER.Actor.Stat.Emp";
                vcStat = this.actor.system.stats.emp.current;
                vcSkillName = "WITCHER.SkEmpGambling";
                vcSkill = this.actor.system.skills.emp.gambling.value;
                modifiers = this.actor.system.skills.emp.gambling.modifiers;
                vcDmg = game.i18n.localize("WITCHER.verbalCombat.None")
                effect = "WITCHER.verbalCombat.BribeEffect"
                break;
            }
            let rollFormula = !displayRollDetails ? `1d10+${vcStat}+${vcSkill}` : `1d10+${vcStat}[${game.i18n.localize(vcStatName)}]+${vcSkill}[${game.i18n.localize(vcSkillName)}]`

            rollFormula = addModifiers(modifiers, rollFormula)

            let customAtt = html.find("[name=customModifiers]")[0].value;
            if (customAtt < 0) {
              rollFormula += !displayRollDetails ? `${customAtt}` : `${customAtt}[${game.i18n.localize("WITCHER.Settings.Custom")}]`
            }
            if (customAtt > 0) {
              rollFormula += !displayRollDetails ? `+${customAtt}` : `+${customAtt}[${game.i18n.localize("WITCHER.Settings.Custom")}]`
            }

            let messageData = { speaker: ChatMessage.getSpeaker({actor: this.actor}) }
            messageData.flavor = `
              <h2>${game.i18n.localize("WITCHER.verbalCombat.Title")}: ${game.i18n.localize(vcName)}</h2>
              <b>${game.i18n.localize("WITCHER.Weapon.Damage")}</b>: ${vcDmg} <br />
              ${game.i18n.localize(effect)}
              <hr />`

            let config = new RollConfig()
            config.showCrit = true
            await extendedRoll(rollFormula, messageData, config)
          }
        },
        t2: {
          label: `${game.i18n.localize("WITCHER.Button.Cancel")}`,
        }
      },
    }).render(true);
  }

  async _onStatSaveRoll(event) {
    let stat = event.currentTarget.closest(".stat-display").dataset.stat;
    let statValue = this.actor.system.stats[stat].current;
    let statName = `WITCHER.St${stat.charAt(0).toUpperCase()+ stat.slice(1)}`;

    let messageData = { speaker: ChatMessage.getSpeaker({actor: this.actor}) }
    messageData.flavor = `
      <h2>${game.i18n.localize(statName)}</h2>
      <div class="roll-summary">
          <div class="dice-formula">${game.i18n.localize("WITCHER.Chat.SaveText")} <b>${statValue}</b></div>
      </div>
      <hr />`

    let config = new RollConfig()
    config.showCrit = true
    config.showSuccess = true
    config.reversal = true
    config.threshold = statValue
    config.thresholdDesc = statName
    await extendedRoll(`1d10`, messageData, config)
  }

  _onHPChanged(event) {
    updateDerived(this.actor)
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

  _onItemDisplayInfo(event) {
    event.preventDefault();
    let section = event.currentTarget.closest(".item");
    let editor = $(section).find(".item-info")
    editor.toggleClass("invisible");
  }

  _onFocusIn(event) {
    event.currentTarget.select();
  }

  async _onItemRoll(event, itemId = null) {
    let displayRollDetails = game.settings.get("TheWitcherTRPG", "displayRollsDetails")

    if (!itemId) {
      itemId = event.currentTarget.closest(".item").dataset.itemId;
    }
    let item = this.actor.items.get(itemId);
    let displayDmgFormula = `${item.system.damage}`
    let formula = !displayRollDetails ? `${item.system.damage}` : `${item.system.damage}[${game.i18n.localize("WITCHER.Diagram.Weapon")}]`

    let isMeleeAttack = item.doesWeaponNeedMeleeSkillToAttack();
    if (this.actor.type == "character" && isMeleeAttack) {
      if (this.actor.system.attackStats.meleeBonus < 0) {
        displayDmgFormula += `${this.actor.system.attackStats.meleeBonus}`
        formula += !displayRollDetails ? `${this.actor.system.attackStats.meleeBonus}` : `${this.actor.system.attackStats.meleeBonus}[${game.i18n.localize("WITCHER.Dialog.attackMeleeBonus")}]`
      }
      if (this.actor.system.attackStats.meleeBonus > 0) {
        displayDmgFormula += `+${this.actor.system.attackStats.meleeBonus}`
        formula += !displayRollDetails ? `+${this.actor.system.attackStats.meleeBonus}` : `+${this.actor.system.attackStats.meleeBonus}[${game.i18n.localize("WITCHER.Dialog.attackMeleeBonus")}]`
      }
    }

    let attackSkill = item.getItemAttackSkill();
    let messageData = {
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      flavor: `<h1> ${game.i18n.localize("WITCHER.Dialog.attack")}: ${item.name}</h1>`,
      flags: item.getAttackSkillFlags(),
    }

    let ammunitions = ``
    let noAmmo = 0
    let ammunitionOption = ``
    if (item.system.usingAmmo) {
      ammunitions = this.actor.items.filter(function (item) { return item.type == "weapon" && item.system.isAmmo });
      let quantity = ammunitions.sum("quantity")
      if (quantity <= 0) {
        noAmmo = 1;
      } else {
        ammunitions.forEach(element => {
          ammunitionOption += `<option value="${element._id}"> ${element.name}(${element.system.quantity}) </option>`;
        });
      }
    }

    let noThrowable = !this.actor.isEnoughThrowableWeapon(item)
    let meleeBonus = this.actor.system.attackStats.meleeBonus
    let data = { item, attackSkill, displayDmgFormula, isMeleeAttack, noAmmo, noThrowable, ammunitionOption, ammunitions, meleeBonus: meleeBonus }
    const myDialogOptions = { width: 500 }
    const dialogTemplate = await renderTemplate("systems/TheWitcherTRPG/templates/sheets/weapon-attack.hbs", data)

    new Dialog({
      title: `${game.i18n.localize("WITCHER.Dialog.attackWith")}: ${item.name}`,
      content: dialogTemplate,
      buttons: {
        Roll: {
          label: `${game.i18n.localize("WITCHER.Dialog.ButtonRoll")}`,
          callback: async html => {
            let isExtraAttack = html.find("[name=isExtraAttack]").prop("checked");

            let location = html.find("[name=location]")[0].value;
            let ammunition = undefined
            if (html.find("[name=ammunition]")[0]) {
              ammunition = html.find("[name=ammunition]")[0].value;
            }

            let targetOutsideLOS = html.find("[name=targetOutsideLOS]").prop("checked");
            let outsideLOS = html.find("[name=outsideLOS]").prop("checked");
            let isFastDraw = html.find("[name=isFastDraw]").prop("checked");
            let isProne = html.find("[name=isProne]").prop("checked");
            let isPinned = html.find("[name=isPinned]").prop("checked");
            let isActivelyDodging = html.find("[name=isActivelyDodging]").prop("checked");
            let isMoving = html.find("[name=isMoving]").prop("checked");
            let isAmbush = html.find("[name=isAmbush]").prop("checked");
            let isRicochet = html.find("[name=isRicochet]").prop("checked");
            let isBlinded = html.find("[name=isBlinded]").prop("checked");
            let isSilhouetted = html.find("[name=isSilhouetted]").prop("checked");
            let customAim = html.find("[name=customAim]")[0].value;

            let range = item.system.range ? html.find("[name=range]")[0].value : null;
            let customAtt = html.find("[name=customAtt]")[0].value;
            let strike = html.find("[name=strike]")[0].value;
            let damageType = html.find("[name=damageType]")[0].value;
            let customDmg = html.find("[name=customDmg]")[0].value;
            let attacknumber = 1;

            if (isExtraAttack) {
              let newSta = this.actor.system.derivedStats.sta.value - 3

              if (newSta < 0) {
                return ui.notifications.error(game.i18n.localize("WITCHER.Spell.notEnoughSta"));
              }
              this.actor.update({
                'system.derivedStats.sta.value': newSta
              });
            }

            let allEffects = item.system.effects
            if (ammunition) {
              let item = this.actor.items.get(ammunition);
              let newQuantity = item.system.quantity - 1;
              item.update({ "system.quantity": newQuantity })
              allEffects.push(...item.system.effects)
            }

            if (item.isWeaponThrowable()) {
              let newQuantity = item.system.quantity - 1;
              if (newQuantity < 0) {
                return
              }
              item.update({ "system.quantity": newQuantity })
              allEffects.push(...item.system.effects)
            }

            if (item.system.enhancementItems) {
              item.system.enhancementItems.forEach(element => {
                if (element && JSON.stringify(element) != '{}') {
                  let enhancement = this.actor.items.get(element._id);
                  allEffects.push(...enhancement.system.effects)
                }
              });
            }

            if (strike == "fast") {
              attacknumber = 2;
            }
            for (let i = 0; i < attacknumber; i++) {
              let attFormula = "1d10"
              let damageFormula = formula;

              if (item.system.accuracy < 0) {
                attFormula += !displayRollDetails ? `${item.system.accuracy}` :
                  `${item.system.accuracy}[${game.i18n.localize("WITCHER.Weapon.Short.WeaponAccuracy")}]`
              }
              if (item.system.accuracy > 0) {
                attFormula += !displayRollDetails ? `+${item.system.accuracy}` :
                  `+${item.system.accuracy}[${game.i18n.localize("WITCHER.Weapon.Short.WeaponAccuracy")}]`
              }
              if (targetOutsideLOS) {
                attFormula += !displayRollDetails ? `-3` :
                  `-3[${game.i18n.localize("WITCHER.Dialog.attackTargetOutsideLOS")}]`;
              }
              if (outsideLOS) {
                attFormula += !displayRollDetails ? `+3` :
                  `+3[${game.i18n.localize("WITCHER.Dialog.attackOutsideLOS")}]`;
              }
              if (isExtraAttack) {
                attFormula += !displayRollDetails ? `-3` :
                  `-3[${game.i18n.localize("WITCHER.Dialog.attackExtra")}]`;
              }
              if (isFastDraw) {
                attFormula += !displayRollDetails ? `-3` :
                  `-3[${game.i18n.localize("WITCHER.Dialog.attackIsFastDraw")}]`;
              }
              if (isProne) {
                attFormula += !displayRollDetails ? `-2` :
                  `-2[${game.i18n.localize("WITCHER.Dialog.attackIsProne")}]`;
              }
              if (isPinned) {
                attFormula += !displayRollDetails ? `+4` :
                  `+4[${game.i18n.localize("WITCHER.Dialog.attackIsPinned")}]`;
              }
              if (isActivelyDodging) {
                attFormula += !displayRollDetails ? `-2` :
                  `-2[${game.i18n.localize("WITCHER.Dialog.attackIsActivelyDodging")}]`;
              }
              if (isMoving) {
                attFormula += !displayRollDetails ? `-3` :
                  `-3[${game.i18n.localize("WITCHER.Dialog.attackIsMoving")}]`;
              }
              if (isAmbush) {
                attFormula += !displayRollDetails ? `+5` :
                  `+5[${game.i18n.localize("WITCHER.Dialog.attackIsAmbush")}]`;
              }
              if (isRicochet) {
                attFormula += !displayRollDetails ? `-5` :
                  `-5[${game.i18n.localize("WITCHER.Dialog.attackIsRicochet")}]`;
              }
              if (isBlinded) {
                attFormula += !displayRollDetails ? `-3` :
                  `-3[${game.i18n.localize("WITCHER.Dialog.attackIsBlinded")}]`;
              }
              if (isSilhouetted) {
                attFormula += !displayRollDetails ? `+2` :
                  `+2[${game.i18n.localize("WITCHER.Dialog.attackIsSilhouetted")}]`;
              }
              if (customAim > 0) {
                attFormula += !displayRollDetails ? `+${customAim}` :
                  `+${customAim}[${game.i18n.localize("WITCHER.Dialog.attackCustom")}]`;
              }

              let modifiers;

              switch (attackSkill.name) {
                case "Brawling":
                  attFormula += !displayRollDetails ? `+${this.actor.system.stats.ref.current}+${this.actor.system.skills.ref.brawling.value}` :
                    `+${this.actor.system.stats.ref.current}[${game.i18n.localize("WITCHER.Actor.Stat.Ref")}]+${this.actor.system.skills.ref.brawling.value}[${game.i18n.localize("WITCHER.SkRefBrawling")}]`;
                  modifiers = this.actor.system.skills.ref.brawling.modifiers;
                  break;
                case "Melee":
                  attFormula += !displayRollDetails ? `+${this.actor.system.stats.ref.current}+${this.actor.system.skills.ref.melee.value}` :
                    `+${this.actor.system.stats.ref.current}[${game.i18n.localize("WITCHER.Actor.Stat.Ref")}]+${this.actor.system.skills.ref.melee.value}[${game.i18n.localize("WITCHER.SkRefMelee")}]`;
                  modifiers = this.actor.system.skills.ref.melee.modifiers;
                  break;
                case "Small Blades":
                  attFormula += !displayRollDetails ? `+${this.actor.system.stats.ref.current}+${this.actor.system.skills.ref.smallblades.value}` :
                    `+${this.actor.system.stats.ref.current}[${game.i18n.localize("WITCHER.Actor.Stat.Ref")}]+${this.actor.system.skills.ref.smallblades.value}[${game.i18n.localize("WITCHER.SkRefSmall")}]`;
                  modifiers = this.actor.system.skills.ref.smallblades.modifiers;
                  break;
                case "Staff/Spear":
                  attFormula += !displayRollDetails ? `+${this.actor.system.stats.ref.current}+${this.actor.system.skills.ref.staffspear.value}` :
                    `+${this.actor.system.stats.ref.current}[${game.i18n.localize("WITCHER.Actor.Stat.Ref")}]+${this.actor.system.skills.ref.staffspear.value}[${game.i18n.localize("WITCHER.SkRefStaff")}]`;
                  modifiers = this.actor.system.skills.ref.staffspear.modifiers;
                  break;
                case "Swordsmanship":
                  attFormula += !displayRollDetails ? `+${this.actor.system.stats.ref.current}+${this.actor.system.skills.ref.swordsmanship.value}` :
                    `+${this.actor.system.stats.ref.current}[${game.i18n.localize("WITCHER.Actor.Stat.Ref")}]+${this.actor.system.skills.ref.swordsmanship.value}[${game.i18n.localize("WITCHER.SkRefSwordsmanship")}]`;
                  modifiers = this.actor.system.skills.ref.swordsmanship.modifiers;
                  break;
                case "Archery":
                  attFormula += !displayRollDetails ? `+${this.actor.system.stats.dex.current}+${this.actor.system.skills.dex.archery.value}` :
                    `+${this.actor.system.stats.dex.current}[${game.i18n.localize("WITCHER.Actor.Stat.Dex")}]+${this.actor.system.skills.dex.archery.value}[${game.i18n.localize("WITCHER.SkDexArchery")}]`;
                  modifiers = this.actor.system.skills.dex.archery.modifiers;
                  break;
                case "Athletics":
                  attFormula += !displayRollDetails ? `+${this.actor.system.stats.dex.current}+${this.actor.system.skills.dex.athletics.value}` :
                    `+${this.actor.system.stats.dex.current}[${game.i18n.localize("WITCHER.Actor.Stat.Dex")}]+${this.actor.system.skills.dex.athletics.value}[${game.i18n.localize("WITCHER.SkDexAthletics")}]`;
                  modifiers = this.actor.system.skills.dex.athletics.modifiers;
                  break;
                case "Crossbow":
                  attFormula += !displayRollDetails ? `+${this.actor.system.stats.dex.current}+${this.actor.system.skills.dex.crossbow.value}` :
                    `+${this.actor.system.stats.dex.current}[${game.i18n.localize("WITCHER.Actor.Stat.Dex")}]+${this.actor.system.skills.dex.crossbow.value}[${game.i18n.localize("WITCHER.SkDexCrossbow")}]`;
                  modifiers = this.actor.system.skills.dex.crossbow.modifiers;
                  break;
              }

              if (customAtt != "0") {
                attFormula += !displayRollDetails ? `+${customAtt}` : `+${customAtt}[${game.i18n.localize("WITCHER.Settings.Custom")}]`;
              }

              switch (range) {
                case "pointBlank":
                  attFormula = !displayRollDetails ? `${attFormula}+5` : `${attFormula}+5[${game.i18n.localize("WITCHER.Weapon.Range")}]`;
                  break;
                case "medium":
                  attFormula = !displayRollDetails ? `${attFormula}-2` : `${attFormula}-2[${game.i18n.localize("WITCHER.Weapon.Range")}]`;
                  break;
                case "long":
                  attFormula = !displayRollDetails ? `${attFormula}-4` : `${attFormula}-4[${game.i18n.localize("WITCHER.Weapon.Range")}]`;
                  break;
                case "extreme":
                  attFormula = !displayRollDetails ? `${attFormula}-6` : `${attFormula}-6[${game.i18n.localize("WITCHER.Weapon.Range")}]`;
                  break;
              }

              if (customDmg != "0") {
                damageFormula += !displayRollDetails ? `+${customDmg}` : `+${customDmg}[${game.i18n.localize("WITCHER.Settings.Custom")}]`;
              }
              let touchedLocation = this.actor.getLocationObject(location);
              let LocationFormula = touchedLocation.locationFormula;
              attFormula += !displayRollDetails
                ? `${touchedLocation.modifier}`
                : `${touchedLocation.modifier}[${touchedLocation.alias}]`;

              if (strike == "joint" || strike == "strong") {
                attFormula = !displayRollDetails ? `${attFormula}-3` : `${attFormula}-3[${game.i18n.localize("WITCHER.Dialog.attackStrike")}]`;
              }

              attFormula = addModifiers(modifiers, attFormula)

              let effects = JSON.stringify(allEffects)
              messageData.flavor = `<div class="attack-message"><h1><img src="${item.img}" class="item-img" />${game.i18n.localize("WITCHER.Attack")}: ${item.name}</h1>`;
              messageData.flavor += `<span>  ${game.i18n.localize("WITCHER.Armor.Location")}: ${touchedLocation.alias} = ${LocationFormula} </span>`;

              let touchedLocationJSON = JSON.stringify(touchedLocation);
              messageData.flavor += `<button class="damage" data-img="${item.img}" data-dmg-type="${damageType}" data-name="${item.name}" data-dmg="${damageFormula}" data-location='${touchedLocationJSON}'  data-location-formula="${LocationFormula}" data-strike="${strike}" data-effects='${effects}'>${game.i18n.localize("WITCHER.table.Damage")}</button>`;

              let config = new RollConfig()
              config.showResult = false
              let roll = await extendedRoll(attFormula, messageData, config)

              if (item.system.rollOnlyDmg) {
                rollDamage(item.img, item.name, damageFormula, touchedLocation, LocationFormula, strike, allEffects, damageType)
              } else {
                roll.toMessage(messageData);
              }
            }
          }
        }
      }
    }, myDialogOptions).render(true)
  }

  _onSpellDisplay(event) {
    event.preventDefault();
    let section = event.currentTarget.closest(".spell");
    this.actor.update({ [`system.pannels.${section.dataset.spelltype}IsOpen`]: !this.actor.system.pannels[section.dataset.spelltype+'IsOpen']});
  }

  _onLifeEventDisplay(event) {
    event.preventDefault();
    let section = event.currentTarget.closest(".lifeEvents");
    this.actor.update({ [`system.general.lifeEvents.${section.dataset.event}.isOpened`]: !this.actor.system.general.lifeEvents[section.dataset.event].isOpened});
  }

  _onStatModifierDisplay(event) {
    event.preventDefault();
    let stat = event.currentTarget.closest(".stat-display").dataset.stat;

    if(stat == "reputation") {
      this.actor.update({ [`system.${stat}.isOpened`]: !this.actor.system[stat].isOpened});
    }
    else {
      this.actor.update({ [`system.${this.statMap[stat].origin}.${stat}.isOpened`]: !this.actor.system[this.statMap[stat].origin][stat].isOpened});
    }
    
  }

  _onDerivedModifierDisplay(event) {
    this.actor.update({ 'system.derivedStats.modifiersIsOpened': !this.actor.system.derivedStats.modifiersIsOpened});
  }

  _onSkillModifierDisplay(event) {
    event.preventDefault();
    let skill = event.currentTarget.closest(".skill").dataset.skill;

    this.actor.update({ [`system.skills.${this.skillMap[skill].attribute.name}.${skill}.isOpened`]: !this.actor.system.skills[this.skillMap[skill].attribute.name][skill].isOpened});
  }

  _onSkillDisplay(event) {
    event.preventDefault();
    let section = event.currentTarget.closest(".skill");
    this.actor.update({ [`system.pannels.${section.dataset.skilltype}IsOpen`]: !this.actor.system.pannels[section.dataset.skilltype+'IsOpen']});
  }

  _onSubstanceDisplay(event) {
    event.preventDefault();
    let section = event.currentTarget.closest(".substance");
    this.actor.update({ [`system.pannels.${section.dataset.subtype}IsOpen`]: !this.actor.system.pannels[section.dataset.subtype+'IsOpen']});
  }

  calc_total_skills_profession(context) {
    let totalSkills = 0;
    if (context.profession) {
      totalSkills += Number(context.profession.system.definingSkill.level);
      totalSkills += Number(context.profession.system.skillPath1.skill1.level) + Number(context.profession.system.skillPath1.skill2.level) + Number(context.profession.system.skillPath1.skill3.level)
      totalSkills += Number(context.profession.system.skillPath2.skill1.level) + Number(context.profession.system.skillPath2.skill2.level) + Number(context.profession.system.skillPath2.skill3.level)
      totalSkills += Number(context.profession.system.skillPath3.skill1.level) + Number(context.profession.system.skillPath3.skill2.level) + Number(context.profession.system.skillPath3.skill3.level)
    }
    return totalSkills;
  }

  calc_total_skills(context) {
    let totalSkills = 0;
    for (let element in context.system.skills) {
      for (let skill in context.system.skills[element]) {
        let skillLabel = game.i18n.localize(context.system.skills[element][skill].label)
        if (skillLabel?.includes("(2)")) {
          totalSkills += context.system.skills[element][skill].value * 2;
        }
        else {
          totalSkills += context.system.skills[element][skill].value;
        }
      }
    }
    return totalSkills;
  }

  calc_total_stats(context) {
    let totalStats = 0;
    for (let element in context.system.stats) {
      totalStats += context.system.stats[element].max;
    }
    return totalStats;
  }

  /** Do not delete. This method is here to give external modules the possibility to make skill rolls. */
  async _onSkillRoll(statNum, skillNum) {
    rollSkillCheck(this.actor, statNum, skillNum);
  }
}
