const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem, deleteItem, updateItem } = require("../controllers/users.js")
const { customHeader } = require("../middleware/customHeader.js")
const { validatorCreateItem } = require("../validators/tracks")

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', createItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);
router.post('/', validatorCreateItem, customHeader, createItem);

module.exports = router