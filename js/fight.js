var playerStats;
var enemyStats;

var attackText
var runText
var indicatorText
var combatText

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
      4250 - (player.agility * 750), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)

    enemy.sprite = jsGame.add.sprite(800 - (32*8), 32, "orc")
    enemy.sprite.scale.setTo(6, 6)
    jsGame.add.tween(enemy.sprite).to({ x: enemy.sprite.x + 16, y: enemy.sprite.y + 16 },
      4250 - (enemy.agility * 750), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)

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

    style.font = "24px cambria"
    attackText = jsGame.add.text(32 * 14, 500, "Attack", style);
    attackText.anchor.setTo(0, 0.5);
    runText = jsGame.add.text(32 * 18, 500, "Run", style);
    runText.anchor.setTo(0, 0.5);

    indicatorText = jsGame.add.text(attackText.x - 8, 500, ">", style);
    indicatorText.anchor.setTo(0.5, 0.5);
    jsGame.add.tween(indicatorText).to({ alpha: 0.25 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)

    jsGame.input.keyboard.addCallbacks(null, fightKeyPress, null);

  },

  update: function() {},

  shutdown: function() {}
}

function fightKeyPress(event) {
  if(event.keyCode == Phaser.Keyboard.RIGHT) {
    moveIndicator(true)
  }
  else if(event.keyCode == Phaser.Keyboard.LEFT){
    moveIndicator(false)
  }
  else if (event.keyCode == Phaser.Keyboard.ENTER) {
    confirmCommand()
  }
}

function moveIndicator(right) {
  if (right) {
    indicatorText.x = runText.x - 8
  }
  else {
    indicatorText.x = attackText.x - 8
  }
}

function confirmCommand() {
  // if run is selected
  if (indicatorText.x + 8 == runText.x) {
    combatText = jsGame.add.text(jsGame.world.centerX, jsGame.world.centerY, "RUN!", style);
  }
  else {
    combatText = jsGame.add.text(jsGame.world.centerX, jsGame.world.centerY, "ATTACK!", style);
    killEnemy()
  }

  jsGame.add.tween(combatText).to({ alpha: 0. }, 1000, Phaser.Easing.Exponential.In, true, 0).start()
  combatText.anchor.setTo(0.5, 0.5)

  setTimeout(function() {
    combatText.destroy();
  }, 1000)
}

function killEnemy() {
  enemy.sprite.destroy()
  var index = allEnemies.indexOf(enemy)
  allEnemies.splice(index, 1)
  jsGame.state.start("play")
}