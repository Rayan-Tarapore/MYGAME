const Body = Matter.Body;

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Detector = Matter.Detector;

var player,follower
var ground,wall
var drag
var end_bar,endurance
var tile1

var barrierHelp
var jumpBarrier
//help
var movementHelp

var endNum
var obs1
var obDim
//checkpoint
var check
function preload() {
    
}

function setup(){
    endNum = 1;
    var canvas = createCanvas(800,450);
    engine = Engine.create();
    world = engine.world;
    endurance = 100;
    player = new Player(200,350,20);
    ground = new Tile(450,425,999900,50);
    end_bar = new Bar(700,10,200,20);
    drag = 1
    tile1 = new Tile(400,350,120,10);

    //help
    movementHelp= "Use A and D to move and SPACE to Jump"
    barrierHelp = new Tile(5,225,10,450);
    jumpBarrier = new Tile(795,337,10,226);


    //TILES
    tile2 = new Tile(550,300,120,10);
    tile3 = new Tile(700,250,120,10);

    //Obstacles
    obDim = 30
    obs1 = new Obstacle(260,375,obDim,obDim);
    
    //checkpoint
    check = 0;
}

function draw(){
    background(150,150,150)
    Engine.update(engine);
    
    //collision
    collision(player.body,obs1.body);


    if(endurance>0){
        endurance = endurance-1
        end_bar.body.position.x = endurance+(800*endNum);
    }
    
    if(player.body.velocity.x>0){
        player.body.velocity.x = player.body.velocity.x-drag;
    }
    if(player.body.velocity.x<0){
        player.body.velocity.x = player.body.velocity.x+drag;
    }
    
    if(player.body.position.x>camera.position.x+400){
        camera.position.x=camera.position.x+800;
        end_bar.body.position.x =  end_bar.body.position.x +800;
        endNum = endNum+1
    } 
    if(player.body.position.x<camera.position.x-400&&player.body.position.x>0){
        camera.position.x=camera.position.x-800;
        end_bar.body.position.x =  end_bar.body.position.x -800;
        endNum = endNum-1
    } 

    //CHECKING
    if(player.body.position.x >=800&&check ===0&&player.body.position.x <=900){
    check = 1;
    }
    if(player.body.position.x >=1600&&check ===0&&player.body.position.x <=1700){
        check = 2;
        }
        if(player.body.position.x >=2400&&check ===0&&player.body.position.x <=2500){
            check = 3;
            }

    player.display();
    ground.display();
    end_bar.display();
    tile1.display();
    barrierHelp.display();
    jumpBarrier.display();

    //help
    textSize(20);
    text(movementHelp,210,150);
    
    
    //TILES
    tile2.display();
    tile3.display();

    //OBSTACLES
    obs1.display();
}

function keyPressed(){
    if(keyCode===68||keyCode===RIGHT_ARROW){
    Body.setVelocity(player.body,{x:9,y:player.body.velocity.y})
    }
    if(keyCode===65||keyCode===LEFT_ARROW){
    Body.setVelocity(player.body,{x:-9,y:player.body.velocity.y})
    }
    if(keyCode===32&&endurance===0){
        Body.setVelocity(player.body,{x:player.body.velocity.x,y:-7})
        endurance = 100;
    }
}
function collision(ob1,ob2){
//LEFT
if(Math.round(ob1.position.x)+20 === ob2.position.x-obDim/2&&Math.round(ob1.position.y)>ob2.position.y-obDim/2&&Math.round(ob1.position.y)<ob2.position.y+obDim/2){
  console.log("hit");
}
//RIGHT
if(Math.round(ob1.position.x)-20 === ob2.position.x+obDim/2&&Math.round(ob1.position.y)>ob2.position.y-obDim/2&&Math.round(ob1.position.y)<ob2.position.y+obDim/2){
    console.log("hit");
}
//TOP
if(Math.round(ob1.position.y)+20 === ob2.position.y-obDim/2&&Math.round(ob1.position.x)>ob2.position.x-obDim/2&&Math.round(ob1.position.x)<ob2.position.x+obDim/2){
    console.log("hit");
}
//BOTTTOM
if(Math.round(ob1.position.y)-20 === ob2.position.y+obDim/2&&Math.round(ob1.position.x)>ob2.position.x-obDim/2&&Math.round(ob1.position.x)<ob2.position.x+obDim/2){
    console.log("hit");
}
}