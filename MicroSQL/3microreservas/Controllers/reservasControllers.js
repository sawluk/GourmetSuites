const { Router } = require("express");
const router = Router();
const reservasModel = require("../Model/reservasModel");

// Obtener todos los reservas
router.get("/destinogourmetsuites/reservas", async (req, res) => {
    try {
        const result = await reservasModel.traerreservas();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener las reservas", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener un reserva por estado
router.get("/destinogourmetsuites/reservas/estado/:estado", async (req, res) => {
    try {
        const estado = req.params.estado;
        const result = await reservasModel.traerReservasPorEstado(estado);
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontro ninguna reserva con esta especificacion" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error al obtener las reservas", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Crear un nueva reserva

router.post("/destinogourmetsuites/reservas", async (req, res) => {
    try {
        const { cliente_id, habitacion_id, fecha_reserva, fecha_checkin, fecha_checkout, numero_personas, estado, comentarios, costo_total } = req.body;
        const result = await reservasModel.crearReservas(cliente_id, habitacion_id, fecha_reserva, fecha_checkin, 
            fecha_checkout, numero_personas, estado, comentarios, costo_total);
        res.status(201).json({ message: "Reserva creada correctamente", reserva_id: result.insertId });
    } catch (error) {
        console.error("Error al crear la reserva", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


// Eliminar un reserva
router.delete("/destinogourmetsuites/reservas/:reserva_id", async (req, res) => {
    try {
        const { reserva_id } = req.params;
        const result = await reservasModel.eliminarReservasId(reserva_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.status(200).json({ message: "Reserva eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la Reserva", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Actualizar una reserva
router.put("/destinogourmetsuites/reservas/:reserva_id", async (req, res) => {
    try {
        const { reserva_id } = req.params;
        const { cliente_id, habitacion_id, fecha_reserva, fecha_checkin, fecha_checkout, numero_personas, estado, comentarios, costo_total } = req.body;
        const result = await reservasModel.modificarReservas(reserva_id,cliente_id, habitacion_id, fecha_reserva, 
            fecha_checkin, fecha_checkout, numero_personas, estado, comentarios, costo_total);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Reserva no encontrada" });
        }
        res.status(200).json({ message: "Reserva actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la reserva", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;