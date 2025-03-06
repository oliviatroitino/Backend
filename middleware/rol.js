const {handleHttpError} = require("../utils/handleError")

const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req
        const userRol = user.role
        const checkValueRol = roles.includes(userRol)
        if(!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    } catch (err) {
        handleHttpError(res, "PERMISSIONS_ERROR", 403)
    }
};

/* function checkRol(roles){
    return () => {

    }
} */

module.exports = checkRol;