var playerStats;
var enemyStats;

var playerIdle;
var enemyIdle;

var attackText;
var runText;
var indicatorText;
var combatText;

var combatOver;

var fightMusic;

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

  },

  create: function() {
    jsGame.world.setBounds(0, 0, 800, 640);

    var background = jsGame.add.group();
    var bgCoords = [[0, 0], [0, 320], [400, 0], [400,320]];
    var bgSpriteChoice = "grassAlt";
    for (var i = 0; i < 4; i ++) {
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

    player.sprite = jsGame.add.sprite(32 * 4, 640 - (32 * 5), "player")
    player.sprite.scale.setTo(6, 6)
    player.sprite.anchor.setTo(0.5, 0.5)
    playerIdle = jsGame.add.tween(player.sprite).to({ x: player.sprite.x + 16, y: player.sprite.y + 16 },
      4250 - (player.agility * 750), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)

    enemy.sprite = jsGame.add.sprite(800 - (32 * 5), 32 * 4, "orc")
    enemy.sprite.scale.setTo(6, 6)
    enemy.sprite.anchor.setTo(0.5, 0.5)
    enemyIdle = jsGame.add.tween(enemy.sprite).to({ x: enemy.sprite.x + 16, y: enemy.sprite.y + 16 },
      4250 - (enemy.agility * 750), Phaser.Easing.Quadratic.InOut, true, 0, Number.MAX_VALUE, true)

    player.hpBarMax = jsGame.add.sprite(player.sprite.x * 1.9, player.sprite.y - 24, "hpBarMax")
    player.hpBarMax.scale.x = 200
    player.hpBar = jsGame.add.sprite(player.sprite.x * 1.9, player.hpBarMax.y, "hpBar")
    player.hpBar.scale.x = (player.curHP / player.maxHP) * 200

    player.mpBarMax = jsGame.add.sprite(player.sprite.x * 1.9, player.sprite.y, "mpBarMax")
    player.mpBarMax.scale.x = 200
    player.mpBar = jsGame.add.sprite(player.mpBarMax.x, player.mpBarMax.y, "mpBar")
    player.mpBar.scale.x = (player.curHP / player.maxHP) * 200

    enemy.hpBarMax = jsGame.add.sprite(enemy.sprite.x * 0.85, enemy.sprite.y + (enemy.sprite.height/2.5), "hpBarMax")
    enemy.hpBarMax.scale.x = 200
    enemy.hpBarMax.anchor.setTo(1, 0)

    enemy.hpBar = jsGame.add.sprite(enemy.sprite.x * 0.85, enemy.sprite.y + (enemy.sprite.height/2.5), "hpBar")
    enemy.hpBar.scale.x = (enemy.curHP / enemy.maxHP) * 200
    enemy.hpBar.anchor.setTo(1, 0)
    enemy.hpText = enemyStats = jsGame.add.text(800 - (32*10), 86, "HP: " + enemy.curHP, monoStyle);
    enemy.hpText.anchor.setTo(0.5, 0.5);

    text = "\nSTR: " + enemy.strength + "\nAGI: " + enemy.agility + "\nMAG: " + enemy.magic

    enemyStats = jsGame.add.text(800 - (32*10), enemy.hpText.y + 48, text, monoStyle);
    enemyStats.anchor.setTo(0.5, 0.5);

    attackText = jsGame.add.text(32 * 14, 500, "Attack", serifStyle);
    attackText.anchor.setTo(0, 0.5);
    magicText = jsGame.add.text(32 * 18, 500, "Magic", serifStyle);
    magicText.anchor.setTo(0, 0.5);
    runText = jsGame.add.text(32 * 18, 500, "Run", serifStyle);
    runText.anchor.setTo(0, 0.5);

    indicatorText = jsGame.add.text(attackText.x - 8, 500, ">", serifStyle);
    indicatorText.anchor.setTo(0.5, 0.5);
    indicatorText.selectedTween = jsGame.add.tween(indicatorText).to(
      { alpha: 0.15 }, 500, Phaser.Easing.Exponential.In, true, 0, Number.MAX_VALUE, true)

    jsGame.input.keyboard.addCallbacks(null, fightKeyPress, null);

    jsGame.input.disabled = false;
    combatOver = false
  },

  update: function() {
    if (combatOver) {
      jsGame.input.disabled = true;
      disableMenus()
    }
  },

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

  }
  else {
    jsGame.input.disabled = true;
    attackEnemy()
    disableMenus()
  }

  setTimeout(function() {
    jsGame.input.disabled = false;
    enableMenus()
  }, 1000)
}

function attackEnemy() {
  playerIdle.pause()
  enemyIdle.pause()

  enemy.curHP -= 1
  updateHP(enemy)
  player.curHP -= 3
  updateHP(player)

  var attack = jsGame.add.tween(player.sprite).to({ x: enemy.sprite.x - 64, y: enemy.sprite.y + 64 },
    500, Phaser.Easing.Back.Out, true, 0, 0, true)

  player.sprite.bringToTop()

  attack.onComplete.add(function() { playerIdle.resume() }, null)

  if (enemy.curHP > 0) {
    var reaction = jsGame.add.tween(enemy.sprite).to({ x: enemy.sprite.x + 32, y: enemy.sprite.y - 32 },
      200, Phaser.Easing.Circular.InOut, true, 180, 0, true)

    reaction.onComplete.add(function() { enemyIdle.resume() }, null)
  }
  else {
    killEnemy()
  }
}

function killEnemy() {
  jsGame.input.disabled = true;
  combatOver = true

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
  if (actor.hpText) {
    if (actor.curHP <= 0)
      actor.hpText.setText("DEAD :(")
    else
      actor.hpText.setText("HP: " + actor.curHP)
  }

  jsGame.add.tween(actor.hpBar.scale).to({ x: (actor.curHP / actor.maxHP) * 200 },
      750, Phaser.Easing.Quadratic.InOut, true, 0, 0, false)

  updateStats()
}

function disableMenus() {
  indicatorText.alpha = 0
  indicatorText.selectedTween.pause()
  attackText.alpha = 0.25
  runText.alpha = 0.25
}

function enableMenus() {
  indicatorText.alpha = 1
  indicatorText.selectedTween.resume()
  attackText.alpha = 1
  runText.alpha = 1
}