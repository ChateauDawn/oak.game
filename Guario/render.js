/*
8x8 像素每个图块
2 bits 每个像素
16 bytes 一个图块

每页 8x8 个图块 就是 宽高 各 64 像素
*/
const e = sel => document.querySelector(sel)

const log = console.log.bind(console)

const ajax = request => {
    let r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    r.responseType = 'arraybuffer'
    r.onreadystatechange = event => {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    r.send()
}

const drawBlock = (context, data, x, y, pixelWidth) => {
    const colors = [
        '#5f96ff',
        '#db2b00',
        '#fe9a3a',
        '#8b7300',
    ]
    let w = pixelWidth
    let h = pixelWidth
    let pixelSize = 8
    for (let i = 0; i < pixelSize; i++) {
        let p1 = data[i]
        let p2 = data[i + 8]
        for (let j = 0; j < pixelSize; j++) {
            // 8 bits per line
            // 78 69  0100 1110  0100 0101
            // 在 j 循环中，每一次画一个像素点
            let c1 = (p1 >> (7 - j)) & 0b00000001
            let c2 = (p2 >> (7 - j)) & 0b00000001
            let pixel = (c2 << 1) + c1
            let color = colors[pixel]
            context.fillStyle = color
            let px = x + j * w
            let py = y + i * h
            context.fillRect(px, py, w, h)
        }
    }
}

const drawNes = bytes => {
    let canvas = e('#id-canvas')
    let context = canvas.getContext('2d')

    let blockSize = 8     // 一个图块 8 像素
    let pixelSize = 8
    let pixelWidth = 10
    let numberOfBytesPerBlock = 16
    //
    for (let i = 0; i < blockSize; i++) {
        for (let j = 0; j < blockSize; j++) {
            // 算出 bytes
            let x = j * pixelSize * pixelWidth
            let y = i * pixelSize * pixelWidth
            let index = window.offset + (i * 8 + j) * numberOfBytesPerBlock
            drawBlock(context, bytes.slice(index), x, y, pixelWidth)
        }
    }
}

const actions = {
    change_offset(offset) {
        window.offset += offset
        e('h3').innerHTML = window.offset
        drawNes(window.bytes)
    },
}

const bindEvents = () => {
    e('.gua-controls').addEventListener('click', event => {
        let action = event.target.dataset.action
        let offset = Number(event.target.dataset.offset)
        actions[action] && actions[action](offset)
    })
}

const __main = () => {
    window.offset = 32784
    let request = {
        method: 'GET',
        url: 'mario.nes',
        callback(r) {
            window.bytes = new Uint8Array(r)
            log('bytes', window.bytes)
            drawNes(window.bytes)
        },
    }
    ajax(request)

    bindEvents()
}

__main()
