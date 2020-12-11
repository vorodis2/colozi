

export class SpDebugPixi  {
    constructor() {
    	this.type="SpDebugPixi";
    	var self=this;
    	this.content2d = new PIXI.Container();

    	this.color=0xaaaaaa
    	this.colorActiv=0xFF0000
    	this.wL=10;
    	this.al=1
    	this._alpha=1

    	this.contentDebag = new PIXI.Container();
		this.content2d.addChild(this.contentDebag);
		//this.contentDebag.position.y = -200;

		var g = new PIXI.Graphics();
		this.content2d.addChild(g);


    	this.debagLine = function (p, p1, color, wL) {
			//if (this.debagOk(aP) == false) return;
			this.graphics = new PIXI.Graphics();
			this.contentDebag.addChild(this.graphics);
			if (color == undefined)color = this.color;
			if (wL == undefined)wL = this.wL;
			this.graphics.lineStyle(wL, color, wL);
			this.graphics.moveTo(p.x, p.y);
			this.graphics.lineTo(p1.x, p1.y);
		};


		this.debagPoint = function (p, r, color, wL, a) {		
			this.graphics = new PIXI.Graphics();
			this.contentDebag.addChild(this.graphics);
			r = r || 50;
			if (color == undefined)color = this.color;
			wL = wL || this.wL;

			this.graphics.lineStyle(this.wL, color, wL);
			this.graphics.beginFill(color, a==undefined ? 1: a);
			this.graphics.drawCircle(p.x, p.y, r);
		};


		var sT=0;
		var aT=[];

		this.clearD = function () {
			g.clear();
			sT=0
			for (var i = 0; i < aT.length; i++) {
				aT[i].visible=false
			}
		};
		this.clear = function () {
			
			this.clearD()			
		};



		var label, pp;
		this.dText = function (p, text, color, s) {
			var ss=s||4
			if(aT[sT]==undefined){
				aT[sT]= new PIXI.Container();
	    		pp = new PIXI.Text('345634634',{ fontFamily : 'Arial' })
	    		aT[sT].addChild(pp);	
	    		this.content2d.addChild(aT[sT])    
			}
			label=aT[sT]
			label.children[0].text=text+"";
			label.children[0].position.x=-label.children[0].width/2
			label.children[0].position.y=-label.children[0].height/2
			label.position.x=p.x;
			label.position.y=p.y;
			label.scale.x=ss
			label.scale.y=ss
			label.visible=true;			
			sT++
		}





		var oo={x:0,y:0}
		var oo1={x:0,y:0}
		this.dLineParam = function (x,y, x1,y1, color, wL) {
			oo.x=x;oo.y=y;oo1.x=x1;oo1.y=y1;
			this.dLine(oo, oo1, color, wL); 
		};

		this.dLine = function (p, p1, color, wL) {
			//if (this.debagOk(aP) == false) return;
			if (color == undefined)color = this.color;
			if (wL == undefined)wL = this.wL;
			g.endFill();
			g.lineStyle(wL, color, this.al);
			g.moveTo(p.x, p.y);
			g.lineTo(p1.x, p1.y);
			g.endFill();
		};

		this.dPointParam = function (x,y,r,  color, wL) {
			oo.x=x;oo.y=y;
			this.dPoint(oo, r,color, wL); 
		};		
		this.dPoint = function (p, r, color, wL) {
			//if (this.debagOk(aP) == false) return;
			r = r || 50;
			if (r > 1000000) {
				console.warn('Большой круг рисовать не буду', r);
				return;
			}
			if (color == undefined)color = this.color;
			wL = wL || this.wL;
			g.lineStyle(wL, color, this.al);
			g.drawCircle(p.x, p.y, r);
			g.endFill();
		};


		this.dLinePosition = function (p, color) {
			var rr = 20.5;
			g.lineStyle(rr, color, this.al);

			g.moveTo(p.p.x, p.p.y);
			g.lineTo(p.p1.x, p.p1.y);
			g.moveTo(p.p1.x, p.p1.y);
			g.lineTo(p.p2.x, p.p2.y);

			g.beginFill(color, 0.3);
			g.drawCircle(p.p.x, p.p.y, rr);
			g.drawCircle(p.p1.x, p.p1.y, rr);
			g.drawCircle(p.p2.x, p.p2.y, rr);
			g.endFill();
		};

		this.dRect = function (r, color, wL) {
			//if (this.debagOk(aP) == false) return;
			r = r || 50;
			if (r > 1000000) {
				console.warn('Большой круг рисовать не буду', r);
				return;
			}
			if (color == undefined)color = 0xFFFFFF*Math.random();
			wL = wL || this.wL;
			let ww=r.w  ==undefined ? r.width : r.w
			let hh=r.h  ==undefined ? r.height : r.h

			let p={x:r.x,y:r.y};
			let p1={x:r.x+ww,y:r.y};
			let p2={x:r.x+ww,y:r.y+hh};
			let p3={x:r.x,y:r.y+hh};
			this.dLine(p,p1, color, wL)
			this.dLine(p1,p2, color, wL)
			this.dLine(p2,p3, color, wL)
			this.dLine(p3,p, color, wL)
		
		};

    }


    set alpha(value) {  
        if(this._alpha!= value) {
            this._alpha= value;
            this.content2d.alpha= value;
        }    
              
    }    
    get alpha() { return  this._alpha;}


}



