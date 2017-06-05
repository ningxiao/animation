"use strict";
(function(exports) {
    let clientrect = document.documentElement.getBoundingClientRect();
    document.addEventListener('touchmove', (event) => {
        event.preventDefault();
    });
    exports.config = {
        'width': clientrect.width,
        'height': clientrect.height
    };
})(typeof exports === 'object' ? exports : window);
(function() {
    let ctx, mouse, canvas = document.getElementById('canvas');
    let pixels, imagedata, brush_color, brush_size = 25;
    let brush_density = 50;
    if (canvas) {
        ctx = Utils.GetContext(canvas);
        mouse = Utils.CaptureMouse(canvas);
        canvas.setAttribute('width', config.width);
        canvas.setAttribute('height', config.height);
        imagedata = ctx.getImageData(0, 0, config.width, config.height);
        pixels = imagedata.data;

        function onmousemove() {
            for (var i = 0; i < brush_density; i++) {
                var angle = Math.random() * Math.PI * 2; //随机产生一个弧度值0-2π
                var radius = Math.random() * brush_size; //随机产生一个圆半径0-50
                var xpos = (mouse.x + Math.cos(angle) * radius) | 0; //三角函数求出X坐标
                var ypos = (mouse.y + Math.sin(angle) * radius) | 0; //三角函数求出Y坐标
                var offset = (xpos + ypos * imagedata.width) * 4; //获取像素起始坐标rgba 数组四位一个颜色
                pixels[offset] = brush_color >> 16 & 0xff; //获取红色
                pixels[offset + 1] = brush_color >> 8 & 0xff; //获取绿色
                pixels[offset + 2] = brush_color & 0xff; //获取蓝色
                pixels[offset + 3] = 255;
            };
            ctx.putImageData(imagedata, 0, 0);
        };
        canvas.addEventListener('mousedown', function() {
            brush_color = Utils.ParseColor(Math.random() * 0xffffff, true);
            canvas.addEventListener('mousemove', onmousemove, false);
        }, false);
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onmousemove);
        }, false);
    };
})()