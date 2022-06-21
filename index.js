// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
document.body.appendChild(canvas);

//chessboard (9,6)
let chessboard = [
	['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
	['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
	['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
	['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
	['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
	['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
];

//sounds
var soundCollect = "sounds/collect.wav";
//Assign audio to soundEfx
var soundEfx = document.getElementById("soundEfx");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bg.png";


// border image L-R
var blReady = false;
var blImage = new Image();
blImage.onload = function () {
	blReady = true;
};

// border image T-B
var btReady = false;
var btImage = new Image();
btImage.onload = function () {
	btReady = true;
};

// Herold image
var heroldReady = false;
var heroldImage = new Image();
heroldImage.onload = function () {
	heroldReady = true;
};
heroldImage.src = "images/herold.png";

// Food1 image
var food1Ready = false;
var food1Image = new Image();
food1Image.onload = function () {
	food1Ready = true;
};
food1Image.src = "images/food1.png";

//Food2 image
var food2Ready = false;
var food2Image = new Image();
food2Image.onload = function () {
	food2Ready = true;
};
food2Image.src = "images/food2.png";

//Rock image
var rockReady = false;
var rockImage = new Image();
rockImage.onload = function () {
	rockReady = true;
};
rockImage.src = "images/rock.png";

// Game objects
var herold = {
	speed: 350, // movement in pixels per second
	x: 0,
	y: 0
};
var food1 = {
	x: 0,
	y: 0
};

var food2 = {
	x: 0,
	y: 0
};

var rock = {
	x: 0,
	y: 0
};

var rock2 = {
	x: 0,
	y: 0
};
var foodCaught = 0;

// Handle keyboard controls
var keysDown = {}; // object were we add up to 4 properties when keys go down
                // and then delete them when the key goes up

addEventListener("keydown", function (e) {
	console.log(e.keyCode + " down")
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	console.log(e.keyCode + " up")
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches food
var reset = function () {
	herold.x = 32 + (Math.random() * (canvas.width - 250));
	herold.y = 32 + (Math.random() * (canvas.height - 200));

	//Place the food somewhere on the screen randomly
	food1.x = 32 + (Math.random() * (canvas.width - 250));
	food1.y = 32 + (Math.random() * (canvas.height - 200));

	food2.x = 32 + (Math.random() * (canvas.width - 250));
	food2.y = 32 + (Math.random() * (canvas.height - 200));

	rock.x = 32 + (Math.random() * (canvas.width - 400));
	rock.y = 32 + (Math.random() * (canvas.width - 350));

	rock2.x = 32 + (Math.random() * (canvas.width - 400));
	rock2.y = 32 + (Math.random() * (canvas.width - 350));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		herold.y -= herold.speed * modifier;
		if (herold.y < ( 32) ) {
			herold.y = 32;
		}

	}
	if (40 in keysDown) { // Player holding down
		herold.y += herold.speed * modifier;
		if (herold.y > (630 - ( 81) )) {
			herold.y = 630-81;
		}
	}
	if (37 in keysDown) { // Player holding left
		herold.x -= herold.speed * modifier;
		if (herold.x < ( 21) ) {
			herold.x = 21;
		}
	}
	if (39 in keysDown) { // Player holding right
		herold.x += herold.speed * modifier;
		if (herold.x > ( 1250 - (32 + 55) ) ) {
			herold.x = 1250 - (32 + 55);
		}
	}

	// Are they touching?
	if (
		herold.x+5 <= (food1.x + 101)
		&& food1.x <= (herold.x + 101)
		&& herold.y <= (food1.y + 101)
		&& food1.y <= (herold.y + 101)
	) 
	{	
		++foodCaught;
		soundEfx.src = soundCollect;
		soundEfx.play();
		reset();
	}
	if (
		herold.x+5 <= (food2.x + 101)
		&& food2.x <= (herold.x + 101)
		&& herold.y <= (food2.y + 101)
		&& food2.y <= (herold.y + 101)
	) 
	{
		++foodCaught;
		soundEfx.src = soundCollect;
		soundEfx.play();
		reset();
	}
	if (
		herold.x+5 <= (rock.x + 80)
		&& rock.x <= (herold.x + 80)
		&& herold.y <= (rock.y + 80)
		&& rock.y <= (herold.y + 80)
	)
	{
		gameOver();
	}
	if(
		herold.x+5 <= (rock.x + 80)
		&& rock2.x <= (herold.x + 80)
		&& herold.y <= (rock2.y + 80)
		&& rock2.y <= (herold.y + 80)
	)
	{
		gameOver();
	}
	if (
		foodCaught === 5
	)
	{
		youWon();
		reset();
	}
  };

  let gameOver = function () {
	alert("Herold tripped over a rock, try again");
	died = true;
	reset();
  };
  let youWon = function () {
	if (foodCaught === 5){
		alert("Yay, Herold is full")
		
	reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (btReady) {
		ctx.drawImage(btImage, 0, 0);
		ctx.drawImage(btImage, 0, 720 - 32);
	}
	
	if (blReady) {
		ctx.drawImage(blImage, 0, 0);
		ctx.drawImage(blImage, 1200-32, 0);
	} 

	if (rockReady){
		ctx.drawImage(rockImage, rock.x, rock.y);
		ctx.drawImage(rockImage, rock2.x, rock2.y);
	}

	if (heroldReady) {
		ctx.drawImage(heroldImage, herold.x, herold.y);
	}

	if (food1Ready) {
		ctx.drawImage(food1Image, food1.x, food1.y);
	}

	if (food2Ready) {
		ctx.drawImage(food2Image, food2.x, food2.y);
	}

	// Score
	ctx.fillStyle = "rgb(0, 250, 250)";
	ctx.font = "25px Helvetica";
	ctx.textAlign = "right";
	ctx.textBaseline = "bottom";
	ctx.fillText("Food Herold has ate :) " + foodCaught, 1270, 710);
};

let placeItem = function (character)
{
	let X = 9;
	let Y = 6;
	let success = false;
	while (!success) {
		X = Math.floor( Math.random() * 2);
		Y = Math.floor( Math.random() * 2);
		
		if( chessboard[X][Y] === 'x' ){
			success = true;
		}
	}
	chessboard[X][Y] = 'O';
	rock.x = (X*80) + 32;
	rock.y = (Y*80) + 32;
	rock2.x = (X*80) + 32;
	rock2.y = (Y*80) + 32;
}



// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;

	if (foodCaught < 5) {
	//  Request to do this again ASAP
	requestAnimationFrame(main);
	youWon();
	}
};

// Let's play this game!
var then = Date.now();
reset();
main();