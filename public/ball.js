/**
 * ボールオブジェクト
 */
function Ball () {
	const x = Math.floor( Math.random() * 390 ) + 70;
	const y = Math.floor( Math.random() * 350 ) + 70;

	this.x = x;	    // x軸上の座標
	this.y = y;     // y軸上の座標 
	this.dx = 0;	// x座標からのx軸上の移動値
	this.dy = 0;	// y座標からのy軸上の移動値
	this.spd = 5;	// 移動スピード
	this.dir = 0;	// 移動方向

	// 移動処理
	this.move = function () {
		if (this.x < 11 || this.x > 489) {
			this.changeDir(Math.PI - this.dir);
		}
		if (this.y < 61 || this.y > 439) {
			this.changeDir(this.dir * -1 );
		}
		this.x += this.dx;
		this.y += this.dy;
	}

	// 壁衝突時の移動方向の変更
	this.changeDir = function (dir) {
		this.dir = dir;
		this.dx = this.spd * Math.cos(dir);
		this.dy = this.spd * Math.sin(dir);
	}
}