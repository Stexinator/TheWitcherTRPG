export const WITCHER = {}

WITCHER.homelands = {
    other: "WITCHER.background.other",
    aedirn: "WITCHER.Homelands.aedirn",
    angren: "WITCHER.Homelands.angren",
    cidaris: "WITCHER.Homelands.cidaris",
    cintra: "WITCHER.Homelands.cintra",
    dolblathanna: "WITCHER.Homelands.dolblathanna",
    ebbing: "WITCHER.Homelands.ebbing",
    etolia: "WITCHER.Homelands.etolia",
    gemmeria: "WITCHER.Homelands.gemmeria",
    gheso: "WITCHER.Homelands.gheso",
    kaedwen: "WITCHER.Homelands.kaedwen",
    kovir: "WITCHER.Homelands.kovir",
    lyria: "WITCHER.Homelands.lyria",
    maecht: "WITCHER.Homelands.maecht",
    magturga: "WITCHER.Homelands.magturga",
    mahakam: "WITCHER.Homelands.mahakam",
    mettina: "WITCHER.Homelands.mettina",
    nazair: "WITCHER.Homelands.nazair",
    nilfgaard: "WITCHER.Homelands.nilfgaard",
    poviss: "WITCHER.Homelands.poviss",
    redania: "WITCHER.Homelands.redania",
    rivia: "WITCHER.Homelands.rivia",
    skellige: "WITCHER.Homelands.skellige",
    temeria: "WITCHER.Homelands.temeria",
    verden: "WITCHER.Homelands.verden",
    vicovaro: "WITCHER.Homelands.vicovaro"
}

WITCHER.socialStanding = {
    equal: "WITCHER.socialStanding.equal",
    tolerated: "WITCHER.socialStanding.tolerated",
    hated: "WITCHER.socialStanding.hated",
    feared: "WITCHER.socialStanding.feared",
    toleratedFeared: "WITCHER.socialStanding.toleratedFeared",
    hatedFeared: "WITCHER.socialStanding.hatedFeared",
}

WITCHER.statTypes = {
    none: "",
    int: "WITCHER.Actor.Stat.Int",
    ref: "WITCHER.Actor.Stat.Ref",
    dex: "WITCHER.Actor.Stat.Dex",
    body: "WITCHER.Actor.Stat.Body",
    spd: "WITCHER.Actor.Stat.Spd",
    emp: "WITCHER.Actor.Stat.Emp",
    cra: "WITCHER.Actor.Stat.Cra",
    will: "WITCHER.Actor.Stat.Will",
    luck: "WITCHER.Actor.Stat.Luck",
}

WITCHER.substanceTypes = {
    vitriol: "WITCHER.Inventory.Vitriol",
    rebis: "WITCHER.Inventory.Rebis",
    aether: "WITCHER.Inventory.Aether",
    quebrith: "WITCHER.Inventory.Quebrith",
    hydragenum: "WITCHER.Inventory.Hydragenum",
    vermilion: "WITCHER.Inventory.Vermilion",
    sol: "WITCHER.Inventory.Sol",
    caelum: "WITCHER.Inventory.Caelum",
    fulgur: "WITCHER.Inventory.Fulgur",
}

WITCHER.Availability = {
    Everywhere: "WITCHER.Item.AvailabilityEverywhere",
    Common: "WITCHER.Item.AvailabilityCommon",
    Poor: "WITCHER.Item.AvailabilityPoor",
    Rare: "WITCHER.Item.AvailabilityRare",
}

WITCHER.Concealment = {
    T: "WITCHER.Item.Tiny",
    S: "WITCHER.Item.Small",
    L: "WITCHER.Item.Large",
    NA: "WITCHER.Item.CantHide",
}

WITCHER.MonsterTypes = {
    Humanoid: "WITCHER.Monster.Type.Humanoid",
    Necrophage: "WITCHER.Monster.Type.Necrophage",
    Specter: "WITCHER.Monster.Type.Specter",
    Beast: "WITCHER.Monster.Type.Beast",
    CursedOne: "WITCHER.Monster.Type.CursedOne",
    Hybrid: "WITCHER.Monster.Type.Hybrid",
    Insectoid: "WITCHER.Monster.Type.Insectoid",
    Elementa: "WITCHER.Monster.Type.Elementa",
    Relict: "WITCHER.Monster.Type.Relict",
    Ogroid: "WITCHER.Monster.Type.Ogroid",
    Draconid: "WITCHER.Monster.Type.Draconid",
    Vampire: "WITCHER.Monster.Type.Vampire",
}

