var mongoose 			= require('mongoose'),
 	Schema 				= mongoose.Schema;

var Piece 	= new Schema ({
	uuid 			: String,
	artistID 		: String,
	title 			: String,
	description 	: String,
	tags 			: String,
	paletteID 		: String,
	layers 			: Array,
	latitude 		: Number,
	longitude 		: Number,
	public 			: Boolean,
	collabarative 	: Boolean,
	curated 		: Boolean,
	comissioned 	: Date,
	created 		: Date,
	updated 		: Date
}); 

module.exports = mongoose.model("Piece", Piece);
