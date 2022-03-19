//express
const express = require("express");
const app = express();

//imports
const morgan = require("morgan");
const bodyParser = require("body-parser")
var cors = require('cors')

//config
const { mongoose } = require("../config/config");


//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))


//routes
app.use(require("../routes/index.routes"));

//server
app.listen(3001, function() {
    console.log("Aplicación escuchando puerto 3001");
});
