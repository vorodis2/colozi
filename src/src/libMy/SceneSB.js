
var visi3D
function SceneSB (_visi3D) {
	this.type = 'SceneSB';
	trace("visi3D"+_visi3D)
	visi3D=_visi3D
	
	var self = this;
	this.array = [];
	this.object = undefined;	
	this.array.push(new SceneBox2('ambient'));
	this.array.push(new SceneBox1('shadow'));
	////this.array.push(new SceneBox4('smcShadow'));
	this.array.push(new SceneBox3('sky'));
	this.array.push(new SceneBox5('mirror'));
	this.array.push(new SceneBox6('visi3D'));
	//this.array.push(new SceneBox7('effect'));
	//this.array.push(new SceneBox8('paramVR'));
	

	//this.array.push(new SceneBox9('fog'));


	this.setObj = function (_o) {
		this.object = _o;
		
		for (var i = 0; i < this.array.length; i++) {
			if (this.object[this.array[i].name] === undefined) {
				this.object[this.array[i].name] = {};
			}
			this.array[i].setBasa(this.object[this.array[i].name]);
		}
		visi3D.shadowNeedsUpdate = true;
	};
}

function SceneBox (_name) {
	this.type = 'SceneBox';
	var self = this;
	this.name = _name;
	this.array = [];
	this.object = null;
	this.objArray = {};

	this.plus = function (_obj, param) {
		this.array.push(new SceneGron(_obj, param));
		this.objArray[_obj.param] = this.array[this.array.length - 1];
	};

	this.setValue = function (_key, _param, _drag) {
		if (_drag == undefined) this.object[_key] = _param;
		else {
			this.drahKeyParam(_key, _param);
		}
	};

	this.drahKey = function (_key) {
		

		if (this.objArray['works'] != undefined) {
			if (this.object['works'] == false) {
				if(_key=="active")if(this.objArray["active"].param){
					this.objArray["active"].param(this.object["active"]);
					visi3D.intRend = 1;
				} 

				return;
			}
		}

		if (this.objArray[_key] != undefined) {
			if (this.objArray[_key].tipP == 1) { // се=тер гетер
				if (typeof this.objArray[_key].param[_key] === 'object') { // Бля это обьект хер разбереш каой он)))
					this.objArray[_key].param[_key] = this.object[_key];
				} else {
					if (this.objArray[_key].param[_key] != this.object[_key]) { // заглуха на одиновый числа
						this.objArray[_key].param[_key] = this.object[_key];
					}
				}
			}
			if (this.objArray[_key].tipP == 2) { // тута функция в нее переменую
				this.objArray[_key].param(this.object[_key]);
			}
		}
		visi3D.intRend = 1;
	};

	this.drahKeyParam = function (_key, _param) {
		if (this.objArray[_key] != undefined) {
			if (this.objArray[_key].tipP == 1) { // се=тер гетер
				if (typeof this.objArray[_key].param[_key] === 'object') { // Бля это обьект хер разбереш каой он)))
					this.objArray[_key].param[_key] = _param;
				} else {
					if (this.objArray[_key].param[_key] != _param) { // заглуха на одиновый числа
						this.objArray[_key].param[_key] = _param;
					}
				}
			}
			if (this.objArray[_key].tipP == 2) { // тута функция в нее переменую
				this.objArray[_key].param(_param);
			}
		}
		visi3D.intRend = 1;
	};

	// парсим и если что добовляем
	this.setBasa = function (_obj) {
		this.object = _obj;
		for (var i = 0; i < this.array.length; i++) {
			if (_obj[this.array[i].object.param] == undefined) {
				_obj[this.array[i].object.param] = this.array[i].object.valueStart;
			}
		}
		this.drahKeys();
	};

	this.drahKeys = function () {
		for (var i = 0; i < this.array.length; i++) {
			this.drahKey(this.array[i].object.param);
		}
	};
	this.plus({name: 'check10', typeParam: 'DCheckBox', param: 'works', title: 'works//false не работает', valueStart: true});// есть у всех
}

function SceneGron (_obj, _param) {
	this.type = 'SceneGron';
	var self = this;
	this.object = _obj;
	this.param = _param;
	this.tipP = 0;// нет параметра

	if (_param != undefined) {
		if (typeof _param === 'object')	this.tipP = 1;// се=тер гетер
		if (typeof _param === 'function') this.tipP = 2;// функция
	}
}

