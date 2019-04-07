class Block extends GuaImage {
    constructor(game, position) {
        // position 是 [0, 0] 格式
        super(game, 'block')
        var p = position
        this.x = p[0]
        this.y = p[1]
        this.lifes = p[2] || 1
        this.alive = true
    }
    kill(x) {
        this.lifes--
        if (this.lifes < 1) {
            this.alive = false
        }
    }
    collide(ball) {
        return this.alive && this.rectIntersects(ball)
    }
}
