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
        layer.context;

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
		layer.context 			= layer.object.getContext(layer.contextSetting);
		layer.object.setAttribute("width", layer.width);
		layer.object.setAttribute("height", layer.height);
        layer.object.setAttribute("style", "background-color: " + layer.backgroundColor + ";");
        layer.container.appendChild(layer.object);
        layer.curves 			= [new Curve({context: layer.context, layer: layer.object})];

		return layer;
	},

	updateContext 	: function (args) {
		var layer = this;

		// Update Properties
		layer.width 			= typeof args.width 			=== "number" ? args.width 			: layer.width,
		layer.height 			= typeof args.height 			=== "number" ? args.height 			: layer.height,
		layer.backgroundColor   = typeof args.backgroundColor   === "string" ? args.backgroundColor   : layer.backgroundColor;
		
		// Reset Context Arguments
		layer.object.setAttribute("width", args.width);
		layer.object.setAttribute("height", args.height);
        layer.object.setAttribute("style", "background-color: " + args.backgroundColor + ";");

        return layer;
	},

	strokeStart 	: function (e, offset) {
		var layer = this,
			mouseX = e.pageX - offset.left,
			mouseY = e.pageY - offset.top;

		layer.active = true;
		layer.addInteraction(mouseX, mouseY, false);
		layer.refresh();
		console.log("meow");

		return layer;
	},

	strokeMove 		: function (e, offset) {
		var layer = this,
			mouseX = e.pageX - offset.left,
			mouseY = e.pageY - offset.top;

		if (layer.active) {
			layer.addInteraction(mouseX, mouseY, true);
			layer.refresh();
		}

		return layer;
	},

	strokeStop 		: function (e) {
		var layer = this;

		layer.active = false;

		return layer;
	},

	addInteraction 	: function (x, y, stroke) {
		var layer = this;

		layer.interactions.push({
			x 		: x,
			y		: y,
			move 	: stroke,
			color 	: layer.strokeColor,
			shape 	: layer.strokeShape,
			join 	: layer.strokeJoin,
			width 	: layer.strokeWidth
		});

		return layer;
	},

	refresh 		: function () {
		var layer = this;

		layer.context.clearRect(0, 0, layer.context.width, layer.context.height);
		for (var i = 0; i < layer.interactions.length; i ++) {
			var interaction 	= layer.interactions[i],
				prevInteraction = layer.interactions[i - 1];
			if (interaction.strokeMove) {
				layer.context.lineTo(prevInteraction.x, prevInteraction.y, 0, 0, 0, 0);
			} else {
				layer.context.moveTo(interaction.x, interaction.y - 1);
				layer.context.beginPath();
			}
			layer.context.lineTo(interaction.x, interaction.y, 0, 0, 0, 0);
			layer.context.closePath();
			// Set Stroke Style
			layer.context.strokeStyle 	= interaction.color;
			layer.context.lineWidth 	= interaction.width;
			layer.context.lineJoin 	    = interaction.join;
			layer.context.lineCap 		= interaction.shape; 
			layer.context.stroke();
		}

		return layer;
	},

	clear  			: function () {
		var layer = this;

		layer.interactions = [];
		layer.context.clearRect(0, 0, context.layer.width, context.layer.height);

		return layer;
	}

};

var layer = new Layer({});

// $("#" + layer.id).on("mousedown", function (e) {
// 	var offset = $(this).offset();
// 	console.log(e);
// 	layer.strokeStart(e, offset);
// });

// $("#" + layer.id).on("mousemove", function (e) {
// 	var offset = $(this).offset();
// 	layer.strokeMove(e, offset);
// });

// $("#" + layer.id).on("mouseup", function (e) {
// 	var offset = $(this).offset();
// 	console.log(e);
// 	layer.strokeStop(e);
// });

// $("#" + layer.id).on("mouseleave", function (e) {
// 	var offset = $(this).offset();
// 	layer.strokeStop(e);
// });