
import { Calc, Position } from './Calc.js';
import { TriangulateShape} from './TriangulateShape.js';
/*import { KRUmnik } from './KRUmnik.js';
import { KRUColi } from './KRUColi.js';
import { KRGronRect } from './KRGronRect.js';
import { KRGronLine } from './KRGronLine.js';
*/

export class KorektLine  {
    constructor(fun) {         
        this.type="KorektLine";        
        var self=this;
        this.fun=fun
        this.boolDebug=true    
        this.funRender=undefined

      
        this.rect={x:0,y:0,z:0,w:300,h:300,d:0};

       /* this.pS={x:0,y:0,w:100,h:100}//Параметры текстурировнаия и начало энного
        


        this.r={x:0,y:0,w:10,h:10,type:0};
        this.r1={x:0,y:0,w:10,h:10,type:0};

        this.array=[];
        this.arrayL=[];
        this.arrayCesh=[];
        this.arrDin=[];
        this.arrDinL=[];

        this.coliz=null
        this.arrWin=[
            //{x:100,y:100,w:100,h:100},
            //{x:300,y:100,w:100,h:100}
        ];
        this.arrWinDin=[
            
        ];*/

        

        this.arrLine=[
            
        ];


        var calc=new Calc();
        this.calc=calc;

        this.boolVergDrag=false;
        this.triangul=new TriangulateShape();
        this.triangul.boolBig=false///Сигменты нафиг


        this.start=function(){
            this.korectRect();
            this.korectLine();
            this.korectTriang()
        }


        this.arr=[];
        this.arrCesh=[];


        this.arrPointM=[];
        this.arrPointCeshM=[];

        this.aL=[];
        this.aR=[];

        this.arTriang=[];



        this.aTri=[]
        this.aTriCesh=[]
        this.getTri=function(){
            if(this.aTriCesh[this.aTri.length]==undefined){
                this.aTriCesh[this.aTri.length]=new KLTriangul(this)
                this.aTriCesh[this.aTri.length].idArr=this.aTri.length
            } 
            this.aTriCesh[this.aTri.length].clear();      
            this.aTri.push(this.aTriCesh[this.aTri.length]);  

            return this.aTri[this.aTri.length-1];
        }


        this.getLine=function(){
            if(this.arrCesh[this.arr.length]==undefined){
                this.arrCesh[this.arr.length]=new KLLine()
                this.arrCesh[this.arr.length].idArr=this.arr.length
            } 
            this.arrCesh[this.arr.length].clear()      
            this.arr.push(this.arrCesh[this.arr.length])
            return this.arr[this.arr.length-1];
        }



        this.getLM=function(){
            
            if(this.arrPointCeshM[this.arrPointM.length]==undefined){
                this.arrPointCeshM[this.arrPointM.length]=new KLPoint(this);
                this.arrPointCeshM[this.arrPointM.length].idArr=this.arrPointM.length;                
            } 

            this.arrPointCeshM[this.arrPointM.length].clear();          
            this.arrPointM.push(this.arrPointCeshM[this.arrPointM.length]);  

            return this.arrPointM[this.arrPointM.length-1];
        }


        this.sort=function(a,b){
            return a.dist-b.dist
        }


        this.korectLine=function(){
            for (var i = 0; i < this.arrCesh.length; i++) this.arrCesh[i].clear()  
            for (var i = 0; i < this.arrPointM.length; i++) this.arrPointM[i].clear()       
            
            this.arr.length=0;
            this.arrPointM.length=0;
            this.arTriang.length=0;
            for (var i = 0; i < this.arrLine.length; i++) {
                this.kL(this.arrLine[i]);
            }

           

            this.aL.length=0;
            this.aR.length=0;
            this.aTri.length=0;

            for (var i = 0; i < this.arrPointM.length; i++) {
                this.arrPointM[i].boolP=false
            }


            for (var i = 0; i < this.arrPointM.length; i++) {
                if(this.arrPointM[i].p.y<0){
                    this.aL.push(this.arrPointM[i]);
                }else{
                    this.aR.push(this.arrPointM[i]);
                }
            }
            this.aL.sort(this.sort);
            this.aR.sort(this.sort);




        }


        var arrDuble=[]
        var sahhh,bNa
        this.korectTriang=function(){  
            this.arrPointM.sort(this.sort);
            sahhh=-1;
            this.kTri1()

            this.kTPoisk4()
            
        }


        var po,poindDin,pd,pd1;
        this.kTri1=function(){ 
            sahhh++;
            bNa=true
           // if(sahhh==1)return
     

            this.arTriang.length=0
            po=-1;
            for (var i = 0; i < this.arrPointM.length; i++) {
                if(this.arrPointM[i].boolP==false){
                    po=i;
                    break
                }
            }
            
            if(po==-1){//все точки закончились
                this.kTPoisk4()
                return
            }
            
            this.arTriang.length=0     
            poindDin=this.arrPointM[po];
            this.kTpoint(poindDin)
           

            po=-1;
            for (var i = 0; i < this.arrPointM.length; i++) {
                if(this.arrPointM[i].boolP==false){
                    po=i;
                    break
                }
            }
            
           
        }

       
        this.kTpoint=function(p){
            pd=p;
            pd.boolP=true;
            pd1=null;
   
      
            this.arTriang.push(pd);

            for (var i = 0; i < pd.array.length; i++) {
                if(pd.array[i].point.boolP == false){
                    this.kTpoint(pd.array[i].point);
                    return
                }

                if(pd.array[i].point1.boolP == false){
                    this.kTpoint(pd.array[i].point1);
                    return
                }
            }
        

            this.kTPoisk(pd)

          
        }

        var ar,p,p1,ppp,ss
        var dd,dd1,dd2,ddi;
        this.kTPoisk=function(p){
            //Ищем тех кто рядом пo
            dd=this.getDist3D(poindDin.p,p.p);//Растояние до ночала

            dd2=999999;
            ddi=-1
            
            for (var i = 0; i < this.arrPointM.length; i++) {//поиск на одном уровне Z
                if(this.arrPointM[i].boolP==true)continue
                if(this.arrPointM[i].array.length!=1)continue   
                if(this.arrPointM[i].p.z!==p.p.z)continue 
                dd1=this.getDist3D(this.arrPointM[i].p, p.p);//Растояние до ночала   
                
                if(dd1<dd2){
                    dd2=dd1
                    ddi=i
                }                   
            }


            
            if(ddi!==-1){
                if(dd2>dd && bNa==false){
               
                    arrDuble.push(p,poindDin)
                    this.kTPoisk3(this.arTriang)

                    this.kTri1()
                }else{
                    bNa=false
                    arrDuble.push(p,this.arrPointM[ddi])
                    this.kTpoint(this.arrPointM[ddi])
                }
                return
            }

            


            dd2=999999;
            ddi=-1
            for (var i = 0; i < this.arrPointM.length; i++) {//поиск на одном уровне Z
                if(this.arrPointM[i].boolP==true)continue
                if(this.arrPointM[i].array.length!=1)continue   
                if(this.arrPointM[i].bM!==!p.bM)continue 

                dd1=this.getDist3D(this.arrPointM[i].p, p.p);//Растояние до ночала   
        
                if(dd1<dd2){
                    dd2=dd1
                    ddi=i
                }                   
            }

 

            if(ddi!==-1){
                if(dd2>dd&& bNa==false){             
                    arrDuble.push(p,poindDin)
                    this.kTPoisk3(this.arTriang)
                    this.kTri1()
                }else{
                    bNa=false
                    arrDuble.push(p,this.arrPointM[ddi])
                    this.kTpoint(this.arrPointM[ddi])
                }
                return
            }


  
            arrDuble.push(p,poindDin)
            this.kTPoisk3(this.arTriang)
          




        }

        this.arTDo=[]
        this.kTPoisk3=function(p){
            this.arTDo.length=0;
            for (var i = 0; i < this.arTriang.length; i++) {
                this.arTDo.push(this.arTriang[i].p)
            }
            this.korectTriang3(this.arTDo)
        }


        //Оброботка прагалок
        this.kTPoisk4=function(){
        


            for (var i = 0; i < arrDuble.length; i+=2) {
                for (var j = i+2;  j< arrDuble.length; j+=2) {
                    if(this.kT4(arrDuble[i],arrDuble[i+1],arrDuble[j],arrDuble[j+1])==true){
                    
                        arrDuble.splice(j,2)
                        arrDuble.splice(i,2)
                        this.kTPoisk4()
                        return
                    }
                }
            }
            
        }

        var _p,_p1,_p2,_p3
        var __p,__p1,__p2,__p3,trtr

        this.kT4=function(p,p1,p2,p3){
           
             __p=null
            _p=this.getDist2D(p.p,p2.p)
            _p1=this.getDist2D(p.p,p3.p)
  

            if(_p<0.01){
                
                if(this.getDist2D(p1.p,p3.p)<0.01){
                    __p=p
                    __p1=p1
                    __p2=p2
                    __p3=p3
                   // return true;
                }
                 
            }
            if(_p1<0.01){
                
                if(this.getDist2D(p1.p,p2.p)<0.01){
                    __p=p
                    __p1=p1
                    __p2=p3
                    __p3=p2


                    //return true;    
                }             
            }

            if(__p!=null){
                trtr = this.getTri(); 
                trtr.p.setPoint(__p.p)
                trtr.p1.setPoint(__p1.p)
                trtr.p2.setPoint(__p2.p)
                trtr.setRect(this.rect);
                trtr = this.getTri();                
                trtr.p2.setPoint(__p.p)
                trtr.p1.setPoint(__p1.p) 
                trtr.p.setPoint(__p2.p)
                trtr.setRect(this.rect);


                trtr = this.getTri(); 
                trtr.p.setPoint(__p3.p)
                trtr.p1.setPoint(__p1.p)
                trtr.p2.setPoint(__p2.p)
                trtr.setRect(this.rect);
                trtr = this.getTri();                
                trtr.p2.setPoint(__p3.p)
                trtr.p1.setPoint(__p1.p) 
                trtr.p.setPoint(__p2.p)
                trtr.setRect(this.rect);


                return true;
            }


           /* _p=p;
            _p1=p1;
            _p2=p2;
            _p3=p3;
            if(_p.bM!=_p2.bM){
                _p2=p3;
                _p3=p2; 
            }

            if(_p.bM===_p2.bM&&_p1.bM===_p3.bM){
                
            }else{
                return false;
            }


           */

            return false;
        }

        this.getDist2D = function (p1, p2) {            
            return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2));
        };



        //////////////////////////////////
