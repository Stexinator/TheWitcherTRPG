import CommonItemData from "./commonItemData.js";

const fields = foundry.data.fields;

export default class AlchemicalData extends CommonItemData {

    static defineSchema() {
  
      const commonData = super.defineSchema();
      return {
        // Using destructuring to effectively append our additional data here
        ...commonData,
        type: new fields.StringField({initial: ''}),
        avail: new fields.StringField({initial: ''}),
        effect: new fields.StringField({initial: ''}),
        time: new fields.StringField({initial: ''}),
        toxicity: new fields.StringField({initial: ''}),
      }
    }
  }