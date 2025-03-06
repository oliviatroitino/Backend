const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem, deleteItem, updateItem } = require("../controllers/users.js")
const { customHeader } = require("../middleware/customHeader.js")
const { validatorCreateItem, validatorGetItem } = require("../validators/users")
const authMiddleware = require("../middleware/session.js")
const checkRol = require("../middleware/rol.js")

router.get('/', getItems);
router.get('/:id', validatorGetItem, getItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, customHeader, createItem);


module.exports = router

