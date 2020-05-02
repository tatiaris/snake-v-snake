var cobra;
var python;
var cheese;
var scl = 20;
var controlsOn;
var v;
var totalScore;
var bot;
var bvb;
var boost;
var t, a, i;
var escapecount;
var powerups;
var bg;

// function preload(){
//   bg = loadImage("http://3dlist.xyz/rishabh/public/bgBlack.jpg");
// }

function setup() {
  //createCanvas(bg.width, bg.height);
  createCanvas (innerWidth,innerHeight);
  cobra = new snek("Cobra", scl, scl, 0.25, 0, 73, 241, 68);
  python = new snek("Python", width - scl, height - scl, -0.25, 0, 0, 255, 240);
  cheese = new fud();
  boost = new powerup();
  frameRate(60);
  cobra.v = 0.25;
  python.v = 0.25;
  cheese.updateFudLocation();
  boost.updatePowerLocation();
  pythonScore = 0;
  cobraScore = 0;
  controlsOn = true;
  paused = false;
  bot = false;
  bvb = false;
  t = false;
  a = false;
  i = false;
  powerups = false;
  escapecount = 0;
}

function draw() {
  if (controlsOn) {
    if (t && a && i) bvb = true;
    background(51);
    //background(bg);
    boundary();
    if (!bvb) {
      if (bot) activateCheat(cobra, python);
    } else {
      activateCheat(cobra, python);
      activateCheat(python, cobra);
    }
    if (!cobra.frozen) {
      cobra.updateLocation();
    }
    if (!python.frozen) {
      python.updateLocation();
    }
    if (cobra.visible) cobra.show();
    if (python.visible) python.show();
    cheese.showFud();
    if (boost.cansee && powerups) boost.showPower();
    checkFood(cobra, python);
    if (powerups)checkBoost(cobra, python);
    displayScore();
    gameStatus();
  }
}

function boundary() {
  stroke(255, 255, 255);
  strokeWeight(scl);
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  line(width, 0, width, height);
  line(0, height, width, height);
  stroke(0, 0, 255);
  strokeWeight(1);
  textSize(10);
  text("move: arrow keys           ||           pause: spacebar           ||           restart: ' r '           ||           hit  'b'  to activate bot           ||           hit 'p' to activate powerups!", 20, 7)
}

function keyPressed() {
  if (controlsOn) {
    if (keyCode == UP_ARROW && python.ySpeed == 0) python.dir(0, -python.v);
    else if (keyCode == DOWN_ARROW && python.ySpeed == 0) python.dir(0, python.v);
    else if (keyCode == LEFT_ARROW && python.xSpeed == 0) python.dir(-python.v, 0);
    else if (keyCode == RIGHT_ARROW && python.xSpeed == 0) python.dir(python.v, 0);

    if (keyCode == 87 && cobra.ySpeed == 0) cobra.dir(0, -cobra.v);
    else if (keyCode == 83 && cobra.ySpeed == 0) cobra.dir(0, cobra.v);
    else if (keyCode == 65 && cobra.xSpeed == 0) cobra.dir(-cobra.v, 0);
    else if (keyCode == 68 && cobra.xSpeed == 0) cobra.dir(cobra.v, 0);
  }
  if (keyCode == 32 && controlsOn) {
    strokeWeight(5);
    controlsOn = false;
    text("PAUSED", 600, 400);
  } else if (!controlsOn && keyCode == 32) controlsOn = true;
  if (keyCode == 82) setup();
  if (keyCode == 66) bot = true;
  if (keyCode == 84) t = true;
  if (keyCode == 65) a = true;
  if (keyCode == 73) i = true;
  if (keyCode == 80) powerups = true;
  draw();
}

function checkFood(snakeA, snakeB) {
  if (round(snakeA.x / (scl*1.5)) == round(cheese.x / (scl*1.5)) && round(snakeA.y / (scl*1.5)) == round(cheese.y / (scl*1.5))) {
    cheese.updateFudLocation();
    snakeA.score++;
    snakeA.toBeAdded += 15;
  }
  if (round(snakeB.x / (scl*1.5)) == round(cheese.x / (scl*1.5)) && round(snakeB.y / (scl*1.5)) == round(cheese.y / (scl*1.5))) {
    cheese.updateFudLocation();
    snakeB.score++;
    snakeB.toBeAdded += 15;
  }
}

