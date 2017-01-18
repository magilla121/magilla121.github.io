var gameReady = false;
var timer = 5;
var load = 0.5;//adjusts the starting health of the bots and the damage they do each hit
var startHealth = 600;
var damage = 30;
//bot1 properties and functions
var bot1 = {
  xPos:50,
  yPos:50,
  score:0,
  barColor:"red",
  health:startHealth,
  alive:true,
  healthBar:function(){
    if(this.health <= 0){
      this.alive = false;
      end("Blue Bot");
    } else {
      this.alive = true;
    }
    if(this.alive == true){
    fill(this.barColor);
    rect(this.xPos + 220, this.yPos - 25, this.health, 30);
  } else{
    fill("red");
    text("DEAD", this.xPos + 200, this.yPos);
  }
  }
}
//bot2 properties and functions
var bot2 = {
  xPos:50,
  yPos:100,
  score:0,
  barColor:"red",
  health:startHealth,
  alive:true,
  healthBar:function(){
    if(this.health <= 0){
      this.alive = false;
      end("Red Bot");
    } else{
      this.alive = true;
    }
    if(this.alive == true){
    fill(this.barColor);
    rect(this.xPos + 220, this.yPos - 25, this.health, 30);
  } else{
    fill("red");
    text("DEAD", this.xPos + 200, this.yPos)
  }
  }
}
var screenColor = "black";
function preload(){
  //loads the sound to be played on hit
  hitEffect = loadSound("Clang.mp3");
}
function setup() {
  frameRate(60);
  createCanvas(900, 600);
}

function draw() {
  if(gameReady == true){
  if(frameCount % 30 == 0){
    //resets all the colors to the defaults every 30 frames
    bot1.barColor = "red";
    bot2.barColor = "red";
  }
  background(screenColor);
  //displays the two health bars
  bot1.healthBar();
  bot2.healthBar();
  fill("white");
  textSize(32);
  text("Blue Bot Health", bot1.xPos, bot1.yPos);
  text("Red Bot Health",bot2.xPos, bot2.yPos);
  } else{
    background("black");
    fill("white");
    textSize(50);
    text(timer, width/2, height/2);
    loading();
    if(frameCount % 60 == 0){
     timer -= 1;
     load += 1;
    }
    if(timer <= 0){
      gameReady = true
    }
  }
} 
function keyPressed(){
  if(keyCode == (32) && bot1.alive == true && bot2.alive == true){    
    bot1.score += 1;
    bot2.health -= damage;
    if(bot2.alive = true){
    hitEffect.play();
    } else {
      
    }
    bot2.barColor = "white";
  }
  if(keyCode == (38) && bot2.alive == true && bot1.alive == true){
    bot2.score += 1;                     
    bot1.health -= damage;
    if(bot1.alive = true){
      hitEffect.play();
    } else{
      
    }
    //screenColor = "yellow"
    bot1.barColor = "white";
  }
  if(keyCode == (82)){
    reset();
  }
}
function reset(){
  bot1.score = 0;
  bot1.health = startHealth;
  bot2.score = 0;
  bot2.health = startHealth;
  gameReady = false;
  timer = 5;
  load = 0;
}
function loading(){
  fill("blue");
  rect(width/2 - 250, height/2 + 50, load * 100, 50);
  stroke("white");
  noFill();
  rect(width/2 - 250, height/2 + 50, 500, 50);
  stroke("black");
  fill("blue");
}
function end(bot){
  fill("white");
  textSize(50);
  text(bot + " WINS!", width/2 - 100, height/2)
  textSize(32);
  text("Press (R) to reload", width/2 -100, height/2 +50);
}