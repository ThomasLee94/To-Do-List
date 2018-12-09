// * Importing models
let List = require("../models/list")

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
        // Regex on saved body/list.
        let items = req.body.body.match(/-\s?.+/g);
        console.log(items);
        let mappedItems = items.map((item) => {
            return {
                checked: false,
                // replaces the -
                label: item.replace(/-\s?/g, "")
            }
        });
        console.log(mappedItems);
        let doc = {
            title: req.body.title,
            body: mappedItems
        }
        List.create(doc)
            .then((list) => {
                res.send(list)
                res.redirect('/');
            }).catch((err) => {
                console.log(err)
            })
    })

    // Read specific list. 
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
    app.delete("/list/:id", (req, res) => {
        List.findByIdAndRemove(req.params.id)
            .then((list) => {
                res.redirect("/");
            }).catch((err) => {
                console.log(err)
            })
    })
}