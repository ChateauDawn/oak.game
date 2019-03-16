class Paddle {
    constructor(game) {
        var image = game.images['paddle']
        this.image = image
        this.w = image.width
        this.h = image.height
        this.x = 130
        this.y = 260
        this.speed = 20
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
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
    rectIntersects(a, b) {
        if (b.x < a.x + a.w &&
            b.x + b.w > a.x &&
            b.y + b.h > a.y &&
            b.y < a.y + a.h) {
            return true
        }
        return false
    }
    collide(ball) {
        return this.rectIntersects(this, ball)
    }
}