function SceneBox1 (_name) {
	SceneBox.call(this, _name);
	this.type = 'SceneBox1';
	var self = this;

	this.plus({name: 'check', typeParam: 'DCheckBox', param: 'active', title: 'active', valueStart: false},
		function (value) {
			visi3D.utility.sunActiv(value)
			/*visi3D.objShadow(visi3D.group, value);
			if (value == true) {
				if (visi3D.sunLight.parent == undefined)visi3D.scene.add(visi3D.sunLight);
			} else {
				if (visi3D.sunLight.parent != undefined)visi3D.scene.remove(visi3D.sunLight);
			}
			visi3D.utility.funDebug();*/
		});

	/*this.plus({name: 'BtnNumPad', typeParam: 'NumericPanel', param: visi3D.SHADOW_WH, data: [512, 1024, 2048, 4096, 8192], title: 'mapSize', value: visi3D.SHADOW_WH},
		function (value) {
			value = value || visi3D.SHADOW_WH;
			if (visi3D.sunLight.shadow.mapSize.width != value) {
				visi3D.sunLight.shadow.mapSize.width = value;
				visi3D.sunLight.shadow.mapSize.height = value;
			}
		}
	);*/

	this.plus({name: 'slider10', typeParam: 'DSliderBig', param: 'mapSize', title: 'mapSize', min: 64, max: 8192, value: 2048, okrug: 1, valueStart: visi3D.SHADOW_WH},
		function (value) {
			value = value || visi3D.SHADOW_WH;
			if (visi3D.sunLight.shadow.mapSize.width != value) {
				visi3D.sunLight.shadow.mapSize.width = value;
				visi3D.sunLight.shadow.mapSize.height = value;
			}
		}
	);

	this.plus({name: 'color', typeParam: 'DColor', param: 'color', title: 'color', valueStart: visi3D.LIGHT_COLOR},
		function (value) {
			var c = value;
			if (typeof c === 'string') {
				if (c.indexOf('x') != -1) {
					var a = c.split('x');
					c = '#' + a[1];
				}
			}

			visi3D.sunLight.color = new THREE.Color(c);
		});

	this.plus({name: 'slider', typeParam: 'DSliderBig', param: 'bias', title: 'bias', min: -0.05, max: 0.05, value: 0, okrug: 10000, valueStart: visi3D.LIGHT_BIAS},
		visi3D.sunLight.shadow
	);

	this.plus({name: 'slider1', typeParam: 'DSliderBig', param: 'intensity', title: 'intensity', min: 0, max: 5, value: 1, okrug: 100, valueStart: visi3D.SHADOW_INTENSITY},
		visi3D.sunLight);

	this.plus({name: 'slider2', typeParam: 'DSliderBig', param: 'radius', title: 'radius', min: 0, max: 50, value: 1, valueStart: visi3D.SHADOW_RADIUS},
		visi3D.sunLight.shadow);

	this.plus({name: 'check2', typeParam: 'DCheckBox', param: 'bAlphaForCoating', title: 'SAMPLE_ALPHA..', value: true, valueStart: false},
		function (value) {
			var gl = visi3D.renderer.getContext();
			if (value) gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE);
			else gl.disable(gl.SAMPLE_ALPHA_TO_COVERAGE);
		});

	this.plus({name: 'check3', typeParam: 'DCheckBox', param: 'fixation', title: 'fixation', value: false, valueStart: visi3D.utility.FIXATION},
		visi3D.utility);

	this.plus({name: 'slider4', typeParam: 'DSliderBig', param: 'rotationX', title: 'rotationX', min: -Math.PI, max: Math.PI, okrug: 100, value: 0, valueStart: visi3D.utility.ROTATION_X},
		visi3D.utility);
	this.plus({name: 'slider5', typeParam: 'DSliderBig', param: 'rotationZ', title: 'rotationZ', min: -Math.PI, max: Math.PI,okrug: 100, value: 0, valueStart: visi3D.utility.ROTATION_Z},
		visi3D.utility);

	this.plus({name: 'slider6', typeParam: 'DSliderBig', param: 'distance', title: 'distance', min: 0, max: 10000, value: 0, valueStart: visi3D.utility.DISTANCE},
		visi3D.utility);

	this.plus({name: 'slider7', typeParam: 'DSliderBig', param: 'cubWidth', title: 'cubWidth', min: 10, max: 10000, value: 0, valueStart: visi3D.utility.CUB_WIDTH},
		visi3D.utility);

	this.plus({name: 'slider8', typeParam: 'DSliderBig', param: 'cubHeight', title: 'cubHeight', min: 10, max: 10000, value: 0, valueStart: visi3D.utility.CUB_HEIGHT},
		visi3D.utility);

	this.plus({name: 'slider9', typeParam: 'DSliderBig', param: 'distanceUpdateShadow', title: 'distUpdateShadow ', min: -1, max: 500, value: 0, valueStart: visi3D.utility.distanceUpdateShadow},
		visi3D.utility);
}

