
export class Shape  {
    constructor() {         
        this.type="Shape";        
        var self=this;
        this.name="rect";

        this.rect = [0,0,0,100,100,100];
        this.uuid=(Math.round(Math.random()*100000000000)+""+Math.round(Math.random()*100000000000))*1;



        var gran=100
        this.rect = {
            x:-gran,
            y:-gran,
            z:-gran,
            w:2*gran,
            h:2*gran,
            d:2*gran
        }//границы мира

        this.setRect=function(rect) {
            for (var s in rect) {
                this.rect[s]=rect[s]
            }
           /* this.rect.x=rect[0];
            this.rect.y=rect[1];
            this.rect.z=rect[2];
            this.rect.w=rect[3];
            this.rect.h=rect[4];
            this.rect.d=rect[5];*/

            if(this._parent!=undefined)this._parent.korekt()
        } 
        
    }



    set parent(value) {
        if(this._parent!=value){
            this._parent= value;

        }
    }    
    get parent() { return  this._parent;}
}