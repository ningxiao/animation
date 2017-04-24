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
	let angle = Math.atan2(1, 0);
	let speed = 0.05;
	let radiusX = 150;
	let radiusY = 100;
	let centerY = config.height / 2;
	let centerX = config.width / 2;
	let ox = centerX + Math.sin(angle) * radiusX;
	let oy = centerY + Math.cos(angle) * radiusY;

	function drawframe() {
		ctx.beginPath();
		ctx.moveTo(ox, oy);
		ox = centerX + Math.sin(angle) * radiusX;
		oy = centerY + Math.cos(angle) * radiusY;
		//console.log(ox, oy);
		ctx.lineTo(ox, oy);
		ctx.stroke();
		angle += speed;
		// if (angle > 6.28) { //进行归零处理
		// 	angle = 0;
		// };
		// if (xpos <= config.width) {
		// 	window.requestAnimationFrame(drawframe);
		// } else {
		// 	console.log("结束");
		// };
		window.requestAnimationFrame(drawframe);
	};
	if (canvas) {
		ctx = Utils.GetContext(canvas);
		canvas.setAttribute('width', config.width);
		canvas.setAttribute('height', config.height);
		ctx.moveTo(0, centerY); //把路径移动到画布中的指定点，不创建线条
		ctx.lineTo(config.width, centerY);
		ctx.moveTo(centerX, 0); //把路径移动到画布中的指定点，不创建线条
		ctx.lineTo(centerX, config.height);
		ctx.stroke(); //绘制已定义的路径
		drawframe();
	};
})()