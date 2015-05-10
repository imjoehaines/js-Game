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

}

Inventory.prototype.getItems = function() {
    return [
        this.head, this.chest, this.hands, this.legs, this.feet,
        this.amulet, this.ring, this.belt, this.weapon, this.shield
    ];
};
