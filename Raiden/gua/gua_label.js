class GuaLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(...args) {
        return new this(...args)
    }
    draw() {
        this.game.context.fillText(this.text, 150, 150)
    }
    update() {

    }
}
