var Scene = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle.instance(game)
    var ball = Ball.instance(game)

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
    s.update = function() {
        if (window.paused) {
            return
        }
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y + paddle.h) {
            var end = SceneEnd.new(game)
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
// class Scene extends OakScene {
//     constructor(game) {
//         super(game)
//         // 初始化
//         this.paddle = Paddle(game)
//         this.ball = Ball(game)
//         this.score = 0
//         // 初始关卡
//         blocks = loadLevel(this.game, 1)
//
//         game.registerAction('a', function() {
//             paddle.moveLeft()
//         })
//         game.registerAction('d', function() {
//             paddle.moveRight()
//         })
//         game.registerAction('f', function() {
//             ball.fire()
//         })
//         // mouse event
//         var enableDrag = false
//         var self = this
//         self.game.canvas.addEventListener('mousedown', function(event) {
//             var x = event.offsetX
//             var y = event.offsetY
//             // 检查是否点中了 ball
//             if (self.ball.hasPoint(x, y)) {
//                 // 设置拖拽状态
//                 enableDrag = true
//             }
//         })
//         self.game.canvas.addEventListener('mousemove', function(event) {
//             var x = event.offsetX
//             var y = event.offsetY
//             // 检查是否点中了 ball
//             if (enableDrag) {
//                 self.ball.x = x
//                 self.ball.y = y
//             }
//         })
//         self.game.canvas.addEventListener('mouseup', function(event) {
//             enableDrag = false
//         })
//     }
//     draw() {
//         // draw 背景
//         // this.game.context.fillStyle = "#554"
//         // this.game.context.fillRect(0, 0, 400, 300)
//
//         // draw
//         this.game.drawImage(this.paddle)
//         this.game.drawImage(this.ball)
//         // draw block
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 this.game.drawImage(block)
//             }
//         }
//         // draw labels
//         this.game.context.fillText('分数： ' + this.score, 10, 290)
//
//     }
//     update() {
//         if (window.paused) {
//             return
//         }
//         this.ball.move()
//         // 判断游戏结束
//         if (this.ball.y > this.paddle.y + this.paddle.h) {
//             var end = SceneEnd.new(this.game)
//             this.game.replaceScene(end)
//         }
//         // 判断相撞
//         if (this.paddle.collide(this.ball)) {
//             this.ball.rebound()
//
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 block.kill()
//                 this.ball.rebound()
//                 // 更新分数
//                 this.score += 100
//             }
//         }
//     }
// }
