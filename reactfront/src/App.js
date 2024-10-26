import './App.css';
import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Content from './components/Content';
import ShowUsuario from './usuario/showUsuario';
import CreateUsuario from './usuario/createUsuario';
import EditUsuario from './usuario/editUsuario';
import EditPassUsuario from './usuario/editPUsuario';

import ShowCargos from './cargos/showCargo';
import CreateCargo from './cargos/createCargo';
import EditCargo from './cargos/editCargo';

import ShowProyecto from './proyecto/showProyecto';
import CreateProyecto from './proyecto/createProyecto';
import EditProyecto from './proyecto/editProyecto';

import ShowDesarrollo from './desarrollo/showTareas';
import CreateTareas from './tareas/createTarea';
import ShowTareas from './tareas/showTarea';
import EditTarea from './tareas/editTarea';

import ShowLogin from './login/login';
import PrivateRoute from './login/PrivateRoute';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

function MainApp() {
  const location = useLocation();

  return (
    <div>
      {/* Diseño diferente solo para login */}
      {location.pathname !== '/login' && <Header />}

      {/* Mostrar o no el Aside basado en la ruta actual */}
      {location.pathname !== '/login' && <Aside />}

      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<ShowLogin />} />

        {/* Rutas Privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Content />} />

          <Route path="/usuario/show" element={<ShowUsuario />} />
          <Route path="/usuario/create" element={<CreateUsuario />} />
          <Route path="/usuario/edit/:id" element={<EditUsuario />} />
          <Route path="/usuario/change-password/:id" element={<EditPassUsuario />} />

          <Route path="/cargos/show" element={<ShowCargos />} />
          <Route path="/cargos/create" element={<CreateCargo />} />
          <Route path="/cargos/edit/:id" element={<EditCargo />} />

          <Route path="/proyecto/show" element={<ShowProyecto />} />
          <Route path="/proyecto/create" element={<CreateProyecto />} />
          <Route path="/proyecto/edit/:id" element={<EditProyecto />} />

          <Route path="/tareas/show" element={<ShowTareas />} />
          <Route path="/tareas/create" element={<CreateTareas />} />
          <Route path="/tareas/edit/:id" element={<EditTarea />} />

          <Route path="/desarrollo/show" element={<ShowDesarrollo />} />
        </Route>
      </Routes>

      {/* Mostrar o no el Footer basado en la ruta actual */}
      {location.pathname !== '/login' && <Footer />}
    </div>
  );
}

export default App;
