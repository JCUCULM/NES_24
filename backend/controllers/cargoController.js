import Cargo from '../models/Cargo.js';
import Area from '../models/Area.js';

const CargoController = {
  // Obtener todos los cargos
  getAll: async (req, res) => {
    try {
      const cargos = await Cargo.findAll({
        include: [{
          model: Area,
        }]
      });
      res.json({data:cargos,user:req.user} );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCargo: async (req, res) => {
    const { id } = req.params;
    try {
      const cargo = await Cargo.findByPk(id);
      if (!cargo) {
        return res.status(404).json({ message: 'Cargo no encontrado' });
      }
      res.json(cargo);
    } catch (error) {
      // console.error(error);
      res.status(500).json({ message: 'Error al obtener el cargo' });
    }
  },
  create: async (req, res) => {
    try {
      const { nombre, descripcion,area_id } = req.body;
      const nuevoCargo = await Cargo.create({ nombre, descripcion,area_id });
      res.status(201).json(nuevoCargo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Actualizar un cargo
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion,area_id } = req.body;
      const cargo = await Cargo.findByPk(id);
      if (!cargo) {
        return res.status(404).json({ message: 'Cargo no encontrado' });
      }
      cargo.nombre = nombre;
      cargo.descripcion = descripcion;
      cargo.area_id = area_id;
      await cargo.save();
      res.json(cargo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Eliminar un cargo
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const cargo = await Cargo.findByPk(id);
      if (!cargo) {
        return res.status(404).json({ message: 'Cargo no encontrado' });
      }
      await cargo.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default CargoController;
