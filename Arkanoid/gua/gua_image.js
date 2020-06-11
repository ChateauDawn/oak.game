class GuaImage {
    constructor(game, name) {
        this.texture = game.images[name]
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    static new(...args) {
        return new this(...args)
    }
    centerPoint() {
        // 因为图片的坐标原点在左上角
        let cx = this.x + this.w / 2
        let cy = this.y - this.h / 2
        return [cx, cy]
    }
    rectIntersects(other) {
        let [ax, ay] = this.centerPoint()
        let [bx, by] = other.centerPoint()
        // 中心点距离 x轴小于宽之和的一半 且 y轴小于高之和的一半
        let dx = Math.abs(ax - bx)
        let dy = Math.abs(ay - by)
        let halfWidth = (this.w + other.w) / 2
        let halfHeight = (this.h + other.h) / 2
        return dx < halfWidth && dy < halfHeight
    }
}