function checkBoost(snakeA, snakeB) {
  if (round(snakeA.x / (scl * 1.5)) == round(boost.x / (scl * 1.5)) && round(snakeA.y / (scl * 1.5)) == round(boost.y / (scl * 1.5))) {
    boost.updatePowerLocation();
    boost.grantPower(snakeA, snakeB);
  }
  if (round(snakeB.x / (scl * 1.5)) == round(boost.x / (scl * 1.5)) && round(snakeB.y / (scl * 1.5)) == round(boost.y / (scl * 1.5))) {
    boost.updatePowerLocation();
    boost.grantPower(snakeB, snakeA);
  }
}

function gameStatus() {
  if (win(cobra, python) && win(python, cobra)) gameOverTie();
  else if (win(cobra, python)) gameOver(cobra, python);
  else if (win(python, cobra)) gameOver(python, cobra);
}

function win(sneek, opp) {
  if (sneek.score == 10) return true;
  if (opp.x < 20 || opp.y < 20 || opp.x > width - scl || opp.y > height - scl) return true;
  if (sneek.vulnerable) {
    for (var i = 1; i < sneek.body - 1; i++) {
      if (opp.x == sneek.xList[sneek.xList.length - i] && opp.y == sneek.yList[sneek.yList.length - i]) {
        return true;
      }
    }
    for (i = 2; i < opp.body - 1; i++) {
      if (opp.x == opp.xList[opp.xList.length - i] && opp.y == opp.yList[opp.yList.length - i]) {
        return true;
      }
    }
    return false;
  }
}

function displayScore() {
  strokeWeight(3);
  textSize(32);
  stroke(73, 241, 68);
  text(cobra.score, 60, 60);
  stroke(0, 255, 240);
  text(python.score, width - 100, 60);
  strokeWeight(32);
}

function gameOver(winner, loser) {
  winner.show();
  loser.show();
  controlsOn = false;
  stroke(255, 0, 0);
  ellipse(loser.x, loser.y, scl / 4, scl / 4);
  strokeWeight(3);
  textSize(115);
  stroke(winner.r, winner.g, winner.b);
  text(winner.name + " WINS!", width / 4, height / 4);
  textSize(32);
  text("PRESS 'R' TO RESTART", width / 4, height / 2);
}

function gameOverTie() {
  controlsOn = false;
  stroke(255, 0, 0);
  ellipse(python.x, python.y, scl / 4, scl / 4);
  ellipse(cobra.x, cobra.y, scl / 4, scl / 4);
  strokeWeight(3);
  textSize(115);
  stroke(73, 241, 68);
  text("TIE!", width / 4, height / 4);
  textSize(32);
  text("PRESS 'R' TO RESTART", width / 4, height / 2);
}

