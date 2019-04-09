var log = function() {
    console.log.apply(console, arguments)
}

var imageFromPath = function(path) {
    // 载入图片
    var img = new Image()
    img.src = path
    return img
}

var rectIntersects = function(a, b) {
    if (b.x < a.x + a.w &&
        b.x + b.w > a.x &&
        b.y + b.h > a.y &&
        b.y < a.y + a.h) {
        return true
    }
    return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
