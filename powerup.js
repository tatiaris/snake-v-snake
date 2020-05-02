function powerup(){
    var scl = 20;
    this.cansee = true;
    this.updatePowerLocation =  function(){
        this.x = floor(random(1, width/scl)) * scl;
        this.y = floor(random(1, height/scl)) * scl;
        for (var i = 1; i < cobra.body - 1; i++){
            if (this.x == cobra.xList[cobra.xList.length - i] && this.y == cobra.yList[cobra.yList.length - i]){
                this.updatePowerLocation();
            }
        }
        for (var i = 1; i < python.body - 1; i++){
            if (this.x == python.xList[python.xList.length - i] && this.y == python.yList[python.yList.length - i]){
                this.updatePowerLocation();
            }
        }
        this.hidePower();
    }

    this.showPower = function(){
        boost.cansee = true;
        var r = random(0, 255);
        var g = random(0,255);
        var b = random(0,255);
        stroke(r, g, b);
        line(boost.x, boost.y, boost.x, boost.y);
        // print("power shown");
    }

    this.hidePower = function(){
        boost.cansee = false;
        setTimeout(this.showPower, 7000);
        // print("power hidden");
    }

    this.grantPower = function(sneek, opp){
        var num  = ceil(random(0,5));
        switch(num){
            case 1: 
                this.freeze(opp);
                break;
            case 2: 
                this.invulnerable(sneek);
                break;
            case 3:
                this.stretch(sneek);
                break;
            case 4:
                this.invisible(opp);
                break;
            case 5:
                this.slowdown();
                break;
        }
    }
    this.slowdown = function(){
        frameRate(10);
        setTimeout(this.normalpace, 3000);
        // print("slowdown");
    }
    this.freeze = function(sneek){
        sneek.frozen = true;
        setTimeout(this.unfreeze, 3000);
        // print("frozen");
    }
    this.invulnerable = function(sneek){
        sneek.v = 0.5;
        sneek.vulnerable = false;
        // print("invulnerable");
        setTimeout(this.vulnerable, 5000);
    }
    this.stretch = function(sneek){
        sneek.toBeAdded += 30;
        // print("stretched");
    }
    this.invisible = function(sneek){
        sneek.visible = false;
        setTimeout(this.visible, 3000);
        // print("invisible");
    }
    this.visible = function(){
        cobra.visible = true;
        python.visible = true;
        // print("visible");
    }
    this.normalpace = function(){
        frameRate(60);
    }
    this.unfreeze = function(sneek){
        cobra.frozen = false;
        python.frozen = false;
        // print("unfrozen");
    }
    this.vulnerable = function(){
        cobra.v = 0.25;
        python.v = 0.25;
        cobra.vulnerable = true;
        python.vulnerable = true;
        // print("vulnerable");
    }
}