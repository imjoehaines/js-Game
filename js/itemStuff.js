var Items = {
    "Head": {
        "Metallic": ["Helm", "Helmet", "Great Helm", "Armet", "Barbute", "Bascinet", "Hounskull", "Sallet", "Tiara", "Crown"],
        "Non-Metallic": ["Hat", "Hood", "Wizard's Hat", "Cap"]
    },
    "Chest": {
        "Metallic": ["Breastplate", "Hauberk", "Cuirass"],
        "Non-Metallic": ["Surcoat", "Robe", "Coat", "Shirt", "Overcoat", "Jacket", "Dress"]
    },
    "Hands": {
        "Metallic": ["Gauntlets", "Demi-Guants", "Bracers"],
        "Non-Metallic": ["Gloves", "Fingerless Gloves", "Mittens"]
    },
    "Legs": {
        "Metallic": ["Greaves", "Poleyns", "Faulds", "Tassets", "Cuisses"],
        "Non-Metallic": ["Leggings", "Trousers", "Shorts", "Loincloth"]
    },
    "Feet": {
        "Metallic": ["Boots", "Sabatons"],
        "Non-Metallic": ["Boots", "Shoes", "Moccasins", "Slippers"]
    },
        "Amulet": {
        "Metallic": ["Chain", "Necklace", "Torc", "Charm"]
    },
    "Ring": {
        "Metallic": ["Ring", "Hoop", "Loop"]
    },
    "Belt": {
        "Metallic": ["Belt", "Girdle", "Binding", "Waistband"],
        "Non-Metallic": ["Belt", "Sash", "Cummerbund", "Cincture"]
    },
    "Weapon": {
        "Metallic": ["Sword", "Axe", "Rapier", "Mace", "Morningstar", "Hatchet", "Cutlass"]
    },
    "Shield": {
        "Metallic": ["Shield", "Buckler", "Kite Shield"]
    }
};

var qualityPrefixes = [
    "Simple",
    "Common",
    "Fine",
    "Rare",
    "Mythical"
];

var suffixes = {
    "Simple": ["of Terribility", "of Simpleness"],
    "Common": ["of Commonitude", "of Belongsinthebin-shire"],
    "Fine": ["of Mediocrity", "of Couldbeworseiguess-ville"],
    "Rare": ["of Nowwe'retalking-ton", "of Decentness"],
    "Mythical": ["of Propergoodness", "of 'DAMN SON'"]
};

var metalTypes = [
    "Steel",
    "Iron",
    "Bronze",
    "Copper",
    "Silver"
];
var nonMetalTypes = [
    "Leather",
    "Cloth",
    "Cotton",
    "Burlap",
    "Cowhide",
    "Deerhide",
    "Goatskin"
];

var magicItemTypes = [
    "Amulet",
    "Ring"
];
  
var weaponTypes = [
    "Main Hand",
    "Shield",
    "Two-Hand",
    "Staff",
    "Longbow",
    "Shortbow",
    "Crossbow"
];

