function snek(nam, xstarting, ystarting, vstartingx, vystarting, r, g, b){
    this.name = nam; // cobra.name
    this.x = xstarting;
    this.y = ystarting;
    this.xSpeed = vstartingx; // cobra.xSpeed python.xSpeed
    this.ySpeed = vystarting;
    this.xList = [];
    this.yList = [];
    this.body = 1;
    this.toBeAdded = 0;
    this.score = 0;
    this.r = r;
    this.g = g;
    this.b = b;
    this.frozen = false;
    this.visible = true;
    this.vulnerable = true;
    this.v = 0.25;
    this.line = [];

    for (var i = 0; i < this.body; i++){
        this.xList[i] = this.x;
        this.yList[i] = this.y;
    }

    this.dir = function(x, y){
        this.xSpeed = x;
        this.ySpeed = y;
    }

    this.updateLocation = function(){
        this.x += (this.xSpeed * scl);
        this.y += (this.ySpeed * scl);
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
        append(this.xList, this.x);
        append(this.yList, this.y);
    }
    
    this.show = function(){
        stroke(r, g, b); // 0 - 255
        strokeWeight(scl);
        if (this.toBeAdded > 0){ 
            this.body++;
            this.toBeAdded--;
        }
        for (var i = 1; i < this.body; i++)
        line(this.xList[this.xList.length - i], 
            this.yList[this.yList.length - i], 
            this.xList[this.xList.length - i - 1], 
            this.yList[this.yList.length - i - 1]);
        fill(0);
        ellipse(this.x, this.y, scl/2, scl/2);
    }
    this.turnLeft = function(){
        if (this.ySpeed > 0) this.dir(this.v,0);
        else if (this.ySpeed < 0) this.dir(-this.v,0);
        else if (this.xSpeed > 0) this.dir(0,-this.v);
        else if (this.xSpeed < 0) this.dir(0,this.v);
    }
}