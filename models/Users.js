let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
	title: String,
	first_name: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
				return /rajan/.test(v);
			},
			message: (props) => `${props.value} is not a valid name!`
		}
	},
	last_name: { type: String, required: true },
	primary_user_type_id: { type: Number, required: true },
	user_name: { type: String, required: true },
	password: { type: String, required: true },
	salt: { type: String, required: true },
	email: String,
	status: Boolean,
	created_ts: { type: Date, default: Date.now() },
	updated_ts: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('users', UserSchema);