WITCHER.monsterDifficulty = {
    easy: "WITCHER.Monster.Easy",
    medium: "WITCHER.Monster.Normal",
    hard: "WITCHER.Monster.Hard",
    exceptional: "WITCHER.Monster.Exceptional",
}

WITCHER.monsterComplexity = {
    simple: "WITCHER.Monster.Simple",
    complex: "WITCHER.Monster.Complex",
    difficult: "WITCHER.Monster.Difficult",
}

WITCHER.CritGravity = {
    Simple: "WITCHER.CritWound.Simple",
    Complex: "WITCHER.CritWound.Complex",
    Difficult: "WITCHER.CritWound.Difficult",
    Deadly: "WITCHER.CritWound.Deadly",
}

WITCHER.CritGravityDefaultEffect = {
    Simple: "SimpleCrackedJaw",
    Complex: "ComplexMinorHeadWound",
    Difficult: "DifficultSkullFracture",
    Deadly: "DeadlyDecapitated",
}

WITCHER.CritMod = {
    None: "WITCHER.CritWound.None",
    Stabilized: "WITCHER.CritWound.Stabilized",
    Treated: "WITCHER.CritWound.Treated",
}

WITCHER.CritDescription = {
    SimpleCrackedJaw: "WITCHER.CritWound.SimpleCrackedJaw",
    SimpleDisfiguringScar: "WITCHER.CritWound.SimpleDisfiguringScar",
    SimpleCrackedRibs: "WITCHER.CritWound.SimpleCrackedRibs",
    SimpleForeignObject: "WITCHER.CritWound.SimpleForeignObject",
    SimpleSprainedArm: "WITCHER.CritWound.SimpleSprainedArm",
    SimpleSprainedLeg: "WITCHER.CritWound.SimpleSprainedLeg",
    ComplexMinorHeadWound: "WITCHER.CritWound.ComplexMinorHeadWound",
    ComplexLostTeeth: "WITCHER.CritWound.ComplexLostTeeth",
    ComplexRupturedSpleen: "WITCHER.CritWound.ComplexRupturedSpleen",
    ComplexBrokenRibs: "WITCHER.CritWound.ComplexBrokenRibs",
    ComplexFracturedArm: "WITCHER.CritWound.ComplexFracturedArm",
    ComplexFracturedLeg: "WITCHER.CritWound.ComplexFracturedLeg",
    DifficultSkullFracture: "WITCHER.CritWound.DifficultSkullFracture",
    DifficultConcussion: "WITCHER.CritWound.DifficultConcussion",
    DifficultTornStomach: "WITCHER.CritWound.DifficultTornStomach",
    DifficultSuckingChestWound: "WITCHER.CritWound.DifficultSuckingChestWound",
    DifficultCompoundArmFracture: "WITCHER.CritWound.DifficultCompoundArmFracture",
    DifficultCompoundLegFracture: "WITCHER.CritWound.DifficultCompoundLegFracture",
    DeadlyDecapitated: "WITCHER.CritWound.DeadlyDecapitated",
    DeadlyDamagedEye: "WITCHER.CritWound.DeadlyDamagedEye",
    DeadlyHearthDamage: "WITCHER.CritWound.DeadlyHearthDamage",
    DeadlySepticShock: "WITCHER.CritWound.DeadlySepticShock",
    DeadlyDismemberedArm: "WITCHER.CritWound.DeadlyDismemberedArm",
    DeadlyDismemberedLeg: "WITCHER.CritWound.DeadlyDismemberedLeg",
}

