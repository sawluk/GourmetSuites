const mysql = require("mysql2/promise")
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'destinogourmetsuites'
})

async function traerClientes() {
    const result = await connection.query("SELECT * FROM clientes");
    return result[0];
}

async function traerClientePorNacionalidad(nacionalidad) {
    const result = await connection.query(
        "SELECT * FROM clientes WHERE nacionalidad = ?", nacionalidad);
    return result[0];
}

async function crearCliente(nombre, apellido, email, telefono, direccion, fecha_registro, fecha_nacimiento, nacionalidad, preferencias) {
    const result = await connection.query(
        "INSERT INTO clientes (nombre, apellido, email, telefono, direccion, fecha_registro, fecha_nacimiento, nacionalidad, preferencias) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [nombre, apellido, email, telefono, direccion, fecha_registro, fecha_nacimiento, nacionalidad, preferencias]
    );
    return result[0];
}

async function eliminarClienteId(cliente_id) {
    const result = await connection.query("DELETE FROM clientes WHERE cliente_id = ?", cliente_id);
    return result[0];
}

async function modificarCliente(cliente_id, nombre, apellido, email, telefono, direccion, fecha_registro, fecha_nacimiento, nacionalidad, preferencias) {
    const result = await connection.query(
        "UPDATE clientes SET nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ?, fecha_registro = ?, fecha_nacimiento = ?, nacionalidad = ?, preferencias = ? WHERE cliente_id = ?",
        [nombre, apellido, email, telefono, direccion, fecha_registro, fecha_nacimiento, nacionalidad, preferencias, cliente_id]
    );
    return result[0];
}

module.exports = {
    traerClientes,
    traerClientePorNacionalidad,
    crearCliente,
    eliminarClienteId,
    modificarCliente
};