var playerStats,
    enemyStats,
    playerIdle,
    enemyIdle,
    attackText,
    runText,
    indicatorText,
    combatText,
    combatOver,
    fightMusic,
    nextMenuItem,
    menuItems,
    nextMenuIndex;

var COMBAT_OPTIONS_X_COORD = 256;
var COMBAT_OPTIONS_Y_COORD = 480;
var COMBAT_OPTIONS_Y_PADDING = 35;

var monoStyle = {
    font: "24px monospace",
    fill: "#000",
    align: "left"
};

var serifStyle = {
    font: "24px Karla",
    fill: "#000",
    align: "left"
};

var FightState = function() {};
FightState.prototype = {
    preload: function() {

    },

    create: function() {
        jsGame.world.setBounds(0, 0, 800, 640);

        var background = jsGame.add.group();
        var bgCoords = [
            [0, 0],
            [0, 320],
            [400, 0],
            [400, 320]
        ];
        var bgSpriteChoice = "grassAlt";
        for (var i = 0; i < 4; i++) {
            if (i == 1)
                bgSpriteChoice = "grassAlt";
            else
                bgSpriteChoice = "grass";

            var bgSprite = jsGame.add.sprite(bgCoords[i][0], bgCoords[i][1], bgSpriteChoice);
            bgSprite.width = 400;
            bgSprite.height = 320;
        }

        player = fightStateInfo.player;
        enemy = fightStateInfo.enemy;

        player.sprite = jsGame.add.sprite(32 * 4, 640 - (32 * 5), "player");
        player.sprite.scale.setTo(6, 6);
        player.sprite.anchor.setTo(0.5, 0.5);
        playerIdle = jsGame.add.tween(player.sprite).to({
                x: player.sprite.x + 16,
                y: player.sprite.y + 16
            },
            4250 - (player.agility * 750), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true);

        enemy.sprite = jsGame.add.sprite(800 - (32 * 5), 32 * 4, "orc");
        enemy.sprite.scale.setTo(6, 6);
        enemy.sprite.anchor.setTo(0.5, 0.5);
        enemyIdle = jsGame.add.tween(enemy.sprite).to({
                x: enemy.sprite.x + 16,
                y: enemy.sprite.y + 16
            },
            4250 - (enemy.agility * 750), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true);

        player.hpBarMax = jsGame.add.sprite(player.sprite.x * 1.9, player.sprite.y - 72, "hpBarMax");
        player.hpBarMax.scale.x = 200;
        player.hpBar = jsGame.add.sprite(player.sprite.x * 1.9, player.hpBarMax.y, "hpBar");
        player.hpBar.scale.x = (player.curHP / player.totalMaxHP) * 200;

        player.mpBarMax = jsGame.add.sprite(player.sprite.x * 1.9, player.sprite.y - 48, "mpBarMax");
        player.mpBarMax.scale.x = 200;
        player.mpBar = jsGame.add.sprite(player.mpBarMax.x, player.mpBarMax.y, "mpBar");
        player.mpBar.scale.x = (player.curHP / player.totalMaxHP) * 200;

        enemy.hpBarMax = jsGame.add.sprite(enemy.sprite.x * 0.85, enemy.sprite.y + (enemy.sprite.height / 2.5), "hpBarMax");
        enemy.hpBarMax.scale.x = 200;
        enemy.hpBarMax.anchor.setTo(1, 0);

        enemy.hpBar = jsGame.add.sprite(enemy.sprite.x * 0.85, enemy.sprite.y + (enemy.sprite.height / 2.5), "hpBar");
        enemy.hpBar.scale.x = (enemy.curHP / enemy.totalMaxHP) * 200;
        enemy.hpBar.anchor.setTo(1, 0);
        enemy.hpText = enemyStats = jsGame.add.text(800 - (32 * 10), 86, "HP: " + enemy.curHP, monoStyle);
        enemy.hpText.anchor.setTo(0.5, 0.5);

        text = "\nSTR: " + enemy.strength + "\nAGI: " + enemy.agility + "\nMAG: " + enemy.magic;

        enemyStats = jsGame.add.text(800 - (32 * 10), enemy.hpText.y + 48, text, monoStyle);
        enemyStats.anchor.setTo(0.5, 0.5);

        attackText = jsGame.add.text(COMBAT_OPTIONS_X_COORD, COMBAT_OPTIONS_Y_COORD, "Attack", serifStyle);
        attackText.anchor.setTo(0, 0.5);
        magicText = jsGame.add.text(COMBAT_OPTIONS_X_COORD, COMBAT_OPTIONS_Y_COORD + COMBAT_OPTIONS_Y_PADDING, "Magic", serifStyle);
        magicText.anchor.setTo(0, 0.5);
        runText = jsGame.add.text(COMBAT_OPTIONS_X_COORD, COMBAT_OPTIONS_Y_COORD + (COMBAT_OPTIONS_Y_PADDING * 2), "Run", serifStyle);
        runText.anchor.setTo(0, 0.5);

        menuItems = [attackText, magicText, runText];
        nextMenuIndex = 0;

        indicatorText = jsGame.add.text(attackText.x - 8, attackText.y, ">", serifStyle);
        indicatorText.anchor.setTo(0.5, 0.5);
        indicatorText.selectedTween = jsGame.add.tween(indicatorText).to({
            alpha: 0.15
        }, 500, Phaser.Easing.Exponential.In, true, 0, Number.MAX_VALUE, true);

        jsGame.input.keyboard.addCallbacks(null, fightKeyPress, null);

        jsGame.input.disabled = false;
        combatOver = false;
    },

    update: function() {
        if (combatOver) {
            jsGame.input.disabled = true;
            disableMenus();
        }
    },

    shutdown: function() {}
};