WITCHER.CritModDescription = {
    SimpleCrackedJaw: { None: "WITCHER.CritWound.Mod.SimpleCrackedJaw.None", Stabilized: "WITCHER.CritWound.Mod.SimpleCrackedJaw.Stabilized", Treated: "WITCHER.CritWound.Mod.SimpleCrackedJaw.Treated" },
    SimpleDisfiguringScar: { None: "WITCHER.CritWound.Mod.SimpleDisfiguringScar.None", Stabilized: "WITCHER.CritWound.Mod.SimpleDisfiguringScar.Stabilized", Treated: "WITCHER.CritWound.Mod.SimpleDisfiguringScar.Treated" },
    SimpleCrackedRibs: { None: "WITCHER.CritWound.Mod.SimpleCrackedRibs.None", Stabilized: "WITCHER.CritWound.Mod.SimpleCrackedRibs.Stabilized", Treated: "WITCHER.CritWound.Mod.SimpleCrackedRibs.Treated" },
    SimpleForeignObject: { None: "WITCHER.CritWound.Mod.SimpleForeignObject.None", Stabilized: "WITCHER.CritWound.Mod.SimpleForeignObject.Stabilized", Treated: "WITCHER.CritWound.Mod.SimpleForeignObject.Treated" },
    SimpleSprainedArm: { None: "WITCHER.CritWound.Mod.SimpleSprainedArm.None", Stabilized: "WITCHER.CritWound.Mod.SimpleSprainedArm.Stabilized", Treated: "WITCHER.CritWound.Mod.SimpleSprainedArm.Treated" },
    SimpleSprainedLeg: { None: "WITCHER.CritWound.Mod.SimpleSprainedLeg.None", Stabilized: "WITCHER.CritWound.Mod.SimpleSprainedLeg.Stabilized", Treated: "WITCHER.CritWound.Mod.SimpleSprainedLeg.Treated" },
    ComplexMinorHeadWound: { None: "WITCHER.CritWound.Mod.ComplexMinorHeadWound.None", Stabilized: "WITCHER.CritWound.Mod.ComplexMinorHeadWound.Stabilized", Treated: "WITCHER.CritWound.Mod.ComplexMinorHeadWound.Treated" },
    ComplexLostTeeth: { None: "WITCHER.CritWound.Mod.ComplexLostTeeth.None", Stabilized: "WITCHER.CritWound.Mod.ComplexLostTeeth.Stabilized", Treated: "WITCHER.CritWound.Mod.ComplexLostTeeth.Treated" },
    ComplexRupturedSpleen: { None: "WITCHER.CritWound.Mod.ComplexRupturedSpleen.None", Stabilized: "WITCHER.CritWound.Mod.ComplexRupturedSpleen.Stabilized", Treated: "WITCHER.CritWound.Mod.ComplexRupturedSpleen.Treated" },
    ComplexBrokenRibs: { None: "WITCHER.CritWound.Mod.ComplexBrokenRibs.None", Stabilized: "WITCHER.CritWound.Mod.ComplexBrokenRibs.Stabilized", Treated: "WITCHER.CritWound.Mod.ComplexBrokenRibs.Treated" },
    ComplexFracturedArm: { None: "WITCHER.CritWound.Mod.ComplexFracturedArm.None", Stabilized: "WITCHER.CritWound.Mod.ComplexFracturedArm.Stabilized", Treated: "WITCHER.CritWound.Mod.ComplexFracturedArm.Treated" },
    ComplexFracturedLeg: { None: "WITCHER.CritWound.Mod.ComplexFracturedLeg.None", Stabilized: "WITCHER.CritWound.Mod.ComplexFracturedLeg.Stabilized", Treated: "WITCHER.CritWound.Mod.ComplexFracturedLeg.Treated" },
    DifficultSkullFracture: { None: "WITCHER.CritWound.Mod.DifficultSkullFracture.None", Stabilized: "WITCHER.CritWound.Mod.DifficultSkullFracture.Stabilized", Treated: "WITCHER.CritWound.Mod.DifficultSkullFracture.Treated" },
    DifficultConcussion: { None: "WITCHER.CritWound.Mod.DifficultConcussion.None", Stabilized: "WITCHER.CritWound.Mod.DifficultConcussion.Stabilized", Treated: "WITCHER.CritWound.Mod.DifficultConcussion.Treated" },
    DifficultTornStomach: { None: "WITCHER.CritWound.Mod.DifficultTornStomach.None", Stabilized: "WITCHER.CritWound.Mod.DifficultTornStomach.Stabilized", Treated: "WITCHER.CritWound.Mod.DifficultTornStomach.Treated" },
    DifficultSuckingChestWound: { None: "WITCHER.CritWound.Mod.DifficultSuckingChestWound.None", Stabilized: "WITCHER.CritWound.Mod.DifficultSuckingChestWound.Stabilized", Treated: "WITCHER.CritWound.Mod.DifficultSuckingChestWound.Treated" },
    DifficultCompoundArmFracture: { None: "WITCHER.CritWound.Mod.DifficultCompoundArmFracture.None", Stabilized: "WITCHER.CritWound.Mod.DifficultCompoundArmFracture.Stabilized", Treated: "WITCHER.CritWound.Mod.DifficultCompoundArmFracture.Treated" },
    DifficultCompoundLegFracture: { None: "WITCHER.CritWound.Mod.DifficultCompoundLegFracture.None", Stabilized: "WITCHER.CritWound.Mod.DifficultCompoundLegFracture.Stabilized", Treated: "WITCHER.CritWound.Mod.DifficultCompoundLegFracture.Treated" },
    DeadlyDecapitated: { None: "WITCHER.CritWound.Mod.DeadlyDecapitated.None", Stabilized: "WITCHER.CritWound.Mod.DeadlyDecapitated.Stabilized", Treated: "WITCHER.CritWound.Mod.DeadlyDecapitated.Treated" },
    DeadlyDamagedEye: { None: "WITCHER.CritWound.Mod.DeadlyDamagedEye.None", Stabilized: "WITCHER.CritWound.Mod.DeadlyDamagedEye.Stabilized", Treated: "WITCHER.CritWound.Mod.DeadlyDamagedEye.Treated" },
    DeadlyHearthDamage: { None: "WITCHER.CritWound.Mod.DeadlyHearthDamage.None", Stabilized: "WITCHER.CritWound.Mod.DeadlyHearthDamage.Stabilized", Treated: "WITCHER.CritWound.Mod.DeadlyHearthDamage.Treated" },
    DeadlySepticShock: { None: "WITCHER.CritWound.Mod.DeadlySepticShock.None", Stabilized: "WITCHER.CritWound.Mod.DeadlySepticShock.Stabilized", Treated: "WITCHER.CritWound.Mod.DeadlySepticShock.Treated" },
    DeadlyDismemberedArm: { None: "WITCHER.CritWound.Mod.DeadlyDismemberedArm.None", Stabilized: "WITCHER.CritWound.Mod.DeadlyDismemberedArm.Stabilized", Treated: "WITCHER.CritWound.Mod.DeadlyDismemberedArm.Treated" },
    DeadlyDismemberedLeg: { None: "WITCHER.CritWound.Mod.DeadlyDismemberedLeg.None", Stabilized: "WITCHER.CritWound.Mod.DeadlyDismemberedLeg.Stabilized", Treated: "WITCHER.CritWound.Mod.DeadlyDismemberedLeg.Treated" },
}

