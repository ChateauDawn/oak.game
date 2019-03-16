class OakImage {
    constructor(game, name) {
        var image = game.images[name]
        this.image = image
        this.w = image.width
        this.h = image.height
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    static new(...args) {
        return new this(...args)
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
}
