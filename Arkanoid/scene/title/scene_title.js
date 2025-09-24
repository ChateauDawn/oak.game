class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('f', function() {
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillText('按 F 开始游戏', 150, 150)
    }
}
