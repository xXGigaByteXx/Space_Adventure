
//namespacing 
const Eng = Matter.Engine; 
const World = Matter.World; 
const Bodies = Matter.Bodies; 

var eng, world;
var ground, groundImage;
var ship, shipImage1, shipImage2;
var debris, debrisImage1, debrisImage2, debrisImage3, debrisImage4, debrisImage5, debrisImage6, debrisImage7, debrisImage8, debrisImage9, debrisImage10, debrisGroup;
var cloud, cloudImage, cloudGroup;
var score = 0, lives = 5;
var example1 = 0, mainPlanet = "sky";
var planet1, planet1Image, planet2, planet2Image, planet3, planet3Image;
var velo = 0, frame = 0;
var r;
var cloudDone = false;
function setup() {
  createCanvas(windowWidth, windowHeight);

  eng = Eng.create(); 
  world = eng.world;

  cloudGroup = new Group();

  cloudImage = loadImage("cloud.png");

  ground = createSprite(width / 2, height - 40, width, 10);
  groundImage = loadImage("ground.jpg");
  ground.addImage("ground", groundImage);
  ground.scale = 0.3;
  
  planet1 = createSprite(width / 2, height / 2, 10, 10);
  planet1Image = loadImage("earth.png");
  planet1.addImage("earth", planet1Image);
  planet1.scale = 0.5;

  planet1.visible = false;
  planet2 = createSprite(75, height / 2, 10, 10);
  planet2Image = loadImage("venus.png");
  planet2.addImage("venus", planet2Image);
  planet2.scale = 0.5;
  planet2.visible = false;

  planet3 = createSprite(width - 75, height / 2, 10, 10);
  planet3Image = loadImage("mars.png");
  planet3.addImage("mars", planet3Image);
  planet3.scale = 0.5;
  planet3.visible = false;

  ship = createSprite(width / 2, height - 150, 100, 100);
  shipImage1 = loadImage("ship1.png");
  shipImage2 = loadImage("ship2.png");
  ship.addImage("ship1", shipImage1); 
  ship.scale = 0.5;

  debrisImage1 = loadImage("o1.png");
  debrisImage2 = loadImage("o2.png");
  debrisImage3 = loadImage("o3.png");
  debrisImage4 = loadImage("o4.png");
  debrisImage5 = loadImage("o5.png");
  debrisImage6 = loadImage("o6.png");
  debrisImage7 = loadImage("o7.png");
  debrisImage8 = loadImage("o8.png");
  debrisImage9 = loadImage("o9.png");
  debrisImage10 = loadImage("o10.png");

  debrisGroup = new Group();
}

function draw() {
  Eng.update(eng); 
  edges = createEdgeSprites();
  background("black");
  textSize(20);
  fill("blue");
  text(score, width / 2, 50);

  ship.collide(edges);

  if(mainPlanet != "end" && mainPlanet != "win") {
    if(cloudDone == true) {
      controls();
    }
    starting();
    planets();
    obstacles();
  }
  win();
  death();
  fill("red")
  text(lives, width - 50, 50);
  drawSprites();
  //console.log(lives);
  console.log(mainPlanet);
  //console.log(mainPlanet);
  //console.log(r)
  //console.log(ship.x + ", " + ship.y + ", " + ship.width + ", " + ship.height);
  //console.log(cloudGroup.size());
  //console.log(ship.position.x + " " + ship.position.y);
  //console.log(example1);
}                                                                                                                  

