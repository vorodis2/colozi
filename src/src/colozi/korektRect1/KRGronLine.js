
//коробка хранитель не более

export class KRGronLine  {
    constructor() {         
        this.type="KRGronLine";        
        var self=this;
     

        this.idArr=-1;

        this.x=0;
        this.y=0;

        this.x1=0;
        this.y1=0;

        this.w=1000;
        this.h=1000;


        //0 первая выше 
        //1 вторая выше 
        //2 по x равны 
        //3 по у равны
        this.type=0;

        

        this.angel=0  

        this.o=undefined//ночальная линия

        var a;
        this.setLine=function(line){
            this.o=line
            this.type=0;


            this.angel=this.getAngle(line.p,line.p1)*(180/Math.PI);

            a=Math.round(this.angel);
            if(a>=0&&a<=90)this.type=1;
            if(a>=-180&&a<=-90)this.type=1;
            if(line.p.x==line.p.x1)this.type=2;
            if(line.p.y==line.p.y1)this.type=3; 


            this.o=line;                
            this.x=line.p.x;
            this.x1=line.p1.x;
            if(line.p1.x<this.x){
                this.x=line.p1.x;
                this.x1=line.p.x;
            }
            this.w=this.x1-this.x

            this.y=line.p.y;
            this.y1=line.p1.y;
            if(line.p1.y<this.y){
                this.y=line.p1.y;
                this.y1=line.p.y;
            }  
            this.h=this.y1-this.y;

        }



    /*


 this.xzRRR=function(kuda,_ot){
            kuda.type=0;

            a=Math.round(this.calc.getAngle(_ot.p,_ot.p1)*(180/Math.PI));
            if(a>0&&a<90)kuda.type=1;
            if(a>-180&&a<-90)kuda.type=1;
            if(_ot.p.x==_ot.p.x1)kuda.type=2;
            if(_ot.p.y==_ot.p.y1)kuda.type=3;
            
            kuda.o=_ot;                
            kuda.x=_ot.p.x;
            kuda.x1=_ot.p1.x;
            if(_ot.p1.x<kuda.x){
                kuda.x=_ot.p1.x;
                kuda.x1=_ot.p.x;
            }
            kuda.w=kuda.x1-kuda.x

            kuda.y=_ot.p.y;
            kuda.y1=_ot.p1.y;
            if(_ot.p1.y<kuda.y){
                kuda.y=_ot.p1.y;
                kuda.y1=_ot.p.y;
            }  
            kuda.h=kuda.y1-kuda.y;
        }









    */


      
       	this.clear=function(){
       
        }



        this.getAngle = function (a, b) {
            b = b || rezNull;
            a = a || rezNull;
            return Math.atan2(b.y - a.y, b.x - a.x);
        };
        
    }
}