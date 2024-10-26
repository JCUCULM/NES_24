import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';
import Rol from './Rol.js';
import Cargo from './Cargo.js';

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.BIGINT, primaryKey: true,
    autoIncrement: true
  },
  nombres: { type: DataTypes.STRING },
  apellidos: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  correo: { type: DataTypes.STRING },
  rol_id: { type: DataTypes.BIGINT},
  cargo_id: { type: DataTypes.BIGINT }
}, {
  tableName: 'usuarios',
  timestamps: true
});


Usuario.belongsTo(Rol, { foreignKey: 'rol_id' });
Usuario.belongsTo(Cargo, { foreignKey: 'cargo_id' });
export default Usuario;