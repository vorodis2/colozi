//import { MStyle} from './MStyle.js';
//import { DWStenColiz} from './Debag/DWStenColiz.js';
import { SpDebugPixi } from './SpDebugPixi.js';//пикси отрисовка
import { KorektRect } from '../colozi/korektRect/KorektRect.js';//пикси отрисовка
import { VisiPixi } from '../libMy/VisiPixi.js';
export class DebKR  {
    constructor(par, fun) {
    	this.type="DebKR";
		var self=this;
		this.par=par
		this.fun=fun

		
		this.dC=par.dCont;
        this._active = false;
        this._otstup = 5;
        this._width=600;
        this._height=600;

        var scale=0.1;
        var otstup=50; 

        this.dCont=new DCont(this.dC);

        this.pan = new DPanel (this.dCont,otstup,otstup);
        this.pan.width = this._width;
        this.pan.height = this._height;
        this.pan.visible = this.active;
        this.window=undefined;

        var nGeom=0
		var date;
        this.sss=function(){
        	date=new Date().getTime()
        	for (var i = 0; i < self.sliItar.value; i++) {
        	
        		kr.korektGrid()
        	}
        	
        	
        	this.saveTime()
        }

        this.save1=function(){  
             
            fun("saveLocal")      
        } 
        this.sah=0;
        this.saveTime=function(){
            this.sah++;
            var s=this.sah;
            setTimeout(function() {
                if(self.sah==s)self.save1()
            }, 500);
        } 


        this.setObjLoc=function(o){ 
           	if(kr)if(o){
           		kr.pS.x=o.pS.x
				kr.pS.y=o.pS.y
				kr.pS.w=o.pS.w
				kr.pS.h=o.pS.h

				if(kr.arrLine[0]){
					kr.arrLine[0].p.x=o.al0.x
					kr.arrLine[0].p.y=o.al0.y
					kr.arrLine[0].p1.x=o.al0.x1
					kr.arrLine[0].p1.y=o.al0.y1
				}

				if(this.window!=undefined){
					this.slider.value=kr.pS.x;
           			this.slider1.value=kr.pS.y;
            		this.slider2.value=kr.pS.w;
            		this.slider3.value=kr.pS.h;

            		this.sli.value=kr.arrLine[0].p.x;
            		this.sli1.value=kr.arrLine[0].p.y;
            		this.sli2.value=kr.arrLine[0].p1.x;
            		this.sli3.value=kr.arrLine[0].p1.y;
				}
				this.sss();
				//kr.korektGrid();
           	}
        }
        this.getObjLoc=function(o){ 
            var o={}

            if(kr){
            	o.pS={}
            	o.pS.x=kr.pS.x
            	o.pS.y=kr.pS.y
            	o.pS.w=kr.pS.w
            	o.pS.h=kr.pS.h

            	o.al0={}
            	o.al0.x=kr.arrLine[0].p.x
            	o.al0.y=kr.arrLine[0].p.y

            	o.al0.x1=kr.arrLine[0].p1.x
            	o.al0.y1=kr.arrLine[0].p1.y
            }
            
            return o
        }


        this.init=function(){
            if(this.window!=undefined)return;
            this.window=new DWindow(this.dCont);
            this.setKR(new KorektRect());


            this.cont3d=new THREE.Object3D();

            this.par.visi3D.groupObject.add(this.cont3d); 
			this.par.visi3D.zume=10000 
	        this.par.visi3D.rotationX=0;//-1.56
	        this.par.visi3D.rotationZ=0;


            this.lineBasicMaterial = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 10});
	        this.plXZ=new PlXZ();
	        this.lineSegments = new THREE.LineSegments(
	            this.plXZ,
	            this.lineBasicMaterial
	        )
            this.cont3d.add(this.lineSegments);
            
