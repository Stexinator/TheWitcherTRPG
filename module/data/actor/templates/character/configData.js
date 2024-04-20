

const fields = foundry.data.fields;

export default function config() {
    return {
        homelands: new fields.SchemaField({
            aedirn: new fields.StringField({ initial: "WITCHER.Homelands.aedirn"}),
            angren: new fields.StringField({ initial: "WITCHER.Homelands.angren"}),
            cidaris: new fields.StringField({ initial: "WITCHER.Homelands.cidaris"}),
            cintra: new fields.StringField({ initial: "WITCHER.Homelands.cintra"}),
            dolblathanna: new fields.StringField({ initial: "WITCHER.Homelands.dolblathanna"}),
            ebbing: new fields.StringField({ initial: "WITCHER.Homelands.ebbing"}),
            etolia: new fields.StringField({ initial: "WITCHER.Homelands.etolia"}),
            gemmeria: new fields.StringField({ initial: "WITCHER.Homelands.gemmeria"}),
            gheso: new fields.StringField({ initial: "WITCHER.Homelands.gheso"}),
            kaedwen: new fields.StringField({ initial: "WITCHER.Homelands.kaedwen"}),
            kovir: new fields.StringField({ initial: "WITCHER.Homelands.kovir"}),
            lyria: new fields.StringField({ initial: "WITCHER.Homelands.lyria"}),
            maecht: new fields.StringField({ initial: "WITCHER.Homelands.maecht"}),
            magturga: new fields.StringField({ initial: "WITCHER.Homelands.magturga"}),
            mahakam: new fields.StringField({ initial: "WITCHER.Homelands.mahakam"}),
            mettina: new fields.StringField({ initial: "WITCHER.Homelands.mettina"}),
            nazair: new fields.StringField({ initial: "WITCHER.Homelands.nazair"}),
            nilfgaard: new fields.StringField({ initial: "WITCHER.Homelands.nilfgaard"}),
            poviss: new fields.StringField({ initial: "WITCHER.Homelands.poviss"}),
            redania: new fields.StringField({ initial: "WITCHER.Homelands.redania"}),
            rivia: new fields.StringField({ initial: "WITCHER.Homelands.rivia"}),
            skellige: new fields.StringField({ initial: "WITCHER.Homelands.skellige"}),
            temeria: new fields.StringField({ initial: "WITCHER.Homelands.temeria"}),
            verden: new fields.StringField({ initial: "WITCHER.Homelands.verden"}),
            vicovaro: new fields.StringField({ initial: "WITCHER.Homelands.vicovaro"})
        })
    }
  }

