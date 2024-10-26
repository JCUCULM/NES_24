import Rol from '../models/Rol.js';


const RolController = {
  // Obtener todos los roles
  getAll: async (req, res) => {
    try {
      const roles = await Rol.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear un nuevo rol
  create: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      const nuevoRol = await Rol.create({ nombre, descripcion });
      res.status(201).json(nuevoRol);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Actualizar un rol
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;
      const rol = await Rol.findByPk(id);
      if (!rol) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
      rol.nombre = nombre;
      rol.descripcion = descripcion;
      await rol.save();
      res.json(rol);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Eliminar un rol
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const rol = await Rol.findByPk(id);
      if (!rol) {
        return res.status(404).json({ message: 'Rol no encontrado' });
      }
      await rol.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default RolController;
