window.onload = function () {
  jsGame = new Phaser.Game(800, 640, Phaser.AUTO, "gameContainer");
  

  // Game States
  jsGame.state.add("boot", BootState);
  jsGame.state.add("menu", MenuState);
  jsGame.state.add("play", PlayState);

  jsGame.state.start("boot");
};