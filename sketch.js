
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving" , monkey_running);
  monkey.scale = 0.15;
  
  ground  = createSprite(400, 362, 1200, 10);
  ground.velocityX = -4;
  console.log(monkey.y)
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
}


function draw() {
  background("white");
  
  if (ground.x < 0){
      ground.x = ground.width/2;
  }
  
  if(keyDown("space")) {
        monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY +0.8;
  monkey.collide(ground);
  monkey.debug = true;

  
  food();
  spawnObstacle();
  
  if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);  
    }

  
  stroke("white");
  textSize(20);
  fill("black");
  text("score: " +score, 500, 50);
  
  stroke("white");
  textSize(20);
  fill("blue");
  text("survival Time: "  + survivalTime, 100, 50);
   survivalTime = Math.ceil(frameCount/frameRate());
  


drawSprites(); 
}

function food(){
  if(frameCount % 80 === 0){
  banana = createSprite(500, 200, 20, 20);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -7;
  banana.y = Math.round(random(100, 250));
  banana.lifetime = 100;
  FoodGroup.add(banana);
}
}


function spawnObstacle(){
  if(frameCount % 300 === 0){
  stone = createSprite(500, 340, 20, 20);
  stone.addImage(obstacleImage);
  stone.scale = 0.15;
  stone.velocityX = -7;
  stone.lifetime = 100;
    stone.debug = true;
  obstacleGroup.add(stone);
}
}


  