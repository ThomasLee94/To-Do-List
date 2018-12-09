// * Initialise Mongoose
// * A wrapper around our MongoDB database 
let mongoose = require("mongoose");

let ListSchema = new mongoose.Schema({
    title: String,
    body: [{checked: Boolean, label: String}]
}, {
    timestamps: {
        createdAt: 'created_at',
        updateAt: 'update_at'
    }
})

let List = mongoose.model('List', ListSchema)

module.exports = List;

