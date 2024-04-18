import CommonActorData from "./commonActorData.js"
import attackStats from "./templates/character/attackStatsData.js";
import general from "./templates/character/generalData.js";
import pannels from "./templates/character/pannelsData.js";
import skillTraining from "./templates/character/skillTrainingData.js";

const fields = foundry.data.fields;

export default class CharacterData extends CommonActorData {

  static defineSchema() {

    const commonData = super.defineSchema();
    return {
      // Using destructuring to effectively append our additional data here
      ...commonData,
      pannels: new fields.SchemaField(pannels()),
      general: new fields.SchemaField(general()),

      attackStats: new fields.SchemaField(attackStats()),

      improvementPoints: new fields.NumberField({initial: 0}),
      skillTraining1: new fields.SchemaField(skillTraining()),
      skillTraining2: new fields.SchemaField(skillTraining()),
      skillTraining3: new fields.SchemaField(skillTraining()),
      skillTraining4: new fields.SchemaField(skillTraining()),
    }
  }
}