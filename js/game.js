window.onload = function () {
  jsGame = new Phaser.Game(800, 640, Phaser.AUTO, "gameContainer");
  playStateInfo = {}
  fightStateInfo = {}

  // Game States
  jsGame.state.add("menu", MenuState);
  jsGame.state.add("play", PlayState);
  jsGame.state.add("fight", FightState);

  jsGame.state.start("menu");
};