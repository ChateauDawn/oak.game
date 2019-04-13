class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, "fire")
        this.setup()
    }
    static new(...args) {
        return new this(...args)
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }
    static new(...args) {
        return new this(...args)
    }
    setup() {
        this.duration = 50
        this.x = 100
        this.y = 150
        this.numberOfParticles = 20
        this.particles = []
    }
    update() {
        this.duration--
        // if (this.duration < 0) {
        //
        // }
        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            // 设置初始化坐标
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)

        }
        // 更新所有的小火花
        for (var p  of this.particles) {
            p.update()
        }
        // 删除消失的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            // TODO: 这是一个临时方案
            // 应该从 scene 中删除自己
            return
        }
        for (var p  of this.particles) {
            p.draw()
        }
    }
}
