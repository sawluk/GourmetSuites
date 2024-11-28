const mysql = require("mysql2/promise")
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'destinogourmetsuites'
})

async function traerhabitaciones() {
    const result = await connection.query("SELECT * FROM habitaciones");
    return result[0];
}

async function traerHabitacionPorVista(tiene_vista) {
    const result = await connection.query(
        "SELECT * FROM habitaciones WHERE tiene_vista = ?", tiene_vista);
    return result[0];
}

async function crearHabitacion(numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, estado, fecha_mantenimiento, descripcion, tiene_vista) {
    const result = await connection.query(
        "INSERT INTO habitaciones (numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, estado, fecha_mantenimiento, descripcion, tiene_vista) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, estado, fecha_mantenimiento, descripcion, tiene_vista]
    );
    return result[0];
}


async function eliminarHabitacionId(habitacion_id) {
    const result = await connection.query("DELETE FROM habitaciones WHERE habitacion_id = ?", habitacion_id);
    return result[0];
}

async function modificarHabitacion(habitacion_id, numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, estado, fecha_mantenimiento, descripcion, tiene_vista) {
    const result = await connection.query(
        "UPDATE habitaciones SET numero_habitacion = ?, tipo = ?, capacidad = ?, precio_por_noche = ?, ubicacion = ?, estado = ?, fecha_mantenimiento = ?, descripcion = ?, tiene_vista = ? WHERE habitacion_id = ?",
        [numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, estado, fecha_mantenimiento, descripcion, tiene_vista, habitacion_id]
    );
    return result[0];
}



module.exports = {
    traerhabitaciones,
    traerHabitacionPorVista,
    crearHabitacion,
    eliminarHabitacionId,
    modificarHabitacion
};