var Block = function() {
    var image = imageFromPath('img/block.png')
    var o = {
        image: image,
        x: 100,
        y: 50,
        w: 40,
        h: 19,
        alive: true,
    }

    o.kill = function() {
        o.alive = false
    }
    o.collide = function(ball) {
        return o.alive && rectIntersects(o, ball)
    }
    return o
}
