const express = require("express");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");

// Posteriormente, llevaremos la lógica al controller
router.post("/register", validatorRegister, async (req, res) => {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password }; // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
    const dataUser = await usersModel.create(body);
    dataUser.set('password', undefined, { strict: false });
    const data = { token: await tokenSign(dataUser), user: dataUser };
    res.send(data);
});

// TODO
router.post("/login", (req, res) => {});

module.exports = router;

// Pruébalo con una petición POST a http://localhost:3000/api/auth/register con {name, age, email, password}
// Después copia el token de la respuesta, y pégalo en el debugger de https://jwt.io (necesitarás la MasterKey)