import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Area from './Area.js';

const Cargo = sequelize.define('Cargo', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  area_id: { type: DataTypes.BIGINT }
}, {
  tableName: 'cargos',
  timestamps: true
});
Cargo.belongsTo(Area, { foreignKey: 'area_id' });
export default Cargo;
