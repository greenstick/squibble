// Reference: http://blogs.sitepointstatic.com/examples/tech/canvas-curves/curves.js

/*
Point of Curve Prototype
*/

var Point = function (args) {
	return typeof args === "object" && Array.isArray(args) === false ? this.__init__(args) : "Error: Invalid arguments object on Point initialization.";
};

Point.prototype = {
	__init__ 		: function (args) {
		var point = this;

		// Run Argument Type Checks & Assign Local References
 		point.context 			= typeof args.context 	=== "object" ? args.context : console.log("Error: No canvas context provided on Point initialization."),
 		point.x 				= typeof args.x 		=== "number" ? args.x 		: 100,
 		point.y 				= typeof args.y 		=== "number" ? args.y 		: 100;
		
		return point;
	}
};

/*
Handle of Curve Prototype
*/

var Handle = function (args) {
	return typeof args === "object" && Array.isArray(args) === false ? this.__init__(args) : "Error: Invalid arguments object on Handle initialization.";
};

Handle.prototype = {
	__init__ 		: function (args) {
		var handle = this;

		// Run Argument Type Safety Checks & Assign Local References
 		handle.context 			= typeof args.context 	=== "object" ? args.context : console.log("Error: No canvas context provided on Handle initialization."),
 		handle.x 				= typeof args.x 		=== "number" ? args.x 		: 150,
 		handle.y 				= typeof args.y 		=== "number" ? args.y 		: 50,
 		handle.point 			= typeof args.point 	=== "object" ? args.point 	: new Point({}),
 		handle.width 			= typeof args.width		=== "number" ? args.width 	: 1,
 		handle.color 			= typeof args.color		=== "number" ? args.color 	: "rgba(0, 0, 0, 0.3)";
		
		// Generate Handle
		handle.generate();

		return handle;
	},

	generate 		: function (args) {
		var handle = this;
		
		// Set Handle Context Arguments & Generate Handle Lines
		handle.context.lineWidth 	= handle.width;
		handle.context.strokeStyle 	= handle.color;
		handle.context.beginPath();
		handle.context.moveTo(handle.point.x, handle.point.y);
		handle.context.lineTo(handle.x, handle.y);
		handle.context.stroke();

		return handle;
	}
};

