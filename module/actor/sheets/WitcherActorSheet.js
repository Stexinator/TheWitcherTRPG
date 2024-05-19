import { extendedRoll } from "../../scripts/chat.js";
import { WITCHER } from "../../setup/config.js";
import { calc_currency_weight, addModifiers } from "../../scripts/witcher.js";
import { RollConfig } from "../../scripts/rollConfig.js";

import { ExecuteDefence } from "../../scripts/actions.js";
import { sanitizeMixin } from "../mixins/sanitizeMixin.js"
import { deathsaveMixin } from "../mixins/deathSaveMixin.js";
import { critMixin } from "../mixins/critMixin.js";
import { noteMixin } from "../mixins/noteMixin.js";
import { activeEffectMixin } from "../mixins/activeEffectMixin.js";
import { skillModifierMixin } from "../mixins/skillModifierMixin.js";
import { skillMixin } from "../mixins/skillMixin.js";
import { statMixin } from "../mixins/statMixin.js";
import { itemMixin } from "../mixins/itemMixin.js";

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

  statMap = WITCHER.statMap;
  skillMap = WITCHER.skillMap;

  /** @override */
  getData() {
    const context = super.getData();

    context.useAdrenaline = game.settings.get("TheWitcherTRPG", "useOptionalAdrenaline")
    context.displayRollDetails = game.settings.get("TheWitcherTRPG", "displayRollsDetails")
    context.useVerbalCombat = game.settings.get("TheWitcherTRPG", "useOptionalVerbalCombat")
    context.displayRep = game.settings.get("TheWitcherTRPG", "displayRep")

    context.config = CONFIG.WITCHER;
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

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".life-event-display").on("click", this._onLifeEventDisplay.bind(this));

    html.find(".init-roll").on("click", this._onInitRoll.bind(this));
    html.find(".crit-roll").on("click", this._onCritRoll.bind(this));
    html.find(".defence-roll").on("click", this._onDefenceRoll.bind(this));
    html.find(".heal-button").on("click", this._onHeal.bind(this));
    html.find(".verbal-button").on("click", this._onVerbalCombat.bind(this));

    html.find("input").focusin(ev => this._onFocusIn(ev));

    //mixins
    this.statListener(html)
    this.skillListener(html)
    this.skillModifierListener(html)

    this.itemListener(html)

    this.deathSaveListener(html)
    this.critListener(html)
    this.noteListener(html)
    this.activeEffectListener(html)
  }


  calcStaminaMulti(origStaCost, value) {
    let staminaMulti = parseInt(origStaCost)
    value = value.replace("/STA", '')
    if (value.includes("d")) {
      let diceAmount = value.split('d')[0];
      let diceType = "d" + value.split('d')[1].replace("/STA", '')
      return (staminaMulti * diceAmount) + diceType;
    }
    else {
      return staminaMulti * value
    }
  }

  async _onInitRoll(event) {
    this.actor.rollInitiative({ createCombatants: true, rerollInitiative: true })
  }

  async _onCritRoll(event) {
    let rollResult = await new Roll("1d10x10").evaluate({ async: true })
    let messageData = {
      speaker: ChatMessage.getSpeaker({ actor: this.actor })
    }
    rollResult.toMessage(messageData)
  }

  async _onDefenceRoll(event) {
    ExecuteDefence(this.actor)
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
    const dialogTemplate = await renderTemplate("systems/TheWitcherTRPG/templates/sheets/verbal-combat.hbs");
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
                vcStatName = "WITCHER.Context.unavailable";
                vcStat = 0;
                vcSkillName = "WITCHER.Context.unavailable";
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

            let messageData = { speaker: ChatMessage.getSpeaker({ actor: this.actor }) }
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

  _onFocusIn(event) {
    event.currentTarget.select();
  }


  _onLifeEventDisplay(event) {
    event.preventDefault();
    let section = event.currentTarget.closest(".lifeEvents");
    this.actor.update({ [`system.general.lifeEvents.${section.dataset.event}.isOpened`]: !this.actor.system.general.lifeEvents[section.dataset.event].isOpened });
  }
}

Object.assign(WitcherActorSheet.prototype, statMixin)
Object.assign(WitcherActorSheet.prototype, skillMixin)
Object.assign(WitcherActorSheet.prototype, skillModifierMixin)

Object.assign(WitcherActorSheet.prototype, itemMixin)

Object.assign(WitcherActorSheet.prototype, sanitizeMixin)
Object.assign(WitcherActorSheet.prototype, deathsaveMixin)
Object.assign(WitcherActorSheet.prototype, critMixin)
Object.assign(WitcherActorSheet.prototype, noteMixin)
Object.assign(WitcherActorSheet.prototype, activeEffectMixin)