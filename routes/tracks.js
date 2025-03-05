const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem, deleteItem, updateItem } = require("../controllers/tracks.js")
const { customHeader } = require("../middleware/customHeader.js")
const { validatorCreateItem } = require("../validators/tracks.js")

router.get('/', getItems);
router.get('/:id', getItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);
router.post('/', validatorCreateItem, createItem);

module.exports = router