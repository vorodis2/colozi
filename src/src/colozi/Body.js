

import { PositionFun } from './Calc.js';

export class Body  {
  	constructor() {  		
  		this.type="Body";
  		var self=this;
        this.drag=undefined;
        this.target
        this.rect = {
            x:0,
            y:0,
            z:0,
            w:0,
            h:0,
            d:0,
            x1:0,
            y1:0,
            z1:0
        }//границы мира

        /*
        1-колизии стен 0 -обьект не заброситься в колизии
        1-коллизии с другими обьектами
        1-зарезервированы под типы обьектов 
        1-зарезервированы под типы обьектов 
        1-зарезервированы под типы обьектов
        1-дырка в центре
        1-дырка на
        1-дырка от
        0-xz
        0-xz
        */

        this.col=parseInt("1110011100",2);
        this.col1=parseInt("111",2);
        this.offset=0//отступ от ректа x


        this.dragFun=function() {            
            
            if(self._parent){
                self._parent.korektPosition(self)
               /* self._parent.korekt()
                self._parent.drawDeb()*/
            }
            if(self.drag !=undefined)self.drag();
        }

        this.position = new PositionFun(0, 0, 0, this.dragFun);
        this.children = this.array = [];

        this.uuid=(Math.round(Math.random()*100000000000)+""+Math.round(Math.random()*100000000000))*1;
     
        this.addShape=function(shape) {
            this.children.push(shape);
            shape.parent=this;
            this.korekt()
        }
        this.removeShape=function(shape){
            
        }

        var x,y,z,x1,y1,z1,w,h,d
        this.korekt=function(){  
                
            if(this.children.length==0){
                this.rect.x=this.rect.y=this.rect.z=this.rect.x1=this.rect.y1=this.rect.z1=this.rect.w=this.rect.h=this.rect.d=0
                return
            }

            this.rect.x=this.rect.y=this.rect.z=999999999999999;
            this.rect.x1=this.rect.y1=this.rect.z1=-999999999999999;
            this.rect.w=this.rect.h=this.rect.d=0
            trace(this.children);
            for (var i = 0; i < this.children.length; i++) {
                if(this.rect.x>this.children[i].rect.x)this.rect.x=this.children[i].rect.x
                if(this.rect.y>this.children[i].rect.y)this.rect.y=this.children[i].rect.y
                if(this.rect.z>this.children[i].rect.z)this.rect.z=this.children[i].rect.z    
               
                if(this.rect.x1<this.children[i].rect.x+this.children[i].rect.w)this.rect.x1=this.children[i].rect.x+this.children[i].rect.w;   
                if(this.rect.y1<this.children[i].rect.y+this.children[i].rect.h)this.rect.y1=this.children[i].rect.y+this.children[i].rect.h;  
                if(this.rect.z1<this.children[i].rect.z+this.children[i].rect.d)this.rect.z1=this.children[i].rect.z+this.children[i].rect.d;     
               
            }
            this.rect.w = this.rect.x1-this.rect.x;
            this.rect.h = this.rect.y1-this.rect.y;
            this.rect.d = this.rect.z1-this.rect.z;



        }


        /*this.kPar=function(o,p,p1,b){ 
            if(b!=true){
                if(this.rect[p1]<o[p])this.rect[p1]=o[p]
            }else{
                if(this.rect[p1]>o[p])this.rect[p1]=o[p]
            }

        }*/

    }

    set parent(value) {
        if(this._parent!=value){
            this._parent= value;           
        }
    }    
    get parent() { return  this._parent;}
}