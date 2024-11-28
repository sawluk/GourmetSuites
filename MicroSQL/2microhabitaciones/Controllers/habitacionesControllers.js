const { Router } = require("express");
const router = Router();
const habitacionesModel = require("../Model/habitacionesModel");

// Obtener todos los habitaciones
router.get("/destinogourmetsuites/habitaciones", async (req, res) => {
    try {
        const result = await habitacionesModel.traerhabitaciones();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener ls habitaciones", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener un habitacion por si tiene_vista
router.get("/destinogourmetsuites/habitaciones/tiene_vista/:tiene_vista", async (req, res) => {
    try {
        const tiene_vista = req.params.tiene_vista;
        const result = await habitacionesModel.traerHabitacionPorVista(tiene_vista);
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontro ninguna habitacion con esta caracteristica :(" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error al obtener las habitaciones", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Crear un nueva habitacion
router.post("/destinogourmetsuites/habitaciones", async (req, res) => {
    try {
        const { numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, estado, fecha_mantenimiento, descripcion, tiene_vista } = req.body;

        const result = await habitacionesModel.crearHabitacion(
            numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, estado, fecha_mantenimiento, 
            descripcion, tiene_vista
        );
        res.status(201).json({ message: "Habitación creada correctamente", habitacion_id: result.insertId });
    } catch (error) {
        console.error("Error al crear la habitación", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});


// Eliminar un habitacion
router.delete("/destinogourmetsuites/habitaciones/:habitacion_id", async (req, res) => {
    try {
        const { habitacion_id } = req.params;
        const result = await habitacionesModel.eliminarHabitacionId(habitacion_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Habitacion no encontrada" });
        }
        res.status(200).json({ message: "Habitacion eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la habitacion", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Actualizar un habitacion
router.put("/destinogourmetsuites/habitaciones/:habitacion_id", async (req, res) => {
    try {
        const { habitacion_id } = req.params;
        const { numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, estado, fecha_mantenimiento, descripcion, tiene_vista } = req.body;
        const result = await habitacionesModel.modificarHabitacion(
            habitacion_id, numero_habitacion, tipo, capacidad, precio_por_noche, ubicacion, 
            estado, fecha_mantenimiento, descripcion, tiene_vista);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Habitación no encontrada" });
        }
        res.status(200).json({ message: "Habitación actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la habitación", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;