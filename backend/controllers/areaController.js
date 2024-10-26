import Area from '../models/Area.js';

const AreaController = {
  getAll: async (req, res) => {
    console.log("holaaresas")
    try {

      const areas = await Area.findAll();
      res.json(areas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getArea: async (req, res) => {
    const { id } = req.params; 
    console.log('id: '+id)
    console.log(req.params)
    try {
      const area = await Area.findByPk(id); 
      if (!area) {
        return res.status(404).json({ message: 'Área no encontrada' });
      }
      res.json(area);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el área' });
    }
  },

  create: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      const nuevaArea = await Area.create({ nombre, descripcion });
      res.status(201).json(nuevaArea);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;
      const area = await Area.findByPk(id);
      if (!area) {
        return res.status(404).json({ message: 'Area no encontrada' });
      }
      area.nombre = nombre;
      area.descripcion = descripcion;
      await area.save();
      res.json(area);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const area = await Area.findByPk(id);
      if (!area) {
        return res.status(404).json({ message: 'Area no encontrada' });
      }
      await area.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default AreaController;