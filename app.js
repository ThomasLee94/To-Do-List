//  Name: Thomas J Lee
// Project: To-do-list

// * Require npm packages
var express = require("express")
var handlebars = require("handlebars")
var mongoose = require("mongoose")

// * Routes
// Index
app.get("/", (req, res) => {
    Lists.find()
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
    Lists.findById(req.params.id)
        .then((list) => {
            res.render("list-show", {note: note})
        }).catch((err) => {
            console.log(err)
        })
})

// Update
app.put("/lists/:id", (req, res) => {
    Lists.findByIdAndUpdate(req.params.id, req.body)
        .then((list) => {
            res.redirect(`/lists/${list._id}`)
        }).catch((err) => {
            console.log(err)
        })
})

// Delete
app.delete("/lists/:id", (req, res) => {
    Lists.findByIdAndRemove(req.params.id)
        .then((list) => {
            res.redirect("/lists")
        }).catch((err) => {
            console.log(err)
        })
})