function activateCheat(sneek, opp) {
  if (sneek.x != cheese.x && sneek.y != cheese.y) {
    if (cheese.y > sneek.y && sneek.ySpeed == 0) {
      sneek.dir(0, sneek.v);
    } else if (cheese.y < sneek.y && sneek.ySpeed == 0) {
      sneek.dir(0, -sneek.v);
    }
  }else if (sneek.x != cheese.x && sneek.y != cheese.y) {
    if (cheese.x > sneek.x && sneek.xSpeed == 0) {
      sneek.dir(sneek.v, 0);
    } else if (cheese.x < sneek.x && sneek.xSpeed == 0) {
      sneek.dir(-sneek.v, 0);
    }
  }

  if (sneek.x + (sneek.xSpeed * scl) < scl) { //left
    if (cheese.y > sneek.y && sneek.ySpeed == 0) sneek.dir(0, sneek.v);
    else sneek.dir(0, -sneek.v);
  } else if (sneek.x + (sneek.xSpeed * scl) > width - scl) { //right
    if (cheese.y > sneek.y && sneek.ySpeed == 0) sneek.dir(0, sneek.v);
    else sneek.dir(0, -sneek.v);
  } else if (sneek.y + (sneek.ySpeed * scl) < scl) { //top
    if (cheese.x < sneek.x && sneek.xSpeed == 0) sneek.dir(-sneek.v, 0);
    else sneek.dir(sneek.v, 0);
  } else if (sneek.y + (sneek.ySpeed * scl) > height - scl) { //bottom
    if (cheese.x < sneek.x && sneek.xSpeed == 0) sneek.dir(-sneek.v, 0);
    else sneek.dir(sneek.v, 0);
  } 

  if (boost.cansee && powerups) {
    if ((sneek.x / scl) == (boost.x / scl) && sneek.ySpeed == 0) {
      if (sneek.y > boost.y && sneek.ySpeed == 0) sneek.dir(0, -sneek.v);
      else if (sneek.y < boost.y && sneek.ySpeed == 0) sneek.dir(0, sneek.v);
    } else if ((sneek.y / scl) == (boost.y / scl) && sneek.xSpeed == 0) {
      if (sneek.x > boost.x && sneek.xSpeed == 0) sneek.dir(-sneek.v, 0);
      else if (sneek.x < boost.x && sneek.xSpeed == 0) sneek.dir(sneek.v, 0);
    }
  } else if ((sneek.x / scl) == (cheese.x / scl) && sneek.ySpeed == 0) {
    if (sneek.y > cheese.y && sneek.ySpeed == 0) sneek.dir(0, -sneek.v);
    else if (sneek.y < cheese.y && sneek.ySpeed == 0) sneek.dir(0, sneek.v);
  } else if ((sneek.y / scl) == (cheese.y / scl) && sneek.xSpeed == 0) {
    if (sneek.x > cheese.x && sneek.xSpeed == 0) sneek.dir(-sneek.v, 0);
    else if (sneek.x < cheese.x && sneek.xSpeed == 0) sneek.dir(sneek.v, 0);
  }

  for (var i = 2; i < sneek.body; i++) {
    var tailx = 0;
    var taily = 0;
    if (sneek.xList[sneek.xList.length - i] - sneek.xList[sneek.xList.length - i - 1] > 0) { //going right
      tailx = -sneek.v;
      taily = 0;
    } else if (sneek.xList[sneek.xList.length - i] - sneek.xList[sneek.xList.length - i - 1] < 0) { //going left
      tailx = sneek.v;
      taily = 0;
    } else if (sneek.yList[sneek.yList.length - i] - sneek.yList[sneek.yList.length - i - 1] > 0) { //going down
      tailx = 0;
      taily = -sneek.v;
    } else if (sneek.yList[sneek.yList.length - i] - sneek.yList[sneek.yList.length - i - 1] < 0) { //going up
      tailx = 0;
      taily = sneek.v;
    }
    if (sneek.x + (sneek.xSpeed * scl) == sneek.xList[sneek.xList.length - i] && sneek.y + (sneek.ySpeed * scl) == sneek.yList[sneek.yList.length - i]) {
      sneek.dir(tailx, taily);
    }
  }

  for (var i = 2; i < opp.body; i++) {
    if (opp.xList[opp.xList.length - i] - opp.xList[opp.xList.length - i - 1] > 0) { //going right
      tailx = sneek.v;
      taily = 0;
    } else if (opp.xList[opp.xList.length - i] - opp.xList[opp.xList.length - i - 1] < 0) { //going left
      tailx = -sneek.v;
      taily = 0;
    } else if (opp.yList[opp.yList.length - i] - opp.yList[opp.yList.length - i - 1] > 0) { //going down
      tailx = 0;
      taily = sneek.v;
    } else if (opp.yList[opp.yList.length - i] - opp.yList[opp.yList.length - i - 1] < 0) { //going up
      tailx = 0;
      taily = -sneek.v;
    }
    if (sneek.x + (sneek.xSpeed * scl) == opp.xList[opp.xList.length - i] && sneek.y + (sneek.ySpeed * scl) == opp.yList[opp.yList.length - i]) {
      sneek.dir(tailx, taily);
    }
  }
  preventLoss(sneek, opp);
  checkFood(cobra, python);
}

function preventLoss(sneek, opp) {
  sneek.x += sneek.xSpeed * scl;
  sneek.y += sneek.ySpeed * scl;
  var xvtemporary = sneek.xSpeed;
  var yvtemporary = sneek.ySpeed;
  if (win(opp, sneek)) {
    print("escape");
    escapecount++;
    if (escapecount > 100) gameOver(opp, sneek);
    sneek.x -= xvtemporary * scl;
    sneek.y -= yvtemporary * scl;
    sneek.turnLeft();
    preventLoss(sneek, opp);
  } else {
    sneek.x -= xvtemporary * scl;
    sneek.y -= yvtemporary * scl;
  }
}