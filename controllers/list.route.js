const express = require('express');
const controller = require('./list.controller');
const parcel = require('../middleware/asyncHandler');

const router = express.Router();

// GET: INDEX
router.get('/', parcel(controller.Index));

// POST: LIST
router.post('/lists', parcel(controller.CreateList));

// PUT: UPDATE LIST
router.put('/list/:id', parcel(controller.UpdateList))

// GET: INDIVIDUAL LIST
router.get('/list/:id', parcel(controller.GetList));

// PUT: UPDATE INDIVIDUAL LIST
router.put('/list/:id/:list_index', parcel(controller.UpdateIndividualList));

// PUT: UPDATE CHECKBOX
router.put('/toggled_check/:id/:list_index', parcel(controller.UpdateCheckbox));

// DELETE: LIST
router.delete('/list/:id', parcel(controller.DeleteList));

module.exports = router;