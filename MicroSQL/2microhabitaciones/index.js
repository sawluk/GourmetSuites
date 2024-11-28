const express = require("express");
const app = express();
const morgan = require("morgan");

const habitacionesControllers = require("./Controllers/habitacionesControllers");

app.use(morgan("dev"));
app.use(express.json());

app.use(habitacionesControllers);

app.listen(3002, () =>{
    console.log("Servidor rodando en el puerta 3002, para habitaciones MySQL");
})