WITCHER.CritSimple = {
    SimpleCrackedJaw: "WITCHER.CritWound.Name.SimpleCrackedJaw",
    SimpleDisfiguringScar: "WITCHER.CritWound.Name.SimpleDisfiguringScar",
    SimpleCrackedRibs: "WITCHER.CritWound.Name.SimpleCrackedRibs",
    SimpleForeignObject: "WITCHER.CritWound.Name.SimpleForeignObject",
    SimpleSprainedArm: "WITCHER.CritWound.Name.SimpleSprainedArm",
    SimpleSprainedLeg: "WITCHER.CritWound.Name.SimpleSprainedLeg",
}

WITCHER.CritComplex = {
    ComplexMinorHeadWound: "WITCHER.CritWound.Name.ComplexMinorHeadWound",
    ComplexLostTeeth: "WITCHER.CritWound.Name.ComplexLostTeeth",
    ComplexRupturedSpleen: "WITCHER.CritWound.Name.ComplexRupturedSpleen",
    ComplexBrokenRibs: "WITCHER.CritWound.Name.ComplexBrokenRibs",
    ComplexFracturedArm: "WITCHER.CritWound.Name.ComplexFracturedArm",
    ComplexFracturedLeg: "WITCHER.CritWound.Name.ComplexFracturedLeg",
}

WITCHER.CritDifficult = {
    DifficultSkullFracture: "WITCHER.CritWound.Name.DifficultSkullFracture",
    DifficultConcussion: "WITCHER.CritWound.Name.DifficultConcussion",
    DifficultTornStomach: "WITCHER.CritWound.Name.DifficultTornStomach",
    DifficultSuckingChestWound: "WITCHER.CritWound.Name.DifficultSuckingChestWound",
    DifficultCompoundArmFracture: "WITCHER.CritWound.Name.DifficultCompoundArmFracture",
    DifficultCompoundLegFracture: "WITCHER.CritWound.Name.DifficultCompoundLegFracture",
}

WITCHER.CritDeadly = {
    DeadlyDecapitated: "WITCHER.CritWound.Name.DeadlyDecapitated",
    DeadlyDamagedEye: "WITCHER.CritWound.Name.DeadlyDamagedEye",
    DeadlyHearthDamage: "WITCHER.CritWound.Name.DeadlyHearthDamage",
    DeadlySepticShock: "WITCHER.CritWound.Name.DeadlySepticShock",
    DeadlyDismemberedArm: "WITCHER.CritWound.Name.DeadlyDismemberedArm",
    DeadlyDismemberedLeg: "WITCHER.CritWound.Name.DeadlyDismemberedLeg",
}

WITCHER.meleeSkills = ["brawling", "melee", "smallblades", "staffspear", "swordsmanship", "athletics"]
WITCHER.rangedSkills = ["athletics", "archery", "crossbow"]

