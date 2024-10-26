import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Proyecto from './Project.js';
import Area from './Area.js';
import Usuario from './User.js';



const Tarea = sequelize.define('Tarea', {
  id: {
    type: DataTypes.BIGINT, primaryKey: true,
    autoIncrement: true
  },
  proyecto_id: { type: DataTypes.BIGINT },
  area_id: { type: DataTypes.BIGINT },
  nombre: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  estado: { type: DataTypes.STRING },
  usuario_id: { type: DataTypes.BIGINT },
  prueba_doc: { type: DataTypes.STRING },
  visto_bueno: { type: DataTypes.TINYINT }
}, {
  tableName: 'tareas',
  timestamps: true
});

Tarea.belongsTo(Proyecto, { foreignKey: 'proyecto_id' });
Tarea.belongsTo(Area, { foreignKey: 'area_id' });
Tarea.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export default Tarea;