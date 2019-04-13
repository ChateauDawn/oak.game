class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        // label
        // var label = GuaLabel.new(game, 'hello from gua')
        // this.addElement(label)

        // background
        var bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 循环移动地面
        this.grounds = []
        for (var i = 0; i < 15; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 30
            g.y = 440
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4
        // bird
        var b = GuaAnimation.new(game)
        b.x = 120
        b.y = 200
        this.bird = b
        this.addElement(b)
    }
    update() {
        super.update()
        // 地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < this.grounds.length; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
    }
    setupInputs() {
        var game = this.game
        var self = this
        var b = this.bird
        // game.registerAction('k', function() {
        //     var s = Scene.new(game)
        //     game.replaceScene(s)
        // })
        game.registerAction('a', function(keyStatus) {
            b.move(-5, keyStatus)
        })
        game.registerAction('d', function(keyStatus) {
            b.move(5, keyStatus)
        })
        game.registerAction('j', function(keyStatus) {
            b.jump()
        })
    }
}
