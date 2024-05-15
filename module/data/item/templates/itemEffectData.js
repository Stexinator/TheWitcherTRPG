const fields = foundry.data.fields;

export default function itemEffect() {
    return {
        id: new fields.StringField({ initial: ""}),
        name: new fields.StringField({ initial: ""}),
        statusEffect: new fields.StringField({ initial: null, nullable: true}),
        percentage: new fields.StringField({ initial: "0%"}),
    };
  }