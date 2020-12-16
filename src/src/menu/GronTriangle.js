




export class GronTriangle  {
    constructor() {
    	this.type="GronTriangle";
		var self=this;


        this.t=[{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];
        this.t1=[{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];


        this.rezult=false;
        this.point={x:0,y:0,z:0}
		this.point1={x:0,y:0,z:0}


        var sah;

        this.setT=function(t,t1){
            this.t=t;
            this.t1=t1;            
        }

        var p = new THREE.Vector3();
        var p1 = new THREE.Vector3();
        var p2 = new THREE.Vector3();

        var m=0.5
        this.upDate=function(t,t1){


            
            /*this.point.x=this.t1[0].x;
            this.point.y=this.t1[0].y;
            this.point.z=this.t1[0].z;

            this.point1.x=this.t1[1].x;
            this.point1.y=this.t1[1].y;
            this.point1.z=this.t1[1].z;

            sah=0;

            p.set( this.t[0].x,this.t[0].y,this.t[0].z) 
            p1.set( this.t[1].x,this.t[1].y,this.t[1].z) 
            p2.set( this.t[2].x,this.t[2].y,this.t[2].z) 

            trace(p,p1,p2)
            this.intersectTriangle(p,p1,p2)*/
        }



        var diff = new THREE.Vector3();
        var edge1 = new THREE.Vector3();
        var edge2 = new THREE.Vector3();
        var normal = new THREE.Vector3();
        this.origin= new THREE.Vector3(1,0,0);
        var sign;
        this.intersectTriangle=function ( a, b, c, backfaceCulling, target ) {

            edge1.subVectors( b, a );
            edge2.subVectors( c, a );
            normal.crossVectors( edge1, edge2 );
            
            sign=1

            diff.subVectors( this.origin, a );

            trace(diff)
            trace(normal)

           // var DdE1xQ = sign * this.direction.dot( edge1.cross( diff ) );


        }

















        this.setObj=function(o){             
            this.t=o.t
            this.t1=o.t1           
        }
        this.getObj=function(o){                 
            var o={}
            o.t=this.t;
            o.t1=this.t1;            
            return o
        }







    }


}




