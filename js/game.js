// better random ints
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onload = function() {
    hpDisplay = document.getElementById("hpDisp");
    mpDisplay = document.getElementById("mpDisp");
    armDisplay = document.getElementById("armDisp");
    strDisplay = document.getElementById("strDisp");
    agiDisplay = document.getElementById("agiDisp");
    magDisplay = document.getElementById("magDisp");

    inventoryScreen = document.getElementById("inv-container");
    invTooltip = document.getElementById("inv-item-tooltip");
    invHead = document.getElementById("inv-item-head");
    invSlot = document.getElementById("inv-item-slot");
    invDamage = document.getElementById("inv-item-damage");
    invArmour = document.getElementById("inv-item-armour");
    invHealth = document.getElementById("inv-item-health");
    invMana = document.getElementById("inv-item-mana");
    invStrength = document.getElementById("inv-item-strength");
    invAgility = document.getElementById("inv-item-agility");
    invMagic = document.getElementById("inv-item-magic");
    invCrit = document.getElementById("inv-item-crit");
    invSpeed = document.getElementById("inv-item-speed");

    invSlotHead = document.getElementById("inv-slot-head");
    invSlotChest = document.getElementById("inv-slot-chest");
    invSlotHands = document.getElementById("inv-slot-hands");
    invSlotLegs = document.getElementById("inv-slot-legs");
    invSlotFeet = document.getElementById("inv-slot-feet");

    itemSlotElements = {
        "head": document.getElementById("inv-slot-head"),
        "chest": document.getElementById("inv-slot-chest"),
        "hands": document.getElementById("inv-slot-hands"),
        "legs": document.getElementById("inv-slot-legs"),
        "feet": document.getElementById("inv-slot-feet"),
        "amulet": document.getElementById("inv-slot-amulet"),
        "ring": document.getElementById("inv-slot-ring"),
        "belt": document.getElementById("inv-slot-belt"),
        "weapon": document.getElementById("inv-slot-weapon"),
        "shield": document.getElementById("inv-slot-shield")
    };

    invSlotAmulet = document.getElementById("inv-slot-amulet");
    invSlotRing = document.getElementById("inv-slot-ring");
    invSlotBelt = document.getElementById("inv-slot-belt");
    invSlotWeapon = document.getElementById("inv-slot-weapon");
    invSlotShield = document.getElementById("inv-slot-shield");

    jsGame = new Phaser.Game(800, 640, Phaser.AUTO, "gameContainer");
    playStateInfo = {};
    fightStateInfo = {};

    // Game States
    jsGame.state.add("menu", MenuState);
    jsGame.state.add("play", PlayState);
    jsGame.state.add("fight", FightState);

    jsGame.state.start("menu");
};
