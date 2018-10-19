// Name: Thomas J Lee
// Project: To-Do-List

// * Require npm packages
var express = require("express");
var handlebars = require("express-handlebars");
var bodyParser = require("body-parser")
var mongoose = require("mongoose");
// ! Above npm packages installed.

// * Run app.js with express
var app =  express()

// * Use body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use('/public', express.static('public'))

// * Use handlebars for client-side rendering
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// * Connecting to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/To-Do-List")

// * Importing models
var List = require("./models/list")

// * Routes
// Index
app.get("/", (req, res) => {
    List.find()
        .then((lists) => {
            res.render("lists-index", {lists: lists})
        }).catch(err => {
            console.log(err)
        })
})

// Create
app.post("/list", (req, res) => {
    console.log(req.body)
    List.create(req.body)
        .then((list) => {
            res.status(200).send(list)
        }).catch((err) => {
            console.log(err)
        })
})

// Read
app.get("/list/:id", (req, res) => {
    List.findById(req.params.id)
        .then((list) => {
            res.render("list-show", {list: list})
        }).catch((err) => {
            console.log(err)
        })
})

// Update
app.put("/list/:id", (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body)
        .then((list) => {
            res.redirect(`/list/${list._id}`)
        }).catch((err) => {
            console.log(err)
        })
})

// Delete
app.delete("/list", (req, res) => {
    List.findByIdAndRemove(req.query._id)
        .then((list) => {
            res.send()
        }).catch((err) => {
            console.log(err)
        })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening to port 3000!")
})
