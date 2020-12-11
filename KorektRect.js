
import { Calc } from './Calc.js';

export class KorektRect  {
    constructor(fun) {         
        this.type="KorektRect";        
        var self=this;
        this.fun=fun
        
        this.funRender=undefined

        this.pS={x:0,y:0,w:1000,h:1000}//Параметры текстурировнаия и начало энного


        this.rect={x:0,y:0,w:1000,h:1000};


        this.r={x:0,y:0,w:100,h:100,type:0};
        this.r1={x:0,y:0,w:100,h:100,type:0};

        this.array=[];
        this.arrayCesh=[];
        this.arrDin=[];
        //this.arrWin=[{x:3000,y:900,w:1200,h:1120},{x:2500,y:500,w:2000,h:1600}]
        this.arrWin=[]
        this.arrLine=[{p:{x:3000,y:-200},p1:{x:5000,y:2000}}]

        this.calc=new Calc()

        var w
        this.setSten=function(ohH1W,_x,_x1){
            _x=-200
            _x1=_x1||0

            w=ohH1W.width!=undefined?ohH1W.width : ohH1W._distans
            this.rect.x=_x;
            this.rect.w=w-_x+_x1;
            this.rect.x1=this.rect.x+this.rect.w;

            this.rect.y=0;
            this.rect.h=ohH1W.height;
            this.rect.h1=ohH1W.height1;
            
        }

        this.removeDin=function(_rb){
            var r=false
            for (var i = this.arrDin.length-1; i >=0 ; i--) {     
                if(this.arrDin[i].idArr==_rb.idArr){
                    this.arrDin.splice(i,1)
                    r=true
                }
            }
            return r
        }
        


        this.korekt1=function(){
            this.r.x=this.rect.x;
            this.r.y=this.rect.y;
            this.r.w=this.rect.w;
            this.r.h=this.rect.h;
            this.r.type=0;
        }

        var rect;    
        this.sah=0;
        this.setRect=function(r){
            this.rect=r;
        }

        this.clear=function(){
            this.sah=0;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear();
            }
        }

        this.getR=function(){
            if(this.array[this.sah]==undefined){
                this.array[this.sah]=new BoxRect()
                this.array[this.sah].idArr=this.sah
            }
            this.sah++
            return this.array[this.sah-1]
        }

        this.korektGrid=function(){
            this.clear();
            //console.warn("korektGrid")
            this.naStart();
            this.reshik();
            this.render();
        }

        this.reshik=function(){
            
            for (var j = 0; j < this.arrWin.length; j++) {
                for (var i = this.arrDin.length-1; i >=0 ; i--) {                
                    this.reshik2(i,this.arrDin[i],this.arrWin[j])
                } 
            }
            this.reshikLine()
            
        }

