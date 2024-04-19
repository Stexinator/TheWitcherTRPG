const fields = foundry.data.fields;

export default function effectStat() {
    return {
        id: new fields.StringField({ initial: ""}),
        modifier: new fields.StringField({ initial: ""}),
        stat: new fields.StringField({ initial: ""}),
    };
  }