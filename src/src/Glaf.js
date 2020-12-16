

//import { P20 } from './p20/P20.js';
//import { Menu} from './p20/menu/Menu.js';
    
//import { VisiPixi } from './libMy/VisiPixi.js';
//import { ViewServer } from './viewServer/ViewServer.js';

import { MVisi3D } from './visi3D/MVisi3D.js';
import { SceneSB } from './visi3D/SceneSB.js';


import { DebKR } from './menu/DebKR.js';
import { DebTriang } from './menu/DebTriang.js';
export class Glaf  {
  	constructor(par) {  		
  		this.type="Glaf";
  		var self=this;
        this.par=par;

        this.sizeMax=100000;

        window.dcmParam=new DCM();

        this.dCont=new DCont(document.body);
/*
        this.visiPixi=new VisiPixi();             
        this.cont2d = new PIXI.Container();
        this.content2d = new PIXI.Container();
        
        this.visiPixi.content2d.addChild(this.cont2d); 
        this.cont2d.addChild(this.content2d); 


        this.c2dSloi = new PIXI.Container();
        this.c2dSloi1 = new PIXI.Container();
        this.c2dSloi2 = new PIXI.Container();
        this.c2dSloi3 = new PIXI.Container();
        
        this.content2d.addChild(this.c2dSloi);
        this.content2d.addChild(this.c2dSloi1);
        this.content2d.addChild(this.c2dSloi2);
        this.content2d.addChild(this.c2dSloi3);


        this._intRend=-60;
        this.render = function () {
            this.intRend=1;
            
        }*/


        this.window=new DWindow(this.dCont,400,400,"MVisi3D",function(){
            self.saveLoacal()
        });
        this.window.width=300
        this.window.height=300
        this.window.fubUp=function(){
            self.saveLoacal()
        }



        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';

        //this.content3d = new THREE.Object3D();
        //порезаный от пикси вювер
        this.visi3D = new MVisi3D(this.div, null, false, true, false, true, false);     
        //this.visi3D.yes3d = true;           
        //this.visi3D.groupObject.add(this.content3d); 
        var o='{"ambient":{"works":true,"active":true,"color":"#fdffff","intensity":0.71},"shadow":{"works":true,"active":true,"mapSize":4096,"color":"#8c8c8c","bias":-0.0014,"intensity":1.01,"radius":1.27,"bAlphaForCoating":false,"fixation":true,"rotationX":0.93,"rotationZ":0.73,"distance":500,"cubWidth":1000,"cubHeight":1000,"distanceUpdateShadow":65.41},"sky":{"works":true,"active":true,"color":"#ffffff","link":"resources/image/sky.jpg","rotZ":2.73,"radius":40000,"x":0,"y":0,"z":0},"mirror":{"works":true,"link":"null","exposure":1.44,"gamma":2.87,"xz":"reflect","link1":"null","exposure1":-1,"gamma1":-1},"visi3D":{"works":true,"alwaysRender":false,"fov":40,"far":77175,"minZum":0,"maxZum":30942,"zume":25000,"minRotationX":3.14,"maxRotationX":0,"rotationX":0.94,"rotationZ":0.17,"debug":false,"isDragPan":false,"alphaAd":false,"globZ":0,"powerZum":1},"fog":{"works":true,"active":false,"color":"#ffffff","near":0,"far":0},"effect":{"works":true,"active":false,"edgeStrength":3,"edgeGlow":0,"pulsePeriod":0,"linkTextur":"null","visibleEdgeColor":"#ffffff","hiddenEdgeColor":"#190a05"}}'
        var scene=JSON.parse(o);  
        this.sceneSB=new SceneSB(this.visi3D);
        for (var i = 0; i <  this.sceneSB.array.length; i++) {
            if (scene[this.sceneSB.array[i].name] === undefined) {
                scene[this.sceneSB.array[i].name] = {};                
            }            
            this.sceneSB.array[i].setBasa(scene[this.sceneSB.array[i].name]);
        }        
        this.visi3D.isDragPan=true;
        



        this.window.content.div.appendChild(this.div)
        this.visi3D.sizeWindow(0,0,this.window.width,this.window.height);

        
        this.dev=new DCompDev(self.dCont,64,80,"DevWindow",function(s,p,p1){            
            self.saveLoacal();
        });


        this.devBig=new DCompDev(self.dCont,0,0,"DevWindow",function(s,p,p1){            
            self.saveLoacal();
        },false);


        this.debKR=new DebKR(self.dCont,function(s,p,p1){
            if(s=="saveLocal") self.saveLoacal();
        },self.visi3D);
        self.devBig.addCont(this.debKR, this.debKR.dCont,"DebKR",undefined,undefined);
        this.devBig.index=0;
        this.debKR.init();


      /*  ///////////////////////////////////////////////
        this.debTriang=new DebTriang(this,function(s,p,p1){
            self.saveLoacal();
        })
        this.debTriang.init();
        /////////////////////////////////////////////////*/

        
 
 
        this.update = function () { 
            if(this.window.minimize==false) this.visi3D.upDate();
        }




        //расчет окна
        this.sizeWindow = function(w,h,s){              
            /*this.scale=s;
            this.dCont.scale=s;
            this.menu.sizeWindow(w,h,s); */                 
        }

        this.saveLoacal=function(){
            var o=this.getObjLoc();
            this.par.localStorage.object.objLoc=o
            this.par.localStorage.save();
        }


        this.setObjLoc=function(o){ 
            this.window.x=o.window.x
            this.window.y=o.window.y
            this.window.minimize=o.window.minimize
            if(o.dev){
                this.dev.minimize=o.dev.minimize
                this.dev.x=o.dev.x
                this.dev.y=o.dev.y
                this.dev.index=o.dev.index
            }

            if(o.devBig){
              /*  this.devBig.minimize=o.devBig.minimize
                this.devBig.x=o.devBig.x
                this.devBig.y=o.devBig.y
               
                this.devBig.index=0//o.devBig.index*/
            }
            

            if(o.window.width){
                this.window.width=o.window.width;
                this.window.height=o.window.height;
                this.visi3D.sizeWindow(0,0,this.window.width,this.window.height);
            }

           
            if(this.debTriang)if(o.debTriang){
                trace(o.debTriang)
                this.debTriang.setObjLoc(o.debTriang)
            }


            //return
            if(this.debKR)if(o.debKR)this.debKR.setObjLoc(o.debKR)
        }
        this.getObjLoc=function(o){ 
            var o={}
            o.window={}
            o.window.x=this.window.x;
            o.window.y=this.window.y;
            o.window.minimize=this.window.minimize;
            o.window.width=this.window.width;
            o.window.height=this.window.height;

            o.dev={}
            o.dev.minimize=this.dev.minimize
            o.dev.x=this.dev.x
            o.dev.y=this.dev.y
            o.dev.index=this.dev.index


            o.devBig={}
            o.devBig.minimize=this.devBig.minimize
            o.devBig.x=this.devBig.x
            o.devBig.y=this.devBig.y
            o.devBig.index=this.devBig.index
            
            if(this.debTriang)o.debTriang=this.debTriang.getObjLoc();
            if(this.debKR)o.debKR=this.debKR.getObjLoc();
            return o
        }


        this.keydown=function(e){ 
            //this.menu.keydown(e)
        }

        this.keyup=function(e){
            //this.menu.keyup(e);  
        }

  
        //this.viewServer.openURL();
  	}

  /*  set intRend(value) {
        if(this._intRend!=value){
            if(this._intRend>value)this._intRend= value;          
        }
    }    
    get intRend() { return  this._intRend;}*/
}






