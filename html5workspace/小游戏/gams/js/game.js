var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//加载图片
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};
bgImage.src = "img/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function() {
	heroReady = true;
};
heroImage.src = "img/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function() {
	monsterReady = true;
};
monsterImage.src = "img/monster.png";


//定义游戏对象
var hero = {
	speed: 256 //移动速度
};

var monster = {
	speed: 256
}

var monstersCaught = 0;

//游戏按键处理
var keysDown = {};
addEventListener("keydown", function(e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];
}, false);

//游戏初始化
var init = function() {
	hero.x = canvas.width/2;
	hero.y = canvas.height/2;
	monster.x = 32+(Math.random()*(canvas.width-64));
	monster.y = 32+(Math.random()*(canvas.height-64));	
}


//游戏重置
var reset = function() {
	monster.x = 32+(Math.random()*(canvas.width-64));
	monster.y = 32+(Math.random()*(canvas.height-64));
};

//更新对象
var updateHero = function(modifier) {
	if(38 in keysDown && hero.y>0) {
		hero.y -= hero.speed*modifier;
		updateMonster(modifier);
	}
	if(40 in keysDown && hero.y<416) {
		hero.y += hero.speed*modifier;
		updateMonster(modifier);
	}
	if(37 in keysDown && hero.x>32) {
		hero.x -= hero.speed*modifier;
		updateMonster(modifier);
	}
	if(39 in keysDown && hero.x<448) {
		hero.x += hero.speed*modifier;
		updateMonster(modifier);
	}
	if(hero.x <= (monster.x +32)
		&& monster.x <= (hero.x +32)
		&& hero.y <= (monster.y +32)
		&& monster.y <= (hero.y +32)
	) {
		++monstersCaught;
		reset();
	}
};

var updateMonster = function(modifier){
	switch(Math.floor(Math.random()*4+1)){
		case 1:
			if(monster.y>0) {
				monster.y -= monster.speed*modifier;
			}
			break;
		case 2:
			if(monster.y<416) {
				monster.y += monster.speed*modifier;
			}
			break;
		case 3:
			if(monster.x>32) {
				monster.x -= monster.speed*modifier;
			}
			break;
		case 4:
			if(monster.x<448) {
				monster.x += monster.speed*modifier;
			}
	}
}



//界面渲染
var reader = function() {
	if (bgReady) {
		ctx.drawImage(bgImage,0,0);
	}
	if (heroReady) {
		ctx.drawImage(heroImage,hero.x,hero.y);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage,monster.x,monster.y);
	}

	//分数
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Caught："+monstersCaught,32,32);
};


//主函数
var main = function() {
	var now = Date.now();
	var delta = now - then;
	updateHero(delta/1000);
	reader();
	then = now;
	requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame 
			|| w.webkitRequestAnimationFrame 
			|| w.msRequestAnimationFrame 
			|| w.mozRequestAnimationFrame;

var then = Date.now();
init();
main();