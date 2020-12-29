
//умник, распарсиваем колизии если таковые вобще есть

export class KRUColi  {
    constructor(par) {         
        this.type="KRUColi";        
        var self=this;
        this.par=par;

        this.arrWinChesh=[]   
        var sah=0
        this.getW=function() {      //* парсит окно в экземпляр KRBodyRect
            if(this.arrWinChesh[sah]==undefined){
                this.arrWinChesh[sah]=new KRBodyRect(this)
                this.arrWinChesh[sah].idArr=sah
            }
            sah++
            return this.arrWinChesh[sah-1]
        }

        var br
        this.korectRect=function() {
            sah=0;    
            this.par.arrWinDin.length=0;

            for (var i = 0; i < this.par.arrWin.length; i++) {   //* заполняем масив разпаршеными окнами
                br=this.getW() 
                br.setRect(this.par.arrWin[i]);
                this.par.arrWinDin.push(br)
            }

            if(this.par.coliz!=undefined){              
                for (var i = 0; i < this.par.coliz.array.length; i++) {
                    for (var j = 0; j < this.par.coliz.array[i].array.length; j++) {
                        br=this.getW(); 
                        br.setShape(this.par.coliz.array[i].array[j],this.par.coliz.array[i],this.par.colizX,this.par.colizY);
                        this.par.arrWinDin.push(br);   
                    }
                }
            }
            
        }       

    }
}


export class KRBodyRect  {
    constructor() {         
        this.type="KRBodyRect";        
        var self=this; 
        this.idArr=-1;

        this.x=0;
        this.y=0;
        this.w=100;
        this.h=100;

        this.x1=0;
        this.y1=0;    

        this.setRect=function(r) {
            this.x=r.x;
            this.y=r.y;
            this.w=r.w;
            this.h=r.h;
            this.x1=r.x+r.w;
            this.y1=r.y+r.h;
        }


        this.setShape=function(_shape,_p,_colizX,_colizY) {
            
           // trace(_p.uuid+">>>>>>>>>>>>>>", _p,_shape)
            this.x=_shape.rect.x+_p.position.x+_colizX;
            this.y=_colizY-_p.position.y;
            this.w=_shape.rect.w;
            this.h=_shape.rect.h;

            this.x1=this.x+this.w;
            this.y1=this.y+this.h;

           

        }    


    }
}
