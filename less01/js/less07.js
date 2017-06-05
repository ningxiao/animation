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
        ctx = Utils.GetContext(canvas);
        mouse = Utils.CaptureMouse(canvas);
        canvas.setAttribute('width', config.width);
        canvas.setAttribute('height', config.height);

        function onMouseMove(ev) {
            ctx.lineTo(mouse.x, mouse.y); //线段结束位置
            ctx.stroke(); //绘制已定义的路径
        };
        canvas.addEventListener("mousedown", function(ev) {
            ctx.strokeStyle = "red"; //线段颜色
            ctx.beginPath(); //划线
            ctx.moveTo(mouse.x, mouse.y); //划线起点
            canvas.addEventListener("mousemove", onMouseMove, false);
        }, false);
        canvas.addEventListener("mouseup", function(ev) {
            canvas.removeEventListener("mousemove", onMouseMove, false);
        }, false);
    };
})()