const { tracksModel } = require('../models/tracks');
const { handleHttpError } = require('../utils/handleError');

const getItems = async (req, res) => {
    try {
        const data = await tracksModel.find({});
        res.send(data);
    } catch (error) {
        //res.status(500).send({ message: 'Server error' });
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
    }
};

const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).send({ message: 'Item not found' });
        }
        res.send({ data: item });
    } catch (error) {
        //res.status(500).send({ message: 'Server error' });
        handleHttpError(res, 'ERROR_GET_ITEM', 403)
    }
};

const createItem = async (req, res) => {
    const { body } = req;
    // console.log(body);
    try {
        const data = await tracksModel.create(body);
        res.send(data);
    } catch (error) {
        //res.status(500).send({ message: 'Server error' });
        handleHttpError(res, 'ERROR_CREATE_ITEM', 403)
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).send({ message: 'Item not found' });
        }
        res.send({ data: updatedItem });
    } catch (error) {
        //res.status(500).send({ message: 'Server error' });
        handleHttpError(res, 'ERROR_UPDATE_ITEMS', 403)
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await tracksModel.deleteOne({ _id: id });
        res.send({ message: 'Item deleted successfully' });
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_ITEM', 403)
    }
};

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).send({ message: 'Item not found' });
        }
        res.send({ message: 'Item deleted successfully' });
    } catch (error) {
        //res.status(500).send({ message: 'Server error' });
        handleHttpError(res, 'ERROR_DELETE_ITEM', 403)
    }
}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
};