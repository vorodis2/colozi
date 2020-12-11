
//коробка хранитель не более

export class KRGronRect  {
    constructor() {         
        this.type="KRGronRect";        
        var self=this;     

        this.idArr=-1;

        this.x=0;
        this.y=0;
        this.w=1000
        this.h=1000

        this.u=0;
        this.v=0;
        this.u1=1;
        this.v1=1;

        this.boolPoli=true;//сторона отрисовки
        this.boolNa=false;//разрезаем ли ?
        this.boolOt=false;//сторона отсечения

        this.bool=[false,false,false,false];
        this.bool1=[false,false,false,false];

        var i;
        //принимаем параметры другова ректа
        this.set=function(br){
            this.x=br.x
            this.y=br.y
            this.w=br.w
            this.h=br.h

            this.u=br.u;
            this.v=br.v;
            this.u1=br.u1;
            this.v1=br.v1;
            for (i = 0; i < 4; i++) {
                this.bool[i]=br.bool[i]
                this.bool1[i]=br.bool1[i]
            } 
        }

        //принимаем параметры на старте
        this.setP=function(x,y,w,h,b,b1,b2,b3,_x,_y,_x1,_y1){        
            this.x=x
            this.y=y
            this.w=w
            this.h=h

            this.bool[0]=b;
            this.bool[1]=b1;
            this.bool[2]=b2;
            this.bool[3]=b3;

            this.u=_x;
            this.v=_y;
            this.u1=_x1;
            this.v1=_y1;
        }

        //очистка основных будей
       	this.clear=function(){
            for (i = 0; i < 4; i++) {
                this.bool[i]=false
                this.bool1[i]=false
            } 
            this.boolPoli=true; 
            this.boolNa=false; 
            this.boolOt=false;      
        }        
    }
}