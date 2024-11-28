const { Router } = require("express");
const router = Router();
const productosModel = require("../Model/productosModel");

// Obtener todos los productos
router.get("/destinogourmetsuites/productos", async (req, res) => {
    try {
        const result = await productosModel.traerProductos();
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los productos", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Obtener productos por disponibilidad
router.get("/destinogourmetsuites/productos/disponibilidad/:disponibilidad", async (req, res) => {
    try {
        const disponibilidad = req.params.disponibilidad === "true";
        const result = await productosModel.traerProductosPorDisponibilidad(disponibilidad);
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontró ningún producto con esta disponibilidad" });
        }
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los productos", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Crear un producto nuevo
router.post("/destinogourmetsuites/productos", async (req, res) => {
    try {
        const { nombre_producto, categoria, descripcion, precio, disponibilidad, ingredientes, calorias, tamano_porcion, alergenos } = req.body;
        const result = await productosModel.crearProducto(nombre_producto, categoria, descripcion, precio, 
            disponibilidad, ingredientes, calorias, tamano_porcion, alergenos);
        res.status(201).json({ message: "Producto creado correctamente", producto_id: result.insertId });
    } catch (error) {
        console.error("Error al crear el producto", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Modificar un producto existente
router.put("/destinogourmetsuites/productos/:producto_id", async (req, res) => {
    try {
        const { producto_id } = req.params;
        const { nombre_producto, categoria, descripcion, precio, disponibilidad, ingredientes, calorias, tamano_porcion, alergenos } = req.body;
        const result = await productosModel.modificarProducto(producto_id, nombre_producto, categoria, descripcion, 
            precio, disponibilidad, ingredientes, calorias, tamano_porcion, alergenos);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el producto", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Eliminar un producto
router.delete("/destinogourmetsuites/productos/:producto_id", async (req, res) => {
    try {
        const { producto_id } = req.params;
        const result = await productosModel.eliminarProducto(producto_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el producto", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

module.exports = router;
