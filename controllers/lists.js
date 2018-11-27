// * Importing models
var List = require("../models/list")

module.exports = (app) => {
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
    app.post("/lists", (req, res) => {
        console.log("hi")
        List.create(req.body)
            .then((list) => {
                console.log("HELLO")
                res.send(list)
                res.redirect('/');
            }).catch((err) => {
                console.log(err)
            })
    })

    app.get("/list/new", (req, res) => {
        console.log("List New!!!!!")
        res.render("new-list")
    })

    // Read
    // app.get("/list/:id", (req, res) => {
    //     List.findById(req.params.id)
    //         .then((list) => {
    //             res.render("list-show", {list: list})
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // })

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
}