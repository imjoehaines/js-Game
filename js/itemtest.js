var ItemTest = function() {};
ItemTest.prototype = {
    preload: function() {

    },

    create: function() {

        //desc, slot, armour, strength, magic, agility, damage, speed

        var a = new Item("A Fedora", "head", 2);
        var b = new Item("magic robe of looks fukken rad", "chest", 2);
        var c = new Item("Mittens", "gloves", 2);
        var d = new Item("Meggings are cool, ok", "legs", 2);
        var e = new Item("William's Wish Wellingtons", "boots", 0, 0, 10, 0);
        var f = new Item("A Plain Chain", "amulet", 2);
        var g = new Item("A Red Ring", "ring1", 2);
        var h = new Item("Another Ring", "ring2", 2);
        var i = new Item("Sword of Slashing", "mainHand", 2, 0, 0, 0, 10, 5, false);
        var j = new Item("Tower Shield", "offHand", 2);
        var items = [a, b, c, d, e, f, g, h, i, j];
        mandude = new Actor(1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
        var mandudeInv = new Inventory(a, b, c, d, e, f, g, h, i, j);
        mandude.inventory = mandudeInv;

        mandude.getEquippedItems();

        var k = new Item("A Sheep's Face", "head");
        mandude.equipItem(k);

        var l = new Item("A Massive Axe", "mainHand");
        mandude.equipItem(l);

        mandude.getEquippedItems();
    },

    update: function() {

    },

};