        var bx,by,bx1,by1,n,n1,br
        this.reshik2=function(_i,_br,_win){
            _br.x1=_br.x+_br.w
            _br.y1=_br.y+_br.h

            _win.x1=_win.x+_win.w
            _win.y1=_win.y+_win.h
            //this.calc
            //trace(_br,"::",_win)
            bx=this.testLine(_br.x,_br.x1,_win.x,_win.x1)
            by=this.testLine(_br.y,_br.y1,_win.y,_win.y1)

            
            bx1=false
            if(_br.x>=_win.x && _br.x1<=_win.x1)bx1=true
            by1=false    
            if(_br.y>=_win.y && _br.y1<=_win.y1)by1=true 

            if(bx==true)if(by==true){               
                   
                
                //в нутри удоляем                                 
                if(bx1&&by1){                                             
                    this.arrDin.splice(_i,1)
                    return                                           
                }

                if(by1==true){                    
                    if(_br.x<_win.x&&_br.x1>_win.x){//лево свободный
                        br=null
                        if(_br.x1>_win.x1){//хрень большая
                            br=this.getR();                            
                            br.set(_br);
                            this.arrDin.push(br); 
                            br.x1=br.x+br.w
                            br.y1=br.y+br.h                           
                        }

                        n=(_win.x-_br.x)/_br.w                       
                        _br.w=_br.w*n
                        _br.u1=_br.u+(_br.u1-_br.u)*n
                        _br.bool1[1]=true;
                        _br.bool[1]=false;

                        if(br!==null){
                           n=((_win.x1)-br.x)/br.w 
                           n1=br.w*n;
                           br.w=br.w-n1;
                           br.x+=n1;

                           br.u=br.u+(br.u1-br.u)*n
                           br.bool1[3]=true; 
                           br.bool[3]=false;                          
                        }
                        return
                    }
                    if(_br.x>_win.x&&_br.x<_win.x1){//лево свободный
                        n=((_win.x1)-_br.x)/_br.w                        
                        n1=_br.w*n
                        _br.w=_br.w-n1
                        _br.x+=n1 
                        _br.u=_br.u+(_br.u1-_br.u)*n                    
                        _br.bool1[3]=true;
                        _br.bool[3]=false;
                        return
                    }                 
                }
                if(bx1==true){                    
                    if(_br.y<_win.y&&_br.y1>_win.y){//лево свободный
                        br=null
                        if(_br.y1>_win.y1){//хрень большая
                            br=this.getR()                            
                            br.set(_br);
                            this.arrDin.push(br) 
                            br.x1=br.x1
                            br.y1=br.y1                            
                        }

                        n=(_win.y-_br.y)/_br.h                       
                        _br.h=_br.h*n
                        _br.v1=_br.v+(_br.v1-_br.v)*n
                        _br.bool1[2]=true;
                        _br.bool[2]=false;

                        if(br!==null){
                           n=((_win.y1)-br.y)/br.h 
                           n1=br.h*n;
                           br.h=br.h-n1;
                           br.y+=n1;
                           br.v=br.v+(br.v1-br.v)*n
                           br.bool1[0]=true; 
                           br.bool[0]=false;
                           //trace(":::",n,n1)
                        }  
                        return
                    }/**/

                    if(_br.y>_win.y&&_br.y<_win.y1){//лево свободный
                        n=((_win.y1)-_br.y)/_br.h                        
                        n1=_br.h*n
                        _br.h=_br.h-n1
                        _br.y+=n1
                        _br.v=_br.v+(_br.v1-_br.v)*n                     
                        _br.bool1[0]=true;
                        _br.bool[0]=false;
                        return
                    }                 
                } 

                //trace(":::",_br.idArr,bx,by,bx1,by1) 
                //разрезаем на куски
                this.reshik3(_br,_win)
                this.arrDin.splice(_i,1)
                return    
            }

            
            


        }
        var ax=[]
        var ay=[]
        var ar=[]
        var rx=0
        var ry=0
        var bbb
        var razArr={}
        razArr.rx=0;
        razArr.ry=0;
        razArr.ax=[];
        razArr.ay=[];
        razArr.ar=[];
        razArr.arBig=[];

