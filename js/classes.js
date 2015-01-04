// better random ints
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// room class
function Room(x, y, width, height) {
    this.x = x; //topleft corner x coord
    this.y = y; //topleft corner y coord
    this.width = width;
    this.height = height;

    // bottom right x & y coords
    this.brX = this.x + this.width;
    this.brY = this.y + this.height;

    this.center = [Math.floor((this.y + this.brY) / 2), Math.floor((this.x + this.brX) / 2)];

    this.intersects = function(otherRoom) {
        return (this.x <= otherRoom.brX && this.brX >= otherRoom.x &&
            this.y <= otherRoom.brY && otherRoom.brY >= otherRoom.y);
    };
}

function Actor(x, y, faction, curHP, baseMaxHP, curMP, baseMaxMP, strength, agility, magic, inventory) {
    this.x = x;
    this.y = y;
    this.faction = faction;
    this.curHP = curHP;
    this.baseMaxHP = baseMaxHP;
    this.curMP = curMP;
    this.baseMaxMP = baseMaxMP;
    this.strength = strength;
    this.agility = agility;
    this.magic = magic;
    this.inventory = inventory;

    this.totalStrength = strength;
    this.totalAgility = agility;
    this.totalMagic = magic;
    this.armour = 0;
    this.totalMaxHP = baseMaxHP;
    this.totalMaxMP = baseMaxMP;

    this.damage = strength;

    this.moveTo = function(x, y) {
        if (!blocksMovement(map[y][x])) {
            var other = collideWithOther(x, y);
            var isHostile = otherIsHostile(this, other);

            if (other) { // if there's a collision
                if (isHostile) { // if the other is hostile
                    attackOther(this, other); // kill them
                    this.y = y; // move
                    this.x = x;
                    updateActor(this); // update sprite
                } else { // if collision & not hostile
                    return; // don't move
                }
            } else { // no collision - just move
                this.y = y;
                this.x = x;
                updateActor(this);
            }
        }
    }; //moveTo

    // only have inventory functions if the actor has an inventory
    if (this.inventory) {
        this.getEquippedItems = function() {
            var items = this.inventory.getItems();
            for (var i = 0; i < items.length; i++) {
                console.log(items[i].slot + ": " + items[i].name);
            }
        };

        this.equipItem = function(newItem) {
            var oldItem = this.inventory[newItem.slot.toLowerCase()];

            this.totalStrength = this.totalStrength - oldItem.strength + newItem.strength;
            this.totalAgility  = this.totalAgility  - oldItem.agility  + newItem.agility;
            this.totalMagic    = this.totalMagic    - oldItem.magic    + newItem.magic;
            this.armour        = this.armour        - oldItem.armour   + newItem.armour;
            this.totalMaxHP    = this.totalMaxHP    - oldItem.health   + newItem.health;
            this.totalMaxMP    = this.totalMaxMP    - oldItem.mana     + newItem.mana;
            this.damage        = this.damage        - oldItem.damage   + newItem.damage;

            this.inventory[newItem.slot.toLowerCase()] = newItem;
            // update inventory screen backgrounds
            setInvSlotBackgrounds(this.inventory);
        };

        this.updateStats = function() {
            var items = this.inventory.getItems();
            console.log(items)
            var strengthFromItems = 0,
                agilityFromItems = 0,
                magicFromItems = 0,
                armourFromItems = 0,
                healthFromItems = 0,
                manaFromItems = 0,
                damageFromItems = 0;

            for (var i = items.length - 1; i >= 0; i--) {
                strengthFromItems += items[i].strength;
                agilityFromItems += items[i].agility;
                magicFromItems += items[i].magic;

                armourFromItems += items[i].armour;
                healthFromItems += items[i].health;
                manaFromItems += items[i].mana;

                damageFromItems += items[i].damage;
            }

            this.totalStrength = this.strength + strengthFromItems;
            this.totalAgility = this.agility + agilityFromItems;
            this.totalMagic = this.magic + magicFromItems;

            this.armour = armourFromItems;
            this.totalMaxHP = this.baseMaxHP + healthFromItems;
            this.totalMaxMP = this.baseMaxMP + manaFromItems;
            // set damage to the new damage value
            this.damage = this.totalStrength + damageFromItems;

        };

        // update stats as soon as actor is made
        this.updateStats();
        // set current HP & MP to new maximum
        this.curHP = this.totalMaxHP;
        this.curMP = this.totalMaxMP;
    }

}

function Inventory(head, chest, hands, legs, feet, amulet, ring, belt, weapon, shield) {
    this.head = head;
    this.chest = chest;
    this.hands = hands;
    this.legs = legs;
    this.feet = feet;
    this.amulet = amulet;
    this.ring = ring;
    this.belt = belt;
    this.weapon = weapon;
    this.shield = shield;

    this.getItems = function() {
        return [
            this.head, this.chest, this.hands, this.legs, this.feet,
            this.amulet, this.ring, this.belt, this.weapon, this.shield
        ];
    };
}

function Item(slot, quality, material, item, suffix, armour, health, mana, strength, agility, magic, crit, speed, damage) {
    this.slot = slot;
    this.quality = quality;
    this.material = material;
    this.item = item;
    this.suffix = suffix;

    this.name = this.quality + " " + this.material + " " + this.item + " " + this.suffix;

    this.armour = armour;
    this.health = health;
    this.mana = mana;
    this.strength = strength;
    this.agility = agility;
    this.magic = magic;
    this.crit = crit;
    this.speed = speed;

    this.damage = damage;
}

/*    for(var i = 0; i < this.equipment.length; i ++) {
      // if there's already an item in the slot, replace it
      if(this.equipment[i].slot == newItem.slot) {
        this.equipment[i] = newItem
      }
      // if the item is a 2handed weapon, remove the main- and off-hand
      // items and equip the new one
      else if(newItem.slot == "2hand" && (this.equipment[i].slot == "main-hand"
        || this.equipment[i].slot == "off-hand")) {
        this.equipment[i] = 1
        this.equipment.push(newItem)
      }
        console.log(i + " | " + this.equipment[i].slot + ": " + this.equipment[i].desc)
    }
*/