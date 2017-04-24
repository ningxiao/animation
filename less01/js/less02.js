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
(function() {
	let angle = 0;
	let rad = config.height / 2;
	let ctx, ball, canvas = document.getElementById('canvas');

	function drawframe() {
		ctx.clearRect(0, 0, config.width, config.height);
		ball.y = rad + Math.sin(angle) * 50;
		ball.x += 1;
		ball.draw(ctx);
		angle += 0.05;
		if (angle > 6.28) { //进行归零处理
			angle = 0;
		};
		if (ball.x <= config.width) {
			window.requestAnimationFrame(drawframe);
		};
	};
	if (canvas) {
		ctx = Utils.GetContext(canvas);
		canvas.setAttribute('width', config.width);
		canvas.setAttribute('height', config.height);
		ball = new Ball();
		ball.x = 0;
		ball.y = canvas.height / 2;
		ball.addqueue(function() {
			ctx.moveTo(0, rad); //把路径移动到画布中的指定点，不创建线条
			ctx.lineTo(config.width, rad);
			ctx.moveTo(config.width / 2, 0); //把路径移动到画布中的指定点，不创建线条
			ctx.lineTo(config.width / 2, config.height);
			ctx.stroke(); //绘制已定义的路径
		});
		drawframe();
	};
})()