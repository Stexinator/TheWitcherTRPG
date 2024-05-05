const fields = foundry.data.fields;

export default function effectDerivedStat() {
    return {
        id: new fields.StringField({ initial: ""}),
        modifier: new fields.StringField({ initial: ""}),
        derivedStat: new fields.StringField({ initial: ""}),
    };
  }