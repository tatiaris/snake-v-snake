function fud(){
    var scl = 50;

    this.updateFudLocation =  function(){
        this.x = floor(random(1, width/scl)) * scl;
        this.y = floor(random(1, height/scl)) * scl;
        for (var i = 1; i < cobra.body - 1; i++){
            if (this.x == cobra.xList[cobra.xList.length - i] && this.y == cobra.yList[cobra.yList.length - i]){
                this.updateFudLocation();
            }
        }
        for (var i = 1; i < python.body - 1; i++){
            if (this.x == python.xList[python.xList.length - i] && this.y == python.yList[python.yList.length - i]){
                this.updateFudLocation();
            }
        }
    }

    this.showFud = function(){
        stroke(255, 0, 243);
        line(this.x, this.y, this.x, this.y);
    }
}