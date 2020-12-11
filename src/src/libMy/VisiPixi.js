


export class VisiPixi  {
    constructor() {
        var self=this
        this._width=100;
        this._height=100;

        this.div= document.createElement('div');
        this.div.style.position = 'fixed';
        this.div.style.top = '0px';
        this.div.style.left = '0px';


        this.stage = new PIXI.Container();
        this.content2d = new PIXI.Container();
        this.stage.addChild(this.content2d);


        this.renderer = new PIXI.autoDetectRenderer(this._width, this._height, {antialias: true, transparent: true, preserveDrawingBuffer: true });
        this.renderer.view.style.position = 'fixed';
        this.div.appendChild(this.renderer.view);


        this.render = function () {            
           self.renderer.render(self.stage);            
        }

        this.sizeWindow = function(w,h){            
            if(w){
                self._width=w;
                self._height=h;
            }
            //var precresol = self.resolution;// запоминаем предыдущее разрешение пикселей рендера
            self.renderer.view.style.width = self._width + 'px';
            self.renderer.view.style.height = self._height + 'px';                
                
            //self.renderer.resolution = 1;// перед изменение размера в дефолт
                
            self.renderer.resize(self._width, self._height);
            //self.renderer.resolution = precresol;// ставим обратно разрешение            
        }
    }
}


