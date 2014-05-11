var playerStats;
var enemyStats;

var playerIdle;
var enemyIdle;

var attackText;
var runText;
var indicatorText;
var combatText;

var canAttack;

var monoStyle = {
  font: "24px monospace",
  fill: "#000",
  align: "left"
};

var serifStyle = {
  font: "24px serif",
  fill: "#000",
  align: "left"
};

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

    player.sprite = jsGame.add.sprite(32 * 4, 640 - (32 * 4), "player")
    player.sprite.scale.setTo(6, 6)
    player.sprite.anchor.setTo(0.5, 0.5)
    playerIdle = jsGame.add.tween(player.sprite).to({ x: player.sprite.x + 16, y: player.sprite.y + 16 },
      4250 - (player.agility * 750), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)

    enemy.sprite = jsGame.add.sprite(800 - (32 * 5), 32 * 4, "orc")
    enemy.sprite.scale.setTo(6, 6)
    enemy.sprite.anchor.setTo(0.5, 0.5)
    enemyIdle = jsGame.add.tween(enemy.sprite).to({ x: enemy.sprite.x + 16, y: enemy.sprite.y + 16 },
      4250 - (enemy.agility * 750), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)


    player.hpText = jsGame.add.text(32 * 9, 464, "HP: " + player.hp, monoStyle);
    player.hpText.anchor.setTo(0.5, 0.5);

    var text = "\nSTR: " + player.strength + "\nAGI: " + player.agility + "\nMAG: " + player.magic
    
    playerStats = jsGame.add.text(32 * 9, player.hpText.y + 48, text, monoStyle);
    playerStats.anchor.setTo(0.5, 0.5);

    enemy.hpText = enemyStats = jsGame.add.text(800 - (32*10), 86, "HP: " + enemy.hp, monoStyle);
    enemy.hpText.anchor.setTo(0.5, 0.5);

    text = "\nSTR: " + enemy.strength + "\nAGI: " + enemy.agility + "\nMAG: " + enemy.magic
    
    enemyStats = jsGame.add.text(800 - (32*10), enemy.hpText.y + 48, text, monoStyle);
    enemyStats.anchor.setTo(0.5, 0.5);

    attackText = jsGame.add.text(32 * 14, 500, "Attack", serifStyle);
    attackText.anchor.setTo(0, 0.5);
    runText = jsGame.add.text(32 * 18, 500, "Run", serifStyle);
    runText.anchor.setTo(0, 0.5);

    indicatorText = jsGame.add.text(attackText.x - 8, 500, ">", serifStyle);
    indicatorText.anchor.setTo(0.5, 0.5);
    indicatorText.selectedTween = jsGame.add.tween(indicatorText).to(
      { alpha: 0.15 }, 500, Phaser.Easing.Exponential.In, true, 0, Number.MAX_VALUE, true)

    jsGame.input.keyboard.addCallbacks(null, fightKeyPress, null);

     canAttack = true
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
  else if (event.keyCode == Phaser.Keyboard.ENTER && canAttack) {
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

  }
  else {
    attackEnemy()
    canAttack = false
    indicatorText.alpha = 0
    indicatorText.selectedTween.pause()
    attackText.alpha = 0.25
  }

  setTimeout(function() {
    canAttack = true
    indicatorText.selectedTween.resume()
    attackText.alpha = 1
  }, 1000)
}

function attackEnemy() {
  playerIdle.pause()
  enemyIdle.pause()

  var attack = jsGame.add.tween(player.sprite).to({ x: enemy.sprite.x - 64, y: enemy.sprite.y + 64 },
    330, Phaser.Easing.Back.Out, true, 0, 0, true)

  var reaction = jsGame.add.tween(enemy.sprite).to({ x: enemy.sprite.x + 32, y: enemy.sprite.y - 32 },
    200, Phaser.Easing.Circular.InOut, true, 70, 0, true)

  player.sprite.bringToTop()

  attack.onComplete.add(function() {playerIdle.resume()}, null)
  reaction.onComplete.add(function() {enemyIdle.resume()}, null)

  enemy.hp -= 1
  updateHP(enemy)
  
  if (enemy.hp == 0) {
    killEnemy()
  }
}

function killEnemy() {
  canAttack = false
  combatText = jsGame.add.text(jsGame.world.centerX, jsGame.world.centerY, "You Won!", style);
  combatText.anchor.setTo(0.5, 0.5)

  enemyIdle.stop()
  var dying1 = jsGame.add.tween(enemy.sprite.scale).to({ x: 0, y: 0 },
      2500, Phaser.Easing.Cubic.In, true, 0, 0, false)
  var dying2 = jsGame.add.tween(enemy.sprite).to({ angle: 360 },
      250, Phaser.Easing.Linear.None, true, 0, Number.MAX_VALUE, false)
  var dying3 = jsGame.add.tween(enemy.sprite).to({ alpha: 0 },
      2500, Phaser.Easing.Linear.None, true, 0, 0, false)

  setTimeout(function() {
    enemy.sprite.destroy()
    var index = allEnemies.indexOf(enemy)
    allEnemies.splice(index, 1)
    jsGame.state.start("play")
  }, 3000)
}

function updateHP(actor) {
  actor.hpText.text = "HP: " + actor.hp
}