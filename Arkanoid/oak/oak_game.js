class OakGame {
    constructor(fps, images, sceneCallback) {
        window.fps = fps
        this.images = images
        this.sceneCallback = sceneCallback
        //
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        //
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function(event) {
            self.keydowns[event.key] = false
        })

        this.init()
    }
    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }
    update() {
        this.scene.update()
    }
    draw() {
        this.scene.draw()
    }
    // 注册事件的 callback
    registerAction(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        var self = this
        // events
        var actions = Object.keys(self.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (self.keydowns[key]) {
                // 如果按键被按下，调用注册的 action
                self.actions[key]()
            }
        }
        // update
        self.update()
        // clear
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)
        // draw
        self.draw()
        // next run loop
        setTimeout(function() {
            self.runloop()
        }, 1000 / window.fps)
    }
    init() {
        var self = this
        // 用于判断是否所有图片都载入完成
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(self.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            let path = self.images[name]
            let img = new Image()
            img.src = path
            // 载入后
            img.onload = function() {
                // 存入 images
                self.images[name] = img
                // 所有图片都载入完成后，调用 run
                loads.push(1)
                if (loads.length == names.length) {
                    self.__start()
                }
            }
        }
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start(scene){
        var self = this
        //
        scene = self.sceneCallback(self)
        self.replaceScene(scene)
        // 开始运行程序
        setTimeout(function(){
            self.runloop()
        }, 1000 / fps)
    }
}
