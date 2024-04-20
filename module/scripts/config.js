export const witcher = {};

witcher.homelands = {
    aedirn: "WITCHER.Homelands.aedirn",
    angren: "WITCHER.Homelands.angren",
    cidaris: "WITCHER.Homelands.cidaris",
    cintra: "WITCHER.Homelands.cintra",
    dolblathanna:  "WITCHER.Homelands.dolblathanna",
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

witcher.statTypes = {
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

witcher.substanceTypes = {
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

witcher.Availability = {
    Everywhere: "WITCHER.Item.AvailabilityEverywhere",
    Common: "WITCHER.Item.AvailabilityCommon",
    Poor: "WITCHER.Item.AvailabilityPoor",
    Rare: "WITCHER.Item.AvailabilityRare",
}

witcher.Concealment = {
    T: "WITCHER.Item.Tiny",
    S: "WITCHER.Item.Small",
    L: "WITCHER.Item.Large",
    NA: "WITCHER.Item.CantHide",
}

witcher.MonsterTypes = {
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

witcher.CritGravity = {
    Simple: "WITCHER.CritWound.Simple",
    Complex: "WITCHER.CritWound.Complex",
    Difficult: "WITCHER.CritWound.Difficult",
    Deadly: "WITCHER.CritWound.Deadly",
};

witcher.CritGravityDefaultEffect = {
    Simple: "SimpleCrackedJaw",
    Complex: "ComplexMinorHeadWound",
    Difficult: "DifficultSkullFracture",
    Deadly: "DeadlyDecapitated",
};

witcher.CritMod = {
    None: "WITCHER.CritWound.None",
    Stabilized: "WITCHER.CritWound.Stabilized",
    Treated: "WITCHER.CritWound.Treated",
};

witcher.CritDescription = {
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
};

witcher.CritModDescription = {
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
};

witcher.CritSimple = {
    SimpleCrackedJaw: "WITCHER.CritWound.Name.SimpleCrackedJaw",
    SimpleDisfiguringScar: "WITCHER.CritWound.Name.SimpleDisfiguringScar",
    SimpleCrackedRibs: "WITCHER.CritWound.Name.SimpleCrackedRibs",
    SimpleForeignObject: "WITCHER.CritWound.Name.SimpleForeignObject",
    SimpleSprainedArm: "WITCHER.CritWound.Name.SimpleSprainedArm",
    SimpleSprainedLeg: "WITCHER.CritWound.Name.SimpleSprainedLeg",
};

witcher.CritComplex = {
    ComplexMinorHeadWound: "WITCHER.CritWound.Name.ComplexMinorHeadWound",
    ComplexLostTeeth: "WITCHER.CritWound.Name.ComplexLostTeeth",
    ComplexRupturedSpleen: "WITCHER.CritWound.Name.ComplexRupturedSpleen",
    ComplexBrokenRibs: "WITCHER.CritWound.Name.ComplexBrokenRibs",
    ComplexFracturedArm: "WITCHER.CritWound.Name.ComplexFracturedArm",
    ComplexFracturedLeg: "WITCHER.CritWound.Name.ComplexFracturedLeg",
};

witcher.CritDifficult = {
    DifficultSkullFracture: "WITCHER.CritWound.Name.DifficultSkullFracture",
    DifficultConcussion: "WITCHER.CritWound.Name.DifficultConcussion",
    DifficultTornStomach: "WITCHER.CritWound.Name.DifficultTornStomach",
    DifficultSuckingChestWound: "WITCHER.CritWound.Name.DifficultSuckingChestWound",
    DifficultCompoundArmFracture: "WITCHER.CritWound.Name.DifficultCompoundArmFracture",
    DifficultCompoundLegFracture: "WITCHER.CritWound.Name.DifficultCompoundLegFracture",
};

witcher.CritDeadly = {
    DeadlyDecapitated: "WITCHER.CritWound.Name.DeadlyDecapitated",
    DeadlyDamagedEye: "WITCHER.CritWound.Name.DeadlyDamagedEye",
    DeadlyHearthDamage: "WITCHER.CritWound.Name.DeadlyHearthDamage",
    DeadlySepticShock: "WITCHER.CritWound.Name.DeadlySepticShock",
    DeadlyDismemberedArm: "WITCHER.CritWound.Name.DeadlyDismemberedArm",
    DeadlyDismemberedLeg: "WITCHER.CritWound.Name.DeadlyDismemberedLeg",
};

witcher.meleeSkills = ["Brawling", "Melee", "Small Blades", "Staff/Spear", "Swordsmanship", "Athletics"];
witcher.rangedSkills = ["Athletics", "Archery", "Crossbow"];

witcher.statMap = {
    int: {
        origin: "stats",
        name: "int",
        label: "WITCHER.StInt"
    },
    ref: {
        origin: "stats",
        name: "ref",
        label: "WITCHER.StRef"
    },
    dex: {
        origin: "stats",
        name: "dex",
        label: "WITCHER.StDex"
    },
    body: {
        origin: "stats",
        name: "body",
        label: "WITCHER.StBody"
    },
    spd: {
        origin: "stats",
        name: "spd",
        label: "WITCHER.StSpd"
    },
    emp: {
        origin: "stats",
        name: "emp",
        label: "WITCHER.StEmp"
    },
    cra: {
        origin: "stats",
        name: "cra",
        label: "WITCHER.StCra"
    },
    will: {
        origin: "stats",
        name: "will",
        label: "WITCHER.StWill"
    },
    luck: {
        origin: "stats",
        name: "luck",
        label: "WITCHER.StLuck"
    }, 

    stun: {
        origin: "coreStats"
    },
    run: {
        origin: "coreStats"
    },
    leap: {
        origin: "coreStats"
    },
    enc: {
        origin: "coreStats"
    },
    rec: {
        origin: "coreStats"
    },
    woundTreshold: {
        origin: "coreStats"
    },

    hp: {
        origin: "derivedStats"
    },
    sta: {
        origin: "derivedStats"
    },
    resolve: {
        origin: "derivedStats"
    },
    focus: {
        origin: "derivedStats"
    },

    reputation: {
        origin: ""
    }
}

witcher.skillMap = {
    awareness: {
       attribute: witcher.statMap.int,
       label: "WITCHER.SkIntAwareness",
       name: "awareness",
    },
    business: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntBusiness",
        name: "business",
    },
    deduction: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntDeduction",
        name: "deduction",
    },
    education: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntEducation",
        name: "education",
    },
    commonsp: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntCommon",
        name: "commonsp",
    },
    eldersp: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntElder",
        name: "eldersp",
    },
    dwarven: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntDwarven",
        name: "dwarven",
    },
    monster: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntMonster",
        name: "monster",
    },
    socialetq: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntSocialEt",
        name: "socialetq",
    },
    streetwise: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntStreet",
        name: "streetwise",
    },
    tactics: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntTactics",
        name: "tactics",
    },
    teaching: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntTeaching",
        name: "teaching",
    },
    wilderness: {
        attribute: witcher.statMap.int,
        label: "WITCHER.SkIntWilderness",
        name: "wilderness",
    },

    brawling: {
        attribute: witcher.statMap.ref,
        label: "WITCHER.SkRefBrawling",
        name: "brawling",
    },
    dodge: {
        attribute: witcher.statMap.ref,
        label: "WITCHER.SkRefDodge",
        name: "dodge",
    },
    melee: {
        attribute: witcher.statMap.ref,
        label: "WITCHER.SkRefMelee",
        name: "melee",
    },
    riding: {
        attribute: witcher.statMap.ref,
        label: "WITCHER.SkRefRiding",
        name: "riding",
    },
    sailing: {
        attribute: witcher.statMap.ref,
        label: "WITCHER.SkRefSailing",
        name: "sailing",
    },
    smallblades: {
        attribute: witcher.statMap.ref,
        label: "WITCHER.SkRefSmall",
        name: "smallblades",
    },
    staffspear: {
        attribute: witcher.statMap.ref,
        label: "WITCHER.SkRefStaff",
        name: "staffspear",
    },
    swordsmanship: {
        attribute: witcher.statMap.ref,
        label: "WITCHER.SkRefSwordsmanship",
        name: "swordsmanship",
    },

    courage: {
        attribute: witcher.statMap.will,
        label: "WITCHER.SkWillCourage",
        name: "courage",
    },
    hexweave: {
        attribute: witcher.statMap.will,
        label: "WITCHER.SkWillHex",
        name: "hexweave",
    },
    intimidation: {
        attribute: witcher.statMap.will,
        label: "WITCHER.SkWillIntim",
        name: "intimidation",
    },
    spellcast: {
        attribute: witcher.statMap.will,
        label: "WITCHER.SkWillSpellcast",
        name: "spellcast",
    },
    resistmagic: {
        attribute: witcher.statMap.will,
        label: "WITCHER.SkWillResistMag",
        name: "resistmagic",
    },
    resistcoerc: {
        attribute: witcher.statMap.will,
        label: "WITCHER.SkWillResistCoer",
        name: "resistcoerc",
    },
    ritcraft: {
        attribute: witcher.statMap.will,
        label: "WITCHER.SkWillRitCraft",
        name: "ritcraft",
    },

    archery: {
        attribute: witcher.statMap.dex,
        label: "WITCHER.SkDexArchery",
        name: "archery",
    },
    athletics: {
        attribute: witcher.statMap.dex,
        label: "WITCHER.SkDexAthletics",
        name: "athletics",
    },
    crossbow: {
        attribute: witcher.statMap.dex,
        label: "WITCHER.SkDexCrossbow",
        name: "crossbow",
    },
    sleight: {
        attribute: witcher.statMap.dex,
        label: "WITCHER.SkDexSleight",
        name: "sleight",
    },
    stealth: {
        attribute: witcher.statMap.dex,
        label: "WITCHER.SkDexStealth",
        name: "stealth",
    },

    alchemy: {
        attribute: witcher.statMap.cra,
        label: "WITCHER.SkCraAlchemy",
        name: "alchemy",
    },
    crafting: {
        attribute: witcher.statMap.cra,
        label: "WITCHER.SkCraCrafting",
        name: "crafting",
    },
    disguise: {
        attribute: witcher.statMap.cra,
        label: "WITCHER.SkCraDisguise",
        name: "disguise",
    },
    firstaid: {
        attribute: witcher.statMap.cra,
        label: "WITCHER.SkCraAid",
        name: "firstaid",
    },
    forgery: {
        attribute: witcher.statMap.cra,
        label: "WITCHER.SkCraForge",
        name: "forgery",
    },
    picklock: {
        attribute: witcher.statMap.cra,
        label: "WITCHER.SkCraPick",
        name: "picklock",
    },
    trapcraft: {
        attribute: witcher.statMap.cra,
        label: "WITCHER.SkCraTrapCraft",
        name: "trapcraft",
    },

    physique: {
        attribute: witcher.statMap.body,
        label: "WITCHER.SkBodyPhys",
        name: "physique",
    },
    endurance: {
        attribute: witcher.statMap.body,
        label: "WITCHER.SkBodyEnd",
        name: "endurance",
    },

    charisma: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpCharisma",
        name: "charisma",
    },
    deceit: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpDeceit",
        name: "deceit",
    },
    finearts: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpArts",
        name: "finearts",
    },
    gambling: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpGambling",
        name: "gambling",
    },
    grooming: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpGrooming",
        name: "grooming",
    },
    perception: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpHumanPerc",
        name: "perception",
    },
    leadership: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpLeadership",
        name: "leadership",
    },
    persuasion: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpPersuasion",
        name: "persuasion",
    },
    performance: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpPerformance",
        name: "performance",
    },
    seduction: {
        attribute: witcher.statMap.emp,
        label: "WITCHER.SkEmpSeduction",
        name: "seduction",
    },
}