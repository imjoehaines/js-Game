var TileSize = 32;
var NoColumns = 1600 / TileSize;
var NoRows = 1280 / TileSize;
var running = false;

var fightTransition = {};

var grassChar = ".";
var grassAltChar = ",";
var wallChar = "#";
var wallhbChar = "_";
var wallhtChar = "-";
var wallh2Char = "=";
var wallvlChar = "l";
var wallvrChar = "r";
var wallvlvrChar = "|";
var wallvlvrChar = "!";

var map = [];

var player = {};
var playerStartLoc;

var allEnemies = [];
var enemyCountText;

var sprites = {
    ".": "grass",
    ",": "grassAlt",
    "#": "wall",
    "_": "wall-hb",
    "-": "wall-ht",
    "=": "wall-h2",
    "l": "wall-vl",
    "r": "wall-vr",
    "|": "wall-vlvr",
    "!": "wall-v2"
};

var spritesBlockMovement = [
    "#", // wall
    "_",
    "-",
    "=",
    "l",
    "r",
    "|",
    "!"
];

var allRooms = [];

var PlayState = function(game) {};
PlayState.prototype = {
    preload: function() {

    },

    create: function() {
        jsGame.world.setBounds(0, 0, 1600, 1280);

        jsGame.input.keyboard.addCallbacks(null, onKeyPress, null);
        jsGame.input.disabled = false;

        if (!playStateInfo.hasOwnProperty("map")) {
            makeMap();
            initPlayer();
            placeEnemies();
            //makeWallEdges()
        }

        drawMap();
        drawEnemies();
        drawPlayer();

        jsGame.camera.follow(player.sprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

        enemyCountText = jsGame.add.text(66, 24, "Orcs left", {
            font: "24px Arial",
            fill: "#000000"
        });
        enemyCountText.anchor.setTo(0.5, 0.5);
        enemyCountText.fixedToCamera = true;

        running = true;
    },

    update: function() {
        if (running) {
            if (allEnemies) {
                enemyCountText.text = allEnemies.length + " orcs left";
                enemyCountText.update();
                if (allEnemies.length === 0) {
                    running = false;
                    gameOver();
                }
            }
            if (fightTransition.width > 0 && fightTransition.alpha < 1) {
                fightTransition.alpha += 0.02;
            }
        }
    },

    shutdown: function() {}
};

function onKeyPress(event) {
    var hadTurn = false;
    switch(event.keyCode) {
        case Phaser.Keyboard.UP:
            player.moveTo(player.x, player.y - 1);
            hadTurn = true;
            break;

        case Phaser.Keyboard.RIGHT:
            player.moveTo(player.x + 1, player.y);
            hadTurn = true;
            break;

        case Phaser.Keyboard.DOWN:
            player.moveTo(player.x, player.y + 1);
            hadTurn = true;
            break;

        case Phaser.Keyboard.LEFT:
            player.moveTo(player.x - 1, player.y);
            hadTurn = true;
            break;

        case Phaser.Keyboard.SPACEBAR:
            hadTurn = true;
            break;

        case Phaser.Keyboard.I:
            toggleInventoryScreen();
            break;
    }

    if (hadTurn) {
        if (player.curHP < player.totalMaxHP) {
            player.curHP += 1; // heal if not at max health
            updateUiStats();
        }
        enemyTurn();
    }
}

function toggleInventoryScreen() {
    if (inventoryScreen.style.display == "block") {
        inventoryScreen.style.display = "none";
        invTooltip.style.display = "none";
    } else {
        inventoryScreen.style.display = "block";
        setInvSlotBackgrounds(player.inventory);
    }
}

function makeMap() {
    for (var y = 0; y < NoRows; y++) {
        var newRow = [];
        for (var x = 0; x < NoColumns; x++) {
            newRow.push(wallChar);
        }
        map.push(newRow);
    }

    generateRooms();
}

function generateRooms() {
    // Room(x, y, width, height)
    // attempt to place rooms
    var minRoomSize = 3;
    var maxRoomSize = 10;
    var maxRooms = randomBetween(5, 20);
    var x = 0;
    var y = 0;
    var width = 0;
    var height = 0;

    for (var i = 0; i < maxRooms; i++) {
        width = randomBetween(minRoomSize, maxRoomSize);
        height = randomBetween(minRoomSize, maxRoomSize);
        x = randomBetween(1, NoColumns - (maxRoomSize + 1)); //make sure cannot be at edge of map
        y = randomBetween(1, NoRows - (maxRoomSize + 1));

        var failed = false;
        var newRoom = new Room(x, y, width, height);

        allRooms.push(newRoom);

        if (i === 0) {
            playerStartLoc = [newRoom.y, newRoom.x];
        }

    }

    for (i = 0; i < allRooms.length; i++) {
        var curRoom = allRooms[i];

        for (y = curRoom.y; y < curRoom.brY; y++) {
            for (x = curRoom.x; x < curRoom.brX; x++) {
                if (randomBetween(1, 100) > 97)
                    map[y][x] = grassAltChar;
                else
                    map[y][x] = grassChar;
            }
        }

        if (i > 0) {
            var curCenter = allRooms[i].center;
            var prevCenter = allRooms[i - 1].center;

            if (Math.random() > 0.5) {
                hCorridors(prevCenter[1], curCenter[1], prevCenter[0]);
                vCorridors(prevCenter[0], curCenter[0], curCenter[1]);
            } else {
                vCorridors(prevCenter[0], curCenter[0], prevCenter[1]);
                hCorridors(prevCenter[1], curCenter[1], curCenter[0]);
            }

        }
    }
}

function hCorridors(x1, x2, y) {
    for (i = Math.min(x1, x2); i < Math.max(x1, x2) + 1; i++) {
        if (randomBetween(1, 100) > 97)
            map[y][i] = grassAltChar;
        else
            map[y][i] = grassChar;
    }
}

function vCorridors(y1, y2, x) {
    for (i = Math.min(y1, y2); i < Math.max(y1, y2) + 1; i++) {
        if (randomBetween(1, 100) > 97)
            map[i][x] = grassAltChar;
        else
            map[i][x] = grassChar;
    }
}

function makeWallEdges() {
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            var neighbours = grassNeighbours(y, x);
            if (neighbours == "hb")
                map[y - 1][x] = wallhbChar;
            else if (neighbours == "ht")
                map[y + 1][x] = wallhtChar;
            else if (neighbours == "hthb") {
                map[y - 1][x] = wallhbChar;
                map[y + 1][x] = wallhtChar;
            } else if (neighbours == "h2")
                map[y + 1][x] = wallh2Char;
            else if (neighbours == "vl")
                map[y][x + 1] = wallvlChar;
            else if (neighbours == "vr")
                map[y][x - 1] = wallvrChar;
            else if (neighbours == "vlvr") {
                map[y][x - 1] = wallvrChar;
                map[y][x + 1] = wallvlChar;
            }
        }
    }
}

