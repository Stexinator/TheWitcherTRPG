import { extendedRoll } from "./chat.js";
import { addAllModifiers } from "./witcher.js";
import { RollConfig } from "./rollConfig.js";
import { WITCHER } from "../setup/config.js";

function BlockAttack(actor) {
    let weapons = actor.items.filter(function (item) { return item.type == "weapon" && !item.system.isAmmo && WITCHER.meleeSkills.includes(item.system.attackSkill) });
    let shields = actor.items.filter(function (item) { return item.type == "armor" && item.system.location == "Shield" });

    let options = `<option value="brawling"> ${game.i18n.localize("WITCHER.SkRefBrawling")} </option>`;
    weapons.forEach(item => options += `<option value="${item.system.attackSkill}" itemId="${item.id}" type="Weapon"> ${item.name} (${game.i18n.localize(item.getItemAttackSkill().alias)})</option>`);
    shields.forEach(item => options += `<option value="Melee" itemId="${item.id}" type="Shield"> ${item.name} (${game.i18n.localize("WITCHER.SkRefMelee")})</option>`);

    const content = `<label>${game.i18n.localize("WITCHER.Dialog.DefenseWith")}: </label><select name="form">${options}</select><br />`;

    new Dialog({
        title: `${game.i18n.localize("WITCHER.Dialog.DefenseTitle")}`,
        content,
        buttons: {
            Block: {
                label: `${game.i18n.localize("WITCHER.Dialog.ButtonBlock")}`,
                callback: (html) => {
                    let item_id = html.find("[name=form]")[0].selectedOptions[0].getAttribute('itemid')
                    let type = html.find("[name=form]")[0].selectedOptions[0].getAttribute('type')
                    if (item_id) {
                        let item = actor.items.get(item_id);
                        if (type == "Weapon") {
                            item.update({ 'system.reliable': item.system.reliable - 1 })
                            if (item.system.reliable - 1 <= 0) {
                                return ui.notifications.error(game.i18n.localize("WITCHER.Weapon.Broken"));
                            }
                        }
                        else {
                            item.update({ 'system.reliability': item.system.reliability - 1 })
                            if (item.system.reliability - 1 <= 0) {
                                return ui.notifications.error(game.i18n.localize("WITCHER.Shield.Broken"));
                            }
                        }
                    }
                }
            }
        }
    }).render(true)
}

function ExecuteDefense(actor, attackType, location, totalAttack) {
    let weapons = actor.items.filter(function (item) { return item.type == "weapon" && !item.system.isAmmo && WITCHER.meleeSkills.includes(item.system.attackSkill) });
    let shields = actor.items.filter(function (item) { return item.type == "armor" && item.system.location == "Shield" });
    let options = `<option value="brawling"> ${game.i18n.localize("WITCHER.SkRefBrawling")} </option>`;
    weapons.forEach(item => options += `<option value="${item.system.attackSkill}" itemId="${item.id}" type="Weapon"> ${item.name} (${game.i18n.localize(item.getItemAttackSkill().alias)})</option>`);
    shields.forEach(item => options += `<option value="melee" itemId="${item.id}" type="Shield"> ${item.name} (${game.i18n.localize("WITCHER.SkRefMelee")})</option>`);

    const content = `
    <div class="flex">
        <label>${game.i18n.localize("WITCHER.Dialog.DefenseExtra")}: <input type="checkbox" name="isExtraDefense"></label> <br />
    </div>
    <label>${game.i18n.localize("WITCHER.Dialog.DefenseWith")}: </label><select name="form">${options}</select><br />
    <label>${game.i18n.localize("WITCHER.Dialog.attackCustom")}: <input type="Number" class="small" name="customDef" value=0></label> <br />`;

    new Dialog({
        title: `${game.i18n.localize("WITCHER.Dialog.DefenseTitle")}`,
        content,
        buttons: {
            Dodge: {
                label: `${game.i18n.localize("WITCHER.Dialog.ButtonDodge")}`,
                callback: async html => {
                    defense(actor, "dodge", 0, totalAttack, html, "ButtonDodge")
                }
            },
            Reposition: {
                label: `${game.i18n.localize("WITCHER.Dialog.ButtonReposition")}`,
                callback: async html => {
                    defense(actor, "athletics", 0, totalAttack, html, "ButtonReposition")
                }
            },
            Block: {
                label: `${game.i18n.localize("WITCHER.Dialog.ButtonBlock")}`,
                callback: async html => {
                    let defenseSkill = html.find("[name=form]")[0].value;
                    defense(actor, defenseSkill, 0, totalAttack, html, "ButtonBlock")
                }
            },
            Parry: {
                label: `${game.i18n.localize("WITCHER.Dialog.ButtonParry")}`,
                callback: async html => {
                    let defenseSkill = html.find("[name=form]")[0].value;
                    defense(actor, defenseSkill, -3, totalAttack, html, "ButtonParry")
                }
            },
            ParryAgainstThrown: {
                label: `${game.i18n.localize("WITCHER.Dialog.ButtonParryThrown")}`,
                callback: async html => {
                    let defenseSkill = html.find("[name=form]")[0].value;
                    defense(actor, defenseSkill, -5, totalAttack, html, "ButtonParryThrown")
                }
            },
            MagicResist: {
                label: `${game.i18n.localize("WITCHER.Dialog.ButtonMagicResist")}`,
                callback: async html => {
                    defense(actor, "resistmagic", 0, totalAttack, html, "ButtonMagicResist")
                }
            },
        }
    }).render(true)
}

