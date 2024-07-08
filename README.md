# FoundryVTT system - The witcher TRPG#

Original System by TechAntho

Current Maintainers: Stexinator

Compendium by Siryphas

The system uses art by CD Project Red and R. Talsorian Games

The system uses icon from https://game-icons.net/ under https://creativecommons.org/licenses/by/3.0/

## Character Sheet ##
This Sheet represent a Player character with all of it's stats

### Skill Tab ###
This tabs allows you to roll skills and keep track of your improvement Points.
There is a color code for the skill to easily discern the trained skills (Red) and those who are not(Brown).


### Race and Profession Tab ### 
This tab is used to handle the race and profession.
It allows you to roll the professions skills by clicking on the dice of a profession skill.
You can create Items of type Race and/or profession To drag and drop in the character sheet.


### Inventory Tab ### 
This tab is used to organize different sort of items that the character is carrying.
At the top left there is a section for the currency.  In the weapon section you have the weapons.
By clicking on the name of a weapon it launches an attack with this specific weapons and will use the specified skill to make the attack.
After you have the armor section, which will help you to easily keep track you your stopping power and resistances. B, S, P, stand for resistance to geoning damage, Slashing damage and piercing damage. 
When an armor is equipped, if it contains an encumbrance value it will automatically subtract it to your REf and DEX.
At the bottom of the sheet you can see the total carrying weight 

### Magic Tab ### 
This tab is used to organize your Spell, invocations, witcher signs, rituals and hexes.
It also keeps tracks of your current stamina and Focuses

### Background Tab ### 
This tab is used to choose your origin and create your background. 
You can keep tracks of your life events, and also you can add multiple notes for your characters.  
Those could be anything, maybe notes on specific NPC that they encounter, your critical wounds, short stories in your backgrounds, etc. 

## Version History ##

### 1.043 ###
- add context menu for items
  - only one entry yet -> consume which will remove one of the item
- prepared backend data for more complex attack/damage interactions/calculations

### 1.042 ###
- add field to show total weight of stored items and carry capacity of container
- added variable stamina scaling for effects in spells
- added ability to drop Global Modifier on spell sheets
- added a consumable checkbox to items
- fix container not showing weight of stored items
- fix that adding same item would automatically store it
- re-work weight calculation
- fixed an issue with loot sheet layout

### 1.041 ###
- fix different weapon skill behaviour between browser and electron

### 1.039 ###
- added module support for weapon skills
- added detailed hands config to weapon
  - this allows to add the mechanical implications of broken arms for weapons in the future
- added dead effect (by @pedroaugustobt)
- added Crushing Force in item sheet (by @pedroaugustobt)
- added support for bear, viper and manticore witcher school
- updated compendium (by @Siryphas)
- started re-styling of components
- skill overview
- character sheet top section
- fix vigor not appear in character header (by @pedroaugustobt)
- fixed deprecation in weapon sheet
- fixed automated animations integration


### 1.038 ###
- small bug fixes (by @pedroaugustobt)
- enhancement diagrams are now displayed under diagrams (by @pedroaugustobt)
- improved ptBr translations (by @pedroaugustobt)
- fixing some deprecations
- improve support for modules => data is now loaded dynamically from the config
  - everything in verbal combat (also adding new entries)
  - skills can be assigned different attributes (this will not be reflected in the UI)
  - stats can be renamed
  - everything in critical wounds can be modified

### 1.037 ###
- small bug fixes
- fixing some deprecations

### 1.036 ###
- small bug fixes

### 1.035 ###
- global modifier can be added to spells which will activate when the spell is cast and not fumbled
  - if they are not found on the actor, the global modifier compendium will be queried
- critical wound interaction were added to context menu
  - currently all crits are treated as targeted due to the system rolling the location (this makes the severe effects a little more unlikely)

### 1.034 ###
- updated ptBr translation (thanks @pedroaugustobt)
- fixed elderfolk diagram sorting
- automated some aspects of critical wounds
  - beside broken arms, critical wounds now reduce stats, derived stats and skills
  - status of wounds are considered
  - added field for location => first step to get arms to work too

### 1.033 ###
- compendium is up-to-date => weapons and monster from compendium have their weapon skills set again
- fix diagrams not accepting associated items
- new special global modifier
  - +1 melee damage
- spells auto-roll their duration now

### 1.032 ###
- fix manual defense roll -> crit detection won't work with manual rolling

### 1.031 ###
- more backend work on global modifier
  - added first special handlings of global modifier
- first step of crit detection when using defense
- spells can now be defended against

### 1.030 ###
- deprecated active effects, use global modifier instead -> they should migrate automatically, if not open an issue
  - all dropdowns in global modifier need to be set again
  - global modifiers will be respected when using items/spells/skills
- spell templates can now be placed via preview
- non-GMs can not also drag & drop
- added vigor to global modifiers
- !!! weapons (PC and Monster) need their skills to be reset !!! -> if you don't do this they won't work 

### 1.029 ###
- fix spells cannot roll damage
- fix status effects for spells

### 1.028 ###
#### General #####
- v12 compatibility
- when using v12 armor effects are automatically applied
- added non-lethal damage to context menu
- verbal combat can now roll and apply damage

#### Equipment #####
- weapons and armors have a description field

### 1.027 ###
#### General #####
- status effects from chat cards can be applied to selected token or user character with click on status (immunities are respected)

#### Equipment #####
- enhancement items can get the same status configuration like armor/weapon
- ammunition can have weapon properties and contributes them

### 1.026 ###
#### General #####

- chat templates show the result of effect rolls instead of the roll (hover for seeing the roll)
- fixed issue with activating active effects
- fixed HP of Barbegazi
- monster immunities can be configured to contain status effects
- adrenaline and notes should work as intended again
- natural armor now applies resistances like other armor items

#### Equipment #####
- armor can be configured to have an armor specific effect
- weapons and enchantments can be configured to apply an effect

### 1.025 and older ###
#### General #####
- added custom status effects for system
- various bug fixes
- added shields for actors
- added configuration to spells for heal and shield
- effect per stamina (/STA) will automatically be calculated for you
- added investigation sheet
- unique item types (e.g. profession, race) will replace existing ones when dropping onto character
- items with same name but different types can be dragged onto the character sheet (before the second items was ignored when of a different type)

#### Monster & Loot ####
- loot sheet shows missing lootable items
- Monsters can equip armor like characters
- added academic knowledge to monsters
- added options to configure which knowledge boxes to show
- added option to ignore attributes of monsters when rolling for skills (this will ignore modifiers to attributes)

#### Equipment #####
- add container (open the container items and drag & drop items in it)
- glyphs can be added to armor
- 

#### Compendium #####
- compendium added by Siryphas

#### Code ####
- overhaul of code base
- migration to data types