	        this.texture = new THREE.TextureLoader().load('resources/image/pic.png');  
	        this.texture.wrapS = THREE.RepeatWrapping;
			this.texture.wrapT = THREE.RepeatWrapping;
			this.texture.repeat.y=-1
	        this.meshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map:this.texture });
	        this.plXZ2=new PlXZ();
	        this.mesh = new THREE.Mesh(
	            this.plXZ2,
	            this.meshBasicMaterial
	        )
	        this.cont3d.add(this.mesh);


            this.window.width=222
            this.slider = new DSliderBig (this.window.content, 2, 2, function(){kr.pS.x=this.value;self.sss()}, 'x', -10000, 10000);
            this.slider1 = new DSliderBig (this.window.content, 2, 2+52*1, function(){kr.pS.y=this.value;self.sss()}, 'y', -10000, 10000);
            this.slider2 = new DSliderBig (this.window.content, 2, 2+52*2, function(){kr.pS.w=this.value;self.sss()}, 'w', 100, 10000);  
            this.slider3 = new DSliderBig (this.window.content, 2, 2+52*3, function(){kr.pS.h=this.value;self.sss()}, 'h', 100, 10000);

            this.slider.width=this.slider1.width=this.slider2.width=this.slider3.width=this.window.width-4
            this.slider.value=kr.pS.x;
            this.slider1.value=kr.pS.y;
            this.slider2.value=kr.pS.w;
            this.slider3.value=kr.pS.h;            
            this.window.height=2+52*4; 


            this.win=new DWindow(this.dCont); 
            this.win.width=222;
            this.sli = new DSliderBig (this.win.content, 2, 2, function(){
            	kr.arrLine[0].p.x=this.value;
            	if(kr.arrLine[1])kr.arrLine[1].p.x=this.value;
            	self.sss()
        	}, 'x', -10000, 10000);
            this.sli1 = new DSliderBig (this.win.content, 2, 2+52*1, function(){
            	kr.arrLine[0].p.y=this.value;
            	if(kr.arrLine[1])kr.arrLine[1].p.y=this.value;
            	self.sss()
            }, 'y', -10000, 10000);
            this.sli2 = new DSliderBig (this.win.content, 2, 2+52*2, function(){                
                kr.arrLine[0].p1.x=this.value;
                self.sss();
            }, 'x1', -10000, 10000); 

            this.sli3 = new DSliderBig (this.win.content, 2, 2+52*3, function(){
            	
            	kr.arrLine[0].p1.y=this.value;
            	
            	self.sss()
            }, 'y1', -10000, 10000);

            this.button = new DButton(this.win.content, 2, 2+52*4, 'revert', function(){
            	var x=kr.arrLine[0].p.x;
            	var y=kr.arrLine[0].p.y;

            	kr.arrLine[0].p.x=kr.arrLine[0].p1.x;
            	kr.arrLine[0].p.y=kr.arrLine[0].p1.y;
            	kr.arrLine[0].p1.x=x;
            	kr.arrLine[0].p1.y=y;
            	self.sss();
            });	



            this.sli.width=this.sli1.width=this.sli2.width=this.sli3.width=this.win.width-4
            this.sli.value=kr.arrLine[0].p.x;
            this.sli1.value=kr.arrLine[0].p.y;
            this.sli2.value=kr.arrLine[0].p1.x;
            this.sli3.value=kr.arrLine[0].p1.y;
          
            this.win.height=2+52*5;


            this.win1=new DWindow(this.dCont); 
            this.win1.width=222;
            var yy=2
            this.check = new DCheckBox(this.win1.content, 2, yy, 'нафиг дебаг', function(){
            	self.sss()
            });
            yy+=25
            this.check1 = new DCheckBox(this.win1.content, 2, yy, 'нафиг геометрию', function(){
            	self.sss()
            });            
            yy+=25
            this.check2 = new DCheckBox(this.win1.content, 2, yy, 'текст нах', function(){
            	self.sss()
            });            
            yy+=25

            this.sliItar = new DSliderBig (this.win1.content, 2, yy, function(){
            	self.sss()
            }, 'кол. итораций', 1, 2000);
            this.sliItar.width=this.win1.width-4
            this.sliItar.okrug=1;
            self.sliItar.value=1;
            yy+=50


            this.b0 = new DButton(this.win1.content, 2, yy, '0', function(){
                nGeom=0;
                self.sss()
            });
            this.b1 = new DButton(this.win1.content, 2+34, yy, '1', function(){
                nGeom=1;
                self.sss()
            });
            this.b2 = new DButton(this.win1.content, 2+34*2, yy, '2', function(){
                nGeom=2;
                self.sss()
            });

            this.b0.width=this.b1.width=this.b2.width=32
            trace("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

            yy+=34


            
           	this.button = new DButton(this.win1.content, 2, yy, 'add Random Line', function(){
            	var ww=(1000+kr.rect.w)
            	var hh=(1000+kr.rect.h)
            	kr.arrLine.push(
            		{p:{
            			x:-500+Math.random()*ww,
            			y:-500+Math.random()*hh
            		},p1:{
            			x:-500+Math.random()*ww,
            			y:-500+Math.random()*hh
            		}}
            		)
            	self.sss()
            });
           	yy+=34
           	this.button1 = new DButton(this.win1.content, 2, yy, 'add Random Rect', function(){
            	var ww=(1000+kr.rect.w)
            	var hh=(1000+kr.rect.h)
            	kr.arrWin.push(
            		{
            			w:100+Math.random()*2000,
            			h:100+Math.random()*2000,            		
            			x:-500+Math.random()*ww,
            			y:-500+Math.random()*hh
            		}
            		)
            	self.sss()
            });
            yy+=34
           	this.button.width=this.button1.width=this.win1.width-4
            this.win1.height=yy+34;

           /*
            setTimeout(function() {
            	kr.korektGrid();
            }, 10);*/
            
        }





        var kr
        this.kr
        this.setKR=function(_kr){
            this.kr=_kr;
            kr=_kr
            this.init();
        }

        this.visiPixi=undefined;   
        this.content2d = new PIXI.Container();
        this.content2d.position.x=otstup;
        this.content2d.position.y=otstup;

        this.debugPixi = new SpDebugPixi();
        this.content2d.addChild(this.debugPixi.content2d);
        this.debugPixi.content2d.scale.set(scale,scale); 
        var dp=this.debugPixi

        this.drag=function(){
        	//console.time("start")
        	
        	

        	if(self.check.value==false){

            if(self.visiPixi==undefined){
                self.visiPixi=new VisiPixi(); 
                self.visiPixi.content2d.addChild(self.content2d);
                self.dCont.div.appendChild(self.visiPixi.div)
            }
           
            self.pan.width=Math.round(self.kr.rect.w*scale)
            self.pan.height=Math.round(self.kr.rect.h*scale)

            self.width=self.pan.width+otstup*2
            self.height=self.pan.height+otstup*2

            if(self.window!=undefined){
                self.window.x=300;
                self.window.y=self.pan.height+otstup*2;

                self.win.x=600;
                self.win.y=self.pan.height+otstup*2;

                self.win1.x=30;
                self.win1.y=self.pan.height+otstup*2;
            }

            dp.clear()
            dp.dRect(self.kr.rect,0x00ff00,40);

            for (var i = 0; i < kr.arrDin.length; i++) {
                self.dragBR(kr.arrDin[i])
            }
            for (var i = 0; i < kr.arrWin.length; i++)  {                
                dp.dRect(kr.arrWin[i],0x0000ff,10);
            }
          
            for (var i = 0; i < kr.arrLine.length; i++)  {                
                dp.dPoint(kr.arrLine[i].p,40,0x0000ff,20);
                dp.dLine(kr.arrLine[i].p,kr.arrLine[i].p1,0x0000ff,20);
                dp.dPoint(kr.arrLine[i].p1,40,0x0000ff,20);
            }   
            self.dragDD(kr.arrDin);
            self.visiPixi.render();

			}

			if(self.check1.value==false){
	            kr.setGeomLine(self.plXZ);
	            self.cont3d.position.x=-self.kr.rect.w/2;
				self.cont3d.position.y=-self.kr.rect.h/2;
				kr.setGeom(self.plXZ2,nGeom);

				self.par.visi3D.intRend=1
			}
			var resss=new Date().getTime()-date

			self.win1.title="time= "+Math.round(resss)/1000+" сек ::"+self.kr.arrDin.length+":"+self.kr.array.length+":"+self.kr.arrayL.length
			//trace(">>>>>>>>>>",resss,date)
			//console.timeEnd("endTime")
			//console.timeLog("timeLog=")





        }

        var a=[]
        var a1=[]
        this.dragDD=function(_a){ 
        	if(self.check2.value==true)return
        	a.length=0;
        	a1.length=0;
        	for (var i = 0; i < _a.length; i++) {
        		a.push(_a[i].x,_a[i].x1)
        		a1.push(_a[i].y,_a[i].y1)
        	}
        	
        	a.sort(function(a,b){
        		return a-b;
        	})
        	a1.sort(function(a,b){
        		return a-b;
        	})
        	for (var i = a.length-1; i >=1; i--) {
        		if(a[i]==a[i-1])a.splice(i,1)
        	}
        	for (var i = a1.length-1; i >=1; i--) {
        		if(a1[i]==a1[i-1])a1.splice(i,1)
        	}

        	for (var i = a1.length-1; i >=0; i--) {
        		p.x=self.kr.rect.x-150
        		p.y=a1[i]
        		dp.dText(p,""+Math.round(a1[i]));   
        	}

        	for (var i = a.length-1; i >=0; i--) {
        		p.x=a[i]
        		p.y=-80

        		dp.dText(p,""+Math.round(a[i]));   
        	}      	
        
        }


        var p={x:0,y:0}
        var www,col
        this.dragBR=function(br){ 
           


            dp.dRect(br);


            
           
            //грании
            if(br.bool[0]==true)dp.dLineParam(br.x,br.y,br.x+br.w,br.y,0xff0000,20);           
            if(br.bool[1]==true)dp.dLineParam(br.x+br.w,br.y,br.x+br.w,br.y+br.h,0xff0000,25);
            if(br.bool[2]==true)dp.dLineParam(br.x+br.w,br.y+br.h,br.x,br.y+br.h,0xff0000,30);
            if(br.bool[3] == true)dp.dLineParam(br.x, br.y, br.x, br.y+br.h,0xff0000,35);  

            if(br.bool1[0]==true)dp.dLineParam(br.x,br.y,br.x+br.w,br.y,0x0000ff,40);           
            if(br.bool1[1]==true)dp.dLineParam(br.x+br.w,br.y,br.x+br.w,br.y+br.h,0x0000ff,40)
            if(br.bool1[2]==true)dp.dLineParam(br.x+br.w,br.y+br.h,br.x,br.y+br.h,0x0000ff,40);
            if(br.bool1[3] == true)dp.dLineParam(br.x, br.y, br.x, br.y+br.h,0x0000ff,40); 

            www=1
            if(self.check2.value==true)www=10
            col=0xaaaaaa
            
            if(br.boolNa==true){
                www=50
                col=0xff0000

            }

            if(br.boolPoli==true)dp.dLineParam(br.x,br.y,br.x+br.w,br.y+br.h,col,www);  
            else dp.dLineParam(br.x,br.y+br.h,br.x+br.w,br.y,col,www);
            
            if(self.check2.value==true)return
            p.x=br.x+br.w/2;
            p.y=br.y+70;
            dp.dText(p,Math.round(br.u*100)/100+"u"+Math.round(br.u1*100)/100);   
            
            p.x=br.x+br.w-br.w/2;
            p.y=br.y+br.h-70;
            dp.dText(p,Math.round(br.v*100)/100+"v"+Math.round(br.v1*100)/100);

            p.x=br.x+br.w/2
            p.y=br.y+br.h/2
            dp.dText(p,br.idArr);   

        }



        this.funDrwgWG=null
        this.funxz=function(){
            if(this.funDrwgWG!=undefined)this.funDrwgWG(this._width,this._height)
        }

    }

    set active(value) {
        if(this._active!=value){
            this._active = value;
            this.pan.visible = this.active
            this.init()
            if(this.kr){
                if(value==true){
                    this.kr.funRender=this.drag;
                }else{
                    this.kr.funRender=undefined;
                }
            }
        }       
    }   
    get active() { return  this._active;} 

    set width(value) { 
        if(this._width!=value){
            this._width=value;
            //this.pan.width=value
            //this.slider.value = value;
            this.visiPixi.sizeWindow(this._width,this._height)
           this.funxz();
        }
    }   
    get width() { return  this._width}

    set height(value) { 
        if(this._height!=value){
            this._height=value;
            //this.pan.height=value
            //this.slider1.value = value;
            this.visiPixi.sizeWindow(this._width,this._height)
            this.funxz();
        }
    }   
    get height() { return  this._height}
}





