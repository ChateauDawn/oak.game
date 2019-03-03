var loadLevel = function(n) {
    n -= 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var b = Block(level[i])
        blocks.push(b)
    }
    return blocks
}

var blocks = []
var enableDebugMode = function(enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('123456789'.includes(k)) {
            // 关卡选择功能
            blocks = loadLevel(Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var __main = function() {
    enableDebugMode(true)

    var fps = 30
    var game = OakGame(fps)

    var paddle = Paddle()
    var ball = Ball()

    // 初始关卡
    blocks = loadLevel(1)

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
        if (window.paused) {
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
