const express = require("express");
const app = express();
const morgan = require("morgan");

const clientesControllers = require("./Controllers/clientesControllers");

app.use(morgan("dev"));
app.use(express.json());

app.use(clientesControllers);

app.listen(3001, () =>{
    console.log("Servidor rodando en el puerta 3001, para usuarios MySQL");
})
