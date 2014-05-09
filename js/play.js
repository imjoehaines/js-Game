var TileSize = 32
var NoColumns = 1600 / TileSize
var NoRows = 1280 / TileSize

var grassChar = "."
var grassAltChar = ","
var wallChar = "#"

var map = [];
var player = {};
var playerSprite;

var sprites = {
  ".": "grass",
  ",": "grassAlt",
  "#": "wall"
}

var spritesBlockMovement = [
  "#" // wall
]

var PlayState = function(game) {  };
PlayState.prototype = {
  preload: function() {
    jsGame.load.image("grass", "img/grass.png")
    jsGame.load.image("grassAlt", "img/grassAlt.png")
    jsGame.load.image("wall", "img/wall.png")

    jsGame.load.image("player", "img/paladin.gif")
  },
  
  create:  function() {
    jsGame.world.setBounds(0, 0, 1600, 1280);

    jsGame.input.keyboard.addCallbacks(null, onKeyPress, null);
    
    makeMap()  
    drawMap()

    initPlayer()

    jsGame.camera.follow(playerSprite, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
  },

  update:  function() {
    jsGame.debug.cameraInfo(jsGame.camera, 32, 32);
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
      //else if (Math.random() > 0.95)
      //  newRow.push(grassAltChar)
      else
        newRow.push(wallChar);
    }
    map.push(newRow);
  }


  // Room(x, y, width, height)

  // attempt to place rooms
  var minRoomSize = 3;
  var maxRoomSize = 10;
  var maxRooms = 20;
  var allRooms = [];
  var x = 0
  var y = 0
  var width = 0 
  var height = 0

  for (var i = 0; i < maxRooms; i++) {
    width = randomBetween(minRoomSize, maxRoomSize)
    height = randomBetween(minRoomSize, maxRoomSize)
    x = randomBetween(1, NoColumns - 10)
    y = randomBetween(1, NoRows - 10)

    var failed = false
    var newRoom = new Room(x, y, width, height)

    allRooms.push(newRoom)

  }

  for (var i = 0; i < allRooms.length; i++) {
    var curRoom = allRooms[i]
    for (var y = curRoom.y; y < curRoom.brY; y++){
      for (var x = curRoom.x; x < curRoom.brX; x++){
        if (randomBetween(1,100) > 97) 
          map[y][x] = grassAltChar
        else
          map[y][x] = grassChar
      }
    }
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
}

function initPlayer() {
  player = {
    x: 1,
    y: 1,
    hp: 50
  }

  player.moveTo = function(x, y) {
    if (!blocksMovement(map[y][x])) {     
      this.y = y
      this.x = x

      updatePlayer()
    }
  }

  playerSprite = jsGame.add.sprite(player.x * TileSize, player.y * TileSize, "player");
}

function updatePlayer() {
  playerSprite.x = player.x * TileSize
  playerSprite.y = player.y * TileSize
}

function blocksMovement(tile) {
  // Returns if a given tile blocks movement
  // looks through array and returns if there is 0 or more
  // occurences of the given tile (i.e. it's in the array)

  //return (spritesBlockMovement.indexOf(tile) > -1)
  return false // for testing allow movement anywhere 
}