WITCHER.statMap = {
    int: {
        origin: "stats",
        name: "int",
        label: "WITCHER.StInt",
        labelShort: "WITCHER.Actor.Stat.Int"
    },
    ref: {
        origin: "stats",
        name: "ref",
        label: "WITCHER.StRef",
        labelShort: "WITCHER.Actor.Stat.Ref"
    },
    dex: {
        origin: "stats",
        name: "dex",
        label: "WITCHER.StDex",
        labelShort: "WITCHER.Actor.Stat.Dex"
    },
    body: {
        origin: "stats",
        name: "body",
        label: "WITCHER.StBody",
        labelShort: "WITCHER.Actor.Stat.Body"
    },
    spd: {
        origin: "stats",
        name: "spd",
        label: "WITCHER.StSpd",
        labelShort: "WITCHER.Actor.Stat.Spd"
    },
    emp: {
        origin: "stats",
        name: "emp",
        label: "WITCHER.StEmp",
        labelShort: "WITCHER.Actor.Stat.Emp"
    },
    cra: {
        origin: "stats",
        name: "cra",
        label: "WITCHER.StCra",
        labelShort: "WITCHER.Actor.Stat.Cra"
    },
    will: {
        origin: "stats",
        name: "will",
        label: "WITCHER.StWill",
        labelShort: "WITCHER.Actor.Stat.Will"
    },
    luck: {
        origin: "stats",
        name: "luck",
        label: "WITCHER.StLuck",
        labelShort: "WITCHER.Actor.Stat.Luck"
    },

    stun: {
        origin: "coreStats",
        name: "stun",
        labelShort: "WITCHER.Actor.CoreStat.Stun",
    },
    run: {
        origin: "coreStats",
        name: "run",
        labelShort: "WITCHER.Actor.CoreStat.Run",
    },
    leap: {
        origin: "coreStats",
        name: "leap",
        labelShort: "WITCHER.Actor.CoreStat.Leap",
    },
    enc: {
        origin: "coreStats",
        name: "enc",
        labelShort: "WITCHER.Actor.CoreStat.Enc",
    },
    rec: {
        origin: "coreStats",
        name: "rec",
        labelShort: "WITCHER.Actor.CoreStat.Rec",
    },
    woundTreshold: {
        origin: "coreStats",
        name: "woundTreshold",
        labelShort: "WITCHER.Actor.CoreStat.woundTreshold",
    },

    hp: {
        origin: "derivedStats",
        name: "hp",
        labelShort: "WITCHER.Actor.DerStat.HP",
    },
    sta: {
        origin: "derivedStats",
        name: "sta",
        labelShort: "WITCHER.Actor.DerStat.Sta",
    },
    resolve: {
        origin: "derivedStats",
        name: "resolve",
        labelShort: "WITCHER.Actor.DerStat.Resolve",
    },
    focus: {
        origin: "derivedStats",
        name: "focus",
        labelShort: "WITCHER.Actor.DerStat.Focus",
    },
    vigor: {
        origin: "derivedStats",
        name: "vigor",
        labelShort: "WITCHER.Actor.DerStat.Vigor",
    },

    reputation: {
        origin: ""
    }
}

