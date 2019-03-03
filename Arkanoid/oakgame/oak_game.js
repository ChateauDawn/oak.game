var log = function() {
    console.log.apply(console, arguments)
}

var imageFromPath = function(path) {
    // 载入图片
    var img = new Image()
    img.src = path
    return img
}

var Paddle = function() {
    path = 'img/paddle.png'
    image = imageFromPath(path)
    p = {
        image: image,
        x: 100,
        y: 200,
        speed: 5,
    }
    return p
}

var __main = function() {
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')

    var paddle = Paddle()
    paddle.image.onload = function(){
        context.drawImage(paddle.image, paddle.x, paddle.y)
    }

    var leftDown = false
    var rightDown = false
    // events
    window.addEventListener('keydown', function(event){
        // log(event)
        var k = event.key
        if (k == 'a') {
            leftDown = true
        } else if (k == 'd') {
            rightDown = true
        }
    })

    window.addEventListener('keyup', function(event){
        // log(event)
        var k = event.key
        if (k == 'a') {
            leftDown = false
        } else if (k == 'd') {
            rightDown = false
        }
    })


    // 按帧率刷新
    setInterval(function(){
        // update x
        if (leftDown) {
            paddle.x -= paddle.speed
        } else if (rightDown) {
            paddle.x += paddle.speed
        }
        // clamp x
        if (paddle.x < 0) {
            paddle.x = 0
        } else if (paddle.x > canvas.width - paddle.image.width) {
            paddle.x = canvas.width - paddle.image.width
        }
        // draw 先清空画布，再重画
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(paddle.image, paddle.x, paddle.y)
    }, 1000/30)
}

__main()
