// better random ints
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// room class
function Room(x, y, width, height) {
  this.x = x //topleft corner x coord
  this.y = y //topleft corner y coord
  this.width = width
  this.height = height

  // bottom right x & y coords
  this.brX = this.x + this.width
  this.brY = this.y + this.height

  this.center = [Math.floor((this.y + this.brY) / 2), Math.floor((this.x + this.brX) / 2)]

  this.intersects = function(otherRoom) {
    return (this.x <= otherRoom.brX && this.brX >= otherRoom.x
            && this.y <= otherRoom.brY && otherRoom.brY >= otherRoom.y);
  }
}

function Actor(x, y, faction, curHP, maxHP, curMP, maxMP, strength, agility, magic, equipment) {
  this.x = x
  this.y = y
  this.faction = faction
  this.curHP = curHP
  this.maxHP = maxHP
  this.curMP = curMP
  this.maxMP = maxMP
  this.strength = strength
  this.agility = agility
  this.magic = magic
  this.inventory = new Inventory()

  this.moveTo = function(x, y) {
    if (!blocksMovement(map[y][x])) {
      var other = collideWithOther(x, y);
      var isHostile = otherIsHostile(this, other)

      if (other) { // if there's a collision
        if (isHostile) { // if the other is hostile
          attackOther(this, other) // kill them
          this.y = y // move
          this.x = x
          updateActor(this) // update sprite
        }
        else { // if collision & not hostile
          return // don't move
        }
      }
      else { // no collision - just move
        this.y = y
        this.x = x
        updateActor(this)
      }
    }
  } //moveTo

  this.getEquippedItems = function() {
    var items = this.inventory.getItems()
    for (var i = 0; i < items.length; i++) {
      console.log(items[i].slot + ": " + items[i].desc)
    }
  }

  this.equipItem = function(newItem) {
    console.log("replacing: '" + this.inventory[newItem.slot].desc
      + "' with '" + newItem.desc + "'")
    // if there's an item in that slot
    if (this.inventory[newItem.slot]) {
      this.inventory[newItem.slot] = newItem
      console.log(this.inventory[newItem.slot])
    }
  }

}

function Inventory(head, chest, gloves, legs, boots, amulet, ring1, ring2, mainHand, offHand) {
  this.head = head;
  this.chest = chest;
  this.gloves = gloves;
  this.legs = legs;
  this.boots = boots;
  this.amulet = amulet;
  this.ring1 = ring1;
  this.ring2 = ring2;
  this.mainHand = mainHand;
  this.offHand = offHand;

  this.getItems = function() {
    var items = [this.head, this.chest, this.gloves, this.legs, this.boots,
    this.amulet, this.ring1, this.ring2, this.mainHand, this.offHand]
    return items
  }
}

function Item(desc, slot, armour, strength, magic, agility, damage, speed, ranged) {
  this.desc = desc;
  this.slot = slot;
  this.armour = armour || 0;
  this.strength = strength || 0;
  this.magic = magic || 0;
  this.agility = agility || 0;
  this.damage = damage || null;
  this.speed = speed || null;
  this.ranged = ranged || null;
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