function fightKeyPress(event) {
    if (event.keyCode == Phaser.Keyboard.DOWN) {
        moveIndicator(true);
    } else if (event.keyCode == Phaser.Keyboard.UP) {
        moveIndicator(false);
    } else if (event.keyCode == Phaser.Keyboard.ENTER) {
        confirmCommand();
    }
}

function moveIndicator(down) {
    if (down) {
        nextMenuIndex = (nextMenuIndex < 2 && nextMenuIndex + 1 || 0);
    } else {
        // nextMenuIndex = (nextMenuIndex > 0 && nextMenuIndex - 1 || 0) doesn't work for some reason ???
        // just cycles between 1 & 2 but nextMenuIndex > 0 is still true at nextMenuIndex = 1 
        if (nextMenuIndex > 0) {
            nextMenuIndex = nextMenuIndex - 1;
        } else {
            nextMenuIndex = 2;
        }
    }

    indicatorText.y = menuItems[nextMenuIndex].y;
}

function confirmCommand() {
    // if run is selected
    if (indicatorText.y == attackText.y) {
        console.log("attack");

        jsGame.input.disabled = true;
        attackEnemy();
        disableMenus();
    } else if (indicatorText.y == magicText.y) {
        console.log("magic");
    } else {
        console.log("run");
    }

    setTimeout(function() {
        jsGame.input.disabled = false;
        enableMenus();
    }, 1000);
}

function attackEnemy() {
    playerIdle.pause();
    enemyIdle.pause();

    enemy.curHP -= player.damage;
    updateHP(enemy);
    player.curHP -= enemy.damage;
    updateHP(player);

    var attack = jsGame.add.tween(player.sprite).to({
            x: enemy.sprite.x - 64,
            y: enemy.sprite.y + 64
        },
        500, Phaser.Easing.Back.Out, true, 0, 0, true);

    player.sprite.bringToTop();

    attack.onComplete.add(function() {
        playerIdle.resume();
    }, null);

    if (enemy.curHP > 0) {
        var reaction = jsGame.add.tween(enemy.sprite).to({
                x: enemy.sprite.x + 32,
                y: enemy.sprite.y - 32
            },
            200, Phaser.Easing.Circular.InOut, true, 180, 0, true);

        reaction.onComplete.add(function() {
            enemyIdle.resume();
        }, null);
    } else {
        killEnemy();
    }
}

function killEnemy() {
    jsGame.input.disabled = true;
    combatOver = true;

    combatText = jsGame.add.text(jsGame.world.centerX, jsGame.world.centerY, "You Won!", style);
    combatText.anchor.setTo(0.5, 0.5);

    enemyIdle.stop();

    var dying1 = jsGame.add.tween(enemy.sprite.scale).to({
            x: 0,
            y: 0
        },
        2500, Phaser.Easing.Cubic.In, true, 0, 0, false);
    var dying2 = jsGame.add.tween(enemy.sprite).to({
            angle: 360
        },
        250, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, false);
    var dying3 = jsGame.add.tween(enemy.sprite).to({
            alpha: 0
        },
        2500, Phaser.Easing.Linear.None, true, 0, 0, false);

    setTimeout(function() {
        enemy.sprite.destroy();
        var index = allEnemies.indexOf(enemy);
        allEnemies.splice(index, 1);
        jsGame.state.start("play");
    }, 3000);
}

function updateHP(actor) {
    if (actor.hpText) {
        if (actor.curHP <= 0)
            actor.hpText.setText("DEAD :(");
        else
            actor.hpText.setText("HP: " + actor.curHP);
    }

    // set health bar value to 0 for cases where the actor is 'overkilled'
    // (i.e. enough damage done that health is below 0)
    var percFunc = (actor.curHP / actor.totalMaxHP) * 200;
    var healthPercent = percFunc >= 0 && percFunc || 0;

    jsGame.add.tween(actor.hpBar.scale).to({
            x: healthPercent
        },
        750, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);

    updateUiStats();
}

function disableMenus() {
    indicatorText.alpha = 0;
    indicatorText.selectedTween.pause();
    for (var i = menuItems.length - 1; i >= 0; i--) {
        menuItems[i].alpha = 0.25;
    }
}

function enableMenus() {
    indicatorText.alpha = 1;
    indicatorText.selectedTween.resume();
    for (var i = menuItems.length - 1; i >= 0; i--) {
        menuItems[i].alpha = 1;
    }
}