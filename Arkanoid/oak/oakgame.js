var OakGame = function(fps, images, sceneCallback) {
    // images 是一个对象, 里面是图片的引用名字和图片路径
    // 程序会在所有图片载入成功后才运行
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(oakImage) {
        g.context.drawImage(oakImage.image, oakImage.x, oakImage.y)
    }
    // events
    window.addEventListener('keydown', function(event) {
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keydowns[event.key] = false
    })
    // update
    g.update = function() {
        g.scene.upadte()
    }
    // draw
    g.draw = function() {
        g.scene.draw()
    }
    // 注册事件的 action(callback)
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }
    // timer
    window.fps = 30
    var runloop = function() {
        // events
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                // 如果按键被按下，调用注册的 action
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        // next run loop
        setTimeout(function() {
            runloop()
        }, 1000 / window.fps)
    }

    // 用于判断是否所有图片都载入完成
    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        let path = images[name]
        let img = new Image()
        img.src = path
        // 载入后
        img.onload = function() {
            // 存入 g.images
            g.images[name] = img
            // 所有图片都载入完成后，调用 g.run
            loads.push(1)
            if (loads.length == names.length) {
                g.__start()
            }
        }
    }
    // g.imageByName = function(name) {
    //     var img = g.images[name]
    //     var o = {
    //         w: img.width,
    //         h: img.height,
    //         image: img,
    //     }
    //     return o
    // }
    g.__start = function(scene){
        //
        scene = sceneCallback(g)
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            runloop()
        }, 1000 / fps)
    }

    return g
}
