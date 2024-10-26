import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Area = sequelize.define('Area', {
  id: { 
    type: DataTypes.BIGINT, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING }
});

export default Area;
