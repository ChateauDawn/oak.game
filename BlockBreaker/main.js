var log = function () {
  console.log.apply(console, arguments);
};

function imageFromPath(path) {
  var img = new Image(); // 创建一个<img>元素
  img.src = path; // 设置图片源地址
  return img;
}

function Paddle() {
  var p = {};
  p.img = imageFromPath("img/paddle.png");
  p.x = 150;
  p.y = 250;
  p.speed = 5;
  return p;
}

function __main() {
  var canvas = document.getElementById("id-canvas");
  var ctx = canvas.getContext("2d");
  var fps = 30;
  // 挡板
  var p = new Paddle();
  p.img.onload = function () {
    ctx.drawImage(p.img, p.x, p.y);
  };

  var leftDown = false;
  var rightDown = false;
  window.addEventListener("keydown", (event) => {
    var k = event.key;
    if (k == "a") {
      leftDown = true;
    } else if (k == "d") {
      rightDown = true;
    }
  });

  window.addEventListener("keyup", (event) => {
    var k = event.key;
    if (k == "a") {
      leftDown = false;
    } else if (k == "d") {
      rightDown = false;
    }
  });

  setInterval(() => {
    if (leftDown) {
      p.x -= p.speed;
    } else if (rightDown) {
      p.x += p.speed;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(p.img, p.x, p.y);
  }, 1000 / fps);
}

__main();
