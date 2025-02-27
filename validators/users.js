const { check } = require('express-validator');
const { validateResults } = require("../utils/handleValidator");

const validatorCreateItem = [
    check("name").exists().notEmpty().isString(),
    check("age").exists().isInt(),
    check("email").exists().isEmail(),
    check("password").exists().notEmpty().isString(),
    check("role").exists().isIn(["user", "admin"]),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorGetItem = [
    check("id").exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports = { validatorCreateItem, validatorGetItem };