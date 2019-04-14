var e = sel => document.querySelector(sel)

var es = sel => document.querySelectorAll(sel)

var bindAll = function(sel, eventName, callback) {
    var elements = es(sel)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.addEventListener(eventName, function(event) {
            callback(event)
        })
    }
}

var templateControl = function(key, item) {
    var t = `
        <div class="">
            <label>
                <input class="gua-auto-slider" type="range"
                    max="300"
                    value="${item.value}"
                    data-value="config.${key}"
                    >
                ${item._comment}：<span class="gua-label"></span>
            </label>
        </div>
    `
    return t
}

var insertControls = function() {
    var div = e('.gua-controls')
    var keys = Object.keys(config)
    for (var k of keys) {
        var item = config[k]
        var html = templateControl(k, item)
        div.insertAdjacentHTML('beforeend', html)
    }
}

var bindEvents = function() {
    bindAll(".gua-auto-slider", "input", function(event) {
        var target = event.target
        var bindVar = target.dataset.value
        var v = target.value
        // config[bindVar].value = v
        eval(bindVar + '.value=' + v)
        //
        var label = target.closest("label").querySelector(".gua-label")
        label.innerText = v
    })
}

var _main = function() {
    // 从配置文件中生成 HTML 控件
    insertControls()
    // 绑定事件
    bindEvents()
}

_main()
