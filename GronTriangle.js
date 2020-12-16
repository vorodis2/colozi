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


function intersectTriangle(out, pt, dir, tri) {
    sub(edge1, tri[1], tri[0]);
    sub(edge2, tri[2], tri[0]);
    
    cross(pvec, dir, edge2);
    var det = dot(edge1, pvec);
    
    if (det < EPSILON) return null;
    sub(tvec, pt, tri[0]);
    var u = dot(tvec, pvec);
    if (u < 0 || u > det) return null;
    cross(qvec, tvec, edge1);
    var v = dot(dir, qvec);
    if (v < 0 || u + v > det) return null;
    
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

        this.setT=function(t,t1){
            this.t=t;
            this.t1=t1;            
        }

        this.tria = [];

        this.tri = []
        this.pt = []                                           // точка начала луча
        this.dir = []  

        this.upDate=function(t,t1){   

            this.setTriangle(
                [this.t[0].x, this.t[0].y, this.t[0].z],
                [this.t[1].x, this.t[1].y, this.t[1].z],
                [this.t[2].x, this.t[2].y, this.t[2].z],
            )

            this.out = this.isIntersect(this.t1[0], this.t1[1])
            console.log(this.out)
            


            this.tri = [[this.t[0].x,this.t[0].y,this.t[0].z],[this.t[1].x,this.t[1].y,this.t[1].z],[this.t[2].x,this.t[2].y,this.t[2].z]]   // заполнить точками триугольника
            this.pt = new THREE.Vector3(this.t1[0].x, this.t1[0].y, this.t1[0].z) 
            var pp=new THREE.Vector3(this.t1[1].x, this.t1[1].y, this.t1[1].z) 
            this.dir = pp.sub(this.pt).normalize();
        }

        this.setTriangle = function(p, p1, p2){
            this.tria[0] = p;
            this.tria[1] = p1;
            this.tria[2] = p2;
        }

        var out
        var pt = new THREE.Vector3()
        var dir = new THREE.Vector3()
        this.isIntersect = function(p, p1){
            pt.set(p.x, p.y, p.z);
            dir.set(p1.x, p1.y, p1.z);
            dir.sub(pt).normalize();

            out = intersectTriangle([], Object.values(pt), Object.values(dir), this.tria)

            if (out != null) return out;
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




