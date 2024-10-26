import { Link } from 'react-router-dom'

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URI = "http://localhost:8001/login/role";

const token = localStorage.getItem('token');


export default function Aside() {
  const [role, setRole] = useState(0);
  const [userLogin, setUserLogin] = useState(0);
  const [roleName, setRoleName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getRole();
  }, [])

  const getRole = async () => {
    try {
      const res = await axios.get(URI, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data)
      setRole(res.data.rol);
      setUserLogin(res.data.nombres + ' ' + res.data.apellidos);
      const rolename = (parseInt(res.data.rol) === 1) ? "Administrador" : ((parseInt(res.data.rol) === 2) ? "Gerente" : "Colaborador");  
      setRoleName(rolename);
    } catch (error) {
      // if (error.response && error.response.status === 400) {
      // setErrorMessage(error.response.data.message);
      console.log(error.response.data.message)
      console.log(error.response.status)

    }
  }

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
        <span className="brand-text font-weight-light">NES</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">

        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <span className="brand-text font-weight-light text-white d-block">
              {userLogin}
            </span>
            <span className="brand-text font-weight-light text-white d-block">
              {roleName}
            </span>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {role === 1 && (
              <>
                <li className="nav-header">ADMINISTRACION</li>
                <li className="nav-item menu">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Proyectos
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to={`../proyecto/create`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Registro</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`../proyecto/show`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Lista</p>
                      </Link>
                    </li>

                  </ul>
                </li>
              </>
            )}
            {role === 2 && (
              <>
                <li className="nav-header">GERENCIA</li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Cargos
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to={`../cargos/create`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Registro</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`../cargos/show`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Lista</p>
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Usuarios
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to={`../usuario/create`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Registro</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`../usuario/show`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Lista</p>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <a href="#" className="nav-link ">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Tareas
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to={`../tareas/create`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Registro</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`../tareas/show`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Lista</p>
                      </Link>
                    </li>
                  </ul>
                </li>

              </>
            )}

            {role === 3 && (
              <>
                <li className="nav-header">EMPLEADO</li>
                <li className="nav-item">
                  <a href="#" className="nav-link ">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Tareas
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <Link to={`../tareas/show`} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Lista</p>
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
