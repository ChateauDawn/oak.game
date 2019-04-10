class GuaAnimation{
    constructor(game) {
        this.game = game
        // 为了省事，hard code 一套动画
        this.animations = {
            idle: [],
            run: [],
        }
        for (var i = 0; i < 10; i++) {
            var name = `idle${i}`
            var t = game.images[name]
            this.animations['idle'].push(t)
        }
        for (var i = 0; i < 10; i++) {
            var name = `run${i}`
            var t = game.images[name]
            this.animations['run'].push(t)
        }
        this.animationName ='idle'
        this.texture = this.frames()[0]
        this.frameIndex = 0
        this.frameCount = 2
    }
    static new(...args) {
        return new this(...args)
    }
    frames() {
        return this.animations[this.animationName]
    }
    update() {
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 2
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        this.game.drawImage(this)
    }
    move(x, keyStatus) {
        this.x += x
        var animationNames = {
            down: 'run',
            up: 'idle',
        }
        var name = animationNames[keyStatus]
        this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
}
