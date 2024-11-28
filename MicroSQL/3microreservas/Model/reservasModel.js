const mysql = require("mysql2/promise")
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'destinogourmetsuites'
})

async function traerreservas() {
    const result = await connection.query("SELECT * FROM reservas");
    return result[0];
}

async function traerReservasPorEstado(estado) {
    const result = await connection.query(
        "SELECT * FROM reservas WHERE estado = ?", estado);
    return result[0];
}

async function crearReservas(cliente_id, habitacion_id, fecha_reserva, fecha_checkin, fecha_checkout, numero_personas, estado, comentarios, costo_total) {
    const result = await connection.query(
        "INSERT INTO reservas (cliente_id, habitacion_id, fecha_reserva, fecha_checkin, fecha_checkout, numero_personas, estado, comentarios, costo_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [cliente_id, habitacion_id, fecha_reserva, fecha_checkin, fecha_checkout, numero_personas, estado, comentarios, costo_total]
    );
    return result[0];
}

async function eliminarReservasId(reserva_id) {
    const result = await connection.query("DELETE FROM reservas WHERE reserva_id = ?", reserva_id);
    return result[0];
}

async function modificarReservas(reserva_id, cliente_id, habitacion_id, fecha_reserva, fecha_checkin, fecha_checkout, numero_personas, estado, comentarios, costo_total) {
    const result = await connection.query(
        "UPDATE reservas SET cliente_id = ?, habitacion_id = ?, fecha_reserva = ?, fecha_checkin= ?, fecha_checkout = ?, numero_personas = ?, estado = ?, comentarios = ?, costo_total = ? WHERE reserva_id = ?",
        [cliente_id, habitacion_id, fecha_reserva, fecha_checkin, fecha_checkout, numero_personas, estado, comentarios, costo_total, reserva_id]
    );
    return result[0];
}

module.exports = {
    traerreservas,
    traerReservasPorEstado,
    crearReservas,
    eliminarReservasId,
    modificarReservas
};