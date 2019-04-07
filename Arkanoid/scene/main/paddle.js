class Paddle extends GuaImage {
    constructor(game) {
        super(game, 'paddle')
        this.x = 130
        this.y = 260
        this.speed = 20
    }
    move(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - this.w) {
            x = 400 - this.w
        }
        this.x = x
    }
    moveLeft() {
        this.move(this.x - this.speed)

    }
    moveRight() {
        this.move(this.x + this.speed)
    }
    collide(ball) {
        return this.rectIntersects(this, ball)
    }
}
