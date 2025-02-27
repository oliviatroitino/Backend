const { check } = require('express-validator')
const validateResults = require("../utils/handleValidator")
const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("age").exists().isInt(),
    check("email").exists().isEmail(),
    check("password").exists().notEmpty(),
    check("role").exists().isIn(['user', 'admin']),
]

module.exports = { validatorCreateItem }