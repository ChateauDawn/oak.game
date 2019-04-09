class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(...args) {
        return new this(...args)
    }
    draw() {
        this.game.context.fillText(this.text, 150, 150)
    }
    update() {

    }
}

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var game = this.game
        game.registerAction('k', function() {
            var s = Scene.new(game)
            game.replaceScene(s)
        })

        var label = GuaLabel.new(game, '按 K 开始游戏')
        this.addElement(label)

        var ps = GuaParticleSystem.new(game)
        this.addElement(ps)
    }
}
