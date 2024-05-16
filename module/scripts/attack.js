import { getRandomInt } from "./witcher.js";

export function addAttackChatListeners(html) {

    // setup chat listener messages for each message as some need the message context instead of chatlog context.
    html.find('.chat-message').each(async (index, element) => {
        element = $(element);
        const id = element.data('messageId');
        const message = game.messages?.get(id);
        if (!message) return;

        await chatMessageListeners(message, element)
    });
}

export const chatMessageListeners = async (message, html) => {
    if (!html.find('button.damage'))
        return;

    html.find('button.damage').on('click', _ => onDamage(message));
}

function onDamage(message) {
    let item = message.getFlag('TheWitcherTRPG', 'attack').item
    let damage = message.getFlag('TheWitcherTRPG', 'damage');

    if (damage.location.name == "randomSpell") {
        let actor = game.actors.get(message.speaker.actor) || game.actors[0];
        damage.location.name = actor.getLocationObject("randomHuman");
    }
    rollDamage(item, damage);
}

export async function rollDamage(item, damage) {
    let damageOptions = {
        armorPiercing: item.system.armorPiercing,
        improvedArmorPiercing: item.system.improvedArmorPiercing,
        ablating: item.system.ablating
    }

    let messageData = {}
    messageData.flavor = `<div class="damage-message" <h1><img src="${item.img}" class="item-img" />${game.i18n.localize("WITCHER.table.Damage")}: ${item.name} </h1>`;

    if (damage.formula == "") {
        damage.formula = "0"
        ui.notifications.error(`${game.i18n.localize("WITCHER.NoDamageSpecified")}`)
    }

    if (damage.strike == "strong") {
        damage.formula = `(${damage.formula})*2`;
        messageData.flavor += `<div>${game.i18n.localize("WITCHER.Dialog.strikeStrong")}</div>`;
    }
    messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Dialog.attackLocation")}:</b> ${damage.location.alias} = ${damage.location.locationFormula} </div>`;
    let damageTypeloc = damage.damageType ? "WITCHER.Armor." + damage.damageType : ""
    messageData.flavor += `<div><b>${game.i18n.localize("WITCHER.Dialog.damageType")}:</b> ${game.i18n.localize(damageTypeloc)} </div>`;
    messageData.flavor += `<div>${game.i18n.localize("WITCHER.Damage.RemoveSP")}</div>`;

    if (damage.effects && damage.effects.length > 0) {
        messageData.flavor += `<b>${game.i18n.localize("WITCHER.Item.Effect")}:</b>`;

        damage.effects.forEach(element => {
            messageData.flavor += `<div class="flex">`;
            if (element.name != '') {
                messageData.flavor += `<span>${element.name}</span>`;
            }
            if (element.statusEffect) {
                let statusEffect = CONFIG.WITCHER.statusEffects.find(status => status.id == element.statusEffect);
                messageData.flavor += `<img class='chat-icon' src='${statusEffect.icon}' /> <span>${game.i18n.localize(statusEffect.label)}</span>`;
            }
            if (element.percentage) {
                let rollPercentage = getRandomInt(100);
                messageData.flavor += `<div>(${element.percentage}%) <b>${game.i18n.localize("WITCHER.Effect.Rolled")}:</b> ${rollPercentage}</div>`;
            }

            messageData.flavor += `</div>`;
        });
    }

    let message = await (await new Roll(damage.formula).evaluate()).toMessage(messageData)
    message.setFlag('TheWitcherTRPG', 'damageOptions', damageOptions)
    message.setFlag('TheWitcherTRPG', 'damage', damage);
}