function grassNeighbours(y, x) {
    var neighbours;
    neighbours = "";
    if (y > 0 && y < 1280 && x > 0 && x < 1600) {
        if (map[y][x] == grassChar || map[y][x] == grassAltChar) {
            if (map[y + 1][x] == wallChar && (map[y + 2][x] == grassChar || map[y + 2][x] == grassAltChar))
                neighbours = "h2"; //wall with grass on 2 sides 
            else if (map[y + 1][x] == wallChar && map[y - 1][x] == wallChar)
                neighbours = "hthb"; //wall with grass above and below
            else if (map[y][x + 1] == wallChar && (map[y][x + 2] == grassChar || map[y][x + 2] == grassAltChar))
                neighbours = "v2"; //wall with grass left and right
            else if (map[y][x + 1] == wallChar && map[y][x - 1] == wallChar)
                neighbours = "vlvr"; //wall with grass left and right
            else if (map[y][x + 1] == wallChar)
                neighbours = "vl"; //wall with grass on left
            else if (map[y][x - 1] == wallChar)
                neighbours = "vr"; // wall with grass on right
            else if (map[y + 1][x] == wallChar)
                neighbours = "ht"; //wall with grass above
            else if (map[y - 1][x] == wallChar)
                neighbours = "hb"; //wall with grass below
        }
    }
    return neighbours;
}