/*
Curve Prototype
*/

 var Curve = function (args) {
 	return typeof args === "object" && Array.isArray(args) === false ? this.__init__(args) : "Error: Invalid arguments object on Curve initialization.";
 };

 Curve.prototype = {
 	__init__ 		: function (args) {
 		var curve = this;

 		// Run Argument Type Checks & Assign Local References
 		curve.context 			= typeof args.context 	=== "object" ? args.context : console.log("Error: No canvas context provided on Curve initialization."),
 		curve.layer 			= typeof args.layer 	=== "object" ? args.layer 	: console.log("Error: No layer object provided on Curve initialization."),
 		curve.parent 			= typeof args.parent  	=== "string" ? args.parent 	: ".layer",
 		curve.pointA 			= typeof args.pointA 	=== "object" ? args.pointA 	: {x: 100, y: 250},
 		curve.pointB 			= typeof args.pointB 	=== "object" ? args.pointB	: {x: 300, y: 250},
 		curve.handleA 			= typeof args.handleA 	=== "object" ? args.handleA : {x: 150, y: 150},
 		curve.handleB 			= typeof args.handleB 	=== "object" ? args.handleB : {x: 250, y: 150};
 		curve.style 			= typeof args.style 	=== "object" ? args.style 	: {};

 		// Populate Curve Style Object
 		curve.style.lineCap 	= typeof curve.style.lineCap 	=== "string" ? curve.style.lineCap 		: "round",
 		curve.style.lineJoin 	= typeof curve.style.lineJoin 	=== "string" ? curve.style.lineJoin 	: "round",
 		curve.style.lineWidth 	= typeof curve.style.lineWidth 	=== "number" ? curve.style.lineWidth	: 2,
 		curve.style.color 		= typeof curve.style.color 		=== "string" ? curve.style.color		: "#333",
 		curve.style.stroke 		= typeof curve.style.stroke 	=== "number" ? curve.style.stroke 		: 1,
 		curve.style.fill 		= typeof curve.style.fill 		=== "string" ? curve.style.fill 		: "rgba(0, 0, 0, 0.5)",
 		curve.style.radius 		= typeof curve.style.radius 	=== "number" ? curve.style.radius 		: 5,
 		curve.style.width 		= typeof curve.style.width 		=== "number" ? curve.style.width 		: 2;


 		// Bind Events
 		curve.layer.onmousedown = curve.dragStart;
		curve.layer.onmousemove = curve.dragging;
		curve.layer.onmousup 	= curve.dragEnd;
		curve.layer.onmouseout 	= curve.dragEnd;

		 // Additional References// Setup References
		curve.arcA 				= 0,
		curve.arcB 				= 2 * Math.PI,
 		curve.selectedPoint,
 		curve.deltaPoint;

 		// Generate Curve
 		curve.generate();

 		return curve;
 	},

 	// Generate Curve Object
 	generate 		: function () {
 		var curve = this;

 		// Clear Curve
 		curve.context.clearRect(0, 0, curve.layer.width, curve.layer.height);

 		// Generate Points
 		curve.points 			= {

 			a : new Point({
 				context 	: curve.context,
 				x 			: curve.pointA.x,
 				y 			: curve.pointA.y,
 				width 		: curve.style.width,
 				color 		: curve.style.color,
 				radius 		: curve.style.radius
 			}),

 			b : new Point({
 				context 	: curve.context,
 				x 			: curve.pointB.x,
 				y 			: curve.pointB.y,
 				width 		: curve.style.width,
 				color 		: curve.style.color,
 				radius 		: curve.style.radius
 			})

 		},

 		// Generate Handles
 		curve.handles 			= {

 			a : new Handle({
 				context 	: curve.context,
 				x 			: curve.handleA.x,
 				y 			: curve.handleA.y,
 				point 		: curve.points.a,
 				width 		: curve.style.width,
 				color 		: curve.style.color
 			}),

 			b : new Handle({
 				context 	: curve.context,
 				x 			: curve.handleB.x,
 				y 			: curve.handleB.y,
 				point 		: curve.points.b,
 				width 		: curve.style.width,
 				color 		: curve.style.color
 			})

 		};

 		// Generate Curve
		curve.context.lineWidth 	= curve.style.lineWidth;
		curve.context.strokeStyle 	= curve.style.color;
		curve.context.beginPath();
		curve.context.moveTo(curve.points.a.x, curve.points.a.y);
		curve.context.bezierCurveTo(curve.handles.a.x, curve.handles.a.y, curve.handles.b.x, curve.handles.b.y, curve.points.b.x, curve.points.b.y);
		curve.context.stroke();

		// Generate Points
		for (var point in curve.points) {
			if (Object.hasOwnProperty(point)) {

				curve.context.lineWidth 	= curve.style.width;
				curve.context.strokeStyle 	= curve.style.color;
				curve.context.fillStyle 	= curve.style.fill;
				curve.context.beginPath();
				curve.context.arc(curve.points[point].x, curve.points[point].y, curve.style.radius, curve.arcA, curve.arcB, true);
				curve.context.fill();
				curve.context.stroke();

			}
		}

		return curve;
    },

    dragStart 		: function (e) {

    	console.log("Drag Start");

    	var curve = this,
    	 	e = e ? e : window.event,
    		dx, dy;

    	for (var point in curve.points) {
    		dx = curve.points[point].x - (e.pageX - curve.layer.offsetLeft);
    		dy = curve.points[point].y - (e.pageY - curve.layer.offsetTop);
    		if ((dx * dx) + (dy * dy) < curve.style.radius * curve.style.radius) {
    			curve.selectedPoint = point,
    			curve.deltaPoint = e,
    			curve.layer.style.cursor = "move"
    			return;
    		}
    	}

    	return curve;
    },

    dragging 		: function (e) {

    	console.log("Dragging");

    	var curve = this;

    	if (curve.selectedPoint && curve.deltaPoint) {
    		var e = e ? e : window.event;
    		curve.points[curve.selectedPoint].x += (e.pageX - curve.layer.offsetLeft) - curve.deltaPoint.x;
    		curve.points[curve.selectedPoint].y += (e.pageY - curve.layer.offsetTop) - curve.deltaPoint.y;
    		curve.deltaPoint = e;
    		curve.generate();
    	} 

    	return curve;
    },

    dragEnd 		: function (e) {

    	console.log("Drag End");

    	var curve = this;

    	curve.selectedPoint = null;
    	curve.layer.style.cursor = "default";
    	curve.generate();

    	return curve;
    }
}

// 	// start dragging
// 	function DragStart(e) {
// 		e = MousePos(e);
// 		var dx, dy;
// 		for (var p in point) {
// 			dx = point[p].x - e.x;
// 			dy = point[p].y - e.y;
// 			if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
// 				drag = p;
// 				dPoint = e;
// 				canvas.style.cursor = "move";
// 				return;
// 			}
// 		}
// 	}
	
	
// 	// dragging
// 	function Dragging(e) {
// 		if (drag) {
// 			e = MousePos(e);
// 			point[drag].x += e.x - dPoint.x;
// 			point[drag].y += e.y - dPoint.y;
// 			dPoint = e;
// 			DrawCanvas();
// 		}
// 	}
	
	
// 	// end dragging
// 	function DragEnd(e) {
// 		drag = null;
// 		canvas.style.cursor = "default";
// 		DrawCanvas();
// 	}

	
// 	// event parser
// 	function MousePos(event) {
// 		event = (event ? event : window.event);
// 		return {
// 			x: event.pageX - canvas.offsetLeft,
// 			y: event.pageY - canvas.offsetTop
// 		}



// function() {

// 	var canvas, ctx, code, point, style, drag = null, dPoint;

// 	// define initial points
// 	function Init(quadratic) {

// 		point = {
// 			p1: { x:100, y:250 },
// 			p2: { x:400, y:250 }
// 		};
		
