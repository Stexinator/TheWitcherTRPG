
const fields = foundry.data.fields;

export default function background() {
    return {
        details:  new fields.StringField({ initial: ''}),
    }
  }