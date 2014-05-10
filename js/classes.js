// better random ints
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// room class
function Room(x, y, width, height) {
  this.x = x //topleft corner x coord
  this.y = y //topleft corner y coord
  this.width = width
  this.height = height

  // bottom right x & y coords
  this.brX = this.x + this.width
  this.brY = this.y + this.height

  this.center = [Math.floor((this.y + this.brY) / 2), Math.floor((this.x + this.brX) / 2)]

  this.intersects = function(otherRoom) {
    return (this.x <= otherRoom.brX && this.brX >= otherRoom.x
            && this.y <= otherRoom.brY && otherRoom.brY >= otherRoom.y);
  }
}

function Actor(x, y, faction, hp, strength, agility, magic) {
  this.x = x
  this.y = y
  this.faction = faction
  this.hp = hp
  this.strength = strength
  this.agility = agility
  this.magic = magic

  this.moveTo = function(x, y) {
    if (!blocksMovement(map[y][x])) {     
      var other = collideWithOther(x, y);
      var isHostile = otherIsHostile(this, other)
      
      if (other) { // if there's a collision
        if (isHostile) { // if the other is hostile
          attackOther(this, other) // kill them
          this.y = y // move
          this.x = x
          updateActor(this) // update sprite
        }
        else { // if collision & not hostile
          return // don't move
        }
      }
      else { // no collision - just move
        this.y = y
        this.x = x
        updateActor(this)
      }
    }
  } //moveTo

}