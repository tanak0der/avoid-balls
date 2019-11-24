"use strict";

let ctx;             // ボールとムーブボックスの描画
let mvb;             // ムーブボックスの座標
let ballCount = 10;  // １ステージの設定ボール数
let balls = [];      // ボールオブジェクト
let stageLevel = 1;       // 現在のステージレベル
let loopReqId = 0;   // ループ停止用のID
let pressedKeys = {
	up: false,
	down: false
}
const keyMap = {
	87: "up",
	83: "down"
}
let carefulMode = true;

function init () {
	initDraw();
	createBallObject();
	mvb = {
	 	x: 242,
	 	y: 465
	}
	ctx = document.getElementById("moveableBox").getContext("2d");

	document.getElementById("stageLevel").textContent = stageLevel;
	document.getElementById("carefulMode").textContent = carefulMode ? "オン" : "オフ";
	loopReqId = window.requestAnimationFrame(loop);
	window.addEventListener("keydown", keydown, false);
	window.addEventListener("keyup", keyup, false);
	window.addEventListener("keydown", cahangeCarefulMode, false);
	window.addEventListener("keydown", collapse, false);
}

function createBallObject() {
	ballCount++;
	balls = [];
	for (let i = 0;i < ballCount;i++) {
		balls.push(new Ball());
	}
	for (let i = 0;i < balls.length;i++) {
		balls[i].changeDir(Math.random() * Math.PI / 2 + Math.PI / 4);
	}
}

// ムーブボックスとボールの次フレーム座標を算出
function update() {
	for (let i = 0;i < balls.length;i++) {
		balls[i].move();
	}
	if (pressedKeys.up) {
		mvb.y -= 5;
	}
	if (pressedKeys.down) {
		if (mvb.y < 480) {
			mvb.y += 5;  		
  		}
  	}
}

// 算出した座標でムーブボックスとボールを再描画
function draw() {
	ctx.clearRect(0, 0, 500, 500);
	for (let i = 0; i < balls.length;i++) {
		ctx.beginPath();
		ctx.arc(balls[i].x, balls[i].y, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
		ctx.fill();
	}
	ctx.fill();
	ctx.fillRect(242, mvb.y, 16, 16);
}

// 1秒間に約６０回実行
function loop() {
	update();
	draw();
	loopReqId = window.requestAnimationFrame(loop);		// loop関数を再帰的に呼び出す

	// ゴール判定
	if (mvb.y < 15) {
		nextStageStart();
	}

	// ボールとの衝突判定
	for (let i = 0;i < balls.length;i++) {
		if (balls[i].x >= mvb.x && balls[i].x <= mvb.x + 16
			&& balls[i].y >= mvb.y && balls[i].y <= mvb.y + 16) {
			window.alert("GAME OVER\nステージレベルは" + stageLevel + "です。");
			restart();
		}
	}
}

function nextStageStart(autoCleared=false) {
	window.cancelAnimationFrame(loopReqId);
	ctx.clearRect(0, 0, 500, 500);
	stageLevel++;
	if (carefulMode && !autoCleared) {
		window.alert("次のステージレベルは" + stageLevel + "です。\n※このダイアログは慎重モードオフで表示しません。");
	} 
	document.getElementById("stageLevel").textContent = stageLevel;
	createBallObject();
	mvb = {
	 	x: 242,
	 	y: 465
	}
	pressedKeys = {
		up: false,
		down: false
	}
	loopReqId = window.requestAnimationFrame(loop);
}

function restart() {
	window.cancelAnimationFrame(loopReqId);
	ctx.clearRect(0, 0, 500, 500);
	stageLevel = 1;
	document.getElementById("stageLevel").textContent = stageLevel;
	ballCount = 10;
	createBallObject();
	mvb = {
	 	x: 242,
	 	y: 465
	}
	pressedKeys = {
		up: false,
		down: false
	}
	loopReqId = window.requestAnimationFrame(loop);
}

function keydown(event) {
	const key = keyMap[event.keyCode];
	pressedKeys[key] = true;
}

function keyup(event) {
 	const key = keyMap[event.keyCode];
 	pressedKeys[key] = false;
}

function cahangeCarefulMode(event) {
	if (event.keyCode === 67) {
		if (carefulMode) {
			carefulMode = false;
			document.getElementById("carefulMode").textContent = "オフ";
		} else {
			carefulMode = true;
			document.getElementById("carefulMode").textContent = "オン";
		}
	}
}

function collapse (event) {
	if (event.keyCode === 81) {
		nextStageStart();
	}
}

function initDraw () {
	const display = document.getElementById("display");
	const initCtx = display.getContext("2d");
	initCtx.strokeStyle = "#000000";
	initCtx.lineWidth = 5;

	initCtx.strokeRect(0, 0, 500, 500);
	

	initCtx.lineWidth = 1;
	initCtx.beginPath();
	initCtx.moveTo(0, 450);
	initCtx.lineTo(500, 450);
	initCtx.stroke();

	initCtx.beginPath();
	initCtx.moveTo(0, 50);
	initCtx.lineTo(500, 50);
	initCtx.stroke();

	initCtx.strokeStyle = "#FF4500";
	initCtx.beginPath();
	initCtx.moveTo(250, 500);
	initCtx.lineTo(250, 0);
	initCtx.stroke();
}