var MenuState = function() {  };
MenuState.prototype = {
  preload: function() {
    jsGame.stage.smoothed = false;

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
    jsGame.world.setBounds(0, 0, 800, 640);
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