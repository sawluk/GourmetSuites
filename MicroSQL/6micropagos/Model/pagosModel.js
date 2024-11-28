const mysql = require("mysql2/promise")
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'destinogourmetsuites'
})

async function traerPagos() {
    const result = await connection.query("SELECT * FROM pagos");
    return result[0];
}

// Nueva función para obtener pagos por método de pago
async function traerPagosPorMetodo(metodo_pago) {
    const result = await connection.query(
        "SELECT * FROM pagos WHERE metodo_pago = ?", metodo_pago
    );
    return result[0];
}

async function crearPagos(reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda) {
    const result = await connection.query(
        "INSERT INTO pagos (reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda]
    );
    return result[0];
}

async function eliminarPagosId(pago_id) {
    const result = await connection.query("DELETE FROM pagos WHERE pago_id = ?", pago_id);
    return result[0];
}

async function modificarPagos(pago_id, reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda) {
    const result = await connection.query(
        "UPDATE pagos SET reserva_id = ?, pedido_id = ?, monto = ?, metodo_pago = ?, fecha_pago = ?, estado = ?, descuento = ?, numero_transaccion = ?, comentarios = ?, moneda = ? WHERE pago_id = ?",
        [reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda, pago_id]
    );
    return result[0];
}

module.exports = {
    traerPagos,
    traerPagosPorMetodo,
    crearPagos,
    eliminarPagosId,
    modificarPagos
};