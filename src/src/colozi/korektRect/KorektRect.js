
import { Calc } from './Calc.js';
import { KRUmnik } from './KRUmnik.js';
import { KRUColi } from './KRUColi.js';
import { KRGronRect } from './KRGronRect.js';
import { KRGronLine } from './KRGronLine.js';

export class KorektRect  {
    constructor(fun) {         
        this.type="KorektRect";        
        var self=this;
        this.fun=fun
        this.boolDebug=true    
        this.funRender=undefined

        this.pS={x:0,y:0,w:100,h:100}//Параметры текстурировнаия и начало энного


        this.rect={x:0,y:0,w:10,h:300};


        this.r={x:0,y:0,w:10,h:10,type:0};
        this.r1={x:0,y:0,w:10,h:10,type:0};

        this.array=[];
        this.arrayL=[];
        this.arrayCesh=[];
        this.arrDin=[];
        this.arrDinL=[];

        this.coliz=null
        this.arrWin=[/*
            {x:100,y:100,w:100,h:100},
            {x:300,y:100,w:100,h:100}*/
        ];
        this.arrWinDin=[
            
        ];

        

        this.arrLine=[
            {p:{x:0,y:-100},p1:{x:0,y:-100}}
        ];


        this.calc=new Calc();


        this.boolVergDrag=false



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
            trace(_br,rd)
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

        /////////////////////////////
        //отрисовка дебага
        this.render=function(){
            if(this.boolDebug==false)return
            if(this.funRender!=undefined){
                this.funRender()
            }
        }
    }
}