export class PlXZ extends THREE.BufferGeometry {

    constructor( ) {

        super();

        var vertices = [];
        this.upNull=function(){
            
            var wh=1000;
            vertices.push(-wh,-wh,0);
            vertices.push(-wh,-wh,0);
            vertices.push(-wh, wh,0);

            vertices.push(-wh,-wh,0);
            vertices.push(-wh,-wh,0);
            vertices.push(wh,-wh,0);

            vertices.push(wh,-wh,0);
            vertices.push(wh,wh,0);
            vertices.push(wh,wh,0);

            vertices.push(-wh,wh,0);
            vertices.push(-wh,wh,0);
            vertices.push(wh,wh,0); 
            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        }

        this.upNull();

        /*

        this.clearPoint=function(){
            this.array.length=0;
        }

        this.array=[]
        this.addLine=function(p,p1){
            this.array.push(p,p1)
            trace(p,p1)
            
        }

        
        this.upDate=function(){
            if(this.array.length==0){
                this.upNull();
            }
            vertices.length=0;
            trace(this.array.length+"   ",this.array)
            for (var i = 0; i < this.array.length; i+=2) {                
                
                
               
                vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);

                vertices.push(this.array[i+1].x,this.array[i+1].y,this.array[i+1].z);
                 vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
            }

            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        } */   

    }

}
