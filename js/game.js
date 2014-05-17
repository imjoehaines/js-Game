window.onload = function () {
  hpDisplay = document.getElementById("hpDisp")
  strDisplay = document.getElementById("strDisp")
  agiDisplay = document.getElementById("agiDisp")
  magDisplay = document.getElementById("magDisp")

  jsGame = new Phaser.Game(800, 640, Phaser.AUTO, "gameContainer");
  playStateInfo = {};
  fightStateInfo = {};
  
  // Game States
  jsGame.state.add("menu", MenuState);
  jsGame.state.add("play", PlayState);
  jsGame.state.add("fight", FightState);

  jsGame.state.start("menu");
};