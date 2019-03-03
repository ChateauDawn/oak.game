var log = function() {
    console.log.apply(console, arguments)
}

var imageFromPath = function(path) {
    // 载入图片
    var img = new Image()
    img.src = path
    return img
}

var OakGame = function() {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(oakImage) {
        g.context.drawImage(oakImage.image, oakImage.x, oakImage.y)
    }
    // events
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })
    // 注册事件的 action
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer
    setInterval(function() {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下，调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
    }, 1000 / 30)

    return g
}

var Paddle = function() {
    var image = imageFromPath('img/paddle.png')
    var o = {
        image: image,
        x: 100,
        y: 280,
        speed: 20,
    }
    o.moveLeft = function() {
        o.x -= o.speed
        min = 0
        if (o.x < min) {
            o.x = min
        }
    }
    o.moveRight = function() {
        o.x += o.speed
        // max = canvas.width - o.image.width
        max = 400 - o.image.width
        if (o.x > max) {
            o.x = max
        }
    }
    o.collide = function(ball) {
        if (ball.x < o.x + o.image.width &&
            ball.x + ball.image.width > o.x &&
            ball.y + ball.image.height > o.y &&
            ball.y < o.y + o.image.height) {
            return true
        }
        return false
    }
    return o
}

var Ball = function() {
    var image = imageFromPath('img/ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 10,
        speedY: 10,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x + o.image.width > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + o.image.height > 300) {
                o.speedY *= -1
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.rebound = function() {
        o.speedY *= -1
    }
    return o
}

var __main = function() {
    var game = OakGame()

    var paddle = Paddle()
    var ball = Ball()

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        ball.move()
        if (paddle.collide(ball)) {
            ball.rebound()

        }
    }

    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
    }
}

__main()
