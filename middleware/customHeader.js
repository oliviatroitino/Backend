require("dotenv").config();

// buscar una cabecera custom tipo api-key
// en el middleware recibimos los parametros (req, res, next)
const customHeader = (req, res, next) => {
    console.log(res.body)
    try{
        const api_key = req.headers.api_key;
        const API_KEY = process.env.API_KEY;
        if(api_key == API_KEY){
            next()
        }else{
            res.status(403).send("Api key incorrecta");
        }
    }catch(err){
        res.status(403).send(err);
    }
}

module.exports = { customHeader }