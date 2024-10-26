import express from 'express';
import cors from 'cors'; 
import { join, resolve, dirname } from 'path';
import sequelize from './config/db.js';
import { fileURLToPath } from 'url';

import usuarioRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import areaRoutes from './routes/areaRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import rolRoutes from './routes/rolRoutes.js';
import cargoRoutes from './routes/cargoRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Middleware
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
app.use(express.json());
app.use('/usuarios', usuarioRoutes);
app.use('/proyectos', projectRoutes);
app.use('/areas', areaRoutes);
app.use('/tareas', tareaRoutes);
app.use('/roles', rolRoutes);
app.use('/cargos', cargoRoutes);
app.use('/login', loginRoutes);




// Si estás en producción, servir la aplicación de React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../reactfront/build')));

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../reactfront', 'build', 'index.html'));
  });
}

// Sincronizar la base de datos y levantar el servidor
sequelize.sync().then(() => {
  app.listen(8001, () => {
    console.log('Servidor corriendo en el puerto 8001');
  });
}).catch(error => {
  console.error('Error al conectar con la base de datos:', error);
});
