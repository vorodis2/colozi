
import { Calc } from './Calc.js';
import { KRUmnik } from './KRUmnik.js';
import { KRGronRect } from './KRGronRect.js';
import { KRGronLine } from './KRGronLine.js';

export class KorektRect  {
    constructor(fun) {         
        this.type="KorektRect";        
        var self=this;
        this.fun=fun
        
        this.funRender=undefined

        this.pS={x:0,y:0,w:1000,h:1000}//Параметры текстурировнаия и начало энного


        this.rect={x:0,y:0,w:7000,h:3000};


        this.r={x:0,y:0,w:100,h:100,type:0};
        this.r1={x:0,y:0,w:100,h:100,type:0};

        this.array=[];
        this.arrayL=[];
        this.arrayCesh=[];
        this.arrDin=[];
        this.arrDinL=[];

        this.arrWin=[
            // {x:0,y:0,w:1000,h:1000}
        ];
        this.arrLine=[
            {p:{x:3000,y:-200},p1:{x:7000,y:3000}}/*,
            {p:{x:4000,y:1000},p1:{x:1000,y:2000}}*/
        ];

        this.calc=new Calc();

        this.krUmnik=new KRUmnik(this); 

        var w
        this.setSten=function(ohH1W,_x,_x1){
            _x=-200
            _x1=_x1||0;

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
            for (var i = this.arrDin.length-1; i >=0 ; i--) {     
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
            for (var j = 0; j < this.arrWin.length; j++) {
                for (var i = this.arrDin.length-1; i >=0 ; i--) {                
                    this.reshik2(i,this.arrDin[i],this.arrWin[j])
                } 
            } 
        }

        this.testLine=function(ps,pf,ps1,pf1){        
            if(ps1>=ps &&ps1<pf)return true;   //* окно.н >= блок.н && окно.н <= блок.к
            if(ps>=ps1 &&ps<pf1)return true;   //* блок.н >= окно.н && блок.н <= окно.к
            return false;
        }

        var bx,by,bx1,by1,n,n1,br
        this.reshik2=function(_i,_br,_win){
            _br.x1=_br.x+_br.w;   //* определяем координаты конца блока
            _br.y1=_br.y+_br.h;

            _win.x1=_win.x+_win.w;   //* опеределяем координаты конца окна
            _win.y1=_win.y+_win.h;    
            //this.calc
           
            bx=this.testLine(_br.x,_br.x1,_win.x,_win.x1)
            by=this.testLine(_br.y,_br.y1,_win.y,_win.y1)

            // console.log("---------- ID: " + _br.idArr + " -----------");
            // console.log("BX:" + bx, "[", _br.x, _br.x1, "]", "[", _win.x, _win.x1, "]");
            // console.log("BY:" + by, "[", _br.y, _br.y1, "]", "[", _win.y, _win.y1, "]");

            
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

     
                
                //разрезаем на куски
                // trace(_br, _win)
                this.krUmnik.setBoxInRect(_br,_win)
                this.arrDin.splice(_i,1)
                return    
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
            if(rd.y>=_br.y1)return;//выше
            if(rd.x1<=_br.x)return;//с лева
            if(rd.y1<=_br.y)return;//ниже


            if(rd.y>=_br.y1){
                if(this.nahVerh(_i,_br,rd)==true){
                    return
                }                
            }

            rez=this.krUmnik.isRectLine(_br,rd);


            if(rez.tip==0){ //в нутри          
                if(rez.pBool==true){this.nahVerh(_i,_br,rd)}
                return;
            }
            
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
            if(rd.type==0){;
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

                //
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

        /////////////////////////////
        //отрисовка дебага
        this.render=function(){
            if(this.funRender!=undefined){
                this.funRender()
            }
        }




    }
}
