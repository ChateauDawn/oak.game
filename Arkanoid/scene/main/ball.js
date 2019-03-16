var Ball = function(game) {
    var image = game.images['ball']
    var o = {
        image: image,
        w: image.width,
        h: image.height,
        x: 100,
        y: 200,
        speedX: 12,
        speedY: 12,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x + o.w > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + o.h > 300) {
                o.speedY *= -1
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    // TODO，检测，左右碰撞，反弹 X
    o.rebound = function() {
        o.speedY *= -1
    }
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x<= o.x + o.w
        var yIn = y >= o.y && y<= o.y + o.h
        return xIn && yIn
    }
    return o
}
