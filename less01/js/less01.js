"use strict";
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
(function (exports) {
	let clientrect = document.documentElement.getBoundingClientRect();
	document.addEventListener('touchmove', (event) => {
		event.preventDefault();
	});
	exports.config = {
		'width': clientrect.width,
		'height': clientrect.height
	};
})(typeof exports === 'object' ? exports : window);

(function () {
	const radian = 30 / 180 * Math.PI;
	let dx, dy, ctx, arui, mouse;
	let canvas = document.getElementById('canvas');
	function marking() {
		ctx.save();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#ff0000'; //设置线条颜色
		ctx.beginPath();
		ctx.moveTo(0, config.height / 2);
		ctx.lineTo(config.width, config.height / 2);
		ctx.moveTo(config.width / 2, 0);
		ctx.lineTo(config.width / 2, config.height);
		ctx.stroke(); //绘制已定义的路径进行描边
		ctx.restore(); //返回之前保存过的路径状态和属性
	}
	function drawframe() {
		ctx.clearRect(0, 0, config.width, config.height);
		dx = mouse.x - arui.x;
		dy = mouse.y - arui.y;
		//利用三角函数反正切计算出弧度值
		arui.rotation = Math.atan2(dy, dx);
		marking();
		arui.draw(ctx);
		ctx.save();
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = '#ff0000'; //设置线条颜色
		ctx.beginPath();
		ctx.moveTo(arui.x, arui.y);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.moveTo(mouse.x, mouse.y);
		ctx.lineTo(mouse.x + 100 * Math.cos(arui.rotation - radian), mouse.y + 100 * Math.sin(arui.rotation - radian));
		ctx.moveTo(mouse.x, mouse.y);
		ctx.lineTo(mouse.x + 100 * Math.cos(arui.rotation + radian), mouse.y + 100 * Math.sin(arui.rotation + radian));
		ctx.stroke(); //绘制已定义的路径进行描边
		ctx.restore(); //返回之前保存过的路径状态和属性
		window.requestAnimationFrame(drawframe);
	};
	if (canvas) {
		ctx = Utils.GetContext(canvas);
		mouse = Utils.CaptureMouse(canvas);
		canvas.setAttribute('width', config.width);
		canvas.setAttribute('height', config.height);
		arui = new Arrow(config.width / 2, config.height / 2);
		drawframe();
	};
})()