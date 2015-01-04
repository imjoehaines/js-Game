var MenuState = function() {};
MenuState.prototype = {
    preload: function() {
        jsGame.stage.smoothed = false;
        jsGame.stage.disableVisibilityChange = true;

        jsGame.load.image("grass", "img/grass.png");
        jsGame.load.image("grassAlt", "img/grassAlt.png");
        jsGame.load.image("wall", "img/wall.png");
        jsGame.load.image("hpBar", "img/hpBar.png");
        jsGame.load.image("hpBarMax", "img/hpBarMax.png");
        jsGame.load.image("mpBar", "img/mpBar.png");
        jsGame.load.image("mpBarMax", "img/mpBarMax.png");
        /*    jsGame.load.image("wall-hb", "img/wall-hb.png")
    jsGame.load.image("wall-ht", "img/wall-ht.png")
    jsGame.load.image("wall-h2", "img/wall-h2.png")
    jsGame.load.image("wall-vl", "img/wall-vl.png")
    jsGame.load.image("wall-vr", "img/wall-vr.png")
    jsGame.load.image("wall-v2", "img/wall-v2.png")*/

        jsGame.load.image("player", "img/paladin.gif");
        jsGame.load.image("orc", "img/orc.gif");

        menuItems = [
            "A GAME",
            "Press SPACE to play",
            "Beep Boop"
        ];
        style = {
            font: "50px Arial",
            fill: "#000",
            align: "center"
        };

        jsGame.stage.backgroundColor = "#eee";
        upKey = jsGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    create: function() {
        jsGame.world.setBounds(0, 0, 800, 560);
        drawMenuItems(menuItems);
    },

    update: function() {
        if (upKey.isDown) {
            jsGame.state.start("play");
        }
    },

};

function drawMenuItems(menuItems) {
    for (var i = 0; i < menuItems.length; i++) {
        var t = jsGame.add.text(jsGame.world.centerX, i * 75, menuItems[i], style);
        t.anchor.setTo(0.5, -1);
    }
}