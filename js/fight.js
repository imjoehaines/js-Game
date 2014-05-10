var playerStats;
var enemyStats;

var FightState = function() {  };
FightState.prototype = {
  preload: function() {
    jsGame.load.image("player", "img/paladin.gif")
    jsGame.load.image("orc", "img/orc.gif")
  },

  create: function() {
    jsGame.world.setBounds(0, 0, 800, 640);

    player = fightStateInfo.player
    enemy = fightStateInfo.enemy

    player.sprite = jsGame.add.sprite(32, 400, "player")
    player.sprite.scale.setTo(6, 6)
    jsGame.add.tween(player.sprite).to({ x: player.sprite.x + 16, y: player.sprite.y + 16 },
      3000 - (player.agility * 500), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)

    enemy.sprite = jsGame.add.sprite(800 - (32*8), 32, "orc")
    enemy.sprite.scale.setTo(6, 6)
    jsGame.add.tween(enemy.sprite).to({ x: enemy.sprite.x + 16, y: enemy.sprite.y + 16 },
      3000 - (enemy.agility * 500), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)

    var style = {
      font: "24px monospace",
      fill: "#000",
      align: "left"
    };

    var text = "HP: " + player.hp + "\nSTR: " + player.strength + "\nAGI: " + player.agility + "\nMAG: " + player.magic
    
    playerStats = jsGame.add.text(32 * 9, 464, text, style);
    playerStats.anchor.setTo(0.5, 0.5);

    style.align = "right"

    text = "HP: " + enemy.hp + "\nSTR: " + enemy.strength + "\nAGI: " + enemy.agility + "\nMAG: " + enemy.magic
    
    enemyStats = jsGame.add.text(800 - (32*10), 86, text, style);
    enemyStats.anchor.setTo(0.5, 0.5);

  },

  update: function() {},

  shutdown: function() {}
}