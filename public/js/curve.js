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
 		point.context 			= typeof args.context 		=== "object" ? args.context 	: console.log("Error: No canvas context provided on Point initialization."),
 		point.x 				= typeof args.x 			=== "number" ? args.x 			: 100,
 		point.y 				= typeof args.y 			=== "number" ? args.y 			: 100,
 		point.radius 			= typeof args.radius 		=== "number" ? args.radius 		: 6,
 		point.fill 				= typeof args.fill 			=== "string" ? args.fill 		: "rgba(0, 0, 0, 1)",
 		point.strokeStyle 		= typeof args.strokeStyle 	=== "string" ? args.strokeStyle : "rgba(0, 0, 0, 1)",
 		point.strokeWidth 		= typeof args.strokeWidth 	=== "number" ? args.strokeWidth : 2;
		
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
 		handle.context 			= typeof args.context 		=== "object" ? args.context 	: console.log("Error: No canvas context provided on Handle initialization."),
 		handle.x 				= typeof args.x 			=== "number" ? args.x 			: 150,
 		handle.y 				= typeof args.y 			=== "number" ? args.y 			: 50,
 		handle.radius 			= typeof args.radius 		=== "number" ? args.radius 		: 10,
 		handle.strokeStyle 		= typeof args.strokeStyle 	=== "string" ? args.strokeStyle : "rgba(255, 0, 0, 1)",
 		handle.strokeWidth 		= typeof args.strokeWidth 	=== "number" ? args.strokeWidth : 1,
 		handle.fill 			= typeof args.fill			=== "number" ? args.fill 		: "rgba(255, 0, 0, .3)",
 		handle.point 			= typeof args.point 		=== "object" ? args.point 		: new Point({}),
 		handle.autogen 			= typeof args.autogen 		=== "bool" 	 ? args.autogen 	: true;
		
		// Generate Handle on Initialization
		if (handle.autogen) {
			handle.generate();
		}

		return handle;
	},

	generate 		: function () {
		var handle = this;

		// Set Handle Context Arguments & Generate Handle Lines
		handle.context.lineWidth 	= handle.strokeWidth;
		handle.context.strokeStyle 	= handle.strokeStyle;
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
 		curve.context 			= typeof args.context 				=== "object" ? args.context 			: console.log("Error: No canvas context provided on Curve initialization."),
 		curve.layer 			= typeof args.layer 				=== "object" ? args.layer 				: console.log("Error: No layer object provided on Curve initialization."),
 		curve.parent 			= typeof args.parent  				=== "string" ? args.parent 				: ".layer",
 		curve.pointA 			= typeof args.pointA 				=== "object" ? args.pointA 				: {x: 100, y: 250},
 		curve.pointB 			= typeof args.pointB 				=== "object" ? args.pointB				: {x: 600, y: 250},
 		curve.handleA 			= typeof args.handleA 				=== "object" ? args.handleA 			: {x: 100, y: 250},
 		curve.handleB 			= typeof args.handleB 				=== "object" ? args.handleB 			: {x: 600, y: 250},
 		curve.pointRadius 		= typeof args.pointRadius 			=== "number" ? args.pointRadius 		: 6,
 		curve.pointStrokeStyle 	= typeof args.pointStrokeStyle 		=== "string" ? args.pointStrokeStyle 	: "rgba(0, 0, 0, 1",
 		curve.pointStrokeWidth 	= typeof args.pointStrokeWidth 		=== "number" ? args.pointStrokeWidth 	: 2,
 		curve.pointFill 		= typeof args.pointFill 			=== "string" ? args.pointFill 			: "rgba(0, 0, 0, 1)",
 		curve.handleRadius 		= typeof args.handleRadius 			=== "number" ? args.handleRadius 		: 10,
 		curve.handleStrokeStyle = typeof args.handleStrokeStyle 	=== "string" ? args.handleStrokeStyle 	: "rgba(255, 0, 0, 1",
 		curve.handleStrokeWidth = typeof args.handleStrokeWidth 	=== "number" ? args.handleStrokeWidth 	: 2,
 		curve.handleFill 		= typeof args.handleFill 			=== "string" ? args.handleFill 			: "rgba(255, 0, 0, 0.3)",
 		curve.style 			= typeof args.style 				=== "object" ? args.style 				: {};

 		// Populate Curve Style Object
 		curve.style.lineCap 	= typeof curve.style.lineCap 		=== "string" ? args.style.lineCap 		: "round",
 		curve.style.lineJoin 	= typeof curve.style.lineJoin 		=== "string" ? args.style.lineJoin 		: "round",
 		curve.style.strokeStyle = typeof curve.style.strokeStyle 	=== "string" ? args.style.strokeStyle	: "rgba(0, 0, 0, 1)",
 		curve.style.strokeWidth = typeof curve.style.strokeWidth 	=== "number" ? args.style.strokeWidth 	: 1,
 		curve.style.fill 		= typeof curve.style.fill 			=== "string" ? args.style.fill 			: "rgba(0, 0, 0, 1)";

		// Additional References// Setup References
		curve.handles 			= {},
		curve.arcA 				= 0,
		curve.arcB 				= 2 * Math.PI;

 		// Generate Point Handles
 		curve.handles.a = new Point({
			context 	: curve.context,
			x 			: curve.pointA.x,
			y 			: curve.pointA.y,
			radius 		: curve.pointRadius,
			strokeStyle : curve.pointStrokeStyle,
			strokeWidth : curve.pointStrokeWidth,
			fill 		: curve.pointFill
		}),
		curve.handles.b = new Point({
			context 	: curve.context,
			x 			: curve.pointB.x,
			y 			: curve.pointB.y,
			radius 		: curve.pointRadius,
			strokeStyle : curve.pointStrokeStyle,
			strokeWidth : curve.pointStrokeWidth,
			fill 		: curve.pointFill
		}),
		curve.handles.c = new Handle({
			context 	: curve.context,
			x 			: curve.handleA.x,
			y 			: curve.handleA.y,
			width 		: curve.handleWidth,
			radius 		: curve.handleRadius,
			strokeStyle : curve.handleStrokeStyle,
			strokeWidth : curve.handleStrokeWidth,
			fill 		: curve.handleFill,
			point 		: curve.handles.a
		}),
		curve.handles.d = new Handle({
			context 	: curve.context,
			x 			: curve.handleB.x,
			y 			: curve.handleB.y,
			width 		: curve.handleWidth,
			radius 		: curve.handleRadius,
			strokeStyle : curve.handleStrokeStyle,
			strokeWidth : curve.handleStrokeWidth,
			fill 		: curve.handleFill,
			point 		: curve.handles.b
		});

 		// Generate Curve
 		curve.generate();

 		return curve;
 	},

 	// Draw Curve & Handles
 	generate 		: function () {
 		var curve = this;

 		// Draw Curve
		curve.context.lineWidth 	= curve.style.strokeWidth;
		curve.context.strokeStyle 	= curve.style.strokeStyle;
		curve.context.fillStyle 	= curve.style.fill;
		curve.context.lineCap 		= curve.style.lineCap;
		curve.context.lineJoin 		= curve.style.lineJoin;
		curve.context.beginPath();
		curve.context.moveTo(curve.handles.a.x, curve.handles.a.y);
		curve.context.bezierCurveTo(curve.handles.c.x, curve.handles.c.y, curve.handles.d.x, curve.handles.d.y, curve.handles.b.x, curve.handles.b.y);
		curve.context.stroke();

		// Draw Points / Handles
		for (var handle in curve.handles) {
			if (curve.handles.hasOwnProperty(handle)) {
				if (curve.handles[handle].hasOwnProperty("point")) {
					curve.context.lineWidth 	= curve.handles[handle].strokeWidth;
					curve.handles[handle].generate();
				}
				curve.context.strokeStyle 	= curve.handles[handle].strokeStyle;
				curve.context.fillStyle 	= curve.handles[handle].fill;
				curve.context.beginPath();
				curve.context.arc(curve.handles[handle].x, curve.handles[handle].y, curve.handles[handle].radius, curve.arcA, curve.arcB, true);
				curve.context.fill();
				curve.context.stroke();
			}
		}

		return curve;
	}

};