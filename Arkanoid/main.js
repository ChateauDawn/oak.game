var loadLevel = function(game, n) {
    n -= 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('123456789'.includes(k)) {
            // 关卡选择功能
            blocks = loadLevel(game, Number(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value) || 1
    })
}

var __main = function() {
    var fps = 20
    var images = {
        paddle: 'img/paddle.png',
        ball: 'img/ball.png',
        block: 'img/block.png',
    }
    var game = OakGame.instance(fps, images, function(g) {
        var s = SceneTitle.new(g)
        return s
    })

    enableDebugMode(game, true)
}

__main()
