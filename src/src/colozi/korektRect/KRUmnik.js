
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
                xz1=1;
                xz=1-(hh/this.par.pS.h)

                
                if(this.par.pS.y>0){
                    xz=1-xz
                    xz1=1
                    hh=(xz1-xz)*this.par.pS.h
                }
                if(hh>this.par.rect.h){
                    hh=this.par.rect.h;
                    xz1 =(hh + xz*this.par.pS.h )/this.par.pS.h                 
                }
                
                this.naVV(hh2,hh,b,b2,xz,xz1);

                hh2+=hh;
            }


            for (var j = hh2;  j < hh1; j+=this.par.pS.h) {
                b=false;
                b1=false;
                b2=false;
                b3=false;
                if(j==0)if(this.par.pS.y==0)b=true;

                hh=this.par.pS.h;    
                if(j+hh>hh1){
                    hh=hh1-j;
                    b2=true;
                }                    
                if(j+hh==hh1) b2=true

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
            ww1=this.par.rect.w + this.par.rect.x;//общие растояние
            ww2=this.par.rect.x; //ночальный шаг                   


            if(this.par.pS.x!=0){

                b3=true;
                ww = Math.abs(this.par.pS.x) % this.par.pS.w;
                xz1=1;

                xz=1-(ww/this.par.pS.w)

                if(this.par.pS.x>0){
                    xz=1-xz
                    xz1=1
                    ww=(xz1-xz)*this.par.pS.w
                }

                if(ww>this.par.rect.w){
                    ww=this.par.rect.w;
                    xz1=(ww+xz*this.par.pS.w )/this.par.pS.w 
                }

                b1=false;
            
                if(i+ww>ww1){                   
                    b1=true;
                }                    
                if(ww2+ww==ww1) b1=true;
               

                this.creatNS(ww2,_y,ww,_hh,_b,b1,_b2,b3, xz,_sy, xz1,_fy)
                ww2+=ww;
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
        // rezult.arrPos=[]
        rezult.p={x:0,y:0}
        rezult.p1={x:0,y:0}
        var point,_point,__point
        var sah
        this.isRectLine=function(_rect,rd){ 
            //загоняем в опорные точки           
            pl0.x=rd.o.p.x  // 0
            pl0.y=rd.o.p.y  // 0
            pl1.x=rd.o.p1.x // 3000
            pl1.y=rd.o.p1.y  // 3000
            
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
            if(_rect.x<=rd.o.p.x&&_rect.x1>=rd.o.p.x)if(_rect.y<=rd.o.p.y&&_rect.y1>=rd.o.p.y){
                rezult.inBool=true;
            }
            //конечная в ректе
            rezult.inBool1=false;
            if(_rect.x<=rd.o.p1.x&&_rect.x1>=rd.o.p1.x)if(_rect.y<rd.o.p1.y&&_rect.y1>=rd.o.p1.y){
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

            let resArr = []
            for (let i = 0; i < aR.length; i++) {
                let __point = this.par.calc.getPointOfIntersection(aR[i], aR[(i+1)%aR.length], pl0, pl1)
                if (__point != null) resArr.push({x: __point.x, y: __point.y}) 
            }

            rezult.tip = (resArr.length >= 2) ? 2 : resArr.length;

            if (resArr.length) {

                rezult.arrPos[0] = resArr[0]

                if(rezult.inBool==true){
                    rezult.arrPos[1].x=rd.o.p.x;
                    rezult.arrPos[1].y=rd.o.p.y;
                }
                if(rezult.inBool1==true){
                    rezult.arrPos[1].x=rd.o.p1.x;
                    rezult.arrPos[1].y=rd.o.p1.y;
                }

                if (resArr.length >= 2) {
                    
                    rezult.arrPos[0] = resArr[resArr.length-2]
                    rezult.arrPos[1] = resArr[resArr.length-1]

                    if (resArr.length > 2) {
                        let b = unique(resArr)
                        rezult.arrPos = b
                    }                 

                    rezult.p.x=rezult.arrPos[0].x
                    rezult.p.y=rezult.arrPos[0].y
                    rezult.p1.x=rezult.arrPos[1].x
                    rezult.p1.y=rezult.arrPos[1].y 
                    return rezult
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

            if(_br.x < _win.x){
                rx=ax.length
                ax.push((_win.x-_br.x)/_br.w)
            }
            if(_br.x1 > _win.x1){
                //rx=ax.length
                ax.push((_win.x1-_br.x)/_br.w)   
            }

            if(_br.y < _win.y){
                ry=ay.length
                ay.push((_win.y-_br.y)/_br.h)
            }
            if(_br.y1 > _win.y1){
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


                    /*Грани коробки*/

                    if(j==0)br.bool[0]=_br.bool[0]                         
                    if(i==0)br.bool[3]=_br.bool[3]   
                    if(j==ay.length-2)br.bool[2]=_br.bool[2]  
                    if(i==ax.length-2) br.bool[1]=_br.bool[1]; 


                    ////////////////////


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


                   /* if (_br.sides) {
                        const {sides} = _br;
                        sides.forEach(item => {
                            const {size, side} = item;
                            
                        })
                    }*/

                    
                   /* if(i==rx&&j==ry){                        
                        if(bbb==true)ar.push(br) 
                    }else{
                        ar.push(br) 
                    }

                    if (this.par.isAdjacent(br, _win)) {
                        this.par.getMatchEdges(br, _win)
                    } */ 
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
        var uv = [];
        var normal = [];

        //линейная геометрия для отрисовки линий
        this.setGeomLine=function(geometry){                    
            vertices.length=0           
            for (var i = 0; i < this.par.arrDin.length; i++) {
                this.drawStroke(this.par.arrDin[i])
                //this.arrDin[i].setGLVert(vertices);
            }
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        
        }
  
       
        var nGeom//0-на 1- от 2 на обоих
        //наполняем геометрию с текстурированием
        this.setGeom=function(geometry, _nGeom){
            nGeom=0;
            if(_nGeom!=undefined) nGeom= _nGeom//c какой стороны накладываться  

            vertices.length=0
            uv.length=0  
            normal.length=0  
            for (var i = 0; i < this.par.arrDin.length; i++) {
                this.setGeomB(this.par.arrDin[i]);
            }        
       
            geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );          
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) );    
            geometry.computeBoundingBox();
            geometry.computeBoundingSphere();
            //geometry.computeVertexNormals();
        }

        this.drawStroke = function(box) {
            if (box.sides.length) {
                const { sides } = box;
                sides.forEach(el => {
                    const {side, size , isLeft, isDown} = el;

                    if (side === 0) {
                        vertices.push(
                            isLeft ? box.x+box.w : box.x+box.w-size,
                            box.y+box.h,
                            0,
                            isLeft ? box.x + size : box.x,
                            box.y+box.h,
                            0
                        )
                    }
    
                    if (side === 1) {
                        vertices.push(
                            box.x,
                            isDown ? box.y+box.h-size : box.y+box.h,
                            0,
                            box.x,
                            isDown ? box.y : box.y+size,
                            0
                        )
                    }
    
                    if (side === 2) {
                        vertices.push(
                            isLeft ? box.x+size : box.x,
                            box.y,
                            0,
                            isLeft ? box.x+box.w : box.x+box.w-size,
                            box.y,
                            0
                        )
                    }
    
                    if (side === 3) {
                        vertices.push(
                            box.x+box.w,
                            isDown ? box.y : box.y + size,
                            0,
                            box.x+box.w,
                            isDown ? box.y+box.h-size : box.y+box.h,
                            0
                        )
                    }
                })
            }
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
                this.sGmL(p,false)
                this.sGmL(p1,false)
                this.sGmL(p2,false)   
            }
            if(nGeom==1){
                this.sGmL(p1,true)
                this.sGmL(p,true)                
                this.sGmL(p2,true)   
            }
            if(nGeom==2){
                this.sGmL(p,false)
                this.sGmL(p1,false)
                this.sGmL(p2,false)

                this.sGmL(p1,true)
                this.sGmL(p,true)                
                this.sGmL(p2,true)   
            }
        }

        this.sGmL=function(p,b){
            if(b==true){
                normal.push(0,0,1)
            }else{
                normal.push(0,0,-1) 
            }

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


        this.arrLine=[];
        this.arrLineCesh=[] 
        var line,br
        this.clearAL=function(){
            this.arrLine.length=0;          
        }

        this.getLine=function(){
            if(this.arrLineCesh[this.arrLine.length]==undefined){
                this.arrLineCesh[this.arrLine.length]={p:{x:0,y:0},p1:{x:0,y:-100}}
            }       
            this.arrLine.push(this.arrLineCesh[this.arrLine.length])        
            return this.arrLine[this.arrLine.length-1];
        }





        this.getLine1=function(){
            this.clearAL();
            for (var i = this.par.arrDin.length-1; i >=0; i--) {
                //this.finalProBox(this.par.arrDin[i])
            
                if(this.par.arrDin[i].boolNa==true){
                    br=this.par.arrDin[i]
                    line=this.getLine()
                    if(br.boolPoli==true){
                        this.setLine(br.x,br.y,br.x+br.w,br.y+br.h,line); 
                    } 
                    else{
                       this.setLine(br.x,br.y+br.h,br.x+br.w,br.y,line);
                    } 
                }else{                    
                    if(this.par.arrDin[i].bool[0]==true){       
                        line=this.getLine();
                        this.setLine(this.par.arrDin[i].x,this.par.arrDin[i].y,this.par.arrDin[i].x+this.par.arrDin[i].w,this.par.arrDin[i].y,line);
                    }
                   /* if(this.par.arrDin[i].bool1[1]==true){       
                        line=this.getLine()
                        this.setLine(this.par.arrDin[i].x+this.par.arrDin[i].w,this.par.arrDin[i].y,this.par.arrDin[i].x+this.par.arrDin[i].w,this.par.arrDin[i].y+this.par.arrDin[i].h,line)
                    }*/

                }
            }
            return this.arrLine;
        }

        this.setLine=function(x,y,x1,y1,l){
            l.p.x=x
            l.p.y=y
            l.p1.x=x1
            l.p1.y=y1      
        } 
    }
}

function unique(a) {
    var isAdded,
        arr = [];
    for(var i = 0; i < a.length; i++) {
        isAdded = arr.some(function(v) {
            return isEqual(v, a[i]);
        });
        if( !isAdded ) {
            arr.push(a[i]);
        }
    }
    return arr; 
}
function isEqual(a, b) {
    var prop;
    for( prop in a ) {
        if ( a[prop] !== b[prop] ) return false;
    }
    for( prop in b ) {
        if ( b[prop] !== a[prop] ) return false;
    }
    return true;
}