let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    title: String,
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    primary_user_type_id: { type: Number, required: true},
    user_name: String,
    password: String,
    salt: String,
    email: String,
    status: Boolean,
    created_ts: { type: Date, default: Date.now() },
    updated_ts : { type: Date, default: Date.now() }
})

module.exports = mongoose.model("users", UserSchema);
