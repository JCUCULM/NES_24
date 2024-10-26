import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Rol = sequelize.define('Rol', {
  id: { 
    type: DataTypes.BIGINT, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING }
}, {
  tableName: 'roles',
  timestamps: true
});

export default Rol;
