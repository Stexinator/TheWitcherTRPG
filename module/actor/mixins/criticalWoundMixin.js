import { genId } from "../../scripts/witcher.js";
import { WITCHER } from "../../setup/config.js";

export let criticalWoundMixin = {

    async _onCriticalWoundAdd(event) {
        event.preventDefault();
        const prevCritList = this.actor.system.critWounds;
        const newCritList = Object.values(prevCritList).map((details) => details);
        newCritList.push({ id: genId() });
        this.actor.update({ "system.critWounds": newCritList });
    },

    async _onCriticalWoundRemove(event) {
        event.preventDefault();
        const prevCritList = this.actor.system.critWounds;
        const newCritList = Object.values(prevCritList).map((details) => details);
        const idxToRm = newCritList.findIndex((v) => v.id === event.target.dataset.id);
        newCritList.splice(idxToRm, 1);
        this.actor.update({ "system.critWounds": newCritList });
    },

    criticalWoundListener(html) {
        html.find(".add-crit").on("click", this._onCriticalWoundAdd.bind(this));
        html.find(".delete-crit").on("click", this._onCriticalWoundRemove.bind(this));
    }

}