function SceneBox2 (_name) { // 'ambient'
	SceneBox.call(this, _name);
	var self = this;
	this.type = 'SceneBox2';
	this.plus({name: 'check', typeParam: 'DCheckBox', param: 'active', title: 'active', valueStart: true},
		function (value) {
		
			visi3D.utility.ambientActiv(value)
		});
	
	this.plus({name: 'color', typeParam: 'DColor', param: 'color', title: 'color', tipParam: 2, valueStart: visi3D.AMBIEN_COLOR},
		function (value) {
			var c = value;


			if (typeof c === 'string') {
				if (c.indexOf('x') != -1) {
					var a = c.split('x');
					c = '#' + a[1];
				}
			}

			self.setValue(this.object.param, c);
			
			visi3D.ambientLight.color = new THREE.Color(c);
		});

	this.plus({name: 'slider', typeParam: 'DSliderBig', param: 'intensity', title: 'intensity', min: 0, max: 5, okrug: 100, valueStart: visi3D.AMBIEN_INTENSITY},
		visi3D.ambientLight);
}

function SceneBox3 (_name) {
	SceneBox.call(this, _name);
	this.type = 'SceneBox3';
	var self = this;

	this.plus({name: 'check', typeParam: 'DCheckBox', param: 'active', title: 'active', valueStart: false},
		function (value) {
			visi3D.utility.sky.active = value;
		});

	this.plus({name: 'color', typeParam: 'DColor', param: 'color', title: 'color', valueStart: visi3D.utility.sky.COLOR},
		visi3D.utility.sky);

	this.plus({name: 'contLoader', typeParam: 'DVisualLoader', param: 'link', title: 'LoadPic', valueStart: visi3D.utility.sky.LINK},
		visi3D.utility.sky);

	this.plus({name: 'slider1', typeParam: 'DSliderBig', param: 'rotZ', title: 'rotZ', min: 0, max: Math.PI * 2, okrug: 100, valueStart: 0},
		visi3D.utility.sky);


	this.plus({name: 'slider', typeParam: 'DSliderBig', param: 'radius', title: 'radius', min: 10, max: 15000, okrug: 1, valueStart: visi3D.utility.sky.RADIUS},
		visi3D.utility.sky);


	this.plus({name: 'slider2', typeParam: 'DSliderBig', param: 'x', title: 'position x', min: -15000, max: 15000, okrug: 1, valueStart: visi3D.utility.sky.POS_X},
		visi3D.utility.sky);


	this.plus({name: 'slider3', typeParam: 'DSliderBig', param: 'y', title: 'position y', min: -15000, max: 15000, okrug: 1, valueStart: visi3D.utility.sky.POS_Y},
		visi3D.utility.sky);


	this.plus({name: 'slider4', typeParam: 'DSliderBig', param: 'z', title: 'position z', min: -15000, max: 15000, okrug: 1, valueStart: visi3D.utility.sky.POS_Z},
		visi3D.utility.sky);
}

function SceneBox4 (_name) {
	SceneBox.call(this, _name);
	this.type = 'SceneBox4';
	var self = this;
	this.plus({name: 'check', typeParam: 'DCheckBox', param: 'active', title: 'active', valueStart: false},
		function (value) {
			visi3D.utility.smc.active = value;
		});
	this.plus({name: 'slider', typeParam: 'DSliderBig', param: 'wh', title: 'whFIXI в либе хз', min: 10, max: 15000, okrug: 1, valueStart: visi3D.utility.smc.WH},
		visi3D.utility.smc);

}