function clouds() {
    var r = Math.round(random(0, width));
    if(frameCount % 5 == 0) {
      var rand = Math.round(random(1, 2));
      cloud = createSprite(r, 0, 20, 20);
      cloud.addImage("cloud", cloudImage);
      if(rand == 1) {
        cloud.scale = 0.5;
        cloud.velocityY = 50;
      }
      if(rand == 2) {
        cloud.scale = 0.25;
        cloud.velocityY = 25;
      }
      //cloud.scale = 0.07;
      cloud.lifetime = 600;
      //cloud.addImage("bright", cloudImage);
      cloudGroup.add(cloud);
  }
}
function obstacles() {
    if(mainPlanet != "earth" && mainPlanet != "sky") {
      score++;
      if(frameCount % frame == 0) {
        var r = Math.round(random(0, width));
        rand = Math.round(random(1, 10))
        debris = createSprite(r, 0, 10, 10);
        debris.velocityY = velo;
        debris.lifetime = height / 10;
        if(rand == 1) {
          debris.addImage("debris 1", debrisImage1);
          debris.changeImage("debris 1");
        }
        if(rand == 2) {
          debris.addImage("debris 2", debrisImage2);
          debris.changeImage("debris 2");
        }
        if(rand == 3) {
          debris.addImage("debris 3", debrisImage3);
          debris.changeImage("debris 3");
        }
        if(rand == 4) {
          debris.addImage("debris 4", debrisImage4);
          debris.changeImage("debris 4");
        }
        if(rand == 5) {
          debris.addImage("debris 5", debrisImage5);
          debris.changeImage("debris 5");
        }
        if(rand == 6) {
          debris.addImage("debris 6", debrisImage6);
          debris.changeImage("debris 6");
        }
        if(rand == 7) {
          debris.addImage("debris 7", debrisImage7);
          debris.changeImage("debris 7");
        }
        if(rand == 8) {
          debris.addImage("debris 8", debrisImage8);
          debris.changeImage("debris 8");
        }
        if(rand == 9) {
          debris.addImage("debris 9", debrisImage9);
          debris.changeImage("debris 9");
        }
        if(rand == 10) {
          debris.addImage("debris 10", debrisImage10);
          debris.changeImage("debris 10");
        }
        debrisGroup.add(debris);
      }
    }
}
function planets() {
  if(mainPlanet == "sky") {
    textSize(25);
    fill("white");
    text("You are an astronaut reachearching a planet.\n Nasa allowed you to choose:\n Venus or Mars\n If you reach the planet, you'll learn a fun fact!\n Remeber there are many obstacles on the way. ", width / 3, height / 2.5);
    textSize(15);
    text("\"Enter\" the spaceship when you're ready", width / 2.5, height / 1.65)
  }
  if(mainPlanet != "sky" && mainPlanet != "going") {
    /*if(keyWentDown("right")) {
      console.log("yes");
    }*/
    
      //console.log("Inside " + mainPlanet);
    if(keyWentDown("left") && mainPlanet == "earth") {
      mainPlanet = "venus"
    }
    
    if(keyWentDown("right") && mainPlanet == "earth") {
      mainPlanet = "mars"
    }
    
    if(mainPlanet == "venus") {
      background("black");
      planet2.scale = 4;
      planet2.x = width / 2
      planet2.y = -10000;
      planet2.velocityY = 15;
      planet1.visible = false;
      planet2.visible = true;
      planet3.visible = false;
      ship.x = width / 2;
      ship.y = height - 150;
      ship.changeImage("ship2");
      ship.scale = 0.3;
      mainPlanet = "going";
      velo = 17.5;
      frame = 12;
    }
    if(mainPlanet == "mars") {
      background("black");
      planet3.scale = 4;
      planet3.x = width / 2
      planet3.y = -15000;
      planet3.velocityY = 15;
      planet1.visible = false;
      planet2.visible = false;
      planet3.visible = true;
      ship.x = width / 2;
      ship.y = height - 150;
      ship.changeImage("ship2");
      ship.scale = 0.3;
      mainPlanet = "going";
      velo = 22.5;
      frame = 8;
    }
  }
}
function starting() {
  if(keyDown("enter") && example1 == 0) {
    ship.addImage("ship2", shipImage2);
    ship.changeImage("ship2");
    example1 = 1;
  }
  if(cloudGroup.size() < 50 && example1 == 1) {
    clouds();
    mainPlanet = "earth";
  }
  else if (cloudGroup.size() >= 50) {
    example1 = 2;
    cloudDone = true;
  }
  if(example1 == 1) {
    ground.velocityY = 10;

  }
  if(example1 == 2 && mainPlanet != "going") {
    ship.position.y = height / 2 - 150;
    ship.changeImage("ship1");
    ship.scale = 0.1;
    ground.destroy();
    planet1.visible = true;
    planet2.visible = true;
    planet3.visible = true;
    background("black");
    fill("white");
    text("Left arrow for Venus, Right arrow for Mars", width / 2.75, height / 4)
    
  }
  if(mainPlanet == "earth") {
    lives = 5;
    score = 0;
    ship.visible = true;
    planet2.velocityY = 0;
    planet3.velocityY = 0;
  }
}
function controls() {
  if(mainPlanet == "going") {
    if(keyDown("a") || keyDown("left")) {
      ship.x -= 25;
    }
    if(keyDown("d") || keyDown("right")) {
      ship.x += 25;
    }
  }
}
function death() {
  if(ship.isTouching(debrisGroup)) {
    lives -= 1;
    debrisGroup.destroyEach();
  }
  if(lives < 1) {
    mainPlanet = "end";
  }
  if(mainPlanet == "end") {
    ship.x = width / 2
    planet2.x = 75;
    planet2.y = height / 2;
    planet2.velocityY = 0;
    planet2.scale = 0.5;
    planet3.x = width - 75;
    planet3.y = height / 2;
    planet3.velocityY = 0;
    planet3.scale = 0.5;
    planet1.visible = false;
    planet2.visible = false;
    planet3.visible = false;
    fill("white");
    text("Try Again Next Time!", width / 2.25, height / 2);
    fill("white");
    text("\"R\" to restart", width / 2.15, height / 1.75);
    if(keyWentDown("r")) {
      lives = 5;
      score = 0;
      ship.visible = true;
      mainPlanet = "earth";
    }
  }
}
function win() {
  if(ship.isTouching(planet2) || ship.isTouching(planet3)) {
    mainPlanet = "win";
  }
  if(mainPlanet == "win") {
    if(planet2.velocityY == 15) {
      textSize(25);
      fill("white");
      text("YAAAAY! You found out that Venus is hotter than mercury!\n You know why? Well according to our rescearch and your travel, the atmosphere is made out of carbon dioxide!\n It traps hot air in the atmophere. If we don't switch to eco-friendly everything, earth might just be venus", width / 10, height / 2)
      text("\"Space\" to restart", width / 2.15, height / 1.5);
      if(keyWentDown("space")) {
        lives = 5;
        score = 0;
        ship.visible = true;
        planet2.velocityY = 0;
        planet3.velocityY = 0;
        mainPlanet = "earth";
      }
    }
    if(planet3.velocityY == 15) {
      textSize(25);
      fill("white");
      text("YAAAAY! According to our research and your travel, we found out that even though mars is red, it is pretty cold!", width / 10, height / 2);
      text("\"Space\" to restart", width / 2.15, height / 1.5);
      if(keyWentDown("space")) {
        mainPlanet = "earth";
      }
    }
    planet2.x = 75;
    planet2.y = height / 2;
    //planet2.velocityY = 0;
    planet2.scale = 0.5;
    planet3.x = width - 75;
    planet3.y = height / 2;
    //planet3.velocityY = 0;
    planet3.scale = 0.5;
    ship.visible = false;
    ship.x = width / 2;
    planet1.visible = false;
    planet2.visible = false;
    planet3.visible = false;
    
  }
}
