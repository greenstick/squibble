var mongoose 			= require('mongoose'),
 	Schema 				= mongoose.Schema;

var Layer = new Schema ({
	uuid 			: String,
	artistID 		: String,
	title 			: String,
	description 	: String,
	tags 			: String,
	x 				: String,
	y 				: String,
	created 		: Date,
	updated 		: Date
});

module.exports = mongoose.model("Layer", Layer);