function SceneBox5 (_name) { // mirror
	SceneBox.call(this, _name);
	this.type = 'SceneBox5';
	var self = this;

	this.plus({name: 'contLoader', typeParam: 'DVisualLoader', param: 'link', title: 'Load', valueStart: 'null'},
		function (value) {
			visi3D.cubeMap.link = value;			
		});

	this.plus({name: 'sliderExp', typeParam: 'DSliderBig', param: 'exposure', title: 'exposure', min: -10, max: 10, okrug: 100, valueStart: -1},
		function (value) {
			visi3D.cubeMap.exposure = value;
		});

	this.plus({name: 'slider1', typeParam: 'DSliderBig', param: 'gamma', title: 'gamma//в самой хдр', min: -10, max: 10, okrug: 100, valueStart: -1},
		function (value) {
			visi3D.cubeMap.gamma = value;//managerProduct
		});
}

function SceneBox6 (_name) { // visi3D
	SceneBox.call(this, _name);
	this.type = 'SceneBox6';
	var self = this;

	this.plus({name: 'check0', typeParam: 'DCheckBox', param: 'alwaysRender', title: 'autoRender', valueStart: false},
		function (value) {
			if (visi3D.alwaysRender !== value) {
				visi3D.alwaysRender = value;
			}
		});

	this.plus({name: 'slider', typeParam: 'DSliderBig', param: 'fov', title: 'fov', min: 0, max: 90, okrug: 1, valueStart: visi3D.FOV},
		function (value) {
			if (visi3D.camera.fov != value) {
				visi3D.camera.fov = value;
				visi3D.camera.updateProjectionMatrix();
			}
		});

	this.plus({name: 'slider1', typeParam: 'DSliderBig', param: 'far', title: 'far', min: 100, max: 50000, okrug: 1, valueStart: visi3D.FAR},
		function (value) {
			if (visi3D.camera.far != value) {
				visi3D.camera.far = value;
				visi3D.camera.updateProjectionMatrix();
			}
		});
	/*this.plus({name: 'check11', typeParam: 'DCheckBox', param: 'zoom', title: 'AutoZoom', valueStart: false},
		function (value) {
			visi3D.utility.focus.active = value;
			visi3D.utility.focus.targetObject = world3D.content3d;
		});*/



	this.plus({name: 'slider2', typeParam: 'DSliderBig', param: 'minZum', title: 'minZum', min: 0, max: 20000, okrug: 1, valueStart: 0},
		function (value) {
			visi3D.minZum = value;

			if (visi3D.minZum > visi3D.maxZum) {
				visi3D.maxZum = visi3D.minZum;
				self.setValue('maxZum', value);
			}
		});
	this.plus({name: 'slider3', typeParam: 'DSliderBig', param: 'maxZum', title: 'maxZum', min: 0, max: 20000, okrug: 1, valueStart: 20000},
		function (value) {
			visi3D.maxZum = value;
			if (visi3D.maxZum < visi3D.minZum) {
				visi3D.minZum = visi3D.maxZum;
				self.setValue('minZum', value);
			}

		});
	this.plus({name: 'slider4', typeParam: 'DSliderBig', param: 'zume', title: 'zoomIntensity', min: 5, max: 500, okrug: 1, valueStart: 250},
		function (value) {
			if (visi3D.position3d.powerZum !== value) {
				visi3D.position3d.powerZum = value;
			}
		});
	this.plus({name: 'slider5', typeParam: 'DSliderBig', param: 'minRotationX', title: 'minAngel', min: 0, max: 3, okrug: 100, valueStart: 2.5},
		function (value) {
			if (visi3D.minRotationX !== value) {
				visi3D.minRotationX = value;
			}
		});

	this.plus({name: 'slider6', typeParam: 'DSliderBig', param: 'maxRotationX', title: 'maxAngel', min: 0, max: 3, okrug: 100, valueStart: 0},
		function (value) {
			if (visi3D.maxRotationX !== value) {
				visi3D.maxRotationX = value;
			}
		});

	this.plus({name: 'check1', typeParam: 'DCheckBox', param: 'debug', title: 'debug', valueStart: true},
		function (value) {
			if (visi3D.utility.debug !== value) {
				visi3D.utility.debug = value;
			}
		});

	this.plus({name: 'check2', typeParam: 'DCheckBox', param: 'isDragPan', title: 'isDragPan', valueStart: true},
		function (value) {
			if (visi3D.position3d.isDragPan !== value) {
				visi3D.position3d.isDragPan = value;
			}
		});	
	


	this.plus({name: 'slider7', typeParam: 'DSliderBig', param: 'zume', title: 'zoom', min: 5, max: 2000, okrug: 1, valueStart: 250},
		function (value) {
			visi3D.zume=value
		});

	this.plus({name: 'slider8', typeParam: 'DSliderBig', param: 'rotationX', title: 'rotationX', min: -Math.PI, max: Math.PI, okrug: 100, valueStart: 0},
		function (value) {
			visi3D.rotationX=value
		});
	this.plus({name: 'slider9', typeParam: 'DSliderBig', param: 'rotationZ', title: 'rotationZ', min: -Math.PI, max: Math.PI, okrug: 100, valueStart: 0},
		function (value) {
			visi3D.rotationZ=value
		});

}

