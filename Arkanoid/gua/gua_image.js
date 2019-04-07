class GuaImage {
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
    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    rectIntersects(other) {
        var a = this
        var b = other
        var aInb = this.aInb
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
}
