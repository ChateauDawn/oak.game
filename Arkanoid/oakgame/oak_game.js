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
    var canvas = document.querySelector('#id-canvas')
    p = {
        image: image,
        x: 100,
        y: 200,
        speed: 5,
    }
    p.moveLeft = function() {
        p.x -= p.speed
        min = 0
        if (p.x < min) {
            p.x = min
        }
    }
    p.moveRight = function() {
        p.x += p.speed
        max = canvas.width - p.image.width
        if (p.x > max) {
            p.x = max
        }
    }
    return p
}

var __main = function() {
    var game = OakGame()

    var paddle = Paddle()

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })

    game.update = function() {
        // update
    }

    game.draw = function() {
        // draw
        game.drawImage(paddle)
    }
}

__main()
