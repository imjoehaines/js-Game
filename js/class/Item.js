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
