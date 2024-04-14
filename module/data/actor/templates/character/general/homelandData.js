
const fields = foundry.data.fields;

export default function homeland() {
    return {
        value:  new fields.StringField({ initial: ''}),
        otherValue:  new fields.StringField({ initial: ''}),
        label:  new fields.StringField({ initial: 'WITCHER.Homeland'}),
    }
  }