var SceneTitle = function(game) {
    var s = {
        game: game,
    }
    game.registerAction('k', function() {
        var s = Scene(game)
        game.replaceScene(s)
    })
    // 初始化
    s.upadte = function() {

    }
    s.draw = function() {
        // draw labels
        game.context.fillText('按 K 开始游戏', 150, 150)

    }

    return s
}
