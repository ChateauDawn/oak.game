class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = "enemy" + String(type)
        super(game, name)
        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update()　{
        // this.speed = config.enemy_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.enemy_speed
    }
}
