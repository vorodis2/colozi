


export class Line  {
    constructor(par,p,p1,p2) {         
        this.type="Line";        
        var self=this;
        this.par=par;

        this.p=p;
        this.p1=p1;
        this.p2=p2;



        this.array=[];
        this.arrayCheh=[];
        var arrSah=[];
        var arrSah1=[];
        var aBopy=[];
        var b,i,j,i1,i2,j1,j2,sah,shape,body
        this.maxP=0;

       /* this.getP=function () {
            if(this.arrayCheh[this.array.length]==undefined){
                this.arrayCheh[this.array.length]=new LPosition(this.p,this.p1)  
            }
            return this.arrayCheh[this.array.length]
        }

        //////////////////вычесления линии и возможности вставки///////////////////////////////////
        this.set=function (_wordRect,_aBopy,_aIs) {
            return
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
            return
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




            //trace(aBopy)
            //проверка на принадлежность к миру
           


            
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

            this.sort(arrSah1, arrSah)//ставим по порядку
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
        var arrNum=[];
        this.getNumBlok=function () { 
            


            return arrNum;
        }*/


        /////////////////////////////////////////////////////
        //есть ли куда пихнуть на лингию боди
        this.isBlokPlace=function (body) {       
            return this.korektPosition(body)
        }


        this.col= parseInt("0100000000",2);
        this.col1=parseInt("1000000000",2);


        var arrNorm=[];
        var arrNorm1=[]; 
        var rr,sp 
        var arrPoz=[];
        var arrDist=[];
        var xx,xx1,xx2,xxr,of,bbb,pi,pm
        //смещаем позиции боди от линии      
        this.korektPosition=function (body) {

            sp = body.position["_"+this.p] 
            arrPoz.length=0;
            xx = body.position[this.p]
            xx1=body.rect[this.p];
            xx2=body.rect[this.p2];
            xxr = -1;
            

            
            if((body.col&this.col)!==0){//если вобще нужны колизии
                for (var i = 0; i < this.par.array.length; i++) {                
                    if(this.par.array[i].uuid!=body.uuid){  
                        if((this.par.array[i].col1&body.col1)!==0){  
                            of=this.par.array[i].offset;
                            if(body.offset>of)of=body.offset;
                            rr =  this.boInBoXX1(this.par.array[i],xx,xx1,xx2,false,of) 
                           // rr =  this.boInBo(this.par.array[i],body,false);
                            
                            xxr=rr[this.p];
                            if(rr.bool==false){
                                arrPoz.push(rr.param,rr.param1);
                            }
                        }                       
                    }
                }   
            }

            if((body.col&this.col1)!==0){//Ему пофиг остольные только мир

                of=this.par.offset;
                if(body.offset>of)of=body.offset;
                rr =  this.boInBoXX1(this.par,xx,xx1,xx2,true,of);
                

                if(rr.tip!=0){
                    arrPoz.push(rr.param,rr.param1);
                    
                }else{
                    xxr=rr[this.p]; 
                }

            }

            if(xxr!=-1 && arrPoz.length==0){//пихнули просто
                body.position["_"+this.p]=xxr;
                return true;
            }


             

            
            bbb=false;
            arrDist.length=0;
            pm=99999999999999999999999999999999          
            for (var i = 0; i < arrPoz.length; i++) { 
                arrDist[i] = this.korePosit(arrPoz[i], body, sp)     
                if(arrDist[i]!=-1){
                    bbb=true;
                    if(pm>arrDist[i]){
                        pi=i;
                        pm=arrDist[i];
                    }
                }                
            }

            if(bbb==true){
                body.position["_"+this.p]=arrPoz[pi];
                return true;
            }

            

           
            return false;

        }

       
        this.korePosit=function (param, body, dPar) {

            if((body.col&this.col1)!==0){//Ему пофиг остольные только мир 
                rr =  this.boInBo(this.par,body,true, param);                
                if(rr.tip!=0)return -1; 
            }


            if((body.col&this.col)!==0){//если вобще нужны колизии
                for (var i = 0; i < this.par.array.length; i++) {                
                    if(this.par.array[i].uuid!=body.uuid){  
                        if((this.par.array[i].col1&body.col1)!==0){
                            rr =  this.boInBo(this.par.array[i],body,false,param);
                            if(rr.tip==1||rr.tip==2){
                            }else{
                                return -1;
                            }
                        }
                    }
                }
            }

            return Math.abs(dPar-param); 
        }



        var arrOn=[];
        this.naLineRect=function (_wordRect,_aBopy) {
            arrOn.length=0;
            for (i = 0; i < _aBopy.length; i++) {
                rr =  this.boInBo(this.par,_aBopy[i],true);                
                if(rr.tip!=0)arrOn.push(_aBopy[i])
            }
            /*j1=_wordRect[this.p]
            j2=_wordRect[this.p]+_wordRect[this.p1]
            
            for (i = 0; i < _aBopy.length; i++) {
                i1=_aBopy[i].rect[this.p]+_aBopy[i].position[this.p]
                i2=_aBopy[i].rect[this.p]+_aBopy[i].position[this.p]+_aBopy[i].rect[this.p1]

                if(i1>=j1 && i2<=j2){
                    //норм
                }else{
                    arrOn.push(_aBopy[i])
                }
            }*/

           

            return arrOn
        }

        var rezult={}
        rezult[this.p]=0;
        rezult.dist=0 

        rezult.param=0;
        rezult.paramDist=0 
        rezult.param1=0;
        rezult.paramDist1=0 
        rezult.bool=true//Влазим
        rezult.bool1=true//Влазим

        rezult.tip=0//Влазим


        //вставляем боди в боди
        var offset
        var d,d1,x,x1
        this.boInBo=function (_bodyNa,_bodyIn,_bool, _x) {
            //_bodyIn находиться в нутри _bodyNa и неконфликтит
           // trace(_bodyNa,_bodyIn)

            rezult.bool=false;//Влазим

            rezult.tip=-1;//Влазим

            offset=_bodyNa.offset;
            if(_bodyIn.offset>offset)offset=_bodyIn.offset;  
            if(_x==undefined) _x=  _bodyIn.position[this.p]     
            return this.boInBoXX1(_bodyNa, _x, _bodyIn.rect[this.p], _bodyIn.rect[this.p2], _bool, offset)
        }       
           
        this.boInBoXX1=function (_bodyNa,_px,_x,_x2,_bool,_offset) {
           
            rezult.bool=false;//Влазим

            rezult.tip=-1//Влазим
            offset=_offset

            //In в нутри
            if(_bodyNa.position[this.p]+_bodyNa.rect[this.p]<=_px+_x-offset &&
                _bodyNa.position[this.p]+_bodyNa.rect[this.p2]>=_px+_x2+offset){
                rezult.tip=0//Влазим
                if(_bool==true){
                    rezult[this.p]=_px;
                }
            }

            x=_bodyNa.position[this.p]+_bodyNa.rect[this.p];
            x1=_px+_x2+offset;

            if(x>=x1){               
                rezult.tip=1//In с лева
                rezult.bool=true
                if(_bool==false)rezult[this.p]=_px;
            }

            x=_bodyNa.position[this.p]+_bodyNa.rect[this.p2]//+_bodyNa.offset
            x1=_px+_x-offset
            
            if(x<=x1){               
                rezult.tip=2//In с права
                rezult.bool=true
                if(_bool==false)rezult[this.p]=_px;
            }

      

            
            if(_bool==true){
                rezult.param=(_bodyNa.position[this.p]+_bodyNa.rect[this.p])-(_x-offset);
                rezult.param1=(_bodyNa.position[this.p]+_bodyNa.rect[this.p2])-(_x2+offset);
            }else{
                rezult.param=(_bodyNa.position[this.p]+_bodyNa.rect[this.p])-(_x2+offset);
                rezult.param1=(_bodyNa.position[this.p]+_bodyNa.rect[this.p2])-(_x-offset);              
            }

            
            rezult.paramDist=Math.abs(rezult.param-_px);            
            rezult.paramDist1=Math.abs(rezult.param1-_px);

            if(rezult.tip==-1){
                if(rezult.paramDist>rezult.paramDist1){
                    rezult.tip=3
                    rezult[this.p]=rezult.param1;
                    rezult.dist=rezult.param1; 
                }else{
                    rezult.tip=4
                    rezult[this.p]=rezult.param;
                    rezult.dist=rezult.param; 
                } 
            }


            //if(_bodyNa.position[this.p1]>_bodyIn.position[this.p1])rezult.bool=false
           // else rezult.bool=true  

            return rezult
        }





    }

}

/*
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
}*/