async function defense(actor, skillName, modifier, totalAttack, html, buttonName) {
    let displayRollDetails = game.settings.get("TheWitcherTRPG", "displayRollsDetails")

    if (!handleExtraDefense(html, actor)) {
        return;
    }
    let skillMapEntry = WITCHER.skillMap[skillName];

    let stat = actor.system.stats[skillMapEntry.attribute.name].current;
    let skill = actor.system.skills[skillMapEntry.attribute.name][skillName];
    let skillValue = skill.value;

    let displayFormula = `1d10 + ${game.i18n.localize(skillMapEntry.attribute.labelShort)} + ${game.i18n.localize(skillMapEntry.label)}${modifier}`;

    let rollFormula = !displayRollDetails ? `1d10+${stat}+${skillValue}${modifier}` : `1d10+${stat}[${game.i18n.localize(skillMapEntry.attribute.labelShort)}]+${skillValue}[${game.i18n.localize(skillMapEntry.label)}]`;

    if (modifier < 0) {
        rollFormula += !displayRollDetails ? `${modifier}` : `${modifier}[${game.i18n.localize("WITCHER.Dialog." + buttonName)}]`;
    }

    let customDef = html.find("[name=customDef]")[0].value;
    if (customDef != "0") {
        rollFormula += !displayFormula ? `+${customDef}` : `+${customDef}[${game.i18n.localize("WITCHER.Settings.Custom")}]`;
    }

    rollFormula = addAllModifiers(actor, skillName, rollFormula)
    let config = createRollConfig(actor, skill, totalAttack)

    let messageData = {
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        flavor: `<h1>${game.i18n.localize("WITCHER.Dialog.Defense")}</h1>`,
    }
    messageData.flavor = `<h1>${game.i18n.localize("WITCHER.Dialog.Defense")}: ${game.i18n.localize("WITCHER.Dialog." + buttonName)}</h1><p>${displayFormula}</p>`;

    await extendedRoll(rollFormula, messageData, config)
}

function handleExtraDefense(html, actor) {
    let isExtraDefence = html.find("[name=isExtraDefense]").prop("checked");
    if (isExtraDefence) {
        let newSta = actor.system.derivedStats.sta.value - 1
        if (newSta < 0) {
            ui.notifications.error(game.i18n.localize("WITCHER.Spell.notEnoughSta"));
            return false;
        }
        actor.update({
            'system.derivedStats.sta.value': newSta
        });
    }

    return true;
}

function createRollConfig(actor, skill, totalAttack) {
    let config = new RollConfig()
    config.showCrit = true
    config.showSuccess = true
    config.defence = true
    config.threshold = totalAttack
    config.thresholdDesc = skill.label
    config.flagsOnSuccess = actor.getDefenceSuccessFlags(skill)
    config.flagsOnFailure = actor.getDefenceFailFlags(skill)

    return config;
}

export { ExecuteDefense, BlockAttack };