const express = require("express")
const router = express.Router()
const {getItems, getItem, createItem, deleteItem, updateItem, uploadImage} = require("../controllers/storage.js")
const { uploadMiddleware, uploadMiddlewareMemory } = require("../utils/handleStorage")

/* // SE PUEDE HACER DIRECTO ACA

const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req, file, callback){ // pasan argumentos automaticamente
        const pathStorage = __dirname+"/../storage"
        callback(null, pathStorage) // error y destination
    },
    filename:function(req, file, callback){ // sobreescribimos o renombramos
        //tienen extension jpg, pdf, mp4
        const ext = file.originalname.split(".").pop() //el ultimo valor
        const filename = "file-"+Date.now()+"."+ext
        callback(null, filename)
    }
}) */

//router.post("/", uploadMiddleware.single("image"), createItem);

router.get('/', getItems);
router.get('/:id', getItem);
//router.post('/', createItem);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);
router.post("/local", );
router.post("/", uploadMiddlewareMemory.single("image"), uploadImage);
// router.patch("/", uploadMiddlewareMemory.single("image"), updateItem); // single pq solo subimos un fichero

/* // OPCION COPILOT (?) CON TRY CATCH ERROR 
router.post('/', uploadMiddleware.single("image"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send({ message: "No file uploaded" });
        }
        const newItem = await createItem({ url: file.path, filename: file.filename });
        res.status(201).send(newItem);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}); */

module.exports = router