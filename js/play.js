var TileSize = 32
var NoColumns = 800 / TileSize
var NoRows = 640 / TileSize

var grassChar = "."
var grassAltChar = ","
var wallChar = "#"
var playerChar = "@"
var map = [];
var player = {};

var sprites = {
  ".": "grass",
  ",": "grassAlt",
  "#": "wall",
  "@": "player"
}

var PlayState = function(game) {  };
PlayState.prototype = {
  preload: function() {
    jsGame.load.image("grass", "img/grass.png")
    jsGame.load.image("grassAlt", "img/grassAlt.png")
    jsGame.load.image("wall", "img/wall.png")
    jsGame.load.image("player", "img/player.png")

  },
  
  create:  function() {
    jsGame.input.keyboard.addCallbacks(null, null, onKeyPress);
    
    makeMap()
    placePlayer()
    drawMap()

    player = {
      x: 1,
      y: 1,
      hp: 50,
      "actorChar": "@"
    }

    player.moveTo = function(x, y) {
      if (map[y][x] != wallChar) {
        map[this.y][this.x] = grassChar
        map[y][x] = this.actorChar

        this.y = y
        this.x = x

        drawMap()
        
      }
    }

  },

  update:  function() {
  }
}

function onKeyPress(event) {
  switch (event.keyCode) {
    case Phaser.Keyboard.UP:
      player.moveTo(player.x, player.y - 1)
      break

    case Phaser.Keyboard.RIGHT:
      player.moveTo(player.x + 1, player.y)
      break

    case Phaser.Keyboard.DOWN:
      player.moveTo(player.x, player.y + 1)
      break

    case Phaser.Keyboard.LEFT:
      player.moveTo(player.x - 1, player.y)
      break
  }
}

function makeMap() {
  for (var y = 0; y < NoRows; y++) {
    var newRow = [];
    for (var x = 0; x < NoColumns; x++) {
      // make edges of map always a wall
      if (y == 0 || y == NoRows - 1 || x == 0 || x == NoColumns - 1) 
        newRow.push(wallChar)
      else if (Math.random() > 0.8)
        newRow.push(wallChar);
      else if (Math.random() > 0.9)
        newRow.push(grassAltChar)
      else
        newRow.push(grassChar);
    }
    map.push(newRow);
  }
}

function drawMap() {
  for (var y = 0; y < NoRows; y++)
    for (var x = 0; x < NoColumns; x++)
      if (map[y][x] == grassChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "grass");
      else if (map[y][x] == grassAltChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "grassAlt");
      else if (map[y][x] == wallChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "wall");
      else if (map[y][x] == playerChar)
        jsGame.add.sprite(x * TileSize, y * TileSize, "player");
}

function placePlayer() {
  var loc = [player.y, player.x]
  map[1][1] = playerChar
}

