
/*
главный класиик, стартует основное, грузит конфиг

дев 
vorodis2.com   
vorodis2@gmail.com 
2019
*/
/**/
import { Glaf } from './Glaf.js';
import { LocalStorage } from './localStorage/LocalStorageE6.js';

export class Main  {
  	constructor(fun) {  		
  		this.type="LMain";
  		this.fun=fun
  		var self=this;
		this.glaf=null;
		this._width=100;
		this._height=100;
		self.resolution=1
		self.objectBase=null
		self.confText=null 
        this.localStorage=undefined;
        this.debug=false;
		this.contentHTML= document.createElement('div');
		this.contentHTML.style.position = 'fixed';
		this.contentHTML.style.top = '0px';
		this.contentHTML.style.left = '0px';
		document.body.appendChild(this.contentHTML);  		


		//создание сцены
  		this.start = function () {	   
			this.tick();            
            this.localStorage = new LocalStorage(null, "localStorage"); 

            if(self.localStorage.object.debug==undefined)self.localStorage.object.debug=false            
       
            this.debug=self.localStorage.object.debug;           
            this.fina();
		};

		

		//стартуем дальше
        this.fina = function () { 
        	self.localStorage.object.debug=true
			self.glaf=new Glaf(self);		
			fun("init");

			if(this.localStorage.object.objLoc!=undefined){
				setTimeout(function() {
					self.glaf.setObjLoc(self.localStorage.object.objLoc)
				}, 200);
				
			}
		}

		//тик размит надва
		var b=true
		this.tick = function () {
			b=!b;
			if(b==true){
				if(self.glaf)self.glaf.update()
			}			
			requestAnimationFrame(self.tick );			
		}

		this.boolCTRL=false
		this.keydown=function(e){
	        if(event.keyCode==17)self.boolCTRL=true
	        if(event.keyCode==81&&self.boolCTRL)  {
            	self.localStorage.object.debug=!self.localStorage.object.debug;
	            self.localStorage.save();
	        }
	        self.glaf.keydown(e)

	    }
	    this.keyup=function(e){
	        if(event.keyCode==17)self.boolCTRL=false
	        self.glaf.keyup(e)	
	    }

	    window.addEventListener( 'keydown', this.keydown );    
	    window.addEventListener( 'keyup', this.keyup );  

		//Маштабим окна 
		this.scale=1;
		var s;
  		this.sizeWindow = function(w,h){  			
  			self._width=w;
			self._height=h;
			if (self._width < 800) self._width = 800;
			if (self._height < 600) self._height = 600;
			s= w/self._width;
			if(s>h/self._height)s=h/self._height;
			this.scale = s;
			if(dcmParam.isIE==true)this.scale = 1;			
			
  			if (self.glaf) { 
  				self.glaf.sizeWindow(w, h, this.scale)
  			}			
  		}   		

        self.start();
  	}
}







