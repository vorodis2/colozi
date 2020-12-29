

export class SpDebug3D  {
    constructor(c3,link) {
    	this.type="SpDebug3D";
    	var self=this;
    	this.cont3d=new THREE.Object3D();
    	c3.add(this.cont3d)


    	this.texture = new THREE.TextureLoader().load('resources/image/pic.png');  
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.RepeatWrapping;
        this.texture.repeat.y=-1

        this.gBox=new THREE.BoxBufferGeometry( 1, 1, 1 )
        this.gSphere=new THREE.SphereBufferGeometry( 1, 32, 32 );


        var objMat={}
        objMat.r = new THREE.MeshBasicMaterial( { color: 0xff0000, map:this.texture });
        objMat.g = new THREE.MeshBasicMaterial( { color: 0x00ff00, map:this.texture });
        objMat.b = new THREE.MeshBasicMaterial( { color: 0x0000ff, map:this.texture });


        var objLine={} 
		objLine.r = new THREE.LineSegments(new PlaneXZSSS(),new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 10}))
		objLine.g = new THREE.LineSegments(new PlaneXZSSS(),new THREE.LineBasicMaterial( { color: 0x00ff00, linewidth: 10}))
		objLine.b = new THREE.LineSegments(new PlaneXZSSS(),new THREE.LineBasicMaterial( { color: 0x0000ff, linewidth: 10}))
                 
        
        this.cont3d.add(objLine.r);
        this.cont3d.add(objLine.g);
        this.cont3d.add(objLine.b);



        this.arrPoint=[]
        var sahP=0
        var point
        this.getPoint = function (r, rgb) {
        	if(this.arrPoint[sahP]==undefined){
        		this.arrPoint[sahP]=new THREE.Mesh(this.gSphere, objMat.r)
        		this.cont3d.add(this.arrPoint[sahP])
        	}
        	sahP++;	
        	return this.arrPoint[sahP-1];
        }        

        var mat
        this.setPoint = function (p, r, rgb) {
        	point=this.getPoint()
        	mat=objMat.r
        	if(objMat[rgb]!=undefined)mat=objMat[rgb]
        		
        	if(point.material.uuid!=mat.uuid)point.material=mat
        	point.position.set(p.x,p.y,p.z);
        	point.scale.set(r,r,r)	
            point.visible=true		
		};


		this.arrBox=[]
        var sahB=0 
        this.getBox = function (r, rgb) {
        	if(this.arrBox[sahB]==undefined){
        		var m=new THREE.Mesh(this.gBox, objMat.r)
        		this.arrBox[sahB]=new THREE.Object3D()
        		this.arrBox[sahB].add(m)

        		this.cont3d.add(this.arrBox[sahB])
        	}
        	sahB++;	
        	return this.arrBox[sahB-1];
        }



        var line
        var vector=new THREE.Vector3()
        var vector1=new THREE.Vector3()
        this.setLine = function (p,p1,  rgb) {
        	

        	line=objLine.r
        	if(objLine[rgb]!=undefined)line=objLine[rgb];

        	line.geometry.addLine(p,p1)

        	/*point=this.getBox()       	
        	dist=this.getDist3D(p,p1)
        	point.position.set(p.x,p.y,p.z);

        	point.children[0].scale.set(dist,r,r)	
        	point.children[0].position.set(dist/2,0,0)	
			mat=objMat.r
        	if(objMat[rgb]!=undefined)mat=objMat[rgb]        		
        	if(point.children[0].uuid!=mat.uuid)point.children[0].material=mat

        	//vector.set(p1.x, p1.y, p1.z)*/

        	//point.lookAt( vector);

		};





		this.getDist3D = function (p1, p2) {
            return Math.sqrt(Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2) + Math.pow((p1.z - p2.z), 2))      
        };

        this.upDate = function () {
        	objLine.r.geometry.upDate()
        	objLine.g.geometry.upDate()
        	objLine.b.geometry.upDate()
        }

		this.clear = function () {
			sahP=0;
			for (var i = 0; i < this.arrPoint.length; i++) {
				this.arrPoint[i].visible=false
			}
			sahB=0;
			for (var i = 0; i < this.arrBox.length; i++) {
				this.arrBox[i].visible=false
			}	

			objLine.r.geometry.clear()
			
			objLine.g.geometry.clear()
			objLine.b.geometry.clear()				
		};

    }

}



