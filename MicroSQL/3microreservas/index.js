const express = require("express");
const app = express();
const morgan = require("morgan");

const reservasControllers = require("./Controllers/reservasControllers");

app.use(morgan("dev"));
app.use(express.json());

app.use(reservasControllers);

app.listen(3003, () =>{
    console.log("Servidor rodando en el puerta 3003, para reservas MySQL");
})
