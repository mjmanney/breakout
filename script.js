var canvas  = document.getElementById('canvas')
var context = canvas.getContext('2d')

//  Game canvas, mode, score, level, options, lives
var Breakout = {
	mode: [
		{action: 'start' , initial: 'paused' , to: 'running'  },
		{action: 'pause' , initial: 'running', to: 'pause'    },
		{action: 'end'   , initial: 'running', to: 'terminate'}
	],
	
	scoreboard: {
		score: 0,
		level: 1,
		lives: 3
	},
	
	court: {
		x: 0,
		y: 0,
		w: window.innerWidth,
		h: window.innerHeight
	},
    
    pieces: {
      bricks: [],
      balls: [],
      paddles: []
    },
  
    controls: function () {
        document.addEventListener('keypress', function (e) {
          var code = e.keyCode
          switch(code) {
            case 65:
            case 97:
              if(Paddle.x < Breakout.court.x) return
              Physics.movePaddleLeft()
              break;
            case 68 :
            case 100:
              if(Paddle.x + Paddle.w > Breakout.court.w) return
              Physics.movePaddleRight()
              break;
          }
        })
    },
	
	onStart: function () {},
	onPause: function () {},
	onEnd  : function () {},
	Init   : function () {
		Render.frame(0, 0, Breakout.court.w, Breakout.court.h)
        Physics.moveBall()
        Physics.borderCollision()
        requestAnimationFrame(Breakout.Init)
	}
}

//  Movement and collision
var Physics  = {
  moveBall: function () {
    Ball.x += Ball.vx
    Ball.y += Ball.vy
  },
  
  getBallPos: function () {
    var x = Ball.x
    var y = Ball.y
    return [x,y]
  },
  
  movePaddleLeft: function () {
    Paddle.x -= Paddle.vx
  },
  
  movePaddleRight: function () {
    Paddle.x += Paddle.vx
  },
  
  unitCollision: function () {
    var pos = getBallPos()
    var ballX = pos[0]
    var ballY = pos[1]
    
    
  },
  
  borderCollision: function () {
    if(Ball.x + Ball.d >= Breakout.court.w || Ball.x <= Breakout.court.x) Ball.vx = - Ball.vx
    if(Ball.y + Ball.d >= Breakout.court.h || Ball.y <= Breakout.court.y) Ball.vy = - Ball.vy
   // if(Paddle.x + Paddle.w >= Breakout.court.w || Paddle.x <= Breakout.court.x) Paddle.vx = - Paddle.vx
  }
}

//  Drawing and updating objects
var Render   = {
	frame: function (x, y, w, h) {
        canvas.width  = w
        canvas.height = h
        
        context.fillStyle = '#000'
        context.fillRect(0, 0, w, h)
        
        this.paddle(Paddle.x, Paddle.y, Paddle.w, Paddle.h, Paddle.color)
        this.ball(Ball.x, Ball.y, Ball.r, Ball.color)
		this.level(3, 5)
	},
	
	paddle: function (x, y, w, h, color) {
		context.beginPath()
        context.fillStyle = color
		context.fillRect(x, y, w, h)
		context.closePath()
	},
	
	ball: function (x, y, r, color) {
		context.beginPath()
		context.arc(x, y, r, 0, 2 * Math.PI)
        context.fillStyle = color
        context.fill()
        context.closePath()
	},
	
	level: function (row, col) {
      var i, j
      var x = 0
      var y = 0
    
      for(j = 0; j < row; j++) {
        var brick = Object.assign(Brick)
        for(i = 0; i < col; i++) {
          this.paddle(brick.x + x, brick.y + y, brick.w, brick.h, brick.color)
          x += Brick.marginX
        }
        x = 0
        y += Brick.marginY
      }
    }
}

//  User controlled object 
var Paddle   = {
	x : Breakout.court.w / 2  - 75,
	y : Breakout.court.h / 1.1,
	w : 150,
	h : 20,
	vx: 11,
	vy: 0,
	color: '#FFF'
}

var Brick    = {
	x : 20,
	y : 20,
	w : 95,
	h : 20,
	marginX: 100,
	marginY: 25,
	color: '#FFF'
}

//  Responds to collision
var Ball     = {
	x : 100,
	y : 100,
	vx: 2,
	vy: 2,
    d : 18,
	r : 9,
	color: '#FFF',
}

Breakout.controls()
requestAnimationFrame(Breakout.Init)