var randomRanges = {
    "Armour": {
        "Simple": {
            "Head": [0, 1],
            "Hands": [0, 1],
            "Feet": [0, 1],
            "Legs": [0, 3],
            "Chest": [0, 4],
            "Amulet": [0,0],
            "Ring": [0,0],
            "Belt": [0,0],
            "Weapon": [0,0],
            "Shield": [1, 2]
        },
        "Common": {
            "Head": [1, 3],
            "Hands": [1, 3],
            "Feet": [1, 3],
            "Legs": [2, 6],
            "Chest": [2, 7],
            "Amulet": [0,0],
            "Ring": [0,0],
            "Belt": [0,0],
            "Weapon": [0,0],
            "Shield": [4, 6]
        },
        "Fine": {
            "Head": [2, 5],
            "Hands": [2, 5],
            "Feet": [2, 5],
            "Legs": [4, 12],
            "Chest": [5, 14],
            "Amulet": [0,0],
            "Ring": [0,0],
            "Belt": [0,0],
            "Weapon": [0,0],
            "Shield": [6, 12]
        },
        "Rare": {
            "Head": [4, 12],
            "Hands": [4, 12],
            "Feet": [4, 12],
            "Legs": [10, 20],
            "Chest": [10, 25],
            "Amulet": [0,0],
            "Ring": [0,0],
            "Belt": [0,0],
            "Weapon": [0,0],
            "Shield": [12, 20]
        },
        "Mythical": {
            "Head": [10, 25],
            "Hands": [10, 25],
            "Feet": [10, 25],
            "Legs": [20, 55],
            "Chest": [20, 70],
            "Amulet": [0,0],
            "Ring": [0,0],
            "Belt": [0,0],
            "Weapon": [0,0],
            "Shield": [30, 70]
        },
    },
    "HealthMana": {
        "Simple": [0, 1],
        "Common": [1, 5],
        "Fine": [5, 10],
        "Rare": [10, 20],
        "Mythical": [20, 40]
    },
    "SAM": {
        "Simple": [0, 1],
        "Common": [0, 2],
        "Fine": [1, 5],
        "Rare": [3, 10],
        "Mythical": [5, 20]
    },
    "Special": {
        "Simple": [0, 0],
        "Common": [0, 0],
        "Fine": [0, 2],
        "Rare": [0, 10],
        "Mythical": [5, 20]
    },
    "Damage": {
        "Simple": [1, 3],
        "Common": [2, 5],
        "Fine": [4, 10],
        "Rare": [10, 20],
        "Mythical": [20, 30]
    }
};

var itemList = {
    "Head": getRandomItemType("Head"), 
    "Chest": getRandomItemType("Chest"),
    "Hands": getRandomItemType("Hands"),
    "Legs": getRandomItemType("Legs"),
    "Feet": getRandomItemType("Feet"),

    "Amulet": getRandomItemType("Amulet"),
    "Ring": getRandomItemType("Ring"),
    "Belt": getRandomItemType("Belt"),
    "Weapon": getRandomItemType("Weapon"),
    "Shield": getRandomItemType("Shield")
};


function loadInvTooltip(slot) {
    invTooltip.style.display = "block";
    var item = player.inventory[slot];

    invTooltip.className = "tooltip " + item.quality.toLowerCase();

    invHead.innerHTML = item.name;
    invSlot.innerHTML = item.slot;

    if (item.damage > 0)
        invDamage.innerHTML = "<em>+" + item.damage + "</em> Damage";
    else 
        invDamage.innerHTML = "";

    if (item.armour > 0)
        invArmour.innerHTML = "<em>+" + item.armour + "</em> Armour";
    else 
        invArmour.innerHTML = "";

    if (item.health > 0)
        invHealth.innerHTML = "<em>+" + item.health + "</em> Health";
    else 
        invHealth.innerHTML = "";

    if (item.mana > 0)
        invMana.innerHTML = "<em>+" + item.mana + "</em> Mana";
    else 
        invMana.innerHTML = "";

    if (item.strength > 0)
        invStrength.innerHTML = "<em>+" + item.strength + "</em> Strength";
    else 
        invStrength.innerHTML = "";

    if (item.agility > 0)
        invAgility.innerHTML = "<em>+" + item.agility + "</em> Agility";
    else 
        invAgility.innerHTML = "";

    if (item.magic > 0)
        invMagic.innerHTML = "<em>+" + item.magic + "</em> Magic";
    else 
        invMagic.innerHTML = "";

    if (item.crit > 0)
        invCrit.innerHTML = "<em>+" + item.crit + "% Critical Hit Chance</em>";
    else
        invCrit.innerHTML = "";

    if (item.speed > 0)
        invSpeed.innerHTML = "<em>+" + item.speed + "% Speed</em>";
    else
        invSpeed.innerHTML = "";
}

