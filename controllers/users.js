const UserModel = require('../models/users.js');
const { handleHttpError } = require('../utils/handleError.js');
const { matchedData } = require('express-validator')

const createItem = async (req, res) => {
    console.log('body', req.body);
    try {
        const body = matchedData(req); // El dato filtrado por el modelo (probar con body=req)
        console.log('body', body)
        const data = await UserModel.create(body);
        console.log(data);
        res.send(data);
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEM', 403);
    }
};

const getItems = async (req, res) => {
    try {
        const result = await UserModel.find({});
        console.log("Items: ", result);
        res.status(200).json(result);
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS', 403);
    }
};

const getItem = async (req, res) => {
    try {
        //const id = req.params.id;
        const {id} = matchedData(req);
        //const result = await UserModel.findById(id).exec();
        const result = UserModel.findById(id);
        console.log(`Item de id ${id}: ${result}`);
        res.status(200).json(result);
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEM', 403);
    }
};

const deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserModel.findByIdAndDelete(id);
        console.log(`Item de id ${id} eliminado.`);
        res.status(200).json(result);
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_ITEM', 403);
    }
};

const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await UserModel.updateOne({ _id: id }, req.body, { new: true });
        console.log(`Item de id ${id} actualizado: ${result}`);
        res.status(200).json(result);
    } catch (error) {
        handleHttpError(res, 'ERROR_UPDATE_ITEM', 403);
    }
};

module.exports = { createItem, getItems, getItem, deleteItem, updateItem };