WITCHER.skillMap = {
    awareness: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntAwareness",
        name: "awareness",
    },
    business: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntBusiness",
        name: "business",
    },
    deduction: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntDeduction",
        name: "deduction",
    },
    education: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntEducation",
        name: "education",
    },
    commonsp: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntCommonLable",
        name: "commonsp",
    },
    eldersp: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntElderLable",
        name: "eldersp",
    },
    dwarven: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntDwarvenLable",
        name: "dwarven",
    },
    monster: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntMonster",
        name: "monster",
    },
    socialetq: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntSocialEt",
        name: "socialetq",
    },
    streetwise: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntStreet",
        name: "streetwise",
    },
    tactics: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntTacticsLable",
        name: "tactics",
    },
    teaching: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntTeaching",
        name: "teaching",
    },
    wilderness: {
        attribute: WITCHER.statMap.int,
        label: "WITCHER.SkIntWilderness",
        name: "wilderness",
    },

    brawling: {
        attribute: WITCHER.statMap.ref,
        label: "WITCHER.SkRefBrawling",
        name: "brawling",
    },
    dodge: {
        attribute: WITCHER.statMap.ref,
        label: "WITCHER.SkRefDodge",
        name: "dodge",
    },
    melee: {
        attribute: WITCHER.statMap.ref,
        label: "WITCHER.SkRefMelee",
        name: "melee",
    },
    riding: {
        attribute: WITCHER.statMap.ref,
        label: "WITCHER.SkRefRiding",
        name: "riding",
    },
    sailing: {
        attribute: WITCHER.statMap.ref,
        label: "WITCHER.SkRefSailing",
        name: "sailing",
    },
    smallblades: {
        attribute: WITCHER.statMap.ref,
        label: "WITCHER.SkRefSmall",
        name: "smallblades",
    },
    staffspear: {
        attribute: WITCHER.statMap.ref,
        label: "WITCHER.SkRefStaff",
        name: "staffspear",
    },
    swordsmanship: {
        attribute: WITCHER.statMap.ref,
        label: "WITCHER.SkRefSwordsmanship",
        name: "swordsmanship",
    },

    courage: {
        attribute: WITCHER.statMap.will,
        label: "WITCHER.SkWillCourage",
        name: "courage",
    },
    hexweave: {
        attribute: WITCHER.statMap.will,
        label: "WITCHER.SkWillHexLable",
        name: "hexweave",
    },
    intimidation: {
        attribute: WITCHER.statMap.will,
        label: "WITCHER.SkWillIntim",
        name: "intimidation",
    },
    spellcast: {
        attribute: WITCHER.statMap.will,
        label: "WITCHER.SkWillSpellcastLable",
        name: "spellcast",
    },
    resistmagic: {
        attribute: WITCHER.statMap.will,
        label: "WITCHER.SkWillResistMagLable",
        name: "resistmagic",
    },
    resistcoerc: {
        attribute: WITCHER.statMap.will,
        label: "WITCHER.SkWillResistCoer",
        name: "resistcoerc",
    },
    ritcraft: {
        attribute: WITCHER.statMap.will,
        label: "WITCHER.SkWillRitCraftLable",
        name: "ritcraft",
    },

    archery: {
        attribute: WITCHER.statMap.dex,
        label: "WITCHER.SkDexArchery",
        name: "archery",
    },
    athletics: {
        attribute: WITCHER.statMap.dex,
        label: "WITCHER.SkDexAthletics",
        name: "athletics",
    },
    crossbow: {
        attribute: WITCHER.statMap.dex,
        label: "WITCHER.SkDexCrossbow",
        name: "crossbow",
    },
    sleight: {
        attribute: WITCHER.statMap.dex,
        label: "WITCHER.SkDexSleight",
        name: "sleight",
    },
    stealth: {
        attribute: WITCHER.statMap.dex,
        label: "WITCHER.SkDexStealth",
        name: "stealth",
    },

    alchemy: {
        attribute: WITCHER.statMap.cra,
        label: "WITCHER.SkCraAlchemyLable",
        name: "alchemy",
    },
    crafting: {
        attribute: WITCHER.statMap.cra,
        label: "WITCHER.SkCraCraftingLable",
        name: "crafting",
    },
    disguise: {
        attribute: WITCHER.statMap.cra,
        label: "WITCHER.SkCraDisguise",
        name: "disguise",
    },
    firstaid: {
        attribute: WITCHER.statMap.cra,
        label: "WITCHER.SkCraAid",
        name: "firstaid",
    },
    forgery: {
        attribute: WITCHER.statMap.cra,
        label: "WITCHER.SkCraForge",
        name: "forgery",
    },
    picklock: {
        attribute: WITCHER.statMap.cra,
        label: "WITCHER.SkCraPick",
        name: "picklock",
    },
    trapcraft: {
        attribute: WITCHER.statMap.cra,
        label: "WITCHER.SkCraTrapCraftLable",
        name: "trapcraft",
    },

    physique: {
        attribute: WITCHER.statMap.body,
        label: "WITCHER.SkBodyPhys",
        name: "physique",
    },
    endurance: {
        attribute: WITCHER.statMap.body,
        label: "WITCHER.SkBodyEnd",
        name: "endurance",
    },

    charisma: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpCharisma",
        name: "charisma",
    },
    deceit: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpDeceit",
        name: "deceit",
    },
    finearts: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpArts",
        name: "finearts",
    },
    gambling: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpGambling",
        name: "gambling",
    },
    grooming: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpGrooming",
        name: "grooming",
    },
    perception: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpHumanPerc",
        name: "perception",
    },
    leadership: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpLeadership",
        name: "leadership",
    },
    persuasion: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpPersuasion",
        name: "persuasion",
    },
    performance: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpPerformance",
        name: "performance",
    },
    seduction: {
        attribute: WITCHER.statMap.emp,
        label: "WITCHER.SkEmpSeduction",
        name: "seduction",
    },
}

