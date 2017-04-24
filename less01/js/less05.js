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
	let rect = {
		x: config.width / 2,
		y: config.height / 2
	};

	function drawframe() {
		let dx = rect.x - mouse.x;
		let dy = rect.y - mouse.y;
		let dist = Math.sqrt(dx * dx + dy * dy);
		ctx.clearRect(0, 0, config.width, config.height);
		ctx.fillStyle = "#000000";
		ctx.fillRect(rect.x - 2, rect.y - 2, 4, 4);
		ctx.beginPath();
		ctx.moveTo(0, config.height / 2); //把路径移动到画布中的指定点，不创建线条
		ctx.lineTo(config.width, config.height / 2);
		ctx.moveTo(config.width / 2, 0); //把路径移动到画布中的指定点，不创建线条
		ctx.lineTo(config.width / 2, config.height);
		ctx.moveTo(rect.x, rect.y);
		ctx.lineTo(mouse.x, mouse.y);
		ctx.closePath();
		ctx.stroke();
		ctx.font = "20px";
		ctx.fillText("两点距离：" + dist, 10, 50);
		window.requestAnimationFrame(drawframe);
	};
	if (canvas) {
		ctx = Utils.GetContext(canvas);
		mouse = Utils.CaptureMouse(canvas);
		canvas.setAttribute('width', config.width);
		canvas.setAttribute('height', config.height);
		drawframe();
	};
})()