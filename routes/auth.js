const express = require("express");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const UserModel = require("../models/users.js");
const router = express.Router();
const { validatorRegister, validatorLogin } = require("../validators/auth");
const { tokenSign } = require("../utils/handleJwt");

// Posteriormente, llevaremos la lógica al controller
router.post("/register", validatorRegister, async (req, res) => {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password }; // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
    const dataUser = await UserModel.create(body);
    dataUser.set('password', undefined, { strict: false });
    const data = { 
        token: await tokenSign(dataUser), 
        user: dataUser 
    };
    res.send(data);
});


// TODO router.post("/login", (req, res) => {});
const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await UserModel.findOne({ email: req.email }).select("password name role email");
        if (!user) {
            handleHttpError(res, "USER_NOT_EXISTS", 404);
            return;
        }
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword);
        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return;
        }
        user.set("password", undefined, { strict: false }); // Si no queremos que se muestre el hash en la respuesta
        const data = {
            token: await tokenSign(user),
            user
        };
        res.send(data);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
};

router.post("/login", validatorLogin, loginCtrl);

module.exports = router;

// Pruébalo con una petición POST a http://localhost:3000/api/auth/register con {name, age, email, password}
// Después copia el token de la respuesta, y pégalo en el debugger de https://jwt.io (necesitarás la MasterKey)