        this.reshik3=function(_br,_win,_bool){ 
           
            bbb=false
            if(_bool!=undefined)bbb=_bool
            ax.length=0;
            ay.length=0;
            ar.length=0;
            
            rx=0
            ry=0

            ax[0]=0;
            ay[0]=0;
            if(_br.x<_win.x&&_br.x1>_win.x){
                rx=ax.length
                ax.push((_win.x-_br.x)/_br.w)
            }
            if(_br.x<_win.x1&&_br.x1>_win.x1){
                //rx=ax.length
                ax.push((_win.x1-_br.x)/_br.w)   
            }

            if(_br.y<_win.y&&_br.y1>_win.y){
                ry=ay.length
                ay.push((_win.y-_br.y)/_br.h)
            }
            if(_br.y<_win.y1&&_br.y1>_win.y1){
                //ry=ay.length
                ay.push((_win.y1-_br.y)/_br.h) 
            }    
            ax.push(1);
            ay.push(1);

            //trace(">x>",ax);
            //trace(">y>",ay);
            for (var j = 0; j < razArr.arBig.length; j++) {
                delete razArr.arBig[j]
            }
            razArr.arBig.length=0

            for (var j = 0; j < ay.length-1; j++) {
                if(razArr.arBig[j]==undefined)razArr.arBig[j]=[]
                for (var i = 0; i < ax.length-1; i++) {
                    br=this.getR();                           
                    //br.set(_br);
                    //this.arrDin.push(br); 
                    br.x=_br.x+_br.w*ax[i]
                    br.x1=_br.x+_br.w*ax[i+1]
                    br.w=br.x1-br.x;

                    br.u=_br.u+(_br.u1-_br.u)*ax[i]
                    br.u1=_br.u+(_br.u1-_br.u)*ax[i+1]

                    br.y=_br.y+_br.h*ay[j]
                    br.y1=_br.y+_br.h*ay[j+1]
                    br.h=br.y1-br.y;

                    br.v=_br.v+(_br.v1-_br.v)*ay[j];
                    br.v1=_br.v+(_br.v1-_br.v)*ay[j+1];


                    razArr.arBig[j][i]=br;                    
                   
                    
                    if(j==0)br.bool[0]=_br.bool[0];
                    if(i==ax.length-2)br.bool[1]=_br.bool[1];    
                    if(j==ay.length-2)br.bool[2]=_br.bool[2];       
                    if(i==0)br.bool[3]=_br.bool[3];

                    
                    if(i==rx&&j==ry){                        
                        if(bbb==true)ar.push(br) 
                    }else{
                        ar.push(br) 
                        if(j==ry){
                            if(i+1==rx)br.bool1[1]=true;
                            if(i-1==rx)br.bool1[3]=true;
                        }
                        if(i==rx){
                            if(j+1==ry)br.bool1[2]=true;
                            if(j-1==ry)br.bool1[0]=true;
                        }
                    }
                    
                }
            }


            for (var i = 0; i < ar.length; i++) {
                this.arrDin.push(ar[i]); 
            }

            razArr.rx=rx;
            razArr.ry=ry;
            razArr.ax=ax;
            razArr.ay=ay;
            razArr.ar=ar;
            return razArr;
        }


//////////////////////////////////////////////
        var yyyy=1500
        this.arrLine=[{p:{x:4500,y:200+yyyy},p1:{x:3300,y:-300+yyyy}}]


        var p={x:0,y:0};
        var p1={x:0,y:0};
        var rd={x:0,y:0,x1:0,y1:0,w:0,w:0,o:null};
        var rez,rr,_line,a;

        this.reshikLine=function(_i,_br,_line){
            for (var j = 0; j < this.arrLine.length; j++) {
                _line=this.arrLine[j];
                rd.type=0;
                a=Math.round(this.calc.getAngle(_line.p,_line.p1)*(180/Math.PI));
                if(a>0&&a<90)rd.type=1;
                if(a>-180&&a<-90)rd.type=1;                

                if(_line.p.x==_line.p.x1)rd.type=2;
                if(_line.p.y==_line.p.y1)rd.type=3;
                
                rd.o=_line;
                
                rd.x=_line.p.x;
                rd.x1=_line.p1.x;
                if(_line.p1.x<rd.x){
                    rd.x=_line.p1.x;
                    rd.x1=_line.p.x;
                }
                rd.w=rd.x1-rd.x



                rd.y=_line.p.y;
                rd.y1=_line.p1.y;
                if(_line.p1.y<rd.y){
                    rd.y=_line.p1.y;
                    rd.y1=_line.p.y;
                }  
                rd.h=rd.y1-rd.y;
            
                for (var i = this.arrDin.length-1; i >=0 ; i--) {                
                    this.reshikLine1(i,this.arrDin[i],rd)
                } 
            }
        }


