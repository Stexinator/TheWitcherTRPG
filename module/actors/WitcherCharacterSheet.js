import WitcherActorSheet from "./WitcherActorSheet.js";

export default class WitcherCharacterSheet extends WitcherActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "actor"],
      width: 1120,
      height: 600,
      template: "systems/TheWitcherTRPG/templates/sheets/actor/actor-sheet.html",
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }],
    });
  }

  getData() {
    const context = super.getData();

    this._prepareCharacterData(context);
    this._prepareSpells(context);
    this._prepareDiagramFormulas(context);
    this._prepareSubstances(context);
    this._prepareAlchemy(context);

    return context;
  }

  _prepareCharacterData(context) {
    let actor = context.actor;

    context.professions = actor.getList("profession");
    context.profession = context.professions[0];

    context.races = actor.getList("race");
    context.race = context.races[0];

    context.totalStats = this.calc_total_stats(context)
    context.totalSkills = this.calc_total_skills(context)
    context.totalProfSkills = this.calc_total_skills_profession(context)
    
    context.notes = actor.getList("note");

    context.activeEffects = actor.getList("effect");

    if (actor.system.pannels == undefined) {
      actor.system.pannels = {};
    }
  }

  _prepareSpells(context) {
    context.spells = context.actor.getList("spell");

    context.noviceSpells = context.spells.filter(s => s.system.level == "novice" &&
      (s.system.class == "Spells" || s.system.class == "Invocations" || s.system.class == "Witcher"));
    context.journeymanSpells = context.spells.filter(s => s.system.level == "journeyman" &&
      (s.system.class == "Spells" || s.system.class == "Invocations" || s.system.class == "Witcher"));
    context.masterSpells = context.spells.filter(s => s.system.level == "master" &&
      (s.system.class == "Spells" || s.system.class == "Invocations" || s.system.class == "Witcher"));
    context.hexes = context.spells.filter(s => s.system.class == "Hexes");
    context.rituals = context.spells.filter(s => s.system.class == "Rituals");
    context.magicalgift = context.spells.filter(s => s.system.class == "MagicalGift");
  }

  _prepareDiagramFormulas(context) {
    // Formulae
    context.diagrams = context.actor.getList("diagrams");
    context.alchemicalItemDiagrams = context.diagrams.filter(d => d.system.type == "alchemical" || !d.system.type).map(this.sanitizeDescription);
    context.potionDiagrams = context.diagrams.filter(d => d.system.type == "potion").map(this.sanitizeDescription);
    context.decoctionDiagrams = context.diagrams.filter(d => d.system.type == "decoction").map(this.sanitizeDescription);
    context.oilDiagrams = context.diagrams.filter(d => d.system.type == "oil").map(this.sanitizeDescription);

    // Diagrams
    context.ingredientDiagrams = context.diagrams.filter(d => d.system.type == "ingredients").map(this.sanitizeDescription);
    context.weaponDiagrams = context.diagrams.filter(d => d.system.type == "weapon").map(this.sanitizeDescription);
    context.armorDiagrams = context.diagrams.filter(d => d.system.type == "armor").map(this.sanitizeDescription);
    context.elderfolkWeaponDiagrams = context.diagrams.filter(d => d.system.type == "armor-enhancement").map(this.sanitizeDescription);
    context.elderfolkArmorDiagrams = context.diagrams.filter(d => d.system.type == "elderfolk-weapon").map(this.sanitizeDescription);
    context.ammunitionDiagrams = context.diagrams.filter(d => d.system.type == "ammunition").map(this.sanitizeDescription);
    context.bombDiagrams = context.diagrams.filter(d => d.system.type == "bomb").map(this.sanitizeDescription);
    context.trapDiagrams = context.diagrams.filter(d => d.system.type == "traps").map(this.sanitizeDescription);
  }

  _prepareCrafting(context) {
    context.allComponents = context.actor.getList("component");
    context.craftingMaterials = context.allComponents.filter(i => i.system.type == "crafting-material" || i.system.type == "component");
    context.ingotsAndMinerals = context.allComponents.filter(i => i.system.type == "minerals");
    context.hidesAndAnimalParts = context.allComponents.filter(i => i.system.type == "animal-parts");
  }

  _prepareAlchemy(context) {
    let items = context.actor.items;
    context.alchemicalItems = items.filter(i => (i.type == "valuable" && i.system.type == "alchemical-item") || (i.type == "alchemical" && i.system.type == "alchemical"));
    context.witcherPotions = items.filter(i => i.type == "alchemical" && (i.system.type == "decoction" || i.system.type == "potion"));
    context.oils = items.filter(i => i.type == "alchemical" && i.system.type == "oil");
    context.alchemicalTreatments = items.filter(i => i.type == "component" && i.system.type == "alchemical");
    context.mutagens = items.filter(i => i.type == "mutagen");
  }

  _prepareSubstances(context) {
    let actor = context.actor;

    context.substancesVitriol = actor.getSubstance("vitriol");
    context.vitriolCount = context.substancesVitriol.sum("quantity");
    context.substancesRebis = actor.getSubstance("rebis");
    context.rebisCount = context.substancesRebis.sum("quantity");
    context.substancesAether = actor.getSubstance("aether");
    context.aetherCount = context.substancesAether.sum("quantity");
    context.substancesQuebrith = actor.getSubstance("quebrith");
    context.quebrithCount = context.substancesQuebrith.sum("quantity");
    context.substancesHydragenum = actor.getSubstance("hydragenum");
    context.hydragenumCount = context.substancesHydragenum.sum("quantity");
    context.substancesVermilion = actor.getSubstance("vermilion");
    context.vermilionCount = context.substancesVermilion.sum("quantity");
    context.substancesSol = actor.getSubstance("sol");
    context.solCount = context.substancesSol.sum("quantity");
    context.substancesCaelum = actor.getSubstance("caelum");
    context.caelumCount = context.substancesCaelum.sum("quantity");
    context.substancesFulgur = actor.getSubstance("fulgur");
    context.fulgurCount = context.substancesFulgur.sum("quantity");
  }
}