function drawMap() {
    for (var y = 0; y < NoRows; y++)
        for (var x = 0; x < NoColumns; x++)
            if (map[y][x] == grassChar)
                jsGame.add.sprite(x * TileSize, y * TileSize, "grass");
            else if (map[y][x] == grassAltChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "grassAlt");
    else if (map[y][x] == wallChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "wall");
    else if (map[y][x] == wallhbChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "wall-hb");
    else if (map[y][x] == wallhtChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "wall-ht");
    else if (map[y][x] == wallh2Char)
        jsGame.add.sprite(x * TileSize, y * TileSize, "wall-h2");
    else if (map[y][x] == wallvlChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "wall-vl");
    else if (map[y][x] == wallvrChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "wall-vr");
    else if (map[y][x] == wallv2Char)
        jsGame.add.sprite(x * TileSize, y * TileSize, "wall-v2");
}

function initPlayer() {
    playerInventory = new Inventory(itemList.Head, itemList.Chest, itemList.Hands,
        itemList.Legs, itemList.Feet, itemList.Amulet, itemList.Ring,
        itemList.Belt, itemList.Weapon, itemList.Shield);
    player = new Actor(playerStartLoc[1], playerStartLoc[0], "player", 50, 50, 10, 10, 5, 5, 5, playerInventory);
    updateUiStats();
}

function updateUiStats() {
    hpDisplay.innerHTML = player.curHP;
    mpDisplay.innerHTML = player.curMP;
    armDisplay.innerHTML = player.armour;
    strDisplay.innerHTML = player.totalStrength;
    agiDisplay.innerHTML = player.totalAgility;
    magDisplay.innerHTML = player.totalMagic;
}


function drawPlayer() {
    player.sprite = jsGame.add.sprite(player.x * TileSize, player.y * TileSize, "player");
}

function blocksMovement(tile) {
    // Returns if a given tile blocks movement
    // looks through array and returns if there is 0 or more
    // occurences of the given tile (i.e. it's in the array)

    return (spritesBlockMovement.indexOf(tile) > -1);
        //return false // for testing allow movement anywhere 
}

function placeEnemies() {
    for (var y = 0; y < NoRows; y++)
        for (var x = 0; x < NoColumns; x++)
            if (map[y][x] == grassChar && !(x == player.x && y == player.y))
                if (randomBetween(1, 100) > 98) {
                    var hp = randomBetween(1, 100);
                    var mp = randomBetween(1, 50);
                    var newEnemy = new Actor(x, y, "enemy", hp, hp, mp, mp,
                        randomBetween(1, 50), randomBetween(1, 50), randomBetween(1, 50), null);
                    allEnemies.push(newEnemy);
                }
}

function drawEnemies() {
    for (var i = 0; i < allEnemies.length; i++)
        allEnemies[i].sprite = jsGame.add.sprite(allEnemies[i].x * TileSize,
            allEnemies[i].y * TileSize, "orc");
}

function enemyTurn() {
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];
        var dirChoice = Math.round(randomBetween(1, 4));
        if (dirChoice == 1)
            enemy.moveTo(enemy.x - 1, enemy.y);
        else if (dirChoice == 2)
            enemy.moveTo(enemy.x + 1, enemy.y);
        else if (dirChoice == 3)
            enemy.moveTo(enemy.x, enemy.y - 1);
        else if (dirChoice == 4)
            enemy.moveTo(enemy.x, enemy.y + 1);
    }
}

function collideWithOther(futureX, futureY) {
    // if the player is at the furtureX & futureY corrds
    if (futureX == player.x && futureY == player.y) {
        return player;
    } else { // check each enemy's location 
        for (var i = 0; i < allEnemies.length; i++) {
            if (futureX == allEnemies[i].x && futureY == allEnemies[i].y) {
                return allEnemies[i];
            }
        }
    }
}

function otherIsHostile(actor, other) {
    if (other) { // may be called without another actor
        if (actor.faction != other.faction) // if the two are on opposing factions
            return true;
        else
            return false;
    }
}