function makeItemName(metallic) {
    var quality, material;
    var roll = randomBetween(0, 100);

    if (roll >= 95)
        quality = "Mythical";
    else if (roll >= 85)
        quality = "Rare";
    else if (roll >= 70)
        quality = "Fine";
    else if (roll >= 40)
        quality = "Common";
    else
        quality = "Simple";

    var suffix = suffixes[quality][randomBetween(0, suffixes[quality].length - 1)];

    if (metallic == "Metallic")
        material = metalTypes[randomBetween(0, metalTypes.length - 1)];
    else
        material = nonMetalTypes[randomBetween(0, nonMetalTypes.length - 1)];

    return [quality, suffix, material];
}

function makeItemAttributes(quality, slot) {
    var armour, crit, speed, damage;

    var range = randomRanges.Armour[quality][slot];
    if (quality == "Mythical" || quality == "Rare") {
        var roll1 = randomBetween(range[0], range[1]);
        var roll2 = randomBetween(range[0], range[1]);
        armour = Math.max(roll1, roll2);
    }
    else {
        armour = randomBetween(range[0], range[1]);
    }

    var hmRange = randomRanges.HealthMana[quality];
    var samRange = randomRanges.SAM[quality];
    var specRange = randomRanges.Special[quality];
    var damageRange = randomRanges.Damage[quality];

    var health = randomBetween(hmRange[0], hmRange[1]);
    var mana = randomBetween(hmRange[0], hmRange[1]);
    var strength = randomBetween(samRange[0], samRange[1]);
    var agility = randomBetween(samRange[0], samRange[1]);
    var magic = randomBetween(samRange[0], samRange[1]);

    if (quality == "Fine") {
        if (randomBetween(1,100) > 75)
            crit = randomBetween(specRange[0], specRange[1]);
        if (randomBetween(1,100) > 75)
            speed = randomBetween(specRange[0], specRange[1]);
    }
    else if (quality == "Rare") {
        if (randomBetween(1, 100) > 33)
            crit = randomBetween(specRange[0], specRange[1]);
        if (randomBetween(1, 100) > 33)
            speed = randomBetween(specRange[0], specRange[1]);
    }
    else {
        crit = randomBetween(specRange[0], specRange[1]);
        speed = randomBetween(specRange[0], specRange[1]);
    }

    if (slot == "Weapon")
        damage = randomBetween(damageRange[0], damageRange[1]);
    else
        damage = 0;

    return [armour, health, mana, strength, agility, magic, crit, speed, damage];
}

function getRandomItemType(givenSlot, givenMetallic) {
    if (givenSlot == "random")
        givenSlot = undefined;
    var slot = givenSlot || Object.keys(Items)[randomBetween(0, Object.keys(Items).length - 1)];

    var rndMetallic = "Non-Metallic";
    if (randomBetween(0, 1) === 0)
        rndMetallic = "Metallic";
    if (slot == "Weapon" || slot == "Shield" || slot == "Amulet" || slot == "Ring")
        rndMetallic = "Metallic";

    var metallic = givenMetallic || rndMetallic;

    var item = Items[slot][metallic][randomBetween(0, Items[slot][metallic].length - 1)];

    var tempArr = makeItemName(metallic);
    var quality = tempArr[0];
    var suffix = tempArr[1];
    var material = tempArr[2];

    var attr = makeItemAttributes(quality, slot);
    var armour = attr[0];
    var health = attr[1];
    var mana = attr[2];
    var strength = attr[3];
    var agility = attr[4];
    var magic = attr[5];
    var crit = attr[6];
    var speed = attr[7];
    var damage = attr[8];

    var newItem = new Item(slot, quality, material, item, suffix, armour, health, mana, strength, agility, magic, crit, speed, damage);

    return newItem;
}

function setInvSlotBackgrounds(inventory) {
    for (var slot in inventory) {
        if (typeof(inventory[slot]) == "object") {
            console.log(slot, itemSlotElements[slot])
            itemSlotElements[slot].className = "inv-" + inventory[slot].quality.toLowerCase();
        }
    }
}
