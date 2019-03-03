var log = function() {
    console.log.apply(console, arguments)
}

var imageFromPath = function(path) {
    // 载入图片
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    if (b.x < a.x + a.image.width &&
        b.x + b.image.width > a.x &&
        b.y + b.image.height > a.y &&
        b.y < a.y + a.image.height) {
        return true
    }
    return false
}

var __main = function() {
    var fps = 30
    var game = OakGame(fps)
    var paused = false

    var paddle = Paddle()
    var ball = Ball()
    var blocks = []
    for (var i = 0; i < 8; i++) {
        var b = Block()
        b.x = i * 50
        b.y = 50
        blocks.push(b)
    }

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })
    window.addEventListener('keydown', function(event) {
        if (event.key == 'p') {
            paused = !paused
        }
    })

    game.update = function() {
        if (paused) {
            return
        }
        ball.move()
        // 判断相撞
        if (paddle.collide(ball)) {
            ball.rebound()

        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                ball.rebound()
            }
        }
    }

    game.draw = function() {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        // draw block
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }
}

__main()
