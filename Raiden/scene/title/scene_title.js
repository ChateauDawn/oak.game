class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var label = GuaLabel.new(this.game, 'hello from gua')
        this.addElement(label)

        var r = GuaAnimation.new(this.game)
        r.x = 0
        r.y = 100
        this.r = r
        this.addElement(r)
    }
    setupInputs() {
        var game = this.game
        var self = this
        // game.registerAction('k', function() {
        //     var s = Scene.new(game)
        //     game.replaceScene(s)
        // })
        game.registerAction('a', function() {
            self.r.move(-2)
        })
        game.registerAction('d', function() {
            self.r.move(2)
        })
    }
}