/*
        var aL=[]
        var aR=[]
        var sL=0;
        var sR=0;
        var b=false
        var sahhh
       /* this.korectTriang=function(){  
            sL=0;
            sR=0;
            b=false
            sahhh=0
            this.korectTriang1()
        } */
/*
        this.korectTriang1=function(){
            aL.length=0;
            aR.length=0;
            b=true
            for (var i = sL; i < this.aL.length; i++) {
                aL.push(this.aL[i]);
                sL=i+1;
                if(b==false&&this.aL[i].array.length<=1){
                    break;
                }
                b=false
            }

            b=true;
            for (var i = sR; i < this.aR.length; i++) {
                aR.push(this.aR[i]);
                sR=i+1;
                if(b==false && this.aR[i].array.length<=1){
                    break;
                }
                b=false;
            }
            
            if(aR.length==0)return
            if(aL.length==0)return    
            if(aR.length+aL.length<=2)return
               
            this.korectTriang2()
            sahhh++ 

            this.korectTriang1()




        }  

        
        this.korectTriang2=function(){  
            if(sahhh!=1)return
            this.arTriang.length=0

            for (var i = 0; i < aL.length; i++) {
                this.arTriang.push(aL[i].p)
            }

            for (var i = 0; i < aR.length; i++) {
                this.arTriang.unshift(aR[i].p);
            }
   
            this.korectTriang3(this.arTriang)
        }
*/

        //////////////////////////////////////



        this.korectTriang3=function(a){ 
            this.triangul.start(a);          
            for (var i = 0; i < this.triangul.arrTriangleBig.length; i++) {
                p= this.getTri();            
                p.setP(this.triangul.arrTriangleBig[i]);
                p.setRect(this.rect);               
            }

        }     




        var ll,aaa,pp,dist,bbb,pp1,dist1,bbb1,ppp
        this.kL=function(l){
            
            ll=this.getLine();
             
            ll.p.x=l.p.x;
            ll.p.y=l.p.y;
            ll.p.z=l.p.z;

            ll.p1.x=l.p1.x;
            ll.p1.y=l.p1.y;
            ll.p1.z=l.p1.z;
            ll.bool=false;
            if(ll.p1.y<0||ll.p.y<0)ll.bool=true;

            
            var b=true;
            for (var i = 0; i < this.arrPointM.length; i++) {

                dist=this.getDist3D(this.arrPointM[i].p,ll.p);
                if(dist<0.01){                    
                    this.arrPointM[i].addLine(ll,true)
                    b=false
                    break;
                }
            }
            
            if(b==true){
                ppp=this.getLM();                
                ppp.set(ll.p);
                ppp.addLine(ll,true);
            }

        
            b=true;
            for (var i = 0; i < this.arrPointM.length; i++) {               
                dist=this.getDist3D(this.arrPointM[i].p, ll.p1);              
                if(dist<0.01){                     
                    this.arrPointM[i].addLine(ll,false)                    
                    b=false
                    break;
                }
            }
            
            if(b==true){
                ppp=this.getLM();
                ppp.set(ll.p1);
                ppp.addLine(ll,false);
            }




         
            

        }     


        this.getDist3D = function (p1, p2) {
            return Math.sqrt(Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2) + Math.pow((p1.z - p2.z), 2))      
        };



        this.korectRect=function(){
            this.rect.x=999999999999
            this.rect.y=999999999999
            this.rect.z=999999999999   

            this.rect.x1=-999999999999
            this.rect.y1=-999999999999
            this.rect.z1=-999999999999 

            for (var i = 0; i < this.arrLine.length; i++) {
                this.korectRectPoint(this.arrLine[i].p);
                this.korectRectPoint(this.arrLine[i].p1); 
            }

            this.rect.w=this.rect.x1-this.rect.x;
            this.rect.h=this.rect.y1-this.rect.y;
            this.rect.d=this.rect.z1-this.rect.z;           
        }


        this.korectRectPoint=function(p){
            if(this.rect.x>p.x)this.rect.x=p.x;
            if(this.rect.y>p.y)this.rect.y=p.y;
            if(this.rect.z>p.z)this.rect.z=p.z;

            if(this.rect.x1<p.x)this.rect.x1=p.x;
            if(this.rect.y1<p.y)this.rect.y1=p.y;
            if(this.rect.z1<p.z)this.rect.z1=p.z;
        }


        var vertices = [];
        var uv = [];
        var normal = [];
        var nGeom//0-на 1- от 2 на обоих
        this.setGeom=function(geometry, _nGeom){
            nGeom=0;
            if(_nGeom!=undefined) nGeom= _nGeom//c какой стороны накладываться

            vertices.length=0
            uv.length=0  
            normal.length=0 
            
            for (var i = 0; i < this.aTri.length; i++) {
                this.setGeomB(this.aTri[i]);
            }  
            geometry.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
            geometry.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );          
            geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            geometry.computeBoundingBox();
            geometry.computeBoundingSphere();
            //geometry.computeVertexNormals(); 
        }

        var dinBox
        this.setGeomB=function(tri){  
            vertices.push(tri.p2.x,  tri.p2.y,    tri.p2.z);
            vertices.push(tri.p1.x,  tri.p1.y,    tri.p1.z);
            vertices.push(tri.p.x,  tri.p.y,    tri.p.z);          
            
            uv.push(tri.uv2.x,  tri.uv2.y);
            uv.push(tri.uv1.x,  tri.uv1.y);
            uv.push(tri.uv.x,  tri.uv.y); 

            normal.push(0,  1, 0);
            normal.push(0,  1, 0);
            normal.push(0,  1, 0);          
        }


    }
}

