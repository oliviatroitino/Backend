const express = require("express")
const router = express.Router()
const { getItems, getItem, createItem, deleteItem, updateItem } = require("../controllers/tracks.js")
const { customHeader } = require("../middleware/customHeader.js")
const { validatorCreateItem } = require("../validators/tracks.js")
const authMiddleware = require("../middleware/session")

//router.get('/', getItems);
router.get("/", authMiddleware, getItems)
// TODO probar
/* Y ahora lo probamos desde el cliente: 
Haz login en POST http://localhost:3000/api/auth/login 
// Y obtén el Token. 
// GET http://localhost:3000/api/tracks Authorization: Bearer <tuToken> */

router.get('/:id', getItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);
router.post('/', validatorCreateItem, createItem);

module.exports = router