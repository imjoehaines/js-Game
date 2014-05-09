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
