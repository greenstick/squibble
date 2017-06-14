var Layer = function (args) {
	return this.__init__(args);
}

Layer.prototype = {

	__init__ 		: function (args) {
		var layer = this;

		// Run Argument Type Checks & Assign Local References
		layer.parent 			= typeof args.parent 			=== "string" ? args.parent 			: "content",
 		layer.id 				= typeof args.id 				=== "string" ? args.id 				: "layer",
		layer.elementClass 	    = typeof args.elementClass 		=== "string" ? args.elementClass 	: "layer",
		layer.toolsClass 		= typeof args.toolsClass 		=== "string" ? args.toolsClass 		: "tools",
		layer.contextSetting 	= typeof args.contextSetting 	=== "string" ? args.contextSetting 	: "2d",
		layer.width 			= typeof args.width 			=== "number" ? args.width 			: 1200,
		layer.height 			= typeof args.height 			=== "number" ? args.height 			: 700,
		layer.strokeWidth 		= typeof args.strokeWidth 		=== "number" ? args.strokeWidth 	: 5,
		layer.strokeColor 		= typeof args.strokeColor 		=== "number" ? args.strokeColor 	: "#000",
		layer.strokeShape 		= typeof args.strokeShape 		=== "string" ? args.strokeShape 	: "round",
		layer.strokeJoin 		= typeof args.strokeJoin 		=== "string" ? args.strokeJoin 		: "round",
        layer.backgroundColor   = typeof args.backgroundColor   === "string" ? args.backgroundColor : "transparent",

        // Setup References
        layer.interactions 	    = [],
		layer.active 			= false,
		layer.container 		= document.getElementById(layer.parent),
		layer.object,
        layer.offsetX,
        layer.offsetY,
        layer.context,
        layer.activeCurve;

        // Generate Layer Object & Append to Parent
        layer.generate();

		return layer;
	},

	generate 		: function () {
		var layer = this;

		layer.object 			= document.createElement("canvas"),
		layer.object.id 		= layer.id,
		layer.offsetX 			= layer.object.offsetLeft,
		layer.offsetY 			= layer.object.offsetTop,
		layer.context 			= layer.object.getContext(layer.contextSetting),
		layer.devicePixelRatio 	= window.devicePixelRatio || 1,
		layer.basePixelRatio 	= layer.context.webkitBackingStorePixelRatio ||
					              layer.context.mozBackingStorePixelRatio 	 ||
					              layer.context.msBackingStorePixelRatio 	 ||
					              layer.context.oBackingStorePixelRatio 	 ||
					              layer.context.backingStorePixelRatio 		 || 
					              1,
	    layer.pixelRatio 		= layer.devicePixelRatio / layer.basePixelRatio;
		layer.object.setAttribute("width", layer.width * layer.pixelRatio);
		layer.object.setAttribute("height", layer.height * layer.pixelRatio);
		layer.object.style.width = layer.width + "px";
		layer.object.style.height = layer.height + "px";
		layer.context.setTransform(layer.pixelRatio, 0, 0, layer.pixelRatio, 0, 0);
        layer.object.setAttribute("style", "background-color: " + layer.backgroundColor + ";");
        layer.object.setAttribute("style", "zoom: " + 1 / layer.pixelRatio + ";")
        layer.container.appendChild(layer.object);
        layer.curves 			= [];

        console.log(layer.devicePixelRatio);

		return layer;
	},

	draw 			: function () {
		var layer = this;
		// Clear Layer Canvas
		layer.context.clearRect(0, 0, layer.width, layer.height);
		// Draw Curves
		for (var i = 0; i < layer.curves.length; i++) {
			var curve = layer.curves[i];
			curve.generate();
		}

		return layer;
	},

	updateContext 	: function (args) {
		var layer = this;

		// Update Properties
		layer.width 			= typeof args.width 			=== "number" ? args.width 			: layer.width,
		layer.height 			= typeof args.height 			=== "number" ? args.height 			: layer.height,
		layer.backgroundColor   = typeof args.backgroundColor   === "string" ? args.backgroundColor : layer.backgroundColor;
		
		// Reset Context Arguments
		layer.object.setAttribute("width", args.width);
		layer.object.setAttribute("height", args.height);
        layer.object.setAttribute("style", "background-color: " + args.backgroundColor + ";");

        return layer;
	},

	clear  			: function () {
		var layer = this;

		layer.interactions = [];
		layer.curves = []
		layer.context.clearRect(0, 0, context.layer.width, context.layer.height);

		return layer;
	}

};

// Create Layer Object
var layer = new Layer({});

// Select Curve Handle
$("#" + layer.id).on("mousedown", function (e) {
	e.stopPropagation();
	if (layer.curves.length > 0) {
		for (var i = 0; i < layer.curves.length; i++) {
			var curve = layer.curves[i];
			for (var handle in curve.handles) {
				var dx = (e.offsetX - curve.handles[handle].x),
					dy = (e.offsetY - curve.handles[handle].y);
				if ((dx * dx) + (dy * dy) < curve.handles[handle].radius * curve.handles[handle].radius) {
					layer.activeCurve = curve;
					layer.activeCurve.selectedHandle = handle,
					layer.activeCurve.deltaHandle = e,
					layer.activeCurve.layer.style.cursor = "move"
					return;
				}
			}
		}
	}
});

// Move Curve Handle / Curve
$("#" + layer.id).on("mousemove", function (e) {
	e.stopPropagation();
	if (layer.curves.length > 0) {
	    if (layer.activeCurve && layer.activeCurve.selectedHandle && layer.activeCurve.deltaHandle) {
	    	layer.activeCurve.handles[layer.activeCurve.selectedHandle].x += (e.offsetX - layer.activeCurve.handles[layer.activeCurve.selectedHandle].x);
			layer.activeCurve.handles[layer.activeCurve.selectedHandle].y += (e.offsetY - layer.activeCurve.handles[layer.activeCurve.selectedHandle].y);
			layer.activeCurve.deltaHandle = e;
			layer.draw();
		}
	}
});

// Stop Curve Interaction
$("#" + layer.id).on("mouseup", function (e) {
	e.stopPropagation();
	if (layer.curves.length > 0 && layer.activeCurve) {
		layer.activeCurve.selectedHandle = null;
	    layer.activeCurve.layer.style.cursor = "default";
	    layer.activeCurve.generate();
	}
});

// Generate Curve
$("#" + layer.id).on("dblclick", function (e) {
	 layer.curves.push(new Curve({context: layer.context, layer: layer.object, pixelRatio: layer.pixelRatio}))
})