function attackOther(actor, other) {
    if (actor == player) {
        fightStateInfo = {
            "player": actor,
            "enemy": other
        };
    } else {
        fightStateInfo = {
            "player": other,
            "enemy": actor
        };
    }

    jsGame.camera.follow(null); // stop camera following the player
    jsGame.input.keyboard.addCallbacks(null, null, null); //remove player input

    var fill = jsGame.add.bitmapData(800, 640);

    fill.ctx.beginPath();
    fill.ctx.rect(0, 0, 800, 640);
    fill.ctx.fillStyle = "#000000";
    fill.ctx.fill();

    fightTransition = jsGame.add.sprite(jsGame.camera.x, jsGame.camera.y, fill);
    fightTransition.width = 800;
    fightTransition.height = 640;
    fightTransition.alpha = 0;

    jsGame.add.tween(fightTransition).to({
        alpha: 0.75
    }, 1500, Phaser.Easing.Cubic.In, true, 0).start();

    var background = jsGame.add.group();
    var bgCoords = [
        [jsGame.camera.x, jsGame.camera.y],
        [jsGame.camera.x, jsGame.camera.y + 320],
        [jsGame.camera.x + 400, jsGame.camera.y],
        [jsGame.camera.x + 400, jsGame.camera.y + 320]
    ];

    var bgSpriteChoice = "grassAlt";
    for (var i = 0; i < 4; i++) {
        if (i == 1)
            bgSpriteChoice = "grassAlt";
        else
            bgSpriteChoice = "grass";


        var bgSprite = jsGame.add.sprite(player.x * 32, player.y * 32, bgSpriteChoice);

        jsGame.add.tween(bgSprite).to({
            width: 400,
            height: 320
        }, 1750, Phaser.Easing.Quadratic.InOut, true, 0).start();
        jsGame.add.tween(bgSprite).to({
            x: bgCoords[i][0],
            y: bgCoords[i][1]
        }, 1750, Phaser.Easing.Quadratic.InOut, true, 0).start();
    }

    player.sprite.bringToTop();
    fightStateInfo.enemy.sprite.bringToTop();

    jsGame.add.tween(player.sprite.scale).to({
        x: 6,
        y: 6
    }, 1750, Phaser.Easing.Quadratic.InOut, true, 0).start();
    jsGame.add.tween(player.sprite).to({
        x: jsGame.camera.x + 32,
        y: jsGame.camera.y + 380
    }, 1750, Phaser.Easing.Quadratic.InOut, true, 0).start();
    jsGame.add.tween(fightStateInfo.enemy.sprite.scale).to({
        x: 6,
        y: 6
    }, 1750, Phaser.Easing.Quadratic.InOut, true, 0).start();
    jsGame.add.tween(fightStateInfo.enemy.sprite).to({
        x: jsGame.camera.x + 544,
        y: jsGame.camera.y + 32
    }, 1750, Phaser.Easing.Quadratic.InOut, true, 0).start();

    playStateInfo = {
        "map": map,
        "player": player,
        "allEnemies": allEnemies
    };

    jsGame.stage.backgroundColor = "#8ba049";

    setTimeout(function() {
        jsGame.state.start("fight");
    }, 1750);
}

function updateActor(actor) {
    actor.sprite.x = actor.x * TileSize;
    actor.sprite.y = actor.y * TileSize;
}

function gameOver() {
    // get rid of some variables
    delete playStateInfo.map;
    delete playStateInfo.allEnemies;
    delete playStateInfo.player;
    allEnemies = [];
    allRooms = [];
    map = [];
    player = null;

    var text = "You Tripped and Died :(\nRIP in Pepperonis";
    var style = {
        font: "60px Arial",
        fill: "#ff0000",
        align: "center",
        stroke: "#000",
        strokeThickness: 4
    };
    var cameraCenterX = jsGame.camera.width / 2;
    var cameraCenterY = jsGame.camera.height / 2;
    var t = jsGame.add.text(cameraCenterX, cameraCenterY, text, style);
    t.anchor.setTo(0.5, 0.5);
    t.fixedToCamera = true;

    jsGame.input.keyboard.addCallbacks(null, null, null);

    setTimeout(function() {
        t.destroy();
        jsGame.camera.reset();
        jsGame.state.start("menu");
    }, 2500);

}