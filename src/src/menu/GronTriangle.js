function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2]

    out[0] = ay * bz - az * by
    out[1] = az * bx - ax * bz
    out[2] = ax * by - ay * bx
    return out
}

function sub(out, a, b) {
    out[0] = a[0] - b[0]
    out[1] = a[1] - b[1]
    out[2] = a[2] - b[2]
    return out
}

function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}


var EPSILON = 0.000001;
var edge1 = [0,0,0];
var edge2 = [0,0,0];
var tvec = [0,0,0];
var pvec = [0,0,0];
var qvec = [0,0,0];


function intersectTriangle(out, pt, dir, tri, b) {
    sub(edge1, tri[1], tri[0]);
    sub(edge2, tri[2], tri[0]);
    
    cross(pvec, dir, edge2);
    var det = dot(edge1, pvec);
    
    if (det < EPSILON) return null;
    sub(tvec, pt, tri[0]);
    var u = dot(tvec, pvec);

    if (b) {
        if (u <= 0 || u >= det) return null;
    } else {
        if (u < 0 || u > det) return null;
    }

    cross(qvec, tvec, edge1);
    var v = dot(dir, qvec);

    if (b) {
        if (v <= 0 || u + v >= det) return null;
    } else {
        if (v < 0 || u + v > det) return null;
    }

    var t = dot(edge2, qvec) / det;
    out[0] = pt[0] + t * dir[0];
    out[1] = pt[1] + t * dir[1];
    out[2] = pt[2] + t * dir[2];
    return out;
}

export class GronTriangle  {
    constructor() {
        this.type="GronTriangle";
		var self=this;


        this.t=[{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];
        this.t1=[{x:0,y:0,z:0},{x:0,y:0,z:0},{x:0,y:0,z:0}];


        this.rezult=false;
        this.point={x:0,y:0,z:0}
		this.point1={x:0,y:0,z:0}

        this.arrPCesh=[{x:0,y:0,z:0},{x:0,y:0,z:0}]
        this.arrPoint=[]

        var r=null
        this.setT=function(t,t1){
            if(t)this.t=t;
            if(t1)this.t1=t1;

            this.arrPoint.length=0;
            this.setTriangle(this.t[0],this.t[1],this.t[2])
            for (var i = 0; i < this.t1.length; i++) {
                if(i==0)r=this.isIntersect(this.t1[0],this.t1[1],true)
                if(i==1)r=this.isIntersect(this.t1[1],this.t1[2],true)
                if(i==2)r=this.isIntersect(this.t1[2],this.t1[0],true)
                /*  if(i==0)r=this.isIntersect(this.t1[1],this.t1[0],true)
                if(i==1)r=this.isIntersect(this.t1[2],this.t1[1],true)
                if(i==2)r=this.isIntersect(this.t1[0],this.t1[2],true)*/   
                if(r!==null){ 
               

                    this.arrPoint[this.arrPoint.length]=this.arrPCesh[this.arrPoint.length];
                    this.arrPoint[this.arrPoint.length-1].x=r[0]
                    this.arrPoint[this.arrPoint.length-1].y=r[1]
                    this.arrPoint[this.arrPoint.length-1].z=r[2]
                
                    if(this.arrPoint.length==2) return this.arrPoint
                }                
            }
            this.setTriangle(this.t1[0],this.t1[1],this.t1[2])
            for (var i = 0; i < this.t.length; i++) {
                // r=this.isIntersect(this.t[i],this.t[(i+1)%3])

                if(i==0)r=this.isIntersect(this.t[0],this.t[1],true)
                if(i==1)r=this.isIntersect(this.t[1],this.t[2],true)
                if(i==2)r=this.isIntersect(this.t[2],this.t[0],true)

                if(r!==null){                
                    this.arrPoint[this.arrPoint.length]=this.arrPCesh[this.arrPoint.length];
                    this.arrPoint[this.arrPoint.length-1].x=r[0]
                    this.arrPoint[this.arrPoint.length-1].y=r[1]
                    this.arrPoint[this.arrPoint.length-1].z=r[2]
                
                    if(this.arrPoint.length==2) return this.arrPoint;
                }                
            }
            return null
        }

        this.tria = [[10,0,0],[0,10,0],[0,0,10]];

        this.tri = []
        this.pt = []                                           // точка начала луча
        this.dir = []  

        this.upDate=function(t,t1){}

        this.setTriangle = function(p, p1, p2){
            if(p.x!=undefined){
                this.tria[0][0] = p.x;
                this.tria[0][1] = p.y;
                this.tria[0][2] = p.z;

                this.tria[1][0] = p1.x;
                this.tria[1][1] = p1.y;
                this.tria[1][2] = p1.z;

                this.tria[2][0] = p2.x;
                this.tria[2][1] = p2.y;
                this.tria[2][2] = p2.z;
            }else{
                this.tria[0] = p;
                this.tria[1] = p1;
                this.tria[2] = p2; 
            }
        }

        var out
        var pt = new THREE.Vector3()
        var dir = new THREE.Vector3()
        var dd,dd1
        var rezVect = new THREE.Vector3()
        this.isIntersect = function(p, p1, b, b1){
          
            dd=Math.sqrt(Math.pow((p1.x-p.x), 2) + Math.pow((p1.y-p.y), 2) + Math.pow((p1.z - p.z), 2))
            pt.set(p.x, p.y, p.z);
            dir.set(p1.x, p1.y, p1.z);
            dir.sub(pt).normalize();
            b=false;

            out = intersectTriangle([], Object.values(pt), Object.values(dir), this.tria, b)
            if (out != null) {
                rezVect.set(out[0],out[1],out[2])
                dd1=Math.sqrt(Math.pow((p.x - rezVect.x), 2) + Math.pow((p.y - rezVect.y), 2) + Math.pow((p.z - rezVect.z), 2))
                if(dd>dd1){
                    return out;
                }
            }

            if(b1===undefined){
                pt.set(p1.x, p1.y, p1.z);
                dir.set(p.x, p.y, p.z);
                dir.sub(pt).normalize();

                out = intersectTriangle([], Object.values(pt), Object.values(dir), this.tria, b)
                if (out != null) {
                    rezVect.set(out[0],out[1],out[2])
                    dd1=Math.sqrt(Math.pow((p.x - rezVect.x), 2) + Math.pow((p.y - rezVect.y), 2) + Math.pow((p.z - rezVect.z), 2))
                    if(dd>dd1){
                        return out; 
                    }
                }
            }
            return null;
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




