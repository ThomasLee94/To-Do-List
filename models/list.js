// * Initialise Mongoose
// * A wrapper around our MongoDB database 
let mongoose = require("mongoose");

var ListSchema = new mongoose.Schema({
    title: String,
    body: String
}, {
    timestamps: true
})

let List = mongoose.model('List', ListSchema)

module.exports = List;

