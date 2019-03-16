class Ball extends OakImage {
    constructor(game) {
        super(game, 'ball')
        this.x = 100
        this.y = 200
        this.speedX = 12
        this.speedY = 12
        this.fired = false
    }
    fire() {
        this.fired = true
    }
    move() {
        if (this.fired) {
            // log('move')
            if (this.x < 0 || this.x + this.w > 400) {
                this.speedX *= -1
            }
            if (this.y < 0 || this.y + this.h > 300) {
                this.speedY *= -1
            }
            // move
            this.x += this.speedX
            this.y += this.speedY
        }
    }
    // TODO，检测，左右碰撞，反弹 X
    rebound() {
        this.speedY *= -1
    }
    hasPoint(x, y) {
        var xIn = x >= this.x && x<= this.x + this.w
        var yIn = y >= this.y && y<= this.y + this.h
        return xIn && yIn
    }
}
