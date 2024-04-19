const fields = foundry.data.fields;

export default function itemEffect() {
    return {
        id: new fields.StringField({ initial: ""}),
        name: new fields.StringField({ initial: ""}),
        percentage: new fields.StringField({ initial: ""}),
    };
  }