const StorageModel = require('../models/storage.js')
const {uploadToPinata} = require('../utils/handleUploadIPFS.js')
require("dotenv").config();

const createItem = async (req,res) => {
    /* const result = await StorageModel.create(req.body);
    console.log("File created: ", result);
    res.status(201).json(result); */
    const { body, file } = req
    const fileData = {
        filename: file.filename,
        url: process.env.PUBLIC_URL+"/"+file.filename
    }
    const data = await StorageModel.create(fileData)
    res.send(data)
}

const getItems = async (req,res) => {
    const result = await StorageModel.find({});
    console.log("Files: ", result);
    res.status(200).json(result);
}

const getItem = async (req,res) => {
    const id = req.params.id;
    const result = await StorageModel.findById(id).exec();
        console.log(`Item de id ${id}: ${result}`);
        res.status(200).json(result);
}

const deleteItem = async (req,res) => {
    const id = req.params.id;
    const result = await StorageModel.findByIdAndDelete(id);
    console.log(`File de id ${id} eliminado.`);
    res.status(200).json(result);
}

const updateItem = async (req,res) => {
    const id = req.params.id;
    const result = await StorageModel.updateOne({ _id: id }, req.body, { new: true });
    console.log(`File de id ${id} actualizado: ${result}`);
    res.status(200).json(result);
}

const uploadImage = async (req,res) => {
    try {
        const id = req.params.id
        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname
        const pinataResponse = await uploadToPinata(fileBuffer, fileName)
        const ipfsFile = pinataResponse.IpfsHash
        const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
        const data = await StorageModel.create({ filename: fileName, url: ipfs })
        res.send(data)
    } catch(err) {
        console.log(err)
        res.status(500).send("ERROR_UPLOAD_COMPANY_IMAGE")
    }
}

// storage model con create

module.exports = { createItem, getItems, getItem, deleteItem, updateItem, uploadImage };