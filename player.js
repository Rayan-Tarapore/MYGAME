class Player{
    constructor(x,y,radius){
    var player_option={
        isStatic:false,
        frictionStatic:0.9,
        friction:0.2
    }
    
    this.body = Bodies.circle(x,y,radius,player_option);
    this.radius = radius
    World.add(world,this.body);
    
    }
    display(){
        var pos = this.body.position
        ellipseMode(RADIUS);
        noStroke();
        fill(245,108,0)
        ellipse(pos.x,pos.y,this.radius,this.radius);
    }
}