
export class MStyle  {
    constructor(par, fun) {
    	this.type="MStyle";
		var self=this;
		this.par=par
		this.fun=fun
		this._active= false;
        this.otstup=this.par.otstup
        this.wh=this.par.wh

		this.dCont=new DCont(par.dCont);
        this.dCont.x=this.otstup*4+this.wh
        this.dCont.y=this.otstup*4+this.wh

        var aJ= [
            '{"colorC0":"#ff0000","colorC1":"#00ff00","delphC0":217.07,"delphC1":500}',
            '{"colorC0":"#89ffa3","colorC1":"#f3267c","delphC0":217.07,"delphC1":500}',
            '{"colorC0":"#89ffa3","colorC1":"#07419b","delphC0":824.43,"delphC1":206.37}'
        ];


		this.dCont.visible=	this._active;
        this.object={
            colorC0:"#ff0000",
            colorC1:"#00ff00",
            delphC0:200,
            delphC1:500
        }

		this.init=function(){
            if(this.window!=undefined)return          
            

            this.window=new DWindow(this.dCont,0,0,"style");
            this.pObject=new DParamObject(this.window.content,this.otstup,this.otstup,function(){         
               
                self.dragObj(self.object)
            });
            this.pObject.tipRide=true
            this.pObject.w.hasMinimizeButton=false;
            this.pObject.w.dragBool=false;
            this.pObject.w.text="Project styles";
            this.pObject.width=this.pObject.w.width=250

            this.pObject.addObject(this.object);


            this.panel=new DPanel(this.window.content,this.pObject.width+this.otstup*2,this.otstup)

            for (var i = 0; i < aJ.length; i++) {
                let b= new DButton(this.panel,this.otstup+i*(this.otstup+this.wh),this.otstup,""+i,function(){
                    let o=JSON.parse(aJ[this.idArr])
                    self.object=o
                    self.pObject.addObject(self.object);
                    self.dragObj(o);
                })
                b.idArr=i;
                b.width=b.height=this.wh;



            }
            this.panel.width=aJ.length*(this.otstup+this.wh)+this.otstup;
            this.panel.height=this.pObject.w.height;

            this.window.width= this.panel.width+this.panel.x+this.otstup
            this.window.height= this.pObject.w.height+32+this.otstup*2

            this.textArea=new DTextArea(this.panel,this.otstup,this.otstup*2+this.wh,"null")
            this.textArea.width=this.panel.width-2*this.otstup
            this.textArea.height=this.panel.height-this.textArea.y-this.otstup;



            //self.dragObj(self.object)
        }

        this.dragObj=function(o){
            var s=JSON.stringify(o);
            self.textArea.value=s;
            self.fun("dragStyleObj",o);
        }
    }

    set active(value) {
        if(this._active!=value){
            this._active= value;
            this.init();
            this.dCont.visible= value;     
        }
    }    
    get active() { return  this._active;}
}
