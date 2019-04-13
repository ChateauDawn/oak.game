class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var label = GuaLabel.new(this.game, 'hello from gua')
        this.addElement(label)
        // player
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
        game.registerAction('a', function(keyStatus) {
            self.r.move(-5, keyStatus)
        })
        game.registerAction('d', function(keyStatus) {
            self.r.move(5, keyStatus)
        })
    }
}
