const express = require('express');
const controller = require('./list.controller');
const parcel = require('../middleware/asyncHandler');

const router = express.Router();

// GET: INDEX
router.get('/', parcel(controller.Index));

// POST: LIST
router.post('/lists', parcel(controller.CreateList));

...

module.exports = router;