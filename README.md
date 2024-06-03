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