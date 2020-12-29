//import { MStyle} from './MStyle.js';
//import { DWStenColiz} from './Debag/DWStenColiz.js';
import { SpDebugPixi } from './SpDebugPixi.js';//пикси отрисовка
import { SpDebug3D } from './SpDebug3D.js';//пикси отрисовка

import { VisiPixi } from '../libMy/VisiPixi.js';

//import {  GronTriangle } from './GronTriangle.js';
import {KorektLine } from '../colozi/korektRect/KorektLine.js';



export class DebLine  {
    constructor(par, fun,visi3D) {
        this.type="DebLine";
		var self=this;
		this.par=par
		this.fun=fun

		
		this.dC=par.dCont;
        this._active = false;

        this.visi3D=visi3D



        this.dCont=new DCont(this.dC);

        var col=0xff0000
        var col1=0x00ff00
        var col2=0x0000ff
        var dp
        var gt=undefined
        var ww=800
        var hh=400
        var  scale =1
        var  otstup =50
        var oSave
        var  kLine
        this.cont3d=new THREE.Object3D();
        this.cont3d.visible=this._active



        this.init=function(sss){
            if(this.window!=undefined)return;

            sss='[{"p":{"x":0,"y":30,"z":0},"p1":{"x":30,"y":30,"z":0}},{"p":{"x":197.9412998256687,"y":30,"z":85.79399093041548},"p1":{"x":200,"y":30,"z":85.27134902179017}},{"p":{"x":100,"y":30,"z":0},"p1":{"x":197.9412998256687,"y":30,"z":0}},{"p":{"x":200,"y":30,"z":85.27134902179019},"p1":{"x":300,"y":30,"z":59.8843638190977}},{"p":{"x":300,"y":30,"z":59.8843638190977},"p1":{"x":319.06112267087633,"y":30,"z":55.04531942717526}},{"p":{"x":0,"y":30,"z":0},"p1":{"x":100,"y":30,"z":0}},{"p":{"x":324.8953812488216,"y":30,"z":54.112748310442385},"p1":{"x":349.0611226708763,"y":30,"z":50.25}},{"p":{"x":349.0611226708763,"y":30,"z":0},"p1":{"x":349.06112267087633,"y":30,"z":0}},{"p":{"x":319.06112267087633,"y":30,"z":55.04531942717526},"p1":{"x":324.8953812488216,"y":30,"z":54.112748310442385}},{"p":{"x":0,"y":0,"z":0},"p1":{"x":30,"y":0,"z":0}},{"p":{"x":212.25781133963244,"y":-30,"z":72.56882141647324},"p1":{"x":300,"y":-30,"z":50.2937249647472}},{"p":{"x":200,"y":-30,"z":0},"p1":{"x":212.25781133963244,"y":-30,"z":0}},{"p":{"x":300,"y":-30,"z":50.29372496474721},"p1":{"x":319.06112267087633,"y":-30,"z":45.45468057282477}},{"p":{"x":100,"y":-30,"z":0},"p1":{"x":200,"y":-30,"z":0}},{"p":{"x":0,"y":-30,"z":0},"p1":{"x":100,"y":-30,"z":0}},{"p":{"x":319.06112267087633,"y":0,"z":50.25},"p1":{"x":344.07440818375096,"y":0,"z":46.25177686808769}},{"p":{"x":344.07440818375096,"y":0,"z":46.25177686808769},"p1":{"x":349.0611226708763,"y":0,"z":45.45468057282477}},{"p":{"x":349.0611226708763,"y":0,"z":0},"p1":{"x":349.06112267087633,"y":0,"z":0}}]'

            this.visi3D.groupObject.add(this.cont3d);
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


            this.spD3D=new SpDebug3D(this.cont3d,'resources/image/pic.png');



            this.window=new DWindow(this.dCont,0,0,"xz");
            this.window.width=ww
            this.window.height=hh



            this.content2d = new PIXI.Container();
         
  
            this.content2d.position.x=otstup;
            this.content2d.position.y=otstup;




            this.debugPixi = new SpDebugPixi();
            this.content2d.addChild(this.debugPixi.content2d);

            dp=this.debugPixi
            self.visiPixi=new VisiPixi(); 
            self.visiPixi.content2d.addChild(self.content2d);
            this.window.content.div.appendChild(self.visiPixi.div);

            self.visiPixi.sizeWindow(this.window.width,this.window.height)
            

            kLine=new KorektLine();

            if(sss!=undefined){
                oSave=JSON.parse(sss)
                kLine.arrLine=oSave
                //gt.t=oSave.tr
                //gt.t1=oSave.tr1
              
                
            }

           setTimeout(function() {self.init2()}, 500);
        }
        var win
        this.plXZ
        this.plXZ1
        this.init2=function(){ 
            if(win!=undefined)return
            win=new DWindow(this.window,2,this.window.height,"triang");
            win.width=222
            new DButton(win.content,2,2,"drag",function(){
                self.drag()
            })

            new DButton(win.content,2,34,"test1",function(){
                var jsonArr='[{"p":{"x":388.1147260433871,"y":30,"z":200},"p1":{"x":400,"y":30,"z":201.93509631220263}},{"p":{"x":400,"y":30,"z":201.93509631220263},"p1":{"x":500,"y":30,"z":218.21655788613603}},{"p":{"x":500,"y":30,"z":218.216557886136},"p1":{"x":600,"y":30,"z":234.49801946006943}},{"p":{"x":600,"y":30,"z":234.4980194600694},"p1":{"x":666.692373670574,"y":30,"z":245.356512651988}},{"p":{"x":326.52213979984606,"y":30,"z":189.97182673836608},"p1":{"x":388.1147260433871,"y":30,"z":200}},{"p":{"x":82.55247799773434,"y":30,"z":150.25},"p1":{"x":100,"y":30,"z":153.09071159040246}},{"p":{"x":100,"y":30,"z":153.09071159040246},"p1":{"x":200,"y":30,"z":169.37217316433583}},{"p":{"x":200,"y":30,"z":169.37217316433583},"p1":{"x":300,"y":30,"z":185.65363473826926}},{"p":{"x":300,"y":30,"z":185.65363473826923},"p1":{"x":326.52213979984606,"y":30,"z":189.97182673836608}},{"p":{"x":700,"y":30,"z":0},"p1":{"x":773.8862965578342,"y":30,"z":0}},{"p":{"x":666.692373670574,"y":30,"z":0},"p1":{"x":700,"y":30,"z":0}},{"p":{"x":0,"y":30,"z":0},"p1":{"x":82.55247799773434,"y":30,"z":0}},{"p":{"x":300,"y":-30,"z":170.53513470533107},"p1":{"x":400,"y":-30,"z":186.81659627926447}},{"p":{"x":400,"y":-30,"z":186.81659627926447},"p1":{"x":480.97186890052996,"y":-30,"z":200}},{"p":{"x":480.97186890052996,"y":-30,"z":200},"p1":{"x":500,"y":-30,"z":203.09805785319787}},{"p":{"x":500,"y":-30,"z":203.09805785319787},"p1":{"x":600,"y":-30,"z":219.37951942713127}},{"p":{"x":600,"y":-30,"z":219.37951942713127},"p1":{"x":673.0909976224125,"y":-30,"z":231.27980211902894}},{"p":{"x":290.438870717348,"y":-30,"z":168.978443115142},"p1":{"x":300,"y":-30,"z":170.53513470533107}},{"p":{"x":175.4096208548771,"y":-30,"z":150.25},"p1":{"x":200,"y":-30,"z":154.2536731313977}},{"p":{"x":200,"y":-30,"z":154.2536731313977},"p1":{"x":290.438870717348,"y":-30,"z":168.978443115142}},{"p":{"x":700,"y":-30,"z":0},"p1":{"x":773.8862965578342,"y":-30,"z":0}},{"p":{"x":673.0909976224125,"y":-30,"z":0},"p1":{"x":700,"y":-30,"z":0}},{"p":{"x":100,"y":-30,"z":0},"p1":{"x":175.4096208548771,"y":-30,"z":0}},{"p":{"x":0,"y":-30,"z":0},"p1":{"x":100,"y":-30,"z":0}}]'


                oSave=JSON.parse(jsonArr)
                kLine.arrLine=oSave
                self.drag()
            })

            new DButton(win.content,2,68,"test2",function(){
                var jsonArr='[{"p":{"x":334.25531914893617,"y":30,"z":59.25},"p1":{"x":334.25531914893617,"y":30,"z":100}},{"p":{"x":334.25531914893617,"y":30,"z":59.25},"p1":{"x":400,"y":30,"z":54.773402674591374}},{"p":{"x":334.25531914893617,"y":30,"z":54.773402674591374},"p1":{"x":334.25531914893617,"y":30,"z":59.25}},{"p":{"x":300,"y":30,"z":0},"p1":{"x":334.25531914893617,"y":30,"z":0}},{"p":{"x":334.25531914893617,"y":30,"z":0},"p1":{"x":334.25531914893617,"y":30,"z":54.773402674591374}},{"p":{"x":400,"y":30,"z":54.773402674591374},"p1":{"x":460,"y":30,"z":50.68796433878157}},{"p":{"x":200,"y":30,"z":0},"p1":{"x":300,"y":30,"z":0}},{"p":{"x":100,"y":30,"z":0},"p1":{"x":200,"y":30,"z":0}},{"p":{"x":0,"y":30,"z":0},"p1":{"x":100,"y":30,"z":0}},{"p":{"x":275.531914893617,"y":-30,"z":41.25},"p1":{"x":275.531914893617,"y":-30,"z":100}},{"p":{"x":275.531914893617,"y":-30,"z":41.25},"p1":{"x":300,"y":-30,"z":39.58395245170877}},{"p":{"x":275.531914893617,"y":-30,"z":39.58395245170877},"p1":{"x":275.531914893617,"y":-30,"z":41.25}},{"p":{"x":200,"y":-30,"z":0},"p1":{"x":275.531914893617,"y":-30,"z":0}},{"p":{"x":275.531914893617,"y":-30,"z":0},"p1":{"x":275.531914893617,"y":-30,"z":39.58395245170877}},{"p":{"x":300,"y":-30,"z":39.58395245170875},"p1":{"x":400,"y":-30,"z":32.774888558692425}},{"p":{"x":400,"y":-30,"z":32.77488855869241},"p1":{"x":460,"y":-30,"z":28.689450222882623}},{"p":{"x":100,"y":-30,"z":0},"p1":{"x":200,"y":-30,"z":0}},{"p":{"x":0,"y":-30,"z":0},"p1":{"x":100,"y":-30,"z":0}}]'

                oSave=JSON.parse(jsonArr)
                kLine.arrLine=oSave
                self.drag()
            })

            


            
            this.drag()
        }




        this.drag=function(){
            this.saveTime()

            kLine.start()


            dp.clear()
            dp.dRect(kLine.rect,0x00ff00,0.5);


            self.window.width=Math.round(kLine.rect.w*scale+otstup*2)
            self.window.height=Math.round(kLine.rect.h*scale+otstup*2)+32

            self.width=self.window.width+otstup*2
            self.height=self.window.height+otstup*2

            self.spD3D.clear()




            for (var i = 0; i < kLine.arrLine.length; i++) {
                self.spD3D.setPoint(kLine.arrLine[i].p,1,"r")
                self.spD3D.setPoint(kLine.arrLine[i].p1,1,"r")

                self.spD3D.setLine(kLine.arrLine[i].p,kLine.arrLine[i].p1,"b")
            }


            var pu;
            for (var i = 0; i < kLine.arrPointM.length; i++) {
                pu=0

                if(kLine.arrPointM[i].array.length==2)self.spD3D.setPoint(kLine.arrPointM[i].p,4,"g")
                if(kLine.arrPointM[i].array.length==1)self.spD3D.setPoint(kLine.arrPointM[i].p,4,"b")   
                //self.spD3D.setPoint(kLine.arrPointM[i].p,3+(kLine.arrPointM[i].array.length*2))

                this.drag111(kLine.arrPointM[i],0,col1,i+"")
            }

            for (var i = 0; i < kLine.aL.length; i++) {               
                //this.drag111(kLine.aL[i],100,col,i+"");




                //dp.dText(kLine.aL[i].p, i+":",col2,0.5);
            }

           // trace("############",kLine.arTriang)
            if(kLine.arTDo.length!=0){
                dp.dLine(kLine.arTDo[0], kLine.arTDo[kLine.arTDo.length-1],col2,5);
                dp.dText(kLine.arTDo[0], i+":",col2,0.5);

                for (var i = 1; i < kLine.arTDo.length; i++) {
                    dp.dLine(kLine.arTDo[i-1], kLine.arTDo[i],col2,1+i*0.2);
                    dp.dText(kLine.arTDo[i], i+":",col2,0.5);
                }  
            }
            var aaa=kLine.aTri
           
            for (var i = 0; i < aaa.length; i++) {
                dp.dLine(aaa[i].p,aaa[i].p1,undefined,1);
                dp.dLine(aaa[i].p1,aaa[i].p2,undefined,1);
                dp.dLine(aaa[i].p2,aaa[i].p,undefined,1);

                dp.dText(aaa[i].p, (Math.round(aaa[i].uv.y*100)/100)+":",col2,0.5);
            }

          
            kLine.setGeom(self.plXZ2);          
            
             

            
/*
            this.plXZ.clear();
            this.plXZ.addLine(gt.t[0],gt.t[1]);
            this.plXZ.addLine(gt.t[1],gt.t[2]);
            this.plXZ.addLine(gt.t[2],gt.t[0]); 
            this.plXZ.upDate()

            this.plXZ1.clear();
            this.plXZ1.addLine(gt.t1[0],gt.t1[1]);
            this.plXZ1.addLine(gt.t1[1],gt.t1[2]);
            this.plXZ1.addLine(gt.t1[2],gt.t1[0]);
            this.plXZ1.upDate();

            this.par.visi3D.intRend=1;

            //gt.upDate();
            let r=gt.setT();
            this.plXZ2.clear();
            if(r!=null){
                 this.plXZ2.addLine(r[0],r[1]);
                
                this.plXZ2.upDate();
                this.mesh[0].scale.set(20,20,20)
                this.mesh[0].position.set(r[0].x,r[0].y,r[0].z);
                this.mesh[1].scale.set(20,20,20)
                this.mesh[1].position.set(r[1].x,r[1].y,r[1].z);
               
            }else{
                this.mesh[0].scale.set(2,2,2)
                this.mesh[1].scale.set(2,2,2)
            }

            
*/
            self.visiPixi.render();           
            
            self.spD3D.upDate()
        }

        this.drag111=function(point,y,_c,t){
            var pp={x:point.p.x,y:point.p.y-10+y}
            dp.dText(pp, t+":"+point.idArr+":!"/*+Math.round(point.dist)+":"*/+Math.round(point.p.x/10),col,0.5);
            pp.y+=10
            dp.debagPoint(pp,2,_c) 
        }




       /* this.dragXY=function(x,y,p,p1,z,z1,c,t){
            dp.dLineParam(x+p[z], y+p[z1], x+p1[z], y+p1[z1],c,1);
            if(t){
                dp.dText({x:x+p[z], y:y+p[z1]+10},t,col,0.5); 
                 
            }
        }*/



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
            if(gt)if(oSave==undefined)gt.setObj(o)

            this.init2()    
        }
        this.getObjLoc=function(o){          
            return gt.getObj(o)
        }

