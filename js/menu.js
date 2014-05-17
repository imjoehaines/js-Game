var MenuState = function() {  };
MenuState.prototype = {
  preload: function() {
    jsGame.stage.smoothed = false;
    jsGame.stage.disableVisibilityChange = true;

    jsGame.load.audio("bgLoop", "sfx/bg/loop.wav")
    jsGame.load.audio("fightMusic", "sfx/bg/loop.wav")

    jsGame.load.image("grass", "img/grass.png")
    jsGame.load.image("grassAlt", "img/grassAlt.png")
    jsGame.load.image("wall", "img/wall.png")
    jsGame.load.image("hpBar", "img/hpBar.png")
    jsGame.load.image("hpBarMax", "img/hpBarMax.png")
/*    jsGame.load.image("wall-hb", "img/wall-hb.png")
    jsGame.load.image("wall-ht", "img/wall-ht.png")
    jsGame.load.image("wall-h2", "img/wall-h2.png")
    jsGame.load.image("wall-vl", "img/wall-vl.png")
    jsGame.load.image("wall-vr", "img/wall-vr.png")
    jsGame.load.image("wall-v2", "img/wall-v2.png")*/

    jsGame.load.image("player", "img/paladin.gif")
    jsGame.load.image("orc", "img/orc.gif")

    jsGame.load.audio("hurt1", "sfx/hurt/1.wav")
    jsGame.load.audio("hurt2", "sfx/hurt/2.wav")
    jsGame.load.audio("hurt3", "sfx/hurt/3.wav")
    jsGame.load.audio("hurt4", "sfx/hurt/4.wav")
    jsGame.load.audio("hurt5", "sfx/hurt/5.wav")
    jsGame.load.audio("hurt6", "sfx/hurt/6.wav")
    jsGame.load.audio("attack1", "sfx/attack/1.wav")
    jsGame.load.audio("attack2", "sfx/attack/2.wav")
    jsGame.load.audio("attack3", "sfx/attack/3.wav")
    jsGame.load.audio("attack4", "sfx/attack/4.wav")
    jsGame.load.audio("attack5", "sfx/attack/5.wav")
    jsGame.load.audio("attack6", "sfx/attack/6.wav")
    jsGame.load.audio("attack7", "sfx/attack/7.wav")
    jsGame.load.audio("attack8", "sfx/attack/8.wav")
    jsGame.load.audio("attack9", "sfx/attack/9.wav")
    jsGame.load.audio("attack10", "sfx/attack/10.wav")

    jsGame.load.audio("enemyDeath", "sfx/enemyDeath.wav")
    jsGame.load.audio("enemyDeathHit", "sfx/enemyDeathHit.wav")

    jsGame.load.audio("fightWin", "sfx/fightWin.wav")

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
    upKey = jsGame.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  },
  
  create:  function() {
    jsGame.world.setBounds(0, 0, 800, 560);
    drawMenuItems(menuItems)
  },

  update:  function() {
    if (upKey.isDown) {
      jsGame.state.start("play");
    }
  },

}

function drawMenuItems(menuItems) {
  for (var i = 0; i < menuItems.length; i++) {
    var t = jsGame.add.text(jsGame.world.centerX, i * 75, menuItems[i], style);
    t.anchor.setTo(0.5, -1);
  };
}

function fuck() {
  console.log("a")
}