const mysql = require("mysql2/promise")
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'destinogourmetsuites'
})

async function traerPedidos() {
    const result = await connection.query("SELECT * FROM pedidos");
    return result[0];
}

async function traerPedidosPorCantidad(numero_items) {
    const result = await connection.query(
        "SELECT * FROM pedidos WHERE numero_items = ?", numero_items);
    return result[0];
}

async function crearPedidos(cliente_id, fecha_pedido, tipo_servicio, total, estado, metodo_entrega, propina, numero_items, comentarios) {
    const result = await connection.query(
        "INSERT INTO pedidos (cliente_id, fecha_pedido, tipo_servicio, total, estado, metodo_entrega, propina, numero_items, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        [cliente_id, fecha_pedido, tipo_servicio, total, estado, metodo_entrega, propina, numero_items, comentarios]
    );
    return result[0];
}

async function eliminarPedidosId(pedido_id) {
    const result = await connection.query("DELETE FROM pedidos WHERE pedido_id = ?", pedido_id);
    return result[0];
}

async function modificarPedidos(pedido_id, cliente_id, fecha_pedido, tipo_servicio, total, estado, metodo_entrega, propina, numero_items, comentarios) {
    const result = await connection.query(
        "UPDATE pedidos SET cliente_id = ?, fecha_pedido = ?, tipo_servicio = ?, total = ?, estado = ?, metodo_entrega = ?, propina = ?, numero_items = ? , comentarios = ? WHERE pedido_id = ?",
        [cliente_id, fecha_pedido, tipo_servicio, total, estado, metodo_entrega, propina, numero_items, comentarios, pedido_id]
    );
    return result[0];
}

module.exports = {
    traerPedidos,
    traerPedidosPorCantidad,
    crearPedidos,
    eliminarPedidosId, 
    modificarPedidos 
};
