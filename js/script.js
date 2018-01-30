var Game = {
  canvas:  document.getElementById('canvas'),
  status:  document.getElementById('status'),
  context: canvas.getContext('2d')
}

Game.canvas.width  = window.innerWidth
Game.canvas.height = window.innerHeight

function renderBackground() {
  Game.context.fillStyle = 'rgba(0,0,0,1)'
  Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height)
}

function Component(x, y, color) {
  // Position
  this.x = x || 20
  this.y = y || 20

  // Velocity
  this.vx = 1
  this.vy = 1

  // Dimensions
  this.w = 100
  this.h = 20
  this.r = 10

  // Style
  this.color = color || 'white'
}

Component.prototype = {
  getCoordinates: function() {
    return 'X: ' + this.x + ', Y: ' + this.y
  },

  renderBrick: function() {
    Game.context.beginPath()
    Game.context.fillStyle = this.color
    Game.context.fillRect(this.x, this.y, this.w, this.h)
    Game.context.fill()
  },

  renderBall: function() {
    Game.context.beginPath()
    Game.context.fillStyle = this.color
    Game.context.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    Game.context.fill()
  },

  physics: function() {
    if(this.x + this.r >= Game.canvas.width  || this.x - this.r <= 0) this.vx = -(this.vx)
    if(this.y + this.r >= Game.canvas.height || this.y - this.r <= 0) this.vy = -(this.vy)

    this.x += this.vx
    this.y += this.vy
  }
}

// Initialize

var ball  = new Component()
var platform = new Component(0, 0, 'blue')
    platform.y = Game.canvas.height - platform.h - 5

function init() {
  renderBackground()

  ball.renderBall()
  platform.renderBrick()

  ball.physics()

  requestAnimationFrame(init)
}

init()
