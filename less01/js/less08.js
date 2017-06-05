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
    if (canvas) {
        let x0 = 0;
        let y0 = config.height / 2;
        let x2 = config.width;
        let y2 = config.height / 2;
        ctx = Utils.GetContext(canvas);
        mouse = Utils.CaptureMouse(canvas);
        canvas.setAttribute('width', config.width);
        canvas.setAttribute('height', config.height);
        canvas.addEventListener('mousemove', function(ev) {
            //曲线穿过控制点
            let x1 = mouse.x * 2 - (x0 + x2) / 2;
            let y1 = mouse.y * 2 - (y0 + y2) / 2;
            ctx.clearRect(0, 0, config.width, config.height); //清除画布
            ctx.beginPath(); //起始一条路径，或重置当前路径
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(x1, y1, x2, y2); //	创建二次贝塞尔曲线
            ctx.stroke(); //绘制已定义的路径
        }, false);
    };
})()