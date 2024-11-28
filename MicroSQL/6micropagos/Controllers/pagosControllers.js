const { Router } = require("express");
const router = Router();
const pagosModel = require("../Model/pagosModel");

// Obtener todos los pagos
router.get("/destinogourmetsuites/pagos", async (req, res) => {
    try {
        const result = await pagosModel.traerPagos();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los pagos", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener un pago por método de pago
router.get("/destinogourmetsuites/pagos/metodo/:metodo_pago", async (req, res) => {
    try {
        const metodo_pago = req.params.metodo_pago;
        const result = await pagosModel.traerPagosPorMetodo(metodo_pago);
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún pago con este método" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los pagos", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Crear un nuevo pago
router.post("/destinogourmetsuites/pagos", async (req, res) => {
    try {
        const { reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda } = req.body;
        const result = await pagosModel.crearPagos(reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda);
        res.status(201).json({ message: "Pago creado correctamente", pago_id: result.insertId });
    } catch (error) {
        console.error("Error al crear el pago", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Eliminar un pago
router.delete("/destinogourmetsuites/pagos/:pago_id", async (req, res) => {
    try {
        const { pago_id } = req.params;
        const result = await pagosModel.eliminarPagosId(pago_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.status(200).json({ message: "Pago eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el pago", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Actualizar un pago
router.put("/destinogourmetsuites/pagos/:pago_id", async (req, res) => {
    try {
        const { pago_id } = req.params;
        const { reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda } = req.body;
        const result = await pagosModel.modificarPagos(pago_id, reserva_id, pedido_id, monto, metodo_pago, fecha_pago, estado, descuento, numero_transaccion, comentarios, moneda);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Pago no encontrado" });
        }
        res.status(200).json({ message: "Pago actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el pago", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;