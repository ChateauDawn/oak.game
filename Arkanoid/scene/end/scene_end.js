var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    game.registerAction('r', function() {
        var s = SceneTitle(game)
        game.replaceScene(s)
    })
    // 初始化
    s.upadte = function() {

    }
    s.draw = function() {
        // draw labels
        game.context.fillText('按 R 重玩', 170, 150)

    }

    return s
}
