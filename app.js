// Name: Thomas J Lee
// Project: To-do-list

// * npm modules
const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// ! Above npm modules installed + nodemon

// * Run app.js with an instance of express
let app = express()

// * Connecting to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/To-Do-List")

// * Use body-parser (middleware)
// * Allows use of use with parsed data in the form of req.body
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use('/public', express.static('public'))
app.use(methodOverride('_method'));

// * handlebars for client-side rendering
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// * Routes moved to lists controller
require("./controllers/lists")(app);
require("./controllers/api/lists")(app);

// * Port
const port = process.env.PORT || 3000;
app.listen(port)