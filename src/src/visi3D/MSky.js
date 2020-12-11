

import { RGBELoader } from './loader/RGBELoader.js';
export default function MSky (_parent) {
	this.parent = _parent;
	var self = this;
	this._active = false;


	this.RADIUS = 1000;

	this.POS_X = 0;
	this.POS_Y = 0;
	this.POS_Z = 0;

	this.LINK = 'nullMy';
	this.COLOR = '0xffffff';

	this._radius = this.RADIUS;
	this._link = this.LINK;
	this._color = this.COLOR;
	this._shadRotZ = this.parent.ROTATION_Z;
	this._rotZ = 0;

	this._x = this.POS_X;
	this._y = this.POS_Y;
	this._z = this.POS_Z;

	this.mesh = undefined;

	this.cont3d = undefined;
	this.cont3d1 = undefined;
	this.textur = undefined;
	this.loaderHDR =undefined;


	this.onLoad =undefined;
	this.onComplete =undefined;


	this.init = function () {
		if (this.mesh != undefined) return;
		this.geometry = new THREE.SphereGeometry(1, 32, 32);
		this.loader = new THREE.TextureLoader();

		this.loaderHDR = new RGBELoader();

		this.material = new THREE.MeshBasicMaterial({
			side: THREE.BackSide,
			color: 0xffffff			
		});
		

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.scale.set(this._radius, this._radius, this._radius);

		this.cont3d = new THREE.Object3D();
		this.cont3d1 = new THREE.Object3D();
		this.cont3d.add(this.cont3d1);
		this.cont3d1.add(this.mesh);



		this.cont3d1.rotation.y = 0;
		this.mesh.rotation.y = this._rotZ;



		this.cont3d.rotation.x = -Math.PI / 2;

	};

	this.dergActiv = function () {
		if (this._active == true) {
			if (this.cont3d.parent == null) this.parent.parent.groupObject.add(this.cont3d);
		} else {
			if (this.cont3d.parent != null) this.parent.parent.groupObject.remove(this.cont3d);
		}

	};

	this.canvasTexture
	this.linkNull=null
	this.creatLink = function () {
		if(this.linkNull!=null)return this.linkNull
		let canvas = document.createElement('canvas'); // канвас для картинки
        let ctx = canvas.getContext('2d');	
        canvas.height=canvas.width=2048;
        
        let k=26;
        let wh=canvas.height/k

        ctx.fillStyle ="rgba(100, 100, 100, 0.5)";
        let b=true;
        let b1=true;
        for (var i = 0; i < k; i++) {
        	b1=b;
        	for (var j = 0; j < k; j++) {        		
        		if(b1)ctx.fillRect(i*wh, j*wh, wh, wh);
        		b1=!b1
           	}
        	b=!b
        }        
        this.linkNull=canvas.toDataURL("image/png"); 


        this.canvasTexture=new THREE.CanvasTexture(canvas);


			
	}

	
	var tt;
	this.dergLink = function () {





		if (this._link == 'null' || this._link == null) { // сносим мапу

			if (this.material.map != null) {
				this.material.map = null;
				this.material.needsUpdate = true;
			
			}

			let lT=this._link+"";


			this.creatLink()
			self.textur = this.canvasTexture;
			self.textur.linkMy=lT;
			self.material.map =	self.textur;
			self.material.needsUpdate = true;
			self.parent.parent.intRend = 1;
			if(self.onComplete)self.onComplete()






		} else { // грузим новую
			if(this.onLoad)this.onLoad()
			tt = this.checkFormat(this._link);
			if (tt == 0) { // щбычная
				let lT=this._link+""
				
				if(self.textur)if(self.textur.linkMy)if(self.textur.linkMy==lT){

				
					if(self.onComplete)self.onComplete()
					return
				}


				this.loader.load(this._link, function (textur) {
					self.textur = textur;
					self.textur.linkMy=lT;
					self.material.map =	textur;
					self.material.needsUpdate = true;
					self.parent.parent.intRend = 1;
				
					if(self.onComplete)self.onComplete()
				},function(e){
					
				},function(e){
					
				});
			}
			if (tt == 1) { // hdr
		
				return 
				this.loaderHDR.load(this._link, function (textur) {
					self.textur = textur;

					self.textur.encoding = THREE.RGBEEncoding;
					self.textur.minFilter = THREE.NearestFilter;
					self.textur.magFilter = THREE.NearestFilter;
					self.textur.flipY = true;
					self.material.map =	textur;
					self.material.needsUpdate = true;
					self.parent.parent.intRend = 1;
					if(self.onComplete)self.onComplete()
				});
			}
		}
	};

	this.checkFormat = function (link) {
		if (link.indexOf('.png') !== -1) return 0;
		if (link.indexOf('.jpeg') !== -1) return 0;
		if (link.indexOf('.jpg') !== -1) return 0;

		if (link.length > 150) { // это бейс 64 хз какой но не хдр наверно)))
			if (link.indexOf('png') !== -1) return 0;
			if (link.indexOf('jpeg') !== -1) return 0;
			if (link.indexOf('jpg') !== -1) return 0;
			return 1;
		}
		return 1;
	};


	this.render = function () {
		/* if(this.mesh==undefined)return
		if(this._active == false)return

		if(this._rotationZ!=this.parent.parent.rotationZ){
			this._rotationZ=this.parent.parent.rotationZ
			//this.cont3d1.rotation.y=this._rotationZ
		} */

	};


}
MSky.prototype = {
	set x (v) {
		if (this._x === v) return;
		this._x = v;
		this.cont3d.position.x = v;
		this.parent.parent.intRend = 1;
	},
	get x () {
		return this._x;
	},

	set y (v) {
		if (this._y === v) return;
		this._y = v;
		this.cont3d.position.y = v;
		this.parent.parent.intRend = 1;
	},
	get y () {
		return this._y;
	},

	set z (v) {
		if (this._z === v) return;
		this._z = v;
		this.cont3d.position.z = v;
		this.parent.parent.intRend = 1;
	},
	get z () {
		return this._z;
	},

	set active (v) {
		if (this._active === v) return;
		this._active = v;
		this.init();
		this.dergActiv();
	},
	get active () {
		return this._active;
	},

	set radius (v) {
		if (this._radius === v) return;
		this._radius = v;
		if (this.mesh != undefined) {
			this.mesh.scale.set(this._radius, this._radius, this._radius);
		}

	},
	get radius () {
		return this._radius;
	},

	set link (v) {
		if (this._link === v) return;
	
		this._link = v;
		this.init();
		this.dergLink();
		/* if(this._link=="null"){
			this.material
		} */

	},
	get link () {
		return this._link;
	},

	/*set shadRotZ (v) {
		if (this._shadRotZ === v) return;
		this._shadRotZ = v;
		if (this.mesh != undefined) {
			this.cont3d1.rotation.y = this._shadRotZ;
		}

	},
	get shadRotZ () {
		return this._shadRotZ;
	},

	set rotZ (v) {
		if (this._rotZ === v) return;
		this._rotZ = v;
		if (this.mesh != undefined) {
			this.mesh.rotation.y = this._rotZ;
		}

	},
	get rotZ () {
		return this._rotZ;
	},*/

	set color (v) {
		if (this._color === v) return;
		this._color = v;
		this.init();
		var c = this._color;
		if (typeof c === 'string') {
			if (c.indexOf('x') != -1) {
				var a = c.split('x');
				c = '#' + a[1];
			}
		}
		this.material.color = new THREE.Color(c);

	},
	get color () {
		return this._color;
	}
};