WITCHER.verbalCombat = {
    //empathic attacks
    Seduce: {
        name: "WITCHER.verbalCombat.Seduce",
        skill: WITCHER.skillMap.seduction,
        baseDmg: '1d6',
        dmgStat: WITCHER.statMap.emp,
        effect: "WITCHER.verbalCombat.SeduceEffect"
    },
    Persuade: {
        name: "WITCHER.verbalCombat.Persuade",
        skill: WITCHER.skillMap.persuasion,
        baseDmg: '1d6/2',
        dmgStat: WITCHER.statMap.emp,
        effect: "WITCHER.verbalCombat.PersuadeEffect"
    },
    Appeal: {
        name: "WITCHER.verbalCombat.Appeal",
        skill: WITCHER.skillMap.leadership,
        baseDmg: '1d10',
        dmgStat: WITCHER.statMap.emp,
        effect: "WITCHER.verbalCombat.AppealEffect"
    },
    Befriend: {
        name: "WITCHER.verbalCombat.Befriend",
        skill: WITCHER.skillMap.charisma,
        baseDmg: '1d6',
        dmgStat: WITCHER.statMap.emp,
        effect: "WITCHER.verbalCombat.BefriendEffect"
    },

    //antagonistic attacks
    Deceive: {
        name: "WITCHER.verbalCombat.Deceive",
        skill: WITCHER.skillMap.deceit,
        baseDmg: '1d6',
        dmgStat: WITCHER.statMap.int,
        effect: "WITCHER.verbalCombat.DeceiveEffect"
    },
    Ridicule: {
        name: "WITCHER.verbalCombat.Ridicule",
        skill: WITCHER.skillMap.socialetq,
        baseDmg: '1d6',
        dmgStat: WITCHER.statMap.will,
        effect: "WITCHER.verbalCombat.RidiculeEffect"
    },
    Intimidate: {
        name: "WITCHER.verbalCombat.Intimidate",
        skill: WITCHER.skillMap.intimidation,
        baseDmg: '1d10',
        dmgStat: WITCHER.statMap.will,
        effect: "WITCHER.verbalCombat.IntimidateEffect"
    },

    //Defenses
    Ignore: {
        name: "WITCHER.verbalCombat.Ignore",
        skill: WITCHER.skillMap.resistcoerc,
        baseDmg: '1d10',
        dmgStat: WITCHER.statMap.emp,
        effect: "WITCHER.verbalCombat.None"
    },
    Counterargue: {
        name: "WITCHER.verbalCombat.Counterargue",
        effect: "WITCHER.verbalCombat.CounterargueEffect"
    },
    ChangeSubject: {
        name: "WITCHER.verbalCombat.ChangeSubject",
        skill: WITCHER.skillMap.persuasion,
        baseDmg: '1d6',
        dmgStat: WITCHER.statMap.int,
        effect: "WITCHER.verbalCombat.None"
    },
    Disengage: {
        name: "WITCHER.verbalCombat.Disengage",
        skill: WITCHER.skillMap.resistcoerc,
        effect: "WITCHER.verbalCombat.DisengageEffect"
    },

    //empathetic tools
    Romance: {
        name: "WITCHER.verbalCombat.Romance",
        skill: WITCHER.skillMap.charisma,
        effect: "WITCHER.verbalCombat.RomanceEffect"
    },
    Study: {
        name: "WITCHER.verbalCombat.Study",
        skill: WITCHER.skillMap.perception,
        effect: "WITCHER.verbalCombat.StudyEffect"
    },

    //antagonistic tools
    ImplyPersuade: {
        name: "WITCHER.verbalCombat.ImplyPersuade",
        skill: WITCHER.skillMap.persuasion,
        effect: "WITCHER.verbalCombat.ImplyEffect"
    },
    ImplyDeceit: {
        name: "WITCHER.verbalCombat.ImplyDeceit",
        skill: WITCHER.skillMap.deceit,
        effect: "WITCHER.verbalCombat.ImplyEffect"
    },
    Bribe: {
        name: "WITCHER.verbalCombat.Bribe",
        skill: WITCHER.skillMap.gambling,
        effect: "WITCHER.verbalCombat.BribeEffect"
    },
}

