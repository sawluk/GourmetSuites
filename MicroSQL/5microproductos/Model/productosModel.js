const mysql = require("mysql2/promise");
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "destinogourmetsuites"
});


async function traerProductos() {
    const result = await connection.query("SELECT * FROM productos");
    return result[0];
}

async function traerProductosPorDisponibilidad(disponibilidad) {
    const result = await connection.query(
        "SELECT * FROM productos WHERE disponibilidad = ?", 
        disponibilidad
    );
    return result[0];
}

async function crearProducto(nombre_producto, categoria, descripcion, precio, disponibilidad, ingredientes, calorias, tamano_porcion, alergenos) {
    const result = await connection.query(
        "INSERT INTO productos (nombre_producto, categoria, descripcion, precio, disponibilidad, ingredientes, calorias, tamano_porcion, alergenos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [nombre_producto, categoria, descripcion, precio, disponibilidad, ingredientes, calorias, tamano_porcion, alergenos]
    );
    return result[0];
}

async function modificarProducto(producto_id, nombre_producto, categoria, descripcion, precio, disponibilidad, ingredientes, calorias, tamano_porcion, alergenos) {
    const result = await connection.query(
        "UPDATE productos SET nombre_producto = ?, categoria = ?, descripcion = ?, precio = ?, disponibilidad = ?, ingredientes = ?, calorias = ?, tamano_porcion = ?, alergenos = ? WHERE producto_id = ?",
        [nombre_producto, categoria, descripcion, precio, disponibilidad, ingredientes, calorias, tamano_porcion, alergenos, producto_id]
    );
    return result[0];
}

async function eliminarProducto(producto_id) {
    const result = await connection.query("DELETE FROM productos WHERE producto_id = ?", producto_id);
    return result[0];
}

module.exports = {
    traerProductos,
    traerProductosPorDisponibilidad,
    crearProducto,
    modificarProducto,
    eliminarProducto
};
