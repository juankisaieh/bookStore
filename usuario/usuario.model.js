const mongoose = require("mongoose");
var mongoose_delete = require('mongoose-delete');

const schemaUser = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    email: { type: String, required: true }
  }, {
    versionKey: false,
    timestamps: true

})

schemaUser.plugin(mongoose_delete, { overrideMethods: true })

var Model = mongoose.model("Usuario", schemaUser)

module.exports = Model