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
        .then((list) => {
            res.render("lists-index", {lists: lists})
        }).catch(err => {
            console.log(err)
        })
})

// Create
app.post("/lists", (req, res) => {
    Lists.create(req.body)
        .then((list) => {
            res.redirect(`/lists/${lists._id}`)
        }).catch((err) => {
            console.log(err)
        })
})

// Read
app.get("/lists/:id", (req, res) => {
    List.findById(req.params.id)
        .then((list) => {
            res.render("list-show", {list: list})
        }).catch((err) => {
            console.log(err)
        })
})

// Update
app.put("/lists/:id", (req, res) => {
    List.findByIdAndUpdate(req.params.id, req.body)
        .then((list) => {
            res.redirect(`/lists/${list._id}`)
        }).catch((err) => {
            console.log(err)
        })
})

// Delete
app.delete("/lists/:id", (req, res) => {
    List.findByIdAndRemove(req.params.id)
        .then((list) => {
            res.redirect("/lists")
        }).catch((err) => {
            console.log(err)
        })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("App is listening to port 3000!")
})
