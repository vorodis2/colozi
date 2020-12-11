


export class Line  {
    constructor(p,p1) {         
        this.type="Line";        
        var self=this;
     
        this.p=p;
        this.p1=p1;
        this.p2=p+"1";

        this.col=parseInt("0100000000",2);


        this.array=[];
        this.arrayCheh=[];
        var arrSah=[];
        var arrSah1=[];
        var aBopy=[];
        var b,i,j,i1,i2,j1,j2,sah,shape,body
        this.maxP=0

        this.getP=function () {
            if(this.arrayCheh[this.array.length]==undefined){
                this.arrayCheh[this.array.length]=new LPosition(this.p,this.p1)  
            }
            return this.arrayCheh[this.array.length]
        }

        //////////////////вычесления линии и возможности вставки///////////////////////////////////
        this.set=function (_wordRect,_aBopy,_aIs) {
            this.dragArray(_wordRect,_aBopy,_aIs)

            this.array.length=0;
            if(arrSah.length==0){                
                this.array[0]=this.getP()
                this.array[0][this.p]=_wordRect[this.p]
                this.array[0][this.p1]=_wordRect[this.p1]
                this.array[0][this.p2]=_wordRect[this.p]+_wordRect[this.p1]

            }else{
                i1=_wordRect[this.p];
                sah=0;
                for (var i = 0; i < arrSah.length; i+=2) {
                    this.array[sah]=this.getP();
                    this.array[sah][this.p]=i1;
                    this.array[sah][this.p1]=arrSah[i]-i1
                    this.array[sah][this.p2]=this.array[sah][this.p]+this.array[sah][this.p1]
                    i1=arrSah[i+1]
                    sah++
                }

              
                this.array[sah]=this.getP();
                this.array[sah][this.p]=i1;
                this.array[sah][this.p1]=_wordRect[this.p1]-i1+_wordRect[this.p];
                this.array[sah][this.p2]=_wordRect[this.p1];   
            }

            this.maxP=0
            for (i = 0; i < this.array.length; i++) {
                if(this.array[i][this.p1]>this.maxP)this.maxP=this.array[i][this.p1];
            }
                      
        }


        this.dragArray=function (_wordRect,_aBopy,_aIs) {
            //готовим массив на проверку исключая не нужные
            arrSah.length=0;
            if(_aBopy.length==0){
                
                return;
            }
            

            if(_aIs==undefined){
                aBopy=_aBopy;//нет исключений
            }else{
                aBopy=[]
                if(_aIs[0]!=undefined){//отсекаем массивом                    
                    for (i = 0; i < _aBopy.length; i++) {
                        b=true;
                        for (j= 0; j < _aIs.length; j++) {
                            if(_aIs[j].uuid==_aBopy[i].uuid){
                                b=false;
                                j=9999
                            }
                        } 
                        if(b)aBopy.push(_aBopy[i]);
                    }
                }else{//это не массив а один боди                    
                    for (i = 0; i < _aBopy.length; i++) {
                        b=true;                       
                        if(_aIs.uuid==_aBopy[i].uuid){
                            b=false;                           
                        }                       
                        if(b)aBopy.push(_aBopy[i]);
                    } 
                }
            }
            ///////////////////////////




            trace(aBopy)
            //проверка на принадлежность к миру
            for (var i = aBopy.length-1; i >=0; i--) {
                if((aBopy[i].col&this.col)===0)aBopy.splice(i,1)
            }


            
            arrSah1.length=0;
            for (i = 0; i < aBopy.length; i++) {
                body=aBopy[i]
                for (j = 0; j < body.children.length; j++) {
                    shape=body.children[j];
                    arrSah1.push(body.position[this.p]+shape.rect[this.p],body.position[this.p]+shape.rect[this.p]+shape.rect[this.p1])
                }
            }

            if(arrSah1.length==0){                
                return;
            }

            this.sort(arrSah1,arrSah)//ставим по порядку
            this.sort2(arrSah)//сливаем одинаковых

        }
        var m,s,a
        this.sort=function (_a,_aIn) {
            if(_a.length==0)return
          
            m=99999999999999999999;
            s=-1
            for ( i = 0; i < _a.length; i+=2) {
                if(_a[i]<m){
                    m=_a[i];
                    s=i;
                }
            }

            if(s!=-1){
                a=_a.splice(s,2) 

                if(a.length!=2)return 
                if(isNaN(a[0])==true)return 

                for ( i = 0; i < 2; i++) {
                    _aIn.push(a[i])     
                }
                this.sort(_a,_aIn,2) 
            }            
        }


        this.sort2=function (_a) {
            if(_a.length==2)return
            j=_a.length-2
            for (var i = 0; i < j; i+=2) {
                if(_a[i+1]>=_a[i+2]){
                    if(_a[i+1]>=_a[i+3]){
                        _a.splice(i+2, 2)
                        this.sort2(_a);
                        return
                    }else{
                        _a[i+1]=_a[i+3];
                        _a.splice(i+2, 2)
                        this.sort2(_a);
                        return 
                    }                    
                } 
            }    
        }

        /////////////////////////////////////////////////////
        //есть ли куда пихнуть на лингию боди
        this.isBlokPlace=function (body) {
            trace(body.rect[this.p1]+"     "+this.maxP)
            if(body.rect[this.p1]<this.maxP)return true

            return false   
        }


        var arrNorm=[];
        var arrNorm1=[];  
        //смещаем позиции боди от линии      
        this.korektPosition=function (body) {
            arrNorm.length=0
            //можно пихнуть
            for (i = 0; i < this.array.length; i++) {
                if(this.array[i][this.p1]>=body.rect[this.p1]){
                    arrNorm.push(this.array[i])
                }
            }
            //а может и нафиг смещать
            for (i = 0; i < arrNorm.length; i++) {                
                if(body.rect[this.p]+body.position[this.p]>arrNorm[i][this.p]){                    
                    if(body.rect[this.p]+body.rect[this.p1]+body.position[this.p]<arrNorm[i][this.p]+arrNorm[i][this.p1]){
                        //позиция свободня и не требует коректировок
                        return
                    }
                }
            }


            //ищем все позиции
            arrNorm1.length=0;
            for (i = 0; i < arrNorm.length; i++) {   
                arrNorm1.push(arrNorm[i][this.p]-body.rect[this.p])
                arrNorm1.push(arrNorm[i][this.p]+arrNorm[i][this.p1]-body.rect[this.p]-body.rect[this.p1])
            }
            j=999999999999999999;
            j1=999999999999999999;
            i1=0

            for (i = 0; i < arrNorm1.length; i++) {
                j1=Math.abs(arrNorm1[i]-body.position["_"+this.p]) 
                if(j1<j){
                    j=j1
                    i1=i
                }
            }
            body.position["_"+this.p]=arrNorm1[i1]
        }

        var arrOn=[];
        this.naLineRect=function (_wordRect,_aBopy) {
            arrOn.length=0;
            j1=_wordRect[this.p]
            j2=_wordRect[this.p]+_wordRect[this.p1]
            
            for (i = 0; i < _aBopy.length; i++) {
                i1=_aBopy[i].rect[this.p]+_aBopy[i].position[this.p]
                i2=_aBopy[i].rect[this.p]+_aBopy[i].position[this.p]+_aBopy[i].rect[this.p1]

                if(i1>=j1 && i2<=j2){
                    //норм
                }else{
                    arrOn.push(_aBopy[i])
                }
            }
           

            return arrOn
        }

    }

}


export class LPosition  {
    constructor(p,p1) {         
        this.type="LPosition";        
        var self=this;
        this.p=p
        this.p1=p1
        this.p2=p+"1"
        this[p]=0;
        this[p1]=0;
        this[p+"1"]=0;
    }
}