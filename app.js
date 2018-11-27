// Name: Thomas J Lee
// Project: To-do-list

// * npm modules
let express = require("express");
let handlebars = require("express-handlebars");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
// ! Above npm modules installed + nodemon

// * Run app.js with an instance of express
var app = express()

// * Connecting to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/To-Do-List")

// * Use body-parser (middleware)
// * Allows use of use with parsed data in the form of req.body
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use('/public', express.static('public'))

// * Use handlebars for client-side rendering
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// * Routes moved to lists controller for better readability
require("./controllers/lists")(app) 

// * Port
const port = process.env.PORT || 3000;
app.listen(port)