export class KLLine  {
    constructor() {         
        this.type="KLLine";
        this.idAr=-1    

        this.p=new Position()
        this.p1=new Position()

        this.point=undefined;
        this.point1=undefined;
        this.clear=function(){
            this.point=undefined;
            this.point1=undefined;
        }
    }
}


export class KLPoint  {
    constructor(par) {         
        this.type="KLPoint";
        this.idArr=-1    
        this.par=par

        this.boolP=false

        this.p=new Position();
        this.pNull=new Position(0,0,0);
        this.dist=0
        this.array=[]
        this.arrayBool=[]
        this.clear=function(){
            this.array.length=0;
            this.arrayBool.length=0;
             this.boolP=false
        }

        this.bM=false
        this.set=function(p){
            this.bM=true
            if(p.y<0)this.bM=false
            this.p.set(p.x,p.y,p.z);
            this.dist= this.par.getDist3D(this.pNull,this.p);
        }

        this.addLine=function(line,bool){
            this.array.push(line)
            this.arrayBool.push(bool)

            if(bool==true){
                line.point=this                
            }else{
                line.point1=this
            }

        }       
    }
}


export class KLTriangul  {
    constructor(par) {         
        this.type="KLTriangul";
        this.idArr=-1    
        this.par=par

        this.p=new Position();
        this.p1=new Position();
        this.p2=new Position();
    
        this.uv=new Position();
        this.uv1=new Position();
        this.uv2=new Position();

        this.clear=function(){
            
        }  

        this.setP= function(a){
            this.p.setPoint(a[0])
            this.p1.setPoint(a[1])
            this.p2.setPoint(a[2])            
        }

        this.setRect= function(rect){
            this.setRectUV(this.uv,this.p,rect);
            this.setRectUV(this.uv1,this.p1,rect);
            this.setRectUV(this.uv2,this.p2,rect);
            
        }


        this.setRectUV= function(uv, p, rect){
            uv.x=(p.x-rect.x)/rect.w;
            uv.y=(p.y-rect.y)/rect.h;
        }

                
    }
}


