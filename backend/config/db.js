import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: './.env' });

/**
 * Configuración de la conexión a la base de datos MySQL.
 * @type {object}
 */
const sequelize = new Sequelize(
  process.env.DDBB_NAME,
  process.env.DDBB_USER,
  process.env.DDBB_PASSWORD,
  {
    host: process.env.DDBB_HOST,
    dialect: 'mysql',
  }
);

// Verificar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default sequelize;
