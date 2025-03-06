const express = require("express");
const cors = require("cors");
const dbConnect = require('./config/mongo')
const usersRouter = require("./routes/users.js")
const storageRouter = require("./routes/storage.js")
const tracksRouter = require("./routes/tracks.js")
const authRouter = require("./routes/auth.js")
require("dotenv").config();

const app = express();

app.use(cors()); // Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(express.json());
app.use('/users', usersRouter)
app.use('/storage', storageRouter)
app.use('/tracks', tracksRouter)
app.use('/auth', authRouter) 
app.use(express.static("storage")) // http://localhost:3000/file.jpg

dbConnect()

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