/*
        this.krUmnik=new KRUmnik(this);
        this.krUColi=new KRUColi(this);

        var w
        this.setSten=function(ohH1W,_x,_x1){
            _x=-200
            _x1=_x1||0

            w=ohH1W.width!=undefined?ohH1W.width : ohH1W._distans;
            this.rect.x=_x;
            this.rect.w=w-_x+_x1;
            this.rect.x1=this.rect.x+this.rect.w;

            this.rect.y=0;
            this.rect.h=ohH1W.height;
            this.rect.h1=ohH1W.height1;
        }

        this.removeDin=function(_rb){
            var r=false;
            for (var i = this.arrDin.length-1; i >= 0 ; i--) {     
                if(this.arrDin[i].idArr==_rb.idArr){
                    this.arrDin.splice(i,1);
                    r=true;
                }
            }
            if(r==true) _rb.clear()
            return r;
        }


        var rect;    
        this.sah=0;
        this.setRect=function(r){
            this.rect = r;
        }

        this.clear=function(){
            this.sah=0;
            this.sahL=0;
            for (var i = 0; i < this.array.length; i++) {
                this.array[i].clear();
            }
            for (var i = 0; i < this.arrayL.length; i++) {
                this.arrayL[i].clear();
            }
        }

        this.getR=function(){
            if(this.array[this.sah]==undefined){
                this.array[this.sah]=new KRGronRect()
                this.array[this.sah].idArr=this.sah
            }
            this.sah++
            return this.array[this.sah-1]
        }

        this.sahL=0;
        this.getL=function(){
            if(this.arrayL[this.sahL]==undefined){
                this.arrayL[this.sahL]=new KRGronLine()
                this.arrayL[this.sahL].idArr=this.sah;
            }
            this.sahL++
            return this.arrayL[this.sahL-1]
        }


        this.korektGrid=function(){ 
            this.boolVergDrag=false

            this.clear(); //очищаем           
            this.naStart();//Наполняем базовыми ректами сцену
            this.reshik();//режим ректами ночало
            this.reshikLine();//режим линиями
            this.finalPro();//финальная проходка 
            this.render();//откидуем на рендер для дебага если есть
        }

        
        //Наполняем базовыми ректами сцену
        this.naStart=function(){    
            this.krUmnik.naStart();
        }



        ///////режим ректами ночало///////////////////////////////////
        this.reshik=function(){
            this.krUColi.korectRect(); //* парсим окна в ректы
            for (var j = 0; j < this.arrWinDin.length; j++) {
                for (var i = this.arrDin.length-1; i >=0 ; i--) {                
                    this.reshik2(i,this.arrDin[i],this.arrWinDin[j])
                } 
            } 
        }

        //* Проверяет находится ли квадрат внутри окна
        this.isRectInsideWindow = function(_br, _win) {
            if ((_br.x>=_win.x && _br.x1<=_win.x1) && (_br.y>=_win.y && _br.y1<=_win.y1)) return true
            return false;
        }

        //*  проверяет соприкасается ли окно с блоком  
        this.isAdjacent = function(_br, _win) {

            const test = (br,br1,win,win1) => {
                if(win>=br &&win<=br1)return true;
                if(br>=win &&br<=win1)return true;  
                return false;
            }

            let bx = test(_br.x, _br.x1, _win.x, _win.x1);
            let by = test(_br.y, _br.y1, _win.y, _win.y1);

            if (_br.x1 == _win.x && _br.y1 == _win.y) return false;
            if (_br.x == _win.x1 && _br.y1 == _win.y) return false;
            if (_br.x1 == _win.x && _br.y == _win.y1) return false;
            if (_br.x == _win.x1 && _br.y == _win.y1) return false;
            
            if (bx && by) return true;
            return false;
        }

        //* Проверяем есть ли совпадающая грань
        this.getMatchEdges = (_br, _win) => {
            const isDownSide = _br.y1 == _win.y;
            const isTopSide = _br.y == _win.y1;

            const isLeftSide = _br.x1 == _win.x;
            const isRightSide = _br.x == _win.x1;

            const { sides } = _br;
            let size, side, isLeft, isDown;

            if (isDownSide || isTopSide) {
                //*  полностью на грани
                if (_br.x == _win.x && _br.x1 == _win.x1) {
                    sides.push({size: 0, side: isDownSide ? 0 : 2})
                    return
                }

                //* вылазит слева
                if (_br.x1 <= _win.x1 && _br.x < _win.x) {
                    side = isDownSide ? 0 : 2;

                    n=(_win.x-_br.x)/_br.w; 

                    isLeft = true;
                    size = _br.w*n;
                    sides.push({size, side, isLeft})
                    return
                }

                //* вылазит справа
                if (_br.x >= _win.x && _br.x1 > _win.x1) {
                    side = isDownSide ? 0 : 2;

                    n=((_win.x1)-_br.x)/_br.w;
                    n1=_br.w*n;

                    isLeft = false;
                    size =_br.w-n1;
                    sides.push({size, side, isLeft})
                    return
                }

                if (_br.x < _win.x && _br.x1 > _win.x1) {
                    
                }

                if (isDownSide && _br.y < _win.y) {
                    sides.push({size: 0, side: 0})
                    return;
                }
                if (isTopSide && _br.y1 > _win.y1) {
                    sides.push({size: 0, side: 2})
                    return;
                }
            }

            if (isLeftSide || isRightSide) {
                if (_br.y == _win.y && _br.y1 == _win.y1) {
                    sides.push({size: 0, side: isRightSide ? 1 : 3});
                    return
                }

                 //* вылазит сверху 
                if (_br.y1 <= _win.y1 && _br.y < _win.y) {
                    side = isRightSide ? 1 : 3;

                    n=(_win.y-_br.y)/_br.h;   

                    size = _br.h*n;
                    isDown = false;
                    sides.push({size, side, isDown})
                    return
                }

                //* вылазит снизу
                if (_br.y >= _win.y && _br.y1 > _win.y1) {
                    side = isRightSide ? 1 : 3;

                    n=((_win.y1)-_br.y)/_br.h;         
                    n1=_br.h*n;

                    size = _br.h-n1;
                    isDown = true;
                    sides.push({side, size, isDown})
                    return
                }

                if (isRightSide && _br.x1 > _win.x1) {
                    sides.push({side: 1, size: 0})
                    return;
                }
                if (isLeftSide && _br.x < _win.x) {
                    sides.push({side: 3, size: 0})
                    return;
                }
            }
        }

         //* находим координаты конца блока
        this.endCoords = function(_rect) {
            _rect.x1 = _rect.x + _rect.w;
            _rect.y1 = _rect.y + _rect.h;
        }

        this.rectIntersect = function(_br, _win) {
            return _win.y < _br.y1 && _win.y1 > _br.y && _win.x < _br.x1 && _win.x1 > _br.x
        }

        var n,n1,br
        this.reshik2=function(_i,_br,_win){

            //* получаем координаты конца окна и ректа
            this.endCoords(_br);
            this.endCoords(_win);

            //* отбираем ректы для нарезки и покраски
            if(this.isAdjacent(_br, _win)){  

                //* если рект внутри окна, удаляем     
                const isInside = this.isRectInsideWindow(_br, _win);
                if(isInside){                                                                   
                    this.arrDin.splice(_i,1)
                    return                                           
                }

                //* обводим грани
                this.getMatchEdges(_br, _win);

                //* нужно ли резать
                if (!this.rectIntersect(_br, _win)) return;

                

                this.krUmnik.setBoxInRect(_br,_win)
                this.arrDin.splice(_i,1)
                return;
            } 
        }
        ////////////////////////////////////////////////////




        var p={x:0,y:0};
        var p1={x:0,y:0};
        var rd={x:0,y:0,x1:0,y1:0,w:0,w:0,o:null};
        var rdBig={x:0,y:0,x1:0,y1:0,w:0,w:0,o:null};
        var rez,rr,_line,a,xzL

        this.reshikLine=function(){
            var i,j
            for (j = 0; j < this.arrLine.length; j++) {
                xzL=this.getL();
                
                xzL.setLine(this.arrLine[j]);
            }
            
            for (j = 0; j < this.sahL; j++) {
                rdBig=this.arrayL[j]            
                for (i = this.arrDin.length-1; i >=0 ; i--) {
                    this.reshikLine1(i,this.arrDin[i],rdBig)
                }
            }          
        }

    
        var rrEE=new KRGronLine();
        this.reshikLine1=function(_i,_br, rd){
            _br.x1=_br.x+_br.w;
            _br.y1=_br.y+_br.h;

            if(rd.x>=_br.x1)return;//с права
            // if(rd.y>_br.y1)return;//выше
            if(rd.x1<=_br.x)return;//с лева
            if(rd.y1<=_br.y)return;//ниже


            if(rd.y>=_br.y1){
                if(this.nahVerh(_i,_br,rd)==true){
                    return
                }                
            }
         
            rez=this.krUmnik.isRectLine(_br,rd);

            if(rez.tip==0){ //в нутри           
                if(rez.pBool==true)this.nahVerh(_i,_br,rd)
                return;
            }
            
            this.boolVergDrag=true
            if(rez.tip==3){//на линии
                if(this.nafigRect(_i,_br, rd)==true)return                
            }

            if(rez.tip==2||rez.tip==1){//с права или лева                
                rrEE.setLine(rez)                                 
                if(this.nafigRect(_i,_br, rrEE)==true)return 
            }
        }

        //Вписывам рект в рект
        var ze
        this.nafigRect=function(_i,_br, rd){
            ze=this.krUmnik.setBoxInRect(_br,rd,true)
            
            
            if(rd.type==1){
                ze.arBig[ze.ry][ze.rx].boolPoli=true;
                ze.arBig[ze.ry][ze.rx].boolNa=true;

                ze.arBig[ze.ry][ze.rx].boolOt=false;

                if(ze.arBig[ze.ry][ze.rx-1]!=undefined)ze.arBig[ze.ry][ze.rx-1].bool1[1]=false;

                for (var i = 0; i < ze.arBig.length; i++) {                
                    if(ze.arBig[i][ze.rx+1])this.nahVerh(null,ze.arBig[i][ze.rx+1], rdBig)
                }

            }
            if(rd.type==0){
                ze.arBig[ze.ry][ze.rx].boolPoli=false;
                ze.arBig[ze.ry][ze.rx].boolNa=true;
                
                ze.arBig[ze.ry][ze.rx].boolOt=true;


                if(ze.arBig[ze.ry][ze.rx+1]!=undefined){
                    ze.arBig[ze.ry][ze.rx+1].bool1[3]=false;
                    
                   // this.nahVerh(null,ze.arBig[ze.ry+1][ze.rx],rd)
                }

                for (var i = 0; i < ze.arBig.length; i++) {                
                    if(ze.arBig[i][ze.rx-1])this.nahVerh(null,ze.arBig[i][ze.rx-1], rdBig) 
                }
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


        

        var bb,bb1
        this.nahVerh=function(_i,_br,rd){ 
            bb=false
            if(_br.x<rd.x)bb=true

            bb1=true
            if(_br.x1<rd.x1)bb1=false 

            if(bb==false&&bb1==false) {//в нутри удддоляем
                //this.arrDin.splice(_i,1)
                this.removeDin(_br) 
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



        
        

        this.finalPro=function(){
            this.krUmnik.finalPro();
        }
 

        /////////////////////////////////////////////
        //линейная геометрия для отрисовки линий
        this.setGeomLine=function(geometry){
            this.krUmnik.setGeomLine(geometry)
        }

        //наполняем геометрию с текстурированием
        this.setGeom=function(geometry, _nGeom){
            this.krUmnik.setGeom(geometry, _nGeom)
        }

        //возврощает массив линий от верхушки
        this.getLine1=function(){
            return this.krUmnik.getLine1();
        }




        /////////////////////////////
        //отрисовка дебага
        this.render=function(){
            if(this.boolDebug==false)return
            if(this.funRender!=undefined){
                this.funRender()
            }
        }*/
  