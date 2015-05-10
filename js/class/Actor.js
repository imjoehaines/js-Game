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

    if (this.inventory) {
        // update stats as soon as actor is made
        this.updateStats();
        // set current HP & MP to new maximum
        this.curHP = this.totalMaxHP;
        this.curMP = this.totalMaxMP;
    }
}

Actor.prototype.moveTo = function(x, y) {
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
};

Actor.prototype.getEquippedItems = function() {
    var items = this.inventory.getItems();
    for (var i = 0; i < items.length; i++) {
        console.log(items[i].slot + ": " + items[i].name);
    }
};

Actor.prototype.equipItem = function(newItem) {
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

Actor.prototype.updateStats = function() {
    var items = this.inventory.getItems();

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