// 		if (quadratic) {
// 			point.cp1 = { x: 250, y: 100 };
// 		}
// 		else {
// 			point.cp1 = { x: 150, y: 100 };
// 			point.cp2 = { x: 350, y: 100 };
// 		}
		
// 		// default styles
// 		style = {
// 			curve:	{ width: 6, color: "#333" },
// 			cpline:	{ width: 1, color: "#C00" },
// 			point: { radius: 10, width: 2, color: "#900", fill: "rgba(200,200,200,0.5)", arc1: 0, arc2: 2 * Math.PI }
// 		}
		
// 		// line style defaults
// 		ctx.lineCap = "round";
// 		ctx.lineJoin = "round";

// 		// event handlers
// 		canvas.onmousedown = DragStart;
// 		canvas.onmousemove = Dragging;
// 		canvas.onmouseup = canvas.onmouseout = DragEnd;
		
// 		DrawCanvas();
// 	}
	
	
// 	// draw canvas
// 	function DrawCanvas() {
// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
// 		// control lines
// 		ctx.lineWidth = style.cpline.width;
// 		ctx.strokeStyle = style.cpline.color;
// 		ctx.beginPath();
// 		ctx.moveTo(point.p1.x, point.p1.y);
// 		ctx.lineTo(point.cp1.x, point.cp1.y);
// 		if (point.cp2) {
// 			ctx.moveTo(point.p2.x, point.p2.y);
// 			ctx.lineTo(point.cp2.x, point.cp2.y);
// 		}
// 		else {
// 			ctx.lineTo(point.p2.x, point.p2.y);
// 		}
// 		ctx.stroke();
		
// 		// curve
// 		ctx.lineWidth = style.curve.width;
// 		ctx.strokeStyle = style.curve.color;
// 		ctx.beginPath();
// 		ctx.moveTo(point.p1.x, point.p1.y);
// 		if (point.cp2) {
// 			ctx.bezierCurveTo(point.cp1.x, point.cp1.y, point.cp2.x, point.cp2.y, point.p2.x, point.p2.y);
// 		}
// 		else {
// 			ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y);
// 		}
// 		ctx.stroke();

// 		// control points ******** FROM HERE *******
// 		for (var p in point) {
// 			ctx.lineWidth = style.point.width;
// 			ctx.strokeStyle = style.point.color;
// 			ctx.fillStyle = style.point.fill;
// 			ctx.beginPath();
// 			ctx.arc(point[p].x, point[p].y, style.point.radius, style.point.arc1, style.point.arc2, true);
// 			ctx.fill();
// 			ctx.stroke();
// 		}
		
// 		ShowCode();
// 	}
	
	
// 	// show canvas code
// 	function ShowCode() {
// 		if (code) {
// 			code.firstChild.nodeValue = 
// 				"canvas = document.getElementById(\"canvas\");\n"+
// 				"ctx = canvas.getContext(\"2d\")\n"+
// 				"ctx.lineWidth = " + style.curve.width +
// 				";\nctx.strokeStyle = \"" + style.curve.color +
// 				"\";\nctx.beginPath();\n" +
// 				"ctx.moveTo(" + point.p1.x + ", " + point.p1.y +");\n" +
// 				(point.cp2 ? 
// 					"ctx.bezierCurveTo("+point.cp1.x+", "+point.cp1.y+", "+point.cp2.x+", "+point.cp2.y+", "+point.p2.x+", "+point.p2.y+");" :
// 					"ctx.quadraticCurveTo("+point.cp1.x+", "+point.cp1.y+", "+point.p2.x+", "+point.p2.y+");"
// 				) +
// 				"\nctx.stroke();"
// 			;
// 		}
// 	}
	
	
// 	// start dragging
// 	function DragStart(e) {
// 		e = MousePos(e);
// 		var dx, dy;
// 		for (var p in point) {
// 			dx = point[p].x - e.x;
// 			dy = point[p].y - e.y;
// 			if ((dx * dx) + (dy * dy) < style.point.radius * style.point.radius) {
// 				drag = p;
// 				dPoint = e;
// 				canvas.style.cursor = "move";
// 				return;
// 			}
// 		}
// 	}
	
	
// 	// dragging
// 	function Dragging(e) {
// 		if (drag) {
// 			e = MousePos(e);
// 			point[drag].x += e.x - dPoint.x;
// 			point[drag].y += e.y - dPoint.y;
// 			dPoint = e;
// 			DrawCanvas();
// 		}
// 	}
	
	
// 	// end dragging
// 	function DragEnd(e) {
// 		drag = null;
// 		canvas.style.cursor = "default";
// 		DrawCanvas();
// 	}

	
// 	// event parser
// 	function MousePos(event) {
// 		event = (event ? event : window.event);
// 		return {
// 			x: event.pageX - canvas.offsetLeft,
// 			y: event.pageY - canvas.offsetTop
// 		}
// 	}
	
	
// 	// start
// 	canvas = document.getElementById("canvas");
// 	code = document.getElementById("code");
// 	if (canvas.getContext) {
// 		ctx = canvas.getContext("2d");
// 		Init(canvas.className == "quadratic");
// 	}
	
// }

