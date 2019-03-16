var Ball = function() {
    var image = imageFromPath('img/ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 15,
        speedY: 15,
        fired: false,
    }
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x + o.image.width > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + o.image.height > 300) {
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
        var xIn = x >= o.x && x<= o.x + o.image.width
        var yIn = y >= o.y && y<= o.y + o.image.height
        return xIn && yIn
    }
    return o
}
