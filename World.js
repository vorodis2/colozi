
import { Calc } from './Calc.js';
import { Line } from './Line.js';
export class World  {
    constructor(fun) {         
        this.type="World";        
        var self=this;
        this.fun=fun

        
        
        this.children=[];
        this.array=this.children;
        var gran=999

        this.position = new Position(0, 0, 0);
        this.rect = {
            x:-gran,
            y:-gran,
            z:-gran,
            w:2*gran,
            h:2*gran,
            d:2*gran,
            x1:-gran+2*gran,
            y1:-gran+2*gran,
            z1:-gran+2*gran,
        }//границы мира
        this.col=parseInt("1100000000",2);
        this.col1=parseInt("111",2);
        this.offset=0//отступ от ректа x

        this.calc=new Calc();
        this.line_x=new Line(this,"x","w",'x1');

        this.add=function(body) {
            this.children.push(body);
            body.parent=this;
            this.korekt();            
        } 

        this.remove=function(body) {
            var i=this.getId(body)
            if(i!=-1){
                this.children.splice(i, 1);
                this.korekt();
                body.parent=undefined;
                this.remove(body);

            }
            return null; 
        }
        this.getId=function(body) {
            for (var i = 0; i < this.children.length; i++) {
                if(this.children[i].uuid==body.uuid)return i
            }
            return -1
        }



        this.korekt=function(){            
            //this.line_x.set(this.rect,this.children);
           // this.drawDeb();
        }

        this.korektPosition=function(body){

            //this.line_x.set(this.rect, this.children, body);  
                    
            this.line_x.korektPosition(body);
            
            //self.korekt();
            //self.drawDeb();

            self.fun("korektPosition",body);
          
        }

        var arr
        this.dragRect=function(){
            arr=this.line_x.naLineRect(this.rect, this.children)

            if(arr.length!=0){//боди вывалились
                
                for (var i = 0; i < arr.length; i++) {
                    //this.line_x.korektPosition(arr[i]);
                    arr[i].dragFun()                    
                } 
            }
            arr=this.line_x.naLineRect(this.rect, this.children)
            if(arr.length!=0){//боди вывалились
                fun("clearBodys",arr);
            }




            for (var i = 0; i < arr.length; i++) {
                this.remove(arr[i])
            }
            this.korekt()


        }



        this.deb=undefined
        var r= {x:0,y:0,z:0,w:100,h:100, d:100 }
        this.drawDeb=function(){
            if(this.deb==undefined)return
            this.deb.clear();
            this.deb.dRect(this.rect, 0xff0000, 20);
            for (var i = 0; i < this.children.length; i++) {
                this.drawCild(this.children[i]);
            }


          
            for (var i = 0; i < this.line_x.array.length; i++) {
                r.x=this.line_x.array[i][this.line_x.p]
                r.w=this.line_x.array[i][this.line_x.p1]
                r.y=-1000
                r.h=1000
                this.deb.dRect(r, 0x0000ff, 20);
            }

        }
        
        this.drawCild=function(body){            
            for (var i = 0; i < body.children.length; i++) {
                r.x=body.position.x+body.rect.x1
                r.y=body.position.z+body.rect.z
                r.w=body.children[i].rect.w
                r.h=body.children[i].rect.d+1000


                this.deb.dRect(r, 0x00ff00, 20);
            }
            
        }
        
    }



    set parent(value) {
        if(this._parent!=value){
            this._parent= value;           
        }
    }    
    get parent() { return  this._parent;}
}