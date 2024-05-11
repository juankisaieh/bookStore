const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true }
  }, {
    versionKey: false,
    timestamps: true

})

const Model = mongoose.model("Usuario", schemaUser)

module.exports = Model