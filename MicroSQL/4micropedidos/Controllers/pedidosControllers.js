const { Router } = require("express");
const router = Router();
const pedidosModel = require("../Model/pedidosModel");

// Obtener todos los pedidos
router.get("/destinogourmetsuites/pedidos", async (req, res) => {
    try {
        const result = await pedidosModel.traerPedidos();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los pedidos", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener un pedido por numero_items
router.get("/destinogourmetsuites/pedidos/numero_items/:numero_items", async (req, res) => {
    try {
        const numero_items = req.params.numero_items;
        const result = await pedidosModel.traerPedidosPorCantidad(numero_items);
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontro ninguna pedido con esta especificacion" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los pedidos", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Crear un nueva pedido
router.post("/destinogourmetsuites/pedidos", async (req, res) => {
    try {
        const { cliente_id, fecha_pedido, tipo_servicio, total, estado, metodo_entrega, propina, numero_items, comentarios } = req.body;
        const result = await pedidosModel.crearPedidos(cliente_id, fecha_pedido, tipo_servicio, total, estado, 
            metodo_entrega, propina, numero_items, comentarios);
        res.status(201).json({ message: "Pedido creado correctamente", pedido_id: result.insertId });
    } catch (error) {
        console.error("Error al crear el pedido", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


// Eliminar un pedido
router.delete("/destinogourmetsuites/pedidos/:pedido_id", async (req, res) => {
    try {
        const { pedido_id } = req.params;
        const result = await pedidosModel.eliminarPedidosId(pedido_id); 
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.status(200).json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el pedido", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Actualizar una pedido
router.put("/destinogourmetsuites/pedidos/:pedido_id", async (req, res) => {
    try {
        const { pedido_id } = req.params;
        const { cliente_id, fecha_pedido, tipo_servicio, total, estado, metodo_entrega, propina, numero_items, comentarios } = req.body;
        const result = await pedidosModel.modificarPedidos(pedido_id, cliente_id, fecha_pedido, tipo_servicio,
             total, estado, metodo_entrega, propina, numero_items, comentarios);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.status(200).json({ message: "Pedido actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el pedido", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


module.exports = router;