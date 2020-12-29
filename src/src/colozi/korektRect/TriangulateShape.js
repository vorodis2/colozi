/** @module unility */
/**
* Для сегментирования (триангуляции) фигуры 2d
* на start кидаем контур фигуры, после считываем arrPosition до lengthPosition, и arrUV до lengthUV
* @class
*/

import { Calc, Position } from './Calc.js';

export function TriangulateShape () {
	var self = this;
	/**
	* сегмент рект для сегментации
	* width, height - размер сегмента
	* x, y -  -1...1 сдвиг сегмента
	* @member {Rectangle}
	*/
	this.segment = {x: 0.5, y: 0.5, width: 100, height: 100, rotation: 0};

	this.arrPoint = []; // текущий масив точек(контур обход фигуры)
	this.arrTriangle = []; // маленькие триугольники
	this.arrTriangleBig = []; // большые триугольники от шейпа
	this.arrPosition = []; // позиции
	this.arrUV = []; // ув
	// this.arrIndices = [];       // индекс
	this.lengthUV = 0; // до этого значения нужно считывать увешки
	this.lengthPosition = 0; // до этого значения нужно считывать позишыны
	this.lengthTriangle = 0;

	this.centerShape = new PointT(); // центр масы фигуры
	this.areaShape = 0; // площадь фигуры
	this.boolBig=true

	// для расчетов мин макса и сентра(меняется)
	this._bound = {min: new PointT(), max: new PointT(), center: new PointT()};

	// для сегментации триугольников
	var p = new PointT();
	var p1 = new PointT();
	var intersect;
	var recta = [0, 0, this.segment.width, this.segment.height];
	var arrPointBuff = [new PointT(), new PointT(), new PointT(), new PointT(), new PointT(), new PointT(), new PointT(), new PointT(), new PointT()];
	var countPointInTriangleSegment = 0;
	var arrTri, bound, startX, startY, finishX, finishY;
	// ---
	var pointUv = new PointT();// для генерации ув


	
	var calc=new Calc();
	

	/**
	* Триангулировать и сегментировать контур после считываем arrPosition до lengthPosition, и arrUV до lengthUV
	* @param {Array<Position>} contour - масив точек, обход
	*/
	this.start = function (contour) {
		self.lengthUV = 0;
		self.lengthTriangle = 0;
		self.lengthPosition = 0;

		var arrPointContour = [];
		for (var i = 0; i < contour.length; i++) {
			arrPointContour.push(new PointT(contour[i].x, contour[i].y, contour[i].z));
		}

		if (this.segment.rotation !== 0) {
			for (var i = 0; i < arrPointContour.length; i++) {
				calc.rotationPoint(arrPointContour[i], -this.segment.rotation);
			}
		}

		self.arrPoint = arrPointContour;
		self.areaShape = self.area(self.arrPoint);
		if (!self.areaShape) return;
		
		self.getCenterShape();
		if(self.boolBig==false) return;

		for (var i = 0; i < self.arrTriangleBig.length; i++) {
			self.segmentationTriangle(self.arrTriangleBig[i]);
		}


		if (this.segment.rotation !== 0) {
			var pt = new PointT();
			for (var i = 0; i < self.arrPosition.length; i += 3) {
				pt.set(self.arrPosition[i], self.arrPosition[i + 1]);
				calc.rotationPoint(pt, this.segment.rotation);
				self.arrPosition[i] = pt.x;
				self.arrPosition[i + 1] = pt.y;
			}
		}
		// for (i = 0; i < self.arrPosition.length / 2; i++) {
		//     self.arrIndices[i] = i;
		// }
		// self.arrIndices.length = Math.floor(self.arrPosition.length / 2);

	};

	this.getCenterShape = function (arrPoint) {
		self.arrPoint = arrPoint || self.arrPoint;
		self.arrTriangleBig.length = 0;
		self.arrTriangleBig = self.triangulate(self.arrPoint);
		self.updateCenterShape();
	};

	this.updateCenterShape = function () {
		var maxArea = 0;
		var ar = 0;
		self.centerShape.set(0, 0);
		var tipShape = self.convex(self.arrPoint);
		if (tipShape === 0 || tipShape === -1) {
			for (var i = 0; i < self.arrTriangleBig.length; i++) {
				ar = self.area(self.arrTriangleBig[i]);
				if (maxArea < ar) {
					maxArea = ar;
					self.centerShape.x = (self.arrTriangleBig[i][0].x + self.arrTriangleBig[i][1].x + self.arrTriangleBig[i][2].x) / 3;
					self.centerShape.y = (self.arrTriangleBig[i][0].y + self.arrTriangleBig[i][1].y + self.arrTriangleBig[i][2].y) / 3;
				}
			}
		} else {
			for (var i = 0; i < self.arrPoint.length; i++) {
				self.centerShape.x += self.arrPoint[i].x;
				self.centerShape.y += self.arrPoint[i].y;
			}
			self.centerShape.x /= self.arrPoint.length;
			self.centerShape.y /= self.arrPoint.length;
		}

	};

	// сегментация триугольника
	this.segmentationTriangle = function (triangle) {
		bound = this.getBound(this.arrPoint);
		startX = ((bound.min.x - (bound.min.x % this.segment.width) - this.segment.width * 2) || 0) + this.segment.x * this.segment.width;
		startY = ((bound.min.y - (bound.min.y % this.segment.height) - this.segment.height * 2) || 0) + this.segment.y * this.segment.height;
		finishX = ((bound.max.x - (bound.max.x % this.segment.width) + this.segment.width * 2) || 500) + this.segment.x * this.segment.width;
		finishY = ((bound.max.y - (bound.max.y % this.segment.height) + this.segment.height * 2) || 500) + this.segment.y * this.segment.height;
		recta[2] = this.segment.width;
		recta[3] = this.segment.height;
		for (var ii = startX; ii < finishX; ii += this.segment.width) {
			for (var jj = startY; jj < finishY; jj += this.segment.height) {
				recta[0] = ii;
				recta[1] = jj;
				arrTri = self.triangulate(self.getArrPointTriangleSegment(triangle, recta), false);

				for (var j = 0; j < arrTri.length; j++) { // проходим по маленьким триугольникам
					self.arrTriangle[self.lengthTriangle++] = (arrTri[j]); // кидаем в масив триугольников

					for (var k = 0; k < arrTri[j].length; k++) { // проходим по верщинам триугольника
						self.generatePointUV(arrTri[j][k], recta); // кидаем ув
						self.arrPosition[self.lengthPosition++] = (arrTri[j][k].x); // кидаем позиции
						self.arrPosition[self.lengthPosition++] = (arrTri[j][k].y); // кидаем позиции
						self.arrPosition[self.lengthPosition++] = (0); // кидаем позиции
					}
				}
			}
		}
	};

	// получаем точки сегмента триугольника
	this.getArrPointTriangleSegment = function (triangle, rect) {
		var res = arrPointBuff;
		for (var i = 0; i < res.length; i++) {
			res[i].x = res[i].y = Infinity;
		}
		countPointInTriangleSegment = 0;
		for (var i = 0; i < 3; ++i) { // сегментируем триугольник(ребра) с сегментом rect методом пересечений
			p.x = rect[0];
			p.y = rect[1];
			p1.x = rect[0] + rect[2];
			p1.y = rect[1];
			intersect = calc.getPointOfIntersection(p, p1, triangle[i], triangle[(i + 1) % 3]);
			if (intersect) {
				if (!self.inArr(res, intersect)) res[countPointInTriangleSegment++].setPoint(intersect);
			}
			p.x = rect[0] + rect[2];
			p.y = rect[1];
			p1.x = rect[0] + rect[2];
			p1.y = rect[1] + rect[3];
			intersect = calc.getPointOfIntersection(p, p1, triangle[i], triangle[(i + 1) % 3]);
			if (intersect) {
				if (!self.inArr(res, intersect)) res[countPointInTriangleSegment++].setPoint(intersect);
			}
			p.x = rect[0] + rect[2];
			p.y = rect[1] + rect[3];
			p1.x = rect[0];
			p1.y = rect[1] + rect[3];
			intersect = calc.getPointOfIntersection(p, p1, triangle[i], triangle[(i + 1) % 3]);
			if (intersect) {
				if (!self.inArr(res, intersect)) res[countPointInTriangleSegment++].setPoint(intersect);
			}
			p.x = rect[0];
			p.y = rect[1];
			p1.x = rect[0];
			p1.y = rect[1] + rect[3];
			intersect = calc.getPointOfIntersection(p, p1, triangle[i], triangle[(i + 1) % 3]);
			if (intersect) {
				if (!self.inArr(res, intersect)) res[countPointInTriangleSegment++].setPoint(intersect);
			}

			// если нужно добавляем вершыны(точки) треугольника если они в нутри сегмента
			p.x = rect[0];
			p.y = rect[1];
			p1.x = rect[0] + rect[2];
			p1.y = rect[1] + rect[3];
			if (self.pointInSegment(triangle[i], p, p1)) {
				if (!self.inArr(res, triangle[i])) res[countPointInTriangleSegment++].setPoint(triangle[i]);
			}
		}

		// проверяем сегмент если он в нутри триугольника
		p.x = rect[0];
		p.y = rect[1];
		if (calc.isInTriangle(triangle[0], triangle[1], triangle[2], p)) {
			if (!self.inArr(res, p)) res[countPointInTriangleSegment++].setPoint(p);
		}
		p.x = rect[0] + rect[2];
		p.y = rect[1];
		if (calc.isInTriangle(triangle[0], triangle[1], triangle[2], p)) {
			if (!self.inArr(res, p)) res[countPointInTriangleSegment++].setPoint(p);
		}
		p.x = rect[0] + rect[2];
		p.y = rect[1] + rect[3];
		if (calc.isInTriangle(triangle[0], triangle[1], triangle[2], p)) {
			if (!self.inArr(res, p)) res[countPointInTriangleSegment++].setPoint(p);
		}
		p.x = rect[0];
		p.y = rect[1] + rect[3];
		if (calc.isInTriangle(triangle[0], triangle[1], triangle[2], p)) {
			if (!self.inArr(res, p)) res[countPointInTriangleSegment++].setPoint(p);
		}

		res = res.slice(0, countPointInTriangleSegment);
		self.getBound(res);
		res.sort(sortFromAngleContur);
		return res;
	};

	// есть ли точка p уже в масивве arr ?
	this.inArr = function (arr, p) {
		for (var i = 0; i < arr.length; ++i) {
			if (arr[i].x === p.x && arr[i].y === p.y) return true;
		}
		return false;
	};

	// круговая сортировка
	function sortFromAngleContur (a, b) {
		return calc.getAngle(self._bound.center, a) - calc.getAngle(self._bound.center, b);
	}

	// считам минимальные максимальный размеры и центр точек arrPoint
	this.getBound = function (arrPoint) {
		this._bound.min.set(999999, 999999);
		this._bound.max.set(-999999, -999999);
		for (var i = 0; i < arrPoint.length; i++) {
			// if (arrPoint[i].x === Infinity || arrPoint[i].y === Infinity) continue;
			this._bound.min.x = Math.min(this._bound.min.x, arrPoint[i].x);
			this._bound.max.x = Math.max(this._bound.max.x, arrPoint[i].x);
			this._bound.min.y = Math.min(this._bound.min.y, arrPoint[i].y);
			this._bound.max.y = Math.max(this._bound.max.y, arrPoint[i].y);
		}
		this._bound.center.set((this._bound.max.x / 2 + this._bound.min.x / 2), (this._bound.max.y / 2 + this._bound.min.y / 2));
		return this._bound;
	};

	// находится ли точка в диапазоне
	this.pointInSegment = function (point, p, p1) {
		return p.x <= point.x && point.x <= p1.x && p.y <= point.y && point.y <= p1.y;
	};

	// генерация ув
	this.generatePointUV = function (point, rect) {
		if (point.x === rect[0]) pointUv.x = 0;
		else if (point.x === rect[0] + rect[2]) pointUv.x = 1;
		else pointUv.x = (((point.x - rect[0]) % self.segment.width) / self.segment.width);

		if (point.y === rect[1]) pointUv.y = 0;
		else if (point.y === rect[1] + rect[3]) pointUv.y = 1;
		else pointUv.y = (((point.y - rect[1]) % self.segment.height) / self.segment.height);

		self.arrUV[self.lengthUV++] = (pointUv.x);
		self.arrUV[self.lengthUV++] = (pointUv.y);
	};


	/**
	* Является ли полигон в 2D вогнутой или выпуклой
	* @param {Array<Position>} arrPoint - масив точек, обход
	* @return {number} 0 для невычислимое например: коллинеарные точки 1 выпуклые -1 вогнутый
	*/
	this.convex = function (arrPoint) {
		var i, j, k, z, n = arrPoint.length;
		var flag = 0;
		if (n < 3) return 0;
		// Для выпуклого многоугольника все векторные произведения смежных сторон будут одинакового знака,
		// а если это не так, то будет присутствовать и произведение противоположного знака.
		for (i = 0; i < n; i++) {
			j = (i + 1) % n;
			k = (i + 2) % n;
			z = (arrPoint[j].x - arrPoint[i].x) * (arrPoint[k].y - arrPoint[j].y);
			z -= (arrPoint[j].y - arrPoint[i].y) * (arrPoint[k].x - arrPoint[j].x);
			if (z < 0) flag |= 1;
			else if (z > 0) flag |= 2;
			if (flag === 3) return -1;
		}
		if (flag != 0) return 1;
		else return 0;
	};


	/**
	* Площа полигона
	* @param {Array<Position>} contour - масив точек, обход
	* @return {number} Площа
	*/
	this.area = function (contour) {
		var n = contour.length;
		var a = 0.0;
		for (var p = n - 1, q = 0; q < n; p = q++) {
			a += contour[p].x * contour[q].y - contour[q].x * contour[p].y;
		}
		return a * 0.5;
	};

	// вырез
	this.snip = function (contour, u, v, w, n, vertices) {
		var p;
		var ax, ay, bx, by;
		var cx, cy, px, py;
		ax = contour[vertices[u]].x;
		ay = contour[vertices[u]].y;
		bx = contour[vertices[v]].x;
		by = contour[vertices[v]].y;
		cx = contour[vertices[w]].x;
		cy = contour[vertices[w]].y;
		if (Number.EPSILON > (((bx - ax) * (cy - ay)) - ((by - ay) * (cx - ax)))) return false;
		var aX, aY, bX, bY, cX, cY;
		var apx, apy, bpx, bpy, cpx, cpy;
		var cCROSSap, bCROSScp, aCROSSbp;
		aX = cx - bx;
		aY = cy - by;
		bX = ax - cx;
		bY = ay - cy;
		cX = bx - ax;
		cY = by - ay;
		for (p = 0; p < n; p++) {
			px = contour[vertices[p]].x;
			py = contour[vertices[p]].y;
			if (((px === ax) && (py === ay)) ||
				((px === bx) && (py === by)) ||
				((px === cx) && (py === cy))) continue;
			apx = px - ax;
			apy = py - ay;
			bpx = px - bx;
			bpy = py - by;
			cpx = px - cx;
			cpy = py - cy;
			// see if p is inside triangle abc
			aCROSSbp = aX * bpy - aY * bpx;
			cCROSSap = cX * apy - cY * apx;
			bCROSScp = bX * cpy - bY * cpx;
			if ((aCROSSbp >= -Number.EPSILON) && (bCROSScp >= -Number.EPSILON) && (cCROSSap >= -Number.EPSILON)) return false;
		}
		return true;
	};

	// триангуляция контура
	this.triangulate = function (contour, indices) {
		var n = contour.length;
		if (n < 3) return [];
		var result = [],
			vertices = [],
			verticesIndices = [];
		/* we want a counter-clockwise polygon in verts */
		var u, v, w;
		if (self.area(contour) > 0.0) {
			for (v = 0; v < n; v++) vertices[v] = v;
		} else {
			for (v = 0; v < n; v++) vertices[v] = (n - 1) - v;
		}
		var nv = n;
		/*  remove nv - 2 vertices, creating 1 triangle every time */
		var count = 2 * nv;
		/* error detection */
		for (v = nv - 1; nv > 2;) {
			/* if we loop, it is probably a non-simple polygon */
			if ((count--) <= 0) {
				//* * Triangulate: ERROR - probable bad polygon!
				// console.warn('  Unable to triangulate polygon! in triangulate()');
				if (indices) return verticesIndices;
				return result;
			}
			/*  consecutive vertices in current polygon, <u,v,w> */
			u = v;
			if (nv <= u) u = 0;
			/* previous */
			v = u + 1;
			if (nv <= v) v = 0;
			/* new v    */
			w = v + 1;
			if (nv <= w) w = 0;
			/* next     */
			if (self.snip(contour, u, v, w, nv, vertices)) {
				var a, b, c, s, t;
				/* true names of the vertices */
				a = vertices[u];
				b = vertices[v];
				c = vertices[w];
				/* output Triangle */
				result.push([contour[a], contour[b], contour[c]]);
				verticesIndices.push([vertices[u], vertices[v], vertices[w]]);
				/* remove v from the remaining polygon */
				for (s = v, t = v + 1; t < nv; s++, t++) {
					vertices[s] = vertices[t];
				}
				nv--;
				/* reset error detection counter */
				count = 2 * nv;
			}
		}
		if (indices) return verticesIndices;
		return result;
	};


}

function PointT (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}
PointT.prototype.set = function (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
};
PointT.prototype.setPoint = function (p) {
	this.x = p.x;
	this.y = p.y;
	this.z = p.z;
};