function SceneBox7 (_name) { // effect
	SceneBox.call(this, _name);
	this.type = 'SceneBox7';
	var self = this;

	/* this.plus({	name: 'check', typeParam: 'DCheckBox', param: 'antialias', title: 'antialias', valueStart: true},
				visi3D.renderer); */

	this.plus({name: 'check1', typeParam: 'DCheckBox', param: 'renderPass', title: '1. renderPass', valueStart: false},
		visi3D.efect);

	this.plus({name: 'check2', typeParam: 'DCheckBox', param: 'outlinePass', title: '2. outlinePass', valueStart: false},
		visi3D.efect);


	this.plus({name: 'color', typeParam: 'DColor', param: 'outlineColor', title: 'outlineColor', valueStart: visi3D.efect.OUTLINE_COLOR},
		function (value) {
			var c = value;
			if (typeof c === 'string') {
				if (c.indexOf('x') != -1) {
					var a = c.split('x');
					c = '#' + a[1];
				}
			}
			visi3D.efect.outlineColor = c;
		});

	this.plus({name: 'color1', typeParam: 'DColor', param: 'outlineColor1', title: 'outlineColor1', valueStart: visi3D.efect.OUTLINE_COLOR1},
		function (value) {
			var c = value;
			if (typeof c === 'string') {
				if (c.indexOf('x') != -1) {
					var a = c.split('x');
					c = '#' + a[1];
				}
			}
			visi3D.efect.outlineColor1 = c;
		});

	this.plus({name: 'string', typeParam: 'DStringDrag', param: 'strJSON', title: '>', valueStart: visi3D.efect.SAOJSON},
		visi3D.efect);

	this.plus({name: 'check5', typeParam: 'DCheckBox', param: 'taaPass', title: '2.1 taaPass', valueStart: visi3D.efect.TAA_PASS},
		visi3D.efect);

	this.plus({name: 'slider', typeParam: 'DSliderBig', param: 'sampleLevel', title: 'sampleLevel', min: 0, max: 5, okrug: 1, valueStart: visi3D.efect.SAMPLE_LEVEL},
		visi3D.efect);


	this.plus({name: 'check3', typeParam: 'DCheckBox', param: 'shaderPass', title: '3. shaderPass', valueStart: visi3D.efect.SHADER_PASS},
		visi3D.efect);

	this.plus({name: 'check4', typeParam: 'DCheckBox', param: 'saoPass', title: '4. saoPass', valueStart: visi3D.efect.SAO_PASS},
		visi3D.efect);


	this.plus({name: 'string1', typeParam: 'DStringDrag', param: 'saoJSON', title: 'sao>', valueStart: visi3D.efect.STRJSON},
		visi3D.efect);
}

function SceneBox8 (_name) { // paramVR
	SceneBox.call(this, _name);
	this.type = 'SceneBox8';
	var self = this;

	this.plus({	name: 'check', typeParam: 'DCheckBox', param: 'startAnimat', title: 'startAnimat', valueStart: false});

	this.plus({name: 'slider1', typeParam: 'DSliderBig', param: 'kolLength', title: 'kolLength//500', min: 1, max: 1000, okrug: 1, valueStart: 1000});

	this.plus({name: 'slider2', typeParam: 'DSliderBig', param: 'kolCount', title: 'kolCount//0', min: 0, max: 20000, okrug: 1, valueStart: 0});
}




