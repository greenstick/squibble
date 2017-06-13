var mongoose 			= require('mongoose'),
 	Schema 				= mongoose.Schema;

var Artist = new Schema ({
	uuid 			: String,
	handle 			: String,
	first 			: String,
	last 			: String,
	email 			: String,
	password 		: String,
	pieces 			: Array,
	contributions 	: Array,
	public 			: Boolean,
	created 		: Date,
	updated 		: Date
});

module.exports = mongoose.model("Artist", Artist);
