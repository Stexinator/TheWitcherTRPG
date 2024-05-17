import { genId } from "../../scripts/witcher.js";
import { WITCHER } from "../../setup/config.js";

export let critMixin = {

    async _onCritAdd(event) {
        event.preventDefault();
        const prevCritList = this.actor.system.critWounds;
        const newCritList = Object.values(prevCritList).map((details) => details);
        newCritList.push({
            id: genId(),
            effect: WITCHER.CritGravityDefaultEffect.Simple,
            mod: "None",
            description: WITCHER.CritDescription.SimpleCrackedJaw,
            notes: "",
        });
        this.actor.update({ "system.critWounds": newCritList });
    },

    async _onCritRemove(event) {
        event.preventDefault();
        const prevCritList = this.actor.system.critWounds;
        const newCritList = Object.values(prevCritList).map((details) => details);
        const idxToRm = newCritList.findIndex((v) => v.id === event.target.dataset.id);
        newCritList.splice(idxToRm, 1);
        this.actor.update({ "system.critWounds": newCritList });
    },

    critListener(html) {
        html.find(".add-crit").on("click", this._onCritAdd.bind(this));
        html.find(".delete-crit").on("click", this._onCritRemove.bind(this));
    }

}