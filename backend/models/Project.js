import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from './User.js';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.BIGINT, primaryKey: true,
    autoIncrement: true
  },
  nombre: { type: DataTypes.STRING },
  empresa: { type: DataTypes.STRING },
  tipo: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  estado: { type: DataTypes.STRING },
  usuario_id: { type: DataTypes.BIGINT }
}, {
  tableName: 'proyectos',
  timestamps: true
});

Project.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export default Project;