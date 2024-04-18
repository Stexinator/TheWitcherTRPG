import stat from "./statData.js"

const fields = foundry.data.fields;

export default function derivedStats() {
    return {
        hp: new fields.SchemaField(stat("WITCHER.Actor.DerStat.HP")),
        sta: new fields.SchemaField(stat("WITCHER.Actor.DerStat.Sta")),
        resolve: new fields.SchemaField(stat("WITCHER.Actor.DerStat.Resolve")),
        focus: new fields.SchemaField(stat("WITCHER.Actor.DerStat.Focus")),
        vigor: new fields.SchemaField(stat("WITCHER.Actor.DerStat.Vigor")),
        modifiersIsOpened: new fields.BooleanField({initial: false}),
    };
  }