        this.reshikLine1=function(_i,_br, rd){
            _br.x1=_br.x+_br.w;
            _br.y1=_br.y+_br.h;

            if(rd.x>_br.x1)return;
            if(rd.x1<_br.x)return;
            if(rd.y1<_br.y)return;


            if(rd.y>_br.y1){
                if(this.nahVerh(_i,_br,rd)==true){
                    return
                }                
            }

            rez=this.isRectLine(_br,rd);

            if(rez.tip==0&&rez.pBool==false){
                if(this.nahVerh(_i,_br,rd)==true){
                    return
                }              
            }
            if(rez.tip==0&&rez.pBool==true){
                return;
            }
            if(rez.tip==3){
                if(this.nafigRect(_i,_br, rd)==true)return
                
            }
        }
        var ze
        this.nafigRect=function(_i,_br, rd){
            ze=this.reshik3(_br,rd,true)

            trace(_br.idArr+"::",ze) 


            if(rd.type==1){
                ze.arBig[ze.ry][ze.rx].boolPoli=true;
                ze.arBig[ze.ry][ze.rx].boolNa=true;
                if(ze.arBig[ze.ry][ze.rx-1]!=undefined)ze.arBig[ze.ry][ze.rx-1].bool1[1]=false;
                //if(ze.arBig[ze.ry-1][ze.rx-1]!=undefined)ze.arBig[ze.ry-1][ze.rx-1].bool1[1]=true;
            }
            if(rd.type==0){
                ze.arBig[ze.ry][ze.rx].boolPoli=false;
                ze.arBig[ze.ry][ze.rx].boolNa=true;
                if(ze.arBig[ze.ry][ze.rx+1]!=undefined)ze.arBig[ze.ry][ze.rx+1].bool1[3]=false;
            }

            if(ze.arBig[ze.ry+1]!=undefined){
                ze.arBig[ze.ry+1][ze.rx].bool1[0]=false;
            }


            if(ze.arBig[ze.ry-1]!=undefined){
                if(ze.arBig[ze.ry-1][ze.rx-1]!=undefined)ze.arBig[ze.ry-1][ze.rx-1].bool1[1]=true;
                if(ze.arBig[ze.ry-1][ze.rx+1]!=undefined)ze.arBig[ze.ry-1][ze.rx+1].bool1[3]=true;

                this.removeDin(ze.arBig[ze.ry-1][ze.rx]);

            } 
            this.arrDin.splice(_i,1);

            return true
        }

////////////////////////////////////////////


        var pl0={x:0,y:0}
        var pl1={x:0,y:0}

        var aR=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]

        var rezult={}
        rezult.tip=0//не пересекает 1 в одном месте 2 в двух 3 обе точки внутри
        rezult.inBool=false;
        rezult.inBool1=false;
        rezult.pBool=false;
        rezult.arrPos=[{x:0,y:0},{x:0,y:0}]
        var point
        var sah

        this.isRectLine=function(_rect,rd){ 
            pl0.x=rd.x
            pl0.y=rd.y

            pl1.x=rd.x1
            pl1.y=rd.y1



           
            aR[0].x=_rect.x;
            aR[0].y=_rect.y;

            aR[1].x=_rect.x+_rect.w;
            aR[1].y=_rect.y;

            aR[2].x=_rect.x+_rect.w;
            aR[2].y=_rect.y+_rect.h;

            aR[3].x=_rect.x;
            aR[3].y=_rect.y+_rect.h;

            rezult.tip=0;
            point=calc.isPointInLin(pl0,pl1,aR[0],99999999999,99999999999)
            //trace(_rect.idArr, point)
            rezult.pBool=true
            if(point.z>0)rezult.pBool=false

            rezult.inBool=false;
            if(_rect.x<rd.x&&_rect.x1>rd.x)if(_rect.y<rd.y&&_rect.y1>rd.y){
                rezult.inBool=true;
            }

            rezult.inBool1=false;
            if(_rect.x<rd.x1&&_rect.x1>rd.x1)if(_rect.y<rd.y1&&_rect.y1>rd.y1){
                rezult.inBool1=true;
            }

            if(rezult.inBool==true &&rezult.inBool1==true){
                rezult.tip=3;//обе точки внутри
                return rezult;
            }

            sah=0;

            for (var i = 0; i < aR.length; i++) {
                if(i==0)point=this.getPointOfIntersection(aR[i],aR[3],pl0,pl1)
                else point=this.getPointOfIntersection(aR[i],aR[i-1],pl0,pl1)

                if(point!=null){
                    rezult.arrPos[sah].x=point.x;
                    rezult.arrPos[sah].y=point.y;
                    sah++;
                    rezult.tip=sah;
                    if(sah==2){//больше не может быть пересечений
                        return rezult;
                    }
                }    
            }


           

            return rezult

           

        }

        var bb,bb1
        this.nahVerh=function(_i,_br,rd){ 
            bb=false
            if(_br.x<rd.x)bb=true

            bb1=true
            if(_br.x1<rd.x1)bb1=false 

            if(bb==false&&bb1==false) {//в нутри удддоляем
                this.arrDin.splice(_i,1) 
                return true
            }

            if(bb==true&&bb1==false) {//с лева
                n=(rd.x-_br.x)/_br.w                       
                _br.w=_br.w*n
                _br.u1=_br.u+(_br.u1-_br.u)*n
                _br.bool1[1]=true;
                _br.bool[1]=false;
                return true
            }

            if(bb==false&&bb1==true) {//с права
                n=((rd.x1)-_br.x)/_br.w                        
                n1=_br.w*n
                _br.w=_br.w-n1
                _br.x+=n1 
                _br.u=_br.u+(_br.u1-_br.u)*n                    
                _br.bool1[3]=true;
                _br.bool[3]=false;
                return true
            }

            if(bb==true&&bb1==true) {//на весь
                    br=this.getR()                            
                    br.set(_br);
                    this.arrDin.push(br) 
                    br.x1=_br.x1
                    br.y1=_br.y1 


                    n=((rd.x1)-br.x)/br.w                        
                    n1=br.w*n
                    br.w=br.w-n1
                    br.x+=n1 
                    br.u=br.u+(br.u1-br.u)*n                    
                    br.bool1[3]=true;
                    br.bool[3]=false;                   

                    n=(rd.x-_br.x)/_br.w                       
                    _br.w=_br.w*n
                    _br.u1=_br.u+(_br.u1-_br.u)*n
                    _br.bool1[1]=true;
                    _br.bool[1]=false;
                return true
            }

            return false
        }




        var d, da, db, ta, tb, dx, dy, distans, angel;
        var rez = new THREE.Vector2(0, 0);
        this.getPointOfIntersection = function (p1, p2, p3, p4) {
            d = (p1.x - p2.x) * (p4.y - p3.y) - (p1.y - p2.y) * (p4.x - p3.x);
            da = (p1.x - p3.x) * (p4.y - p3.y) - (p1.y - p3.y) * (p4.x - p3.x);
            db = (p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x);

            ta = da / d;
            tb = db / d;
            if (ta >= 0 && ta <= 1 && tb >= 0 && tb <= 1) {
                dx = p1.x + ta * (p2.x - p1.x);
                dy = p1.y + ta * (p2.y - p1.y);
                rez.x = dx;
                rez.y = dy;
                return rez; // точка пересечения
            }
            return null;
        };


        this.testLine=function(ps,pf,ps1,pf1){            
            if(ps1>=ps &&ps1<=pf)return true;
            if(ps>=ps1 &&ps<=pf1)return true;
            return false;
        }
        
        //наполняем первыми боксами
        var ww,hh,b,b1,b2,b3,ww1,ww2,rrr,hh1,hh2,xz,xz1
        this.naStart=function(){
            
            hh1= this.rect.h + this.rect.y;
            hh2=this.rect.y;

            b=false
            b1=false
            b2=false
            b3=false

            if(this.pS.y!=0){
                b=true;
                hh = Math.abs(this.pS.y) % this.pS.h;
                if(hh>this.rect.h){
                    hh=this.rect.h;
                    b2=true;
                } 
                //this.creatNS(ww2,j,ww,hh,b,b1,b2,b3,1-(ww/this.pS.w),0,1,1)
                xz=hh/this.pS.h; 
                this.naVV(hh2,hh,b,b2,1-(hh/this.pS.h),xz);


                hh2+=hh;
            }

            for (var j = hh2;  j< this.rect.h; j+=this.pS.h) {
                b=false
                b1=false
                b2=false
                b3=false
                if(j==0)if(this.pS.y==0)b=true;

                hh=this.pS.h;    
                if(j+hh>this.rect.h){
                    hh=this.rect.h-j;
                    b2=true;
                }                    
                if(j+hh==this.rect.h) b2=true

                xz=hh/this.pS.h;    
                this.naVV(j,hh,b,b2,0,xz);

            }
            this.arrDin.length=0
            for (var i = 0; i < this.sah; i++) {
                this.arrDin[i]=this.array[i];
            }
        }


        this.naVV = function(_y,_hh,_b,_b2,_sy,_fy){
            ww1= this.rect.w+ this.rect.x;
            ww2=this.rect.x;
           

            if(this.pS.x!=0){
                b3=true;
                ww = Math.abs(this.pS.x) % this.pS.w;
                xz1=1;
                xz=1-(ww/this.pS.w)
                if(ww>this.rect.w){
                    ww=this.rect.w;
                    b1=true;
                    
                    xz=Math.abs(this.pS.x)/this.pS.w;
                    xz1=1;
                }

                this.creatNS(ww2,_y,ww,_hh,_b,b1,_b2,b3,xz,_sy,xz1,_fy)
                ww2+=ww;
            }
              
            for (var i = ww2; i < ww1; i+=this.pS.w) {
                b3=false
                if(i == ww2){
                    if(this.pS.x==0)b3=true;                        
                }  
                b1=false;
                ww=this.pS.w;
                if(i+ww>ww1){
                    ww=ww1-i;
                    b1=true;
                }                    
                if(i+ww==ww1) b1=true;
                xz1=ww/this.pS.w;     
                rrr=this.creatNS(i,_y,ww,_hh,_b,b1,_b2,b3,0,_sy,xz1,_fy);
                
            }
        }



        this.creatNS=function(x,y,w,h,b,b1,b2,b3,_x,_y,_x1,_y1){
            rect=this.getR()
            rect.x=x
            rect.y=y
            rect.w=w
            rect.h=h
            rect.setP(x,y,w,h,b,b1,b2,b3,_x,_y,_x1,_y1);
            return rect
        }

        
        this.setColisi=function(colisi,_xOfset){
                
        }





        this.render=function(){
            if(this.funRender!=undefined){
                this.funRender()

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

export class BoxRect  {
    constructor() {         
        this.type="BoxRect";        
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

        this.boolPoli=true;
        this.boolNa=false;

        this.bool=[false,false,false,false];
        this.bool1=[false,false,false,false];

        this.povid={x:0,y:0}

        this.set=function(br){
            this.x=br.x
            this.y=br.y
            this.w=br.w
            this.h=br.h

            this.bool[0]=br.b
            this.bool[1]=br.b1
            this.bool[2]=br.b2
            this.bool[3]=br.b3

            this.u=br.u;
            this.v=br.v;
            this.u1=br.u1;
            this.v1=br.v1;
            for (var i = 0; i < 4; i++) {
                this.bool[i]=br.bool[i]
                this.bool1[i]=br.bool1[i]
            } 
        }


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

       this.clear=function(){

            for (var i = 0; i < 4; i++) {
                this.bool[i]=false
                this.bool1[i]=false
            } 
            this.boolPoli=true; 
            this.boolNa=false;         
       }

    }
}