export class PlaneXZSSS extends THREE.BufferGeometry {

    constructor( ) {

        super();

        // var indices = [];
        var vertices = [];
        this.upNull=function(){
            
            var wh=0.5;
            vertices.push(-wh,-wh,0);
            vertices.push(-wh,-wh,0);
            vertices.push(-wh, wh,0);

            vertices.push(-wh,-wh,0);
            vertices.push(-wh,-wh,0);
            vertices.push(wh,-wh,0);

            vertices.push(wh,-wh,0);
            vertices.push(wh,wh,0);
            vertices.push(wh,wh,0);

            vertices.push(-wh,wh,0);
            vertices.push(-wh,wh,0);
            vertices.push(wh,wh,0); 
            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

           /* this.computeBoundingBox();
            this.computeBoundingSphere();
            this.computeVertexNormals();*/
        }

        this.upNull();

        this.clearPoint=function(){
            this.array.length=0;
        }

        this.array=[]
        this.addLine=function(p,p1){
            this.array.push(p,p1)
        }

        this.clear=function(p){
            this.array.length=0;
            vertices.length=0;
            normal.length=0;
            uv.length=0;
        }

        this.addTri=function(p,p1,p2, n,n1,n2,u,u1){           
            vertices.push(p.x,p.y,p.z);
            vertices.push(p1.x,p1.y,p1.z);
            vertices.push(p2.x,p2.y,p2.z);

            if(n){
                normal.push(n.x,n.y,n.z);
                normal.push(n1.x,n1.y,n1.z);
                normal.push(n2.x,n2.y,n2.z);

                uv.push(u.x,u.y);
                uv.push(u1.x,u1.y);
            }
        }


        var uv = [];
        var normal = [];
        var w,h
        this.redrag=function(bNirm){
            if(bNirm==undefined){
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            }else{               
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
                this.computeBoundingBox();
                this.computeBoundingSphere();

                if(uv.length==0){
                    w=this.boundingBox.max.x-this.boundingBox.min.x;
                    h=this.boundingBox.max.y-this.boundingBox.min.y;                   
                    for (var i = 0; i < vertices.length; i+=3) {
                        normal.push(bNirm.x,bNirm.y,bNirm.z);
                        uv.push(
                            (vertices[i]-this.boundingBox.min.x)/w,
                            (vertices[i+1]-this.boundingBox.min.y)/h
                        )
                    }
                    this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                    this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) ); 
                }else{
                    this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                    this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) ); 
                }
                        
                
            }
            
           /* this.computeBoundingBox();
            this.computeBoundingSphere();
            this.computeVertexNormals();*/
        }


        this.redrag1=function(){
            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );   

           /*if(bNirm==undefined){
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
            }else{               
                this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
                this.computeBoundingBox();
                this.computeBoundingSphere();

                w=this.boundingBox.max.x-this.boundingBox.min.x;
                h=this.boundingBox.max.y-this.boundingBox.min.y;
                uv.length=0;
                normal.length=0;
                for (var i = 0; i < vertices.length; i+=3) {
                    normal.push(bNirm.x,bNirm.y,bNirm.z);
                    // uv.push(
                    //     (vertices[i]-this.boundingBox.min.x)/w,
                    //     (vertices[i+1]-this.boundingBox.min.y)/h
                    // )
                }
                this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normal, 3 ) ); 
                this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uv, 2 ) );         
            }*/
        }

        
        this.upDate=function(){
            if(this.array.length==0){
                this.upNull();
            }
            vertices.length=0;
           // trace(this.array.length+"   ",this.array)
            for (var i = 0; i < this.array.length; i+=2) {                
                
                
               
                vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
                vertices.push(this.array[i+1].x,this.array[i+1].y,this.array[i+1].z);
                //vertices.push(this.array[i].x,this.array[i].y,this.array[i].z);
                
                
                // indices.push(i+1, i+1, i);
            }

            // var rr=1
            // for (var i = 0; i < vertices.length; i+=9) { 
            //     indices.push((i+0)*rr,(i+1)*rr,(i+2)*rr);
            // } 
            // indices=[0*rr,1*rr,2*rr,3*rr,4*rr,5*rr]   

            // //this.setIndex( indices );
            // trace(vertices)
            // trace(indices)

            this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

            this.computeBoundingBox();
            this.computeBoundingSphere();

        }    

    }

}




