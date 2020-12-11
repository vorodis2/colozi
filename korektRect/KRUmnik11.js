
//умник, всякое умное и не сильно по делу сюда

export class KRUmnik  {
    constructor(par) {         
        this.type="KRUmnik";        
        var self=this;
        this.par=par;
        


       
        //наполняем первыми боксами/////////////////////////////////
        ///////////////////////////////////////////////////////////
        var ww,hh,b,b1,b2,b3,ww1,ww2,rrr,hh1,hh2,xz,xz1,rect
        this.naStart=function(){
            
            hh1= this.par.rect.h + this.par.rect.y; // 2000
            hh2=this.par.rect.y;                    // 0

            b=false;
            b1=false;
            b2=false;
            b3=false;

            if(this.par.pS.y!=0){
                b=true;
                hh = Math.abs(this.par.pS.y) % this.par.pS.h;
                xz = 1-(hh/this.par.pS.h);
                xz1 = 1//hh/this.par.pS.h;

                if(hh>this.par.rect.h){
                    hh=this.par.rect.h;
                    b1=true;

                    wwww=Math.abs((this.par.rect.h-this.par.pS.y)/(this.par.pS.h));
                    xz1 = 1 - wwww       
                    
                    if (wwww > 1) {
                        xz1 = 1 - (wwww % Math.trunc(wwww))
                    }
                }
                
                this.naVV(hh2,hh,b,b2,xz,xz1);

                hh2+=hh;
            }

            for (var j = hh2;  j< this.par.rect.h; j+=this.par.pS.h) {
                b=false;
                b1=false;
                b2=false;
                b3=false;
                if(j==0)if(this.par.pS.y==0)b=true;

                hh=this.par.pS.h;    
                if(j+hh>this.par.rect.h){
                    hh=this.par.rect.h-j;
                    b2=true;
                }                    
                if(j+hh==this.par.rect.h) b2=true

                xz = 0;
                xz1 = hh/this.par.pS.h;
                
                this.naVV(j,hh,b,b2,xz,xz1);

            }
            this.par.arrDin.length=0
            for (var i = 0; i < this.par.sah; i++) {
                this.par.arrDin[i]=this.par.array[i];
            }
        }

        var wwww
        this.naVV = function(_y,_hh,_b,_b2,_sy,_fy){
            ww1=this.par.rect.w - this.par.rect.x;//общие растояние
            ww2=this.par.rect.x; //ночальный шаг                   


            if(this.par.pS.x!=0){
               
                b3=true;
                ww = Math.abs(this.par.pS.x) % this.par.pS.w;
                xz1=1;


               
/**/
                
                
                //if(this.par.sah==0){                    
                    xz=1-(ww/this.par.pS.w)
                    /*if(ww>this.par.rect.w){
                        ww=this.par.rect.w;                     
                    }*/

                    if(this.par.pS.x>0){
                        xz=1-xz
                        xz1=1
                        ww=(xz1-xz)*this.par.pS.w
                    }
                    if(ww>this.par.rect.w){
                        ww=this.par.rect.w;
                        xz1 =(ww  + xz*this.par.pS.w )/this.par.pS.w                 
                    }

                /*}else{
                    xz=1-(ww/this.par.pS.w)

                    if(ww>this.par.rect.w){
                        ww=this.par.rect.w;
                        
                        /*b1=true;
                        wwww=Math.abs((this.par.rect.w-this.par.pS.x)/(this.par.pS.w));
                        xz1 = 1 - wwww                   
                        if (wwww > 1) {
                            xz1 = 1 - (wwww % Math.trunc(wwww))
                        }*/
                   /* }



                }*/
                
                /**/



            
                // trace("yz :: yz1 =", _sy, "::", _fy)
                


                this.creatNS(ww2,_y,ww,_hh,_b,b1,_b2,b3, xz,_sy, xz1,_fy)
                
               // trace(ww)
                ww2+=ww;

                //return
            }

            for (var i = ww2; i < ww1; i+=this.par.pS.w) {
                b3=false
                if(i == ww2){
                    if(this.par.pS.x==0)b3=true;                        
                }  
                b1=false;
                ww=this.par.pS.w;
                if(i+ww>ww1){
                    ww=ww1-i;
                    b1=true;
                }                    
                if(i+ww==ww1) b1=true;
                xz1=ww/this.par.pS.w; 

                rrr=this.creatNS(i,_y,ww,_hh,_b,b1,_b2,b3, 0,_sy, xz1,_fy);                
            }
        }
        this.creatNS=function(x,y,w,h,b,b1,b2,b3,_x,_y,_x1,_y1){
            rect=this.par.getR();
            rect.x=x;
            rect.y=y;
            rect.w=w;
            rect.h=h;
            rect.setP(x,y,w,h,b,b1,b2,b3,_x,_y,_x1,_y1);
            return rect;
        }


        /////////Разрезаем на части от линии/////////////////////////
        ///////////////////////////////////////////////////////////

        var pl0={x:0,y:0}
        var pl1={x:0,y:0}
        var aR=[{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]
        var rezult={}
        rezult.tip=0//не пересекает 1 в одном месте 2 в двух 3 обе точки внутри
        rezult.inBool=false;
        rezult.inBool1=false;
        rezult.pBool=false;
        rezult.arrPos=[{x:0,y:0},{x:0,y:0}]
        rezult.p={x:0,y:0}
        rezult.p1={x:0,y:0}
        var point,_point,__point
        var sah
        this.isRectLine=function(_rect,rd){ 
            //загоняем в опорные точки           
            pl0.x=rd.o.p.x
            pl0.y=rd.o.p.y
            pl1.x=rd.o.p1.x
            pl1.y=rd.o.p1.y           
            
            //точки ректа
            aR[0].x=_rect.x;
            aR[0].y=_rect.y;
            aR[1].x=_rect.x+_rect.w;
            aR[1].y=_rect.y;
            aR[2].x=_rect.x+_rect.w;
            aR[2].y=_rect.y+_rect.h;
            aR[3].x=_rect.x;
            aR[3].y=_rect.y+_rect.h;

            rezult.tip=0;//не пересекает
         
            if(pl0.x>pl1.x)_point=this.par.calc.isPointInLin(pl0,pl1,aR[0],99999999999,99999999999)//берем нормаль с какой стороны коробка 
            else _point=this.par.calc.isPointInLin(pl1,pl0,aR[0],99999999999,99999999999)//берем нормаль с какой стороны коробка                       
            rezult.pBool=true
            if(_point.z>0)rezult.pBool=false
            
            //номальная в ректе    
            rezult.inBool=false;
            if(_rect.x<rd.o.p.x&&_rect.x1>rd.o.p.x)if(_rect.y<rd.o.p.y&&_rect.y1>rd.o.p.y){
                rezult.inBool=true;
            }
            //конечная в ректе
            rezult.inBool1=false;
            if(_rect.x<rd.o.p1.x&&_rect.x1>rd.o.p1.x)if(_rect.y<rd.o.p1.y&&_rect.y1>rd.o.p1.y){
                rezult.inBool1=true;
            }
            //обе точки в ректе
            if(rezult.inBool==true &&rezult.inBool1==true){
                rezult.tip=3;//обе точки внутри
                rezult.p.x=rd.o.p.x
                rezult.p.y=rd.o.p.y

                rezult.p1.x=rd.o.p1.x
                rezult.p1.y=rd.o.p1.y    
                return rezult;
            }

            //ишим пересечение
            sah=0;            
            for (var i = 0; i < aR.length; i++) {
                if(i==0)__point=this.par.calc.getPointOfIntersection(aR[i],aR[3],pl0,pl1)
                else __point=this.par.calc.getPointOfIntersection(aR[i],aR[i-1],pl0,pl1)

                if(__point!=null){
                    rezult.arrPos[sah].x=__point.x;
                    rezult.arrPos[sah].y=__point.y;                

                    sah++;
                    rezult.tip=sah;
                    if(sah==2){//больше не может быть пересечений 
                        rezult.p.x=rezult.arrPos[0].x
                        rezult.p.y=rezult.arrPos[0].y
                        rezult.p1.x=rezult.arrPos[1].x
                        rezult.p1.y=rezult.arrPos[1].y 
                        return rezult;
                    }
                }    
            }

            if(sah==1){//одна из точек в нутри                
                if(rezult.inBool==true){
                    rezult.arrPos[1].x=rd.o.p.x;
                    rezult.arrPos[1].y=rd.o.p.y;
                }
                if(rezult.inBool1==true){
                    rezult.arrPos[1].x=rd.o.p1.x;
                    rezult.arrPos[1].y=rd.o.p1.y;
                }
            } 

            rezult.p.x=rezult.arrPos[0].x
            rezult.p.y=rezult.arrPos[0].y

            rezult.p1.x=rezult.arrPos[1].x
            rezult.p1.y=rezult.arrPos[1].y            

            return rezult       
        }












        /////////Разрезаем на части коробку/////////////////////////
        ///////////////////////////////////////////////////////////
        var ax=[]
        var ay=[]
        var ar=[]
        var rx=0
        var ry=0
        var bbb
        var razArr={}
        var br
        razArr.rx=0;
        razArr.ry=0;
        razArr.ax=[];
        razArr.ay=[];
        razArr.ar=[];
        razArr.arBig=[];
        this.setBoxInRect=function(_br,_win,_bool){  
            
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
         
            for (var j = 0; j < razArr.arBig.length; j++) {
                delete razArr.arBig[j]
            }
            razArr.arBig.length=0

            for (var j = 0; j < ay.length-1; j++) {
                if(razArr.arBig[j]==undefined)razArr.arBig[j]=[]
                for (var i = 0; i < ax.length-1; i++) {
                    br=this.par.getR();                    
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
                this.par.arrDin.push(ar[i]); 
            }
            razArr.rx=rx;
            razArr.ry=ry;
            razArr.ax=ax;
            razArr.ay=ay;
            razArr.ar=ar;
            return razArr;
        }




        /////////Финальный тест примитивов/////////////////////////
        ///////////////////////////////////////////////////////////





 

        this.finalPro=function(){            
            for (var i = this.par.arrDin.length-1; i >=0; i--) {
                this.finalProBox(this.par.arrDin[i])
            }

        }
        this.finalProBox=function(box){
            if(box.w==0||box.h==0){                
                this.par.removeDin(box)
                return
            }
        }






        ////////////////////geometry/////////////////////////
        /////////////////////////////////////////////
        var vertices = [];
        //линейная геометрия для отрисовки линий
        this.setGeomLine=function(geometry){                    
            vertices.length=0           
            for (var i = 0; i < this.par.arrDin.length; i++) {
                this.setGeomLineB(this.par.arrDin[i])
                //this.arrDin[i].setGLVert(vertices);
            }
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        
        }

        var uv = [];
      
        var nGeom//0-на 1- от 2 на обоих
        //наполняем геометрию с текстурированием
        this.setGeom=function(geometry, _nGeom){
            nGeom=0;
            if(_nGeom!=undefined) nGeom= _nGeom//c какой стороны накладываться  

            vertices.length=0
            uv.length=0  
         
            for (var i = 0; i < this.par.arrDin.length; i++) {
                this.setGeomB(this.par.arrDin[i]);
            }            
            geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );          
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        }


        this.setGeomLineB=function(box){ 
            if(box.bool[0]===true||box.bool1[0]===true){
                vertices.push(
                    box.x,
                    box.y,
                    0,
                    box.x+box.w,
                    box.y,
                    0
                )
            }

            if(box.bool[1]===true||box.bool1[1]===true){
                vertices.push(
                    box.x+box.w,
                    box.y,
                    0,
                    box.x+box.w,
                    box.y+box.h,
                    0
                )
            }

            if(box.bool[2]===true||box.bool1[2]===true){
                vertices.push(
                    box.x+box.w,
                    box.y+box.h,
                    0,
                    box.x,
                    box.y+box.h,
                    0
                )
            }
           
            if(box.bool[3]===true||box.bool1[3]===true){
                vertices.push(
                    box.x,
                    box.y+box.h,
                    0,
                    box.x,
                    box.y,
                    0
                )
            }

            if(box.boolNa==true){
                if(box.boolPoli==true){
                    vertices.push(
                        box.x,
                        box.y,
                        0,
                        box.x+box.w,
                        box.y+box.h,
                        0
                    )
                }else{
                    vertices.push(
                        box.x+box.w,
                        box.ysetGeom,
                        0,
                        box.x,
                        box.y,
                        0
                    )
                }
            }        
        }

        var dinBox
        this.setGeomB=function(box){   
            dinBox=box     
            if(dinBox.boolPoli==true){
                if(dinBox.boolNa==false){
                    this.sGm(1,0,2)
                    this.sGm(0,3,2)
                }else{
                    if(dinBox.boolOt==true){ 
                        this.sGm(1,0,2)
                    }else{
                        this.sGm(0,3,2)
                    }
                }
                
            }else{
                if(dinBox.boolNa==false){                    
                    this.sGm(2,1,3)
                    this.sGm(3,1,0)
                }else{
                    if(dinBox.boolOt==true){ 
                        this.sGm(2,1,3)
                    }else{
                        this.sGm(3,1,0)
                    }
                }
                //this.sGm(0,3,2)
            }
           
            
        }

        this.sGm=function(p,p1,p2){
            if(nGeom==0){
                this.sGmL(p)
                this.sGmL(p1)
                this.sGmL(p2)   
            }
            if(nGeom==1){
                this.sGmL(p1)
                this.sGmL(p)                
                this.sGmL(p2)   
            }
            if(nGeom==2){
                this.sGmL(p)
                this.sGmL(p1)
                this.sGmL(p2)

                this.sGmL(p1)
                this.sGmL(p)                
                this.sGmL(p2)   
            }
           
        }

        this.sGmL=function(p){
            if(p==0){
                vertices.push(
                    dinBox.x,//0
                    dinBox.y,
                    0
                )
                uv.push(
                    dinBox.u,//0
                    dinBox.v
                )
            }
            if(p==1){
                vertices.push(
                    dinBox.x+dinBox.w,//1
                    dinBox.y,
                    0
                )
                uv.push(
                    dinBox.u1,//1
                    dinBox.v
                )
            }

            if(p==2){
                vertices.push(
                    dinBox.x+dinBox.w,//2
                    dinBox.y+dinBox.h,
                    0,
                )
                uv.push(
                    dinBox.u1,//2
                    dinBox.v1
                )
            }

            if(p==3){
                vertices.push(
                    dinBox.x,//3
                    dinBox.y+dinBox.h,
                    0, 
                )
                uv.push(
                    dinBox.u,//3
                    dinBox.v1
                )
            }
        }

        /////////////////////////////////////////////
        /////////////////////////////////////////////
    }
}