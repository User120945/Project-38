var treeImg, tree;
var birdImg,bird, birdsGroup;
var ant, antImg;
var gameState = "play"

function preload(){
  treeImg = loadImage("tree.png");
  birdImg = loadImage("bird.png");
  antImg = loadImage("ant.png");
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  tree = createSprite(400,300);
  tree.addImage("tree",treeImg);
  tree.scale=3; 
  tree.velocityY = 1;
  
  birdsGroup = new Group();
  
  ant = createSprite(300,200,50,50);
  ant.scale = 0.3;
  ant.addImage("ant", antImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ant.x = ant.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ant.x = ant.x + 3;
    }
    
    if(keyDown("space")){
      ant.velocityY = -10;
    }
    
    ant.velocityY = ant.velocityY + 0.8
    
    if(tree.y > 400){
      tree.y = 300
    }
    spawnBirds();

    
    //climbersGroup.collide(ghost);
    if(birdsGroup.isTouching(ant)){
      ant.velocityY = 0;
    }
    if(birdsGroup.isTouching(ant) || ant.y > 600){
      ant.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnBirds() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var bird = createSprite(200, -50);
    bird.scale=0.3;
 //   var climber = createSprite(200,10);
  //  var invisibleBlock = createSprite(200,15);
  //  invisibleBlock.width = climber.width;
  //  invisibleBlock.height = 2;
    
    bird.x = Math.round(random(120,400));
  //  climber.x = door.x;
  //  invisibleBlock.x = door.x;
    
    bird.addImage(birdImg);
  //  climber.addImage(climberImg);
    
    bird.velocityY = 1;
  //  climber.velocityY = 1;
   // invisibleBlock.velocityY = 1;
    
    ant.depth = bird.depth;
    ant.depth +=1;
   
    //assign lifetime to the variable
    bird.lifetime = 800;
  //  climber.lifetime = 800;
    
    //add each door to the group
    birdsGroup.add(bird);
  }
}