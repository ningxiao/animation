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
/**
 * 绘制球
 * 
 * @class Ball
 */
class Ball {
    constructor(radius, color) {
        this.queues;
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.lineWidth = 1;
        this.radius = radius || 40;
        this.color = color || "#ff0000";
    };
    addqueue(callback) {
        this.queues || (this.queues = []);
        this.queues.push(callback);
    };
    draw(ctx) {
        ctx.save(); //保存画布的状态
        ctx.translate(this.x, this.y); //重新映射画布上的 (0,0) 位置
        ctx.rotate(this.rotation); //旋转当前绘图
        ctx.scale(this.scaleX, this.scaleY); //对画布进行缩放
        ctx.lineWidth = this.lineWidth; //设置当前的线条宽度
        ctx.fillStyle = this.color; //设置或返回用于填充绘画的颜色、渐变或模式
        ctx.beginPath(); //起始一条路径，或重置当前路径
        /**
         	建圆 context.arc(x,y,r,sAngle,eAngle,counterclockwise);
         	x	圆的中心的 x 坐标。
        	y	圆的中心的 y 坐标。
        	r	圆的半径。
        	sAngle	起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
        	eAngle	结束角，以弧度计。
        	counterclockwise	可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
        */
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
        ctx.closePath(); //创建从当前点回到起始点的路径
        ctx.fill(); //填充当前绘图（路径）
        this.lineWidth && ctx.stroke();
        ctx.restore(); //返回之前保存过的路径状态和属性
        if (this.queues) {
            for (let i = 0; i < this.queues.length; i++) {
                this.queues[i]();
            };
        };
    };
};
/**
 * 绘制箭头函数
 * 
 * @class Arrow
 */
class Arrow {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.rotation = 0;
        this.color = "#ffff00";
        this.paths = [0, -25, 0, -50, 50, 0, 0, 50, 0, 25, -50, 25, -50, -25];
    };
    draw(ctx) {
        ctx.save(); //保存画布的状态
        ctx.translate(this.x, this.y); //重新映射画布上的 (0,0) 位置
        ctx.rotate(this.rotation); //旋转当前绘图
        ctx.lineWidth = 2; //设置当前的线条宽度
        ctx.fillStyle = this.color; //设置或返回用于填充绘画的颜色、渐变或模式
        ctx.beginPath(); //起始一条路径，或重置当前路径
        ctx.moveTo(-50, -25); //把路径移动到画布中的指定点，不创建线条
        for (let i = 0; i < this.paths.length; i += 2) {
            //添加一个新点，然后在画布中创建从该点到最后指定点的线条
            ctx.lineTo(this.paths[i], this.paths[i + 1]);
        };
        ctx.closePath(); //创建从当前点回到起始点的路径
        ctx.fill(); //填充当前绘图（路径）
        ctx.stroke(); //绘制已定义的路径
        ctx.restore(); //返回之前保存过的路径状态和属性
    };
};
/**
 * 1、通过x、y坐标使用Math.atan2 求出弧度
 * 2、在使用三角函数与已知的弧度、速度求出运动向量实现运动跟随转向
 */
(function() {
    let speed = 2;
    let vx, dx, dy, vy, angle = 75 * Math.PI / 180;
    let ctx, mouse, arrow, canvas = document.getElementById('canvas');
    /**
     * 两点间距离公式 计算出箭头中心点与鼠标点 距离是否大于2像素
     * 检测范围
     * @param {number} x 鼠标与箭头x坐标距离
     * @param {number} y 鼠标与箭头y坐标距离
     * @returns {boolean} true 没有碰撞 false碰撞
     */
    function hitTest(x, y) {
        if (Math.sqrt(x * x + y * y) > 2) {
            return true;
        };
        return false;
    };

    function drawframe() {
        dx = mouse.x - arrow.x;
        dy = mouse.y - arrow.y;
        if (hitTest(dx, dy)) {
            ctx.clearRect(0, 0, config.width, config.height);
            angle = Math.atan2(dy, dx);
            vx = Math.cos(angle) * speed;
            vy = Math.sin(angle) * speed;
            arrow.rotation = angle;
            arrow.y += vy;
            arrow.x += vx;
            arrow.draw(ctx);
        };
        window.requestAnimationFrame(drawframe);
    };
    if (canvas) {
        ctx = Utils.GetContext(canvas);
        canvas.setAttribute('width', config.width);
        canvas.setAttribute('height', config.height);
        mouse = Utils.CaptureMouse(canvas);
        arrow = new Arrow();
        arrow.x = 50;
        arrow.y = 100;
        drawframe();
    };
})()