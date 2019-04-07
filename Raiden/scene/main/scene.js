// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle.new(game)
//     var ball = Ball.new(game)
//
//     var score = 0
//     // 初始关卡
//     window.blocks = loadLevel(game, 1)
//
//     game.registerAction('a', function() {
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function() {
//         paddle.moveRight()
//     })
//     game.registerAction('f', function() {
//         ball.fire()
//     })
//     s.draw = function() {
//         // draw 背景
//         // game.context.fillStyle = "#554"
//         // game.context.fillRect(0, 0, 400, 300)
//
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw block
//         for (let i = 0; i < window.blocks.length; i++) {
//             let block = window.blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数： ' + score, 10, 290)
//
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y + paddle.h) {
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             ball.rebound()
//
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 block.kill()
//                 ball.rebound()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // 检查是否点中了 ball
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         enableDrag = false
//     })
//
//     return s
// }

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // 初始化
        this.setup()
    }
    setup() {
        var game = this.game
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = GuaImage.new(game, 'cloud')
        this.player = GuaImage.new(game, 'player')
        this.player.x = 100
        this.player.y = 150
        // this.game.registerAction('a', function() {
        //     this.moveLeft()
        // })
        // this.game.registerAction('d', function() {
        //     this.moveRight()
        // })
        // this.game.registerAction('k', function() {
        //     this.fire()
        // })

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
    }
    update() {
        this.cloud.y += 1
    }
}
