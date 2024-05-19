export let activeEffectMixin = {

  async _onAddActiveEffect() {
    let itemData = {
      name: `new effect`,
      type: "effect"
    }
    await Item.create(itemData, { parent: this.actor })
  },

  activeEffectListener(html) {
    html.find(".add-active-effect").on("click", this._onAddActiveEffect.bind(this));
  }

}