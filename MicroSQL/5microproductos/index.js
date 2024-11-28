const express = require("express");
const app = express();
const morgan = require("morgan");

const productosControllers = require("./Controllers/productosControllers");

app.use(morgan("dev"));
app.use(express.json());

app.use(productosControllers);

app.listen(3005, () =>{
    console.log("Servidor rodando en el puerta 3005, para productos MySQL");
})
