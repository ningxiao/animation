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
	let ctx, canvas = document.getElementById('canvas');
	let angle = 0;
	let range = 150;
	let centerY = config.height / 2;
	let xspeed = 3;
	let yspeed = 0.05;
	let xpos = 0;
	let ypos = centerY;

	function drawframe() {
		ctx.beginPath();
		ctx.moveTo(xpos, ypos);
		xpos += xspeed;
		angle += yspeed;
		ypos = centerY + Math.sin(angle) * range;
		ctx.lineTo(xpos, ypos);
		ctx.stroke();
		if (angle > 6.28) { //进行归零处理
			angle = 0;
		};
		if (xpos <= config.width) {
			window.requestAnimationFrame(drawframe);
		} else {
			console.log("结束");
		};
	};
	if (canvas) {
		ctx = Utils.GetContext(canvas);
		canvas.setAttribute('width', config.width);
		canvas.setAttribute('height', config.height);
		ctx.moveTo(0, centerY); //把路径移动到画布中的指定点，不创建线条
		ctx.lineTo(config.width, centerY);
		ctx.moveTo(config.width / 2, 0); //把路径移动到画布中的指定点，不创建线条
		ctx.lineTo(config.width / 2, config.height);
		ctx.stroke(); //绘制已定义的路径
		drawframe();
	};
})()