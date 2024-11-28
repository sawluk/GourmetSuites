const { Router } = require("express");
const router = Router();
const clientesModel = require("../Model/clientesModel");

// Obtener todos los clientes
router.get("/destinogourmetsuites/clientes", async (req, res) => {
    try {
        const result = await clientesModel.traerClientes();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los clientes", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener un cliente por nacionalidad
router.get("/destinogourmetsuites/clientes/nacionalidad/:nacionalidad", async (req, res) => {
    try {
        const nacionalidad = req.params.nacionalidad;
        const result = await clientesModel.traerClientePorNacionalidad(nacionalidad);
        if (result.length === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error al obtener el cliente", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Crear un nuevo cliente
router.post("/destinogourmetsuites/clientes", async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, direccion, fecha_registro, fecha_nacimiento, nacionalidad, preferencias } = req.body;
        const result = await clientesModel.crearCliente(nombre, apellido, email, telefono, direccion, 
            fecha_registro, fecha_nacimiento, nacionalidad, preferencias);
        res.status(201).json({ message: "Cliente creado correctamente", cliente_id: result.insertId });
    } catch (error) {
        console.error("Error al crear el cliente", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Eliminar un cliente
router.delete("/destinogourmetsuites/clientes/:cliente_id", async (req, res) => {
    try {
        const { cliente_id } = req.params;
        const result = await clientesModel.eliminarClienteId(cliente_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el cliente", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Actualizar un cliente
router.put("/destinogourmetsuites/clientes/:cliente_id", async (req, res) => {
    try {
        const { cliente_id } = req.params;
        const { nombre, apellido, email, telefono, direccion, fecha_registro, fecha_nacimiento, nacionalidad, preferencias } = req.body;
        const result = await clientesModel.modificarCliente(cliente_id, nombre, apellido, email, telefono, direccion, 
            fecha_registro, fecha_nacimiento, nacionalidad, preferencias);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        res.status(200).json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el cliente", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;