  // creating variables
  var PLAY=1;
  var END=0;
  var gameState=PLAY;
  var monkey , monkey_running, monkey_collied;
  var banana ,bananaImage, obstacle, obstacleImage;
  var FoodGroup, ObstacleGroup;
  var score;
  var gameOverImage,gameOver;
  var jumpSound,dieSound;
  var survivalTime=0;

function preload(){
  
  monkey_running =             loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","  sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collied=("sprite_2.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  gameOverImage=loadImage("gameOver.png");
}

function setup() {
  
  // creating monkey 
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running); 
  monkey.scale=0.1;

  // creating ground 
  ground = createSprite(40,295,800,10);
  ground.shapeColor="black";
  ground.velocityX=-2;
  
  gameOver = createSprite(200,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.6;
  
  //creating groups
  FoodGroup =new Group();
  ObstacleGroup=new Group();
}

function draw() {
  
  background("white");
  
 if(gameState === PLAY){
    gameOver.visible=false;
   
 if (ground.x < 0){
     ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
 if(keyDown("space")&& monkey.y >= 100) {
    monkey.velocityY = -12;
    jumpSound.play();
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the banana
    spawnBanana();
  
    //spawn obstacles 
    spawnObstacle();
   
   if(monkey.isTouching(FoodGroup)){
     survivalTime=survivalTime+1;
     FoodGroup.destroyEach();
     }
      
 if(monkey.isTouching(ObstacleGroup)){
    gameState = END;
    dieSound.play();
    monkey.changeAnimation("collied",monkey_collied);                          
    }
  }
  else if (gameState === END) {
      gameOver.visible=true;  
      ground.velocityX = 0;
      monkey.velocityY = 0;
    
//set lifetime of the game objects so that they are never destroyed
     ObstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
     ObstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
    
    if(keyDown("space")) {
    gameState=PLAY;
    ObstacleGroup.destroyEach();
    survivalTime=0;
    FoodGroup.destroyEach();
    monkey.changeAnimation("running", monkey_running);
    }
    
   }
  
  
  //creating infnite ground
  ground.x = ground.width/2;
  console.log(ground.x);
  
  //stop monkey from falling down
  monkey.collide(ground);
  
  // survivalTime
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:",score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  //survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,50,50);
  
   drawSprites();  
}

function spawnBanana() {

  if (frameCount % 100 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacle() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600,276,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    ObstacleGroup.add(obstacle);
  }
}