WITCHER.statusEffects = [
    {
        id: 'healing',
        label: 'WITCHER.statusEffects.healing',
        icon: 'icons/svg/regen.svg',
    },
    {
        id: 'buffed',
        label: 'WITCHER.statusEffects.buffed',
        icon: 'icons/svg/upgrade.svg',
    },
    {
        id: 'fire',
        label: 'WITCHER.statusEffects.fire',
        icon: 'icons/svg/fire.svg',
    },
    {
        id: 'stun',
        label: 'WITCHER.statusEffects.stun',
        icon: 'icons/svg/daze.svg',
    },
    {
        id: 'poison',
        label: 'WITCHER.statusEffects.poison',
        icon: 'icons/svg/poison.svg',
    },
    {
        id: 'prone',
        label: 'WITCHER.statusEffects.prone',
        icon: 'icons/svg/falling.svg',
    },
    {
        id: 'bleed',
        label: 'WITCHER.statusEffects.bleed',
        icon: 'icons/svg/blood.svg',
    },
    {
        id: 'freeze',
        label: 'WITCHER.statusEffects.freeze',
        icon: 'icons/svg/frozen.svg',
    },
    {
        id: 'staggered',
        label: 'WITCHER.statusEffects.staggered',
        icon: 'icons/svg/sword.svg',
    },
    {
        id: 'intoxication',
        label: 'WITCHER.statusEffects.intoxication',
        icon: 'icons/svg/tankard.svg',
    },
    {
        id: 'hallucination',
        label: 'WITCHER.statusEffects.hallucination',
        icon: 'icons/svg/terror.svg',
    },
    {
        id: 'nausea',
        label: 'WITCHER.statusEffects.nausea',
        icon: 'icons/svg/stoned.svg',
    },
    {
        id: 'suffocation',
        label: 'WITCHER.statusEffects.suffocation',
        icon: 'icons/svg/silenced.svg',
    },
    {
        id: 'blinded',
        label: 'WITCHER.statusEffects.blinded',
        icon: 'icons/svg/blind.svg',
    },
    {
        id: 'shielded',
        label: 'WITCHER.statusEffects.shielded',
        icon: 'icons/svg/mage-shield.svg',
    },
    {
        id: 'invisible',
        label: 'WITCHER.statusEffects.invisible',
        icon: 'icons/svg/invisible.svg',
    },
    {
        id: 'unconscious',
        label: 'WITCHER.statusEffects.unconscious',
        icon: 'icons/svg/unconscious.svg',
    },
    {
        id: 'grappled',
        label: 'WITCHER.statusEffects.grappled',
        icon: 'icons/svg/net.svg',
    },
    {
        id: 'flying',
        label: 'WITCHER.statusEffects.flying',
        icon: 'icons/svg/wing.svg',
    },
    {
        id: 'frightened',
        label: 'WITCHER.statusEffects.frightened',
        icon: 'icons/svg/terror.svg',
    },
    {
        id: 'aiming',
        label: 'WITCHER.statusEffects.aiming',
        icon: 'icons/svg/target.svg',
    },
    {
        id: 'deaf',
        label: 'WITCHER.statusEffects.deaf',
        icon: 'icons/svg/deaf.svg',
    },
    {
        id: 'reducedVision',
        label: 'WITCHER.statusEffects.reducedVision',
        icon: 'systems/TheWitcherTRPG/assets/images/statusEffects/visored-helm.svg',
    },
    {
        id: 'holdAction',
        label: 'WITCHER.statusEffects.holdAction',
        icon: 'systems/TheWitcherTRPG/assets/images/statusEffects/uncertainty.svg',
    },
]

WITCHER.armorEffects = [
    {
        id: 'reducedVision',
        label: 'WITCHER.statusEffects.reducedVision',
        refersStatusEffect: true,
    },
    {
        id: 'fire',
        label: 'WITCHER.armorEffects.fireResistance',
        refersStatusEffect: true,
        addsResistance: true,
    },
    {
        id: 'poison',
        label: 'WITCHER.armorEffects.poisonResistance',
        refersStatusEffect: true,
        addsResistance: true,
    },
    {
        id: 'bleed',
        label: 'WITCHER.armorEffects.bleedResistance',
        refersStatusEffect: true,
        addsResistance: true
    },
]

WITCHER.specialModifier = [
    {
        id: "wolf-strike",
        label: "WITCHER.globalModifier.specialEffect.wolfstrike",
        tags: ["attack", "strong"],
        formula: "+3"
    },
    {
        id: "armored-caster",
        label: "WITCHER.globalModifier.specialEffect.armoredCaster",
        tags: ["magic-armorencumbarance"],
        formula: "+1"
    },
    {
        id: "melee-damage",
        label: "WITCHER.globalModifier.specialEffect.meleeDamage",
        tags: ["melee-damage"],
        formula: "+1"
    }
]