        this.funDrwgWG=null
        this.funxz=function(){
            if(this.funDrwgWG!=undefined)this.funDrwgWG(this._width,this._height)
        }


    }

    set active(value) {
        if(this._active!=value){
            if(this.par.visi3D)this.par.visi3D.intRend=1   
            this._active = value;
            this.window.visible = this.active
            this.cont3d.visible = this.active
            this.init()
            
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
          
            
        }

        
        this.upDate=function(){
            if(this.array.length==0){
                this.upNull();
            }
            vertices.length=0;
  
            for (var i = 0; i < this.array.length; i+=2) {                
                
                
               
                vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);

                vertices.push(this.array[i+1].x,this.array[i+1].y,this.array[i+1].z);
                 vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
            }

            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        } */   

    }

}
export class PlaneXZ extends THREE.BufferGeometry {

    constructor( ) {

        super();

        // var indices = [];
        var vertices = [];
        this.upNull=function(){
            
            var wh=0.5;
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

           /* this.computeBoundingBox();
            this.computeBoundingSphere();
            this.computeVertexNormals();*/
        }

        this.upNull();

        this.clearPoint=function(){
            this.array.length=0;
        }

        this.array=[]
        this.addLine=function(p,p1){
            this.array.push(p,p1)
        }

        this.clear=function(p){
            this.array.length=0;
            vertices.length=0;
            normal.length=0;
            uv.length=0;
        }

        this.addTri=function(p,p1,p2, n,n1,n2,u,u1){           
            vertices.push(p.x,p.y,p.z);
            vertices.push(p1.x,p1.y,p1.z);
            vertices.push(p2.x,p2.y,p2.z);

            if(n){
                normal.push(n.x,n.y,n.z);
                normal.push(n1.x,n1.y,n1.z);
                normal.push(n2.x,n2.y,n2.z);

                uv.push(u.x,u.y);
                uv.push(u1.x,u1.y);
            }
        }


        var uv = [];
        var normal = [];
        var w,h
        this.redrag=function(bNirm){
            if(bNirm==undefined){
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            }else{               
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
                this.computeBoundingBox();
                this.computeBoundingSphere();

                if(uv.length==0){
                    w=this.boundingBox.max.x-this.boundingBox.min.x;
                    h=this.boundingBox.max.y-this.boundingBox.min.y;                   
                    for (var i = 0; i < vertices.length; i+=3) {
                        normal.push(bNirm.x,bNirm.y,bNirm.z);
                        uv.push(
                            (vertices[i]-this.boundingBox.min.x)/w,
                            (vertices[i+1]-this.boundingBox.min.y)/h
                        )
                    }
                    this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                    this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) ); 
                }else{
                    this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                    this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) ); 
                }
                        
                
            }
            
           /* this.computeBoundingBox();
            this.computeBoundingSphere();
            this.computeVertexNormals();*/
        }


        this.redrag1=function(){
            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );   

           /*if(bNirm==undefined){
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            }else{               
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
                this.computeBoundingBox();
                this.computeBoundingSphere();

                w=this.boundingBox.max.x-this.boundingBox.min.x;
                h=this.boundingBox.max.y-this.boundingBox.min.y;
                uv.length=0;
                normal.length=0;
                for (var i = 0; i < vertices.length; i+=3) {
                    normal.push(bNirm.x,bNirm.y,bNirm.z);
                    // uv.push(
                    //     (vertices[i]-this.boundingBox.min.x)/w,
                    //     (vertices[i+1]-this.boundingBox.min.y)/h
                    // )
                }
                this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );         
            }*/
        }

        
        this.upDate=function(){
            if(this.array.length==0){
                this.upNull();
            }
            vertices.length=0;

            for (var i = 0; i < this.array.length; i+=2) {                
                
                
               
                vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
                vertices.push(this.array[i+1].x,this.array[i+1].y,this.array[i+1].z);
                //vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
                
                
                // indices.push(i+1, i+1, i);
            }

            // var rr=1
            // for (var i = 0; i < vertices.length; i+=9) { 
            //     indices.push((i+0)*rr,(i+1)*rr,(i+2)*rr);
            // } 
            // indices=[0*rr,1*rr,2*rr,3*rr,4*rr,5*rr]   

            // //this.setIndex( indices );


            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

        }    

    }

}
