####js Game ideas

* Rogue-like
* control a party that is randomly created at new game
* races with different starting stats _**???**_
* classes with different skills
 * Warrior
 * Mage
 * Archer
* warriors > mages > archers > warriors bonus dmg  _**???**_
* stats:
  * strength - boosts base attack damage and health
  * agi - boosts speed & crit
  * magic  - boosts mana, gives extra spells
* every stat should be useful for every character
 * warrior:
    * strength: high damage, low speed & crit
    * agility: high crit & speed, lower damage
    * magic: extra "enchantment" damage - e.g. +x% fire/water/lightning damage
 * mage:
    * strength: boosts fire skills - lower mana pool but high damage
    * agility: boosts air skills - high magic crit and speed but low damage & mana
    * magic: boosts water skills -  high mana & extra spells but lower base damage and crit %
 * Archer:
    * strength: high damage
    * agi: high speed & crit
    * mana: extra enchantment damage
* 4 damage types:
 * Physical - deals damage based on strength, mitigated by armour
 * Magic Types:
    * Fire - deals large damage + DoT effects - damage based off strength
    * Air - high speed and crit - damage based off agility
    * Water - deals less damage but more utility + mana - damage based off magic
 * Fire > Air > Water > Fire
* turn based combat
 * pokemon-esque
 * limited number of skills per party member (3/4/6?)
 * turn order based on speed which is derived from agility
   * if speeds are equal - archers are faster than mages are faster than warriors
   * if same classes - randomise weighted towards one with higher total stats (e.g. 10str, 15agi, 10mag roll 1-20, 15str, 15agi, 15mag rolls 10-20)
 * **not strict turns!**
   * i.e. child of light ish combat
   * not player then ai then player etc...
   * based on speed characters will be ranked
   * character with 100 speed will attack twice in the same amount of time a character with 50 speed attacks once
