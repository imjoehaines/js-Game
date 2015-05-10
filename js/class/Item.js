function Item(options) {
    this.slot = options.slot;
    this.quality = options.quality;
    this.material = options.material;
    this.item = options.item;
    this.suffix = options.suffix;

    this.armour = options.armour;
    this.health = options.health;
    this.mana = options.mana;
    this.strength = options.strength;
    this.agility = options.agility;
    this.magic = options.magic;
    this.crit = options.crit;
    this.speed = options.speed;
    this.damage = options.damage;

    this.name = this.quality + " " + this.material + " " + this.item + " " + this.suffix;
}
