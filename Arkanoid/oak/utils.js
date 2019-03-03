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
    if (b.x < a.x + a.image.width &&
        b.x + b.image.width > a.x &&
        b.y + b.image.height > a.y &&
        b.y < a.y + a.image.height) {
        return true
    }
    return false
}
