const express = require("express");
const app = express();
const morgan = require("morgan");

const pedidosControllers = require("./Controllers/pedidosControllers");

app.use(morgan("dev"));
app.use(express.json());

app.use(pedidosControllers);

app.listen(3004, () =>{
    console.log("Servidor rodando en el puerta 3004, para pedidos MySQL");
})
