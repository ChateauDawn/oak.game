class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(img){
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }
    update() {
        this.debug && this.debug()
        if (this.debugModeEnabled) {
            for (var e of this.elements) {
                e.debug && e.debug()
            }
        }
        for (var e of this.elements) {
            e.update()
        }
    }
}
