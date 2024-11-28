const express = require("express");
const app = express();
const morgan = require("morgan");

const pagosControllers = require("./Controllers/pagosControllers");

app.use(morgan("dev"));
app.use(express.json());

app.use(pagosControllers);

app.listen(3006, () =>{
    console.log("Servidor rodando en el puerta 3006, para pagos MySQL");
})
