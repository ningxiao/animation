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
    let x, y, ctx, mouse, bitmap, bitmapdata, canvas = document.getElementById('canvas');
    let centerX = 100;
    let centerY = 100;
    if (canvas) {
        x = config.width / 2;
        y = (config.height - 200) / 2;
        ctx = Utils.GetContext(canvas);
        mouse = Utils.CaptureMouse(canvas);
        canvas.setAttribute('width', config.width);
        canvas.setAttribute('height', config.height);

        function draw() {
            ctx.clearRect(0, 0, config.width, config.height);
            ctx.save(); //保存画布的状态
            ctx.drawImage(bitmapdata, x, y, 200, 200);
            ctx.restore(); //返回之前保存过的路径状态和属性
            window.requestAnimationFrame(draw);
        };

        function onmousemove() {};
        Utils.QueueImg([{ "test.jpg": "./image/timg.png" }], function(data) {
            let rad = -90 * Math.PI / 180;
            let a = 1,
                b = 0,
                c = 0,
                d = 1;
            if (rad) {
                a = Math.cos(rad);
                b = Math.sin(rad);
                c = -b;
                d = a;
            };
            bitmap = data;
            bitmapdata = bitmap["test.jpg"];
            ctx.save(); //保存画布的状态
            ctx.transform(1, 0, 0, 1, x, y);
            ctx.drawImage(bitmapdata, 0, 0, 200, 200);
            ctx.restore(); //返回之前保存过的路径状态和属性

            ctx.save(); //保存画布的状态
            ctx.translate(config.width, 0); //位移画布到最左边
            ctx.scale(-1, 1); //设置负数沿Y轴旋转
            ctx.transform(a, b, c, d, x + centerX, y + centerY);
            ctx.drawImage(bitmapdata, -centerX, -centerY, 200, 200);
            ctx.restore(); //返回之前保存过的路径状态和属性

            /** 
            ctx.save(); //保存画布的状态
            //ctx.translate(config.width, 0); //位移画布到最左边
            ctx.scale(-1, 1); //设置负数沿Y轴旋转
            //ctx.translate(x + centerX, y + centerY);
            ctx.translate(-x + centerX, y + centerY); //简化两次位移
            ctx.rotate(28 * Math.PI / 180);
            ctx.drawImage(bitmapdata, -centerX, -centerY, 200, 200);
            ctx.restore(); //返回之前保存过的路径状态和属性
            */
            //draw();
            // canvas.addEventListener('mousedown', function() {
            //     canvas.addEventListener('mousemove', onmousemove, false);
            // }, false);
            // canvas.addEventListener('mouseup', function() {
            //     canvas.removeEventListener('mousemove', onmousemove);
            // }, false);
        });
    };
})()