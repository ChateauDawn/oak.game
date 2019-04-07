const config = {
    player_speed: 10,
    bullet_speed: 5,
    enemy_speed: 5,
    cloud_speed: 1,
    fire_cooldown: 6,

}

class Bullet extends GuaImage {
    constructor(game) {
        super(game, "bullet")
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update()　{
        // this.speed = config.bullet_speed
        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, "player")
        this.setup()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire()　{
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = "enemy" + String(type)
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update()　{
        this.speed = config.enemy_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        super(game, "cloud")
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update()　{
        this.speed = config.cloud_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // 初始化
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(game, 'sky')
        this.cloud = Cloud.new(game)
        this.player = Player.new(game)
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        //
        this.addEnemies()
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction('a', function() {
            s.player.moveLeft()
        })
        g.registerAction('d', function() {
            s.player.moveRight()
        })
        g.registerAction('w', function() {
            s.player.moveUp()
        })
        g.registerAction('s', function() {
            s.player.moveDown()
        })
        g.registerAction('j', function() {
            s.player.fire()
        })
    }
    update() {
        super.update()
        this.cloud.y += 1
    }
}

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
