var Paddle = function(game) {
    var image = game.images['paddle']
    var o = {
        image: image,
        w: image.width,
        h: image.height,
        x: 130,
        y: 260,
        speed: 20,
    }
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.w) {
            x = 400 - o.w
        }
        o.x = x

    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)

    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    o.collide = function(ball) {
        return rectIntersects(o, ball)
    }
    return o
}
