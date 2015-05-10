function Inventory(items) {
    this.head = items.head;
    this.chest = items.chest;
    this.hands = items.hands;
    this.legs = items.legs;
    this.feet = items.feet;
    this.amulet = items.amulet;
    this.ring = items.ring;
    this.belt = items.belt;
    this.weapon = items.weapon;
    this.shield = items.shield;
}

Inventory.prototype.getItems = function() {
    return [
        this.head, this.chest, this.hands, this.legs, this.feet,
        this.amulet, this.ring, this.belt, this.weapon, this.shield
    ];
};
