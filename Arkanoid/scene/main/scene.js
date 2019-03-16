var Scene = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0
    // 初始关卡
    blocks = loadLevel(game, 1)

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })
    s.upadte = function() {
        if (window.paused) {
            return
        }
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y + paddle.h) {
            var end = SceneEnd(game)
            game.replaceScene(end)
        }
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
                // 更新分数
                score += 100
            }
        }
    }
    s.draw = function() {
        // draw 背景
        // game.context.fillStyle = "#554"
        // game.context.fillRect(0, 0, 400, 300)

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
        // draw labels
        game.context.fillText('分数： ' + score, 10, 290)

    }
    // mouse event
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // 检查是否点中了 ball
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // 检查是否点中了 ball
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        enableDrag = false
    })

    return s
}
