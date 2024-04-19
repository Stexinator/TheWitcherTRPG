const fields = foundry.data.fields;

export default class CommonItemData extends foundry.abstract.TypeDataModel {
    static defineSchema() {
      return {
        description: new fields.StringField({initial: ''}),
        quantity: new fields.NumberField({initial: 1}),
        weight: new fields.NumberField({initial: 0}),
        cost: new fields.NumberField({initial: 0}),
        isHidden: new fields.BooleanField({initial: false}),
        isStored: new fields.BooleanField({initial: false}),
      }
    }
}