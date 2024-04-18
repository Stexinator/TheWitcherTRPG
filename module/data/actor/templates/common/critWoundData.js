
const fields = foundry.data.fields;

export default function critWound() {
    return {
        id: new fields.StringField({ initial: ''}),
        effect: new fields.StringField({ initial: ''}),
        mod: new fields.StringField({ initial: 'None'}),
        notes: new fields.StringField({ initial: ''}),
        daysHealed: new fields.NumberField({ initial: 0}),
        healingTime: new fields.NumberField({ initial: 0}),
    };
  }