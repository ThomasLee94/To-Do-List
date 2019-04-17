// * Importing models
let { List } = require("../models/list")

// INDEX
async function Index(req, res){
  try {
    const lists = await List.find()
    res.render("lists-index", {lists: lists})
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
  
}
// MAKE LIST
async function CreateList(req, res){
  try {
    let items = req.body.body.match(/-\s?.+/g);
    let mappedItems = items.map((item) => {
      return {
          checked: false,
          // replaces the -
          label: item.replace(/-\s?/g, "")
      }
  });
    let doc = {
      title: req.body.title,
      body: mappedItems
    }

    const list = await List.create(doc)
    res.send(list)
    res.redirect(list)
    } catch(err) {
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    }
  
}

// GET LIST
async function GetList(req, res){
  try {
    const list = await List.findById(req.params.id)
    res.render("list-show", {list: list})
  } catch(err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

// UPDATE LIST
async function UpdateList(req, res){
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`/list/${list._id}`)
  } catch(err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

// UPDATE CHECKBOX
async function UpdateCheckbox(req, res){
  try {
    const list = await List.findById(req.params.id)
    list.body[req.params.list_index].checked = !list.body[req.params.list_index].checked
    await list.save()
    res.render("list-show", {list: list})
  } catch(err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

// UPDATE INDIVIDUAL LIST
async function UpdateIndividualList(req, res){
  try {
    const list = await List.findById(req.params.id)
    list.body[req.params.list_index].label = req.body.newValue
    await list.save()
    res.render("list-show", {list: list})
  } catch(err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

// DELETE LIST  
async function DeleteList(req,res){
  try {
    const list = await List.findByIdAndRemove(req.params.id)
    res.redirect("/")
  } catch(err) {
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

module.exports = {
  Index,
  CreateList,
  GetList,
  UpdateList,
  UpdateCheckbox,
  UpdateIndividualList,
  DeleteList
};