import axios from 'axios';
import { useState, useEffect } from 'react';
import React from "react";
import { Link } from 'react-router-dom'

const BASEURL = "http://localhost:8001/";
const URIUSERS = BASEURL + "usuarios/";

const token = localStorage.getItem('token');

export default function ShowUsuario() {
  const [users, setUser] = useState([])
  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const res = await axios.get(URIUSERS, {
      headers: {
          Authorization: token,
      },
  });
    setUser(res.data.data);
  }
  const deleteUser = async (id) => {
    const delete_user = window.confirm("Estas seguro de eliminar al Usuario");
    if (delete_user) {
      const res = await axios.delete(`${URIUSERS}${id}`, {
        headers: {
            Authorization: token,
        },
    });
      getUsers();
    }
  }


  return (
    <div className="content-wrapper style={{float : 'left'}}">
      <br />
      <div className="col-sm-6" style={{ margin: '2%' }}>
        <h1>Usuarios</h1>
      </div>

      <div className="card-body container-fluid" >
        <div
          id="example1_wrapper"
          className="dataTables_wrapper dt-bootstrap4"
          style={{ margin: '1%' }}
        >
          <div className="row">
            <div className="col-sm-12">
              <Link to="/usuario/create" className='btn btn-primary'><i className="fa fa-plus"> </i> Nuevo usuario</Link>
              <table
                id="example1"
                className="table table-bordered table-striped dataTable dtr-inline"
                aria-describedby="example1_info"
              >
                <thead>
                  <tr>
                    <th
                      className="sorting sorting_asc"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"
                    >
                      ID
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"

                    >
                      Nombre
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"

                    >
                      Apellido
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Engine version: activate to sort column ascending"
                    >
                      Correo
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="CSS grade: activate to sort column ascending"
                    >
                      Cargo
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="CSS grade: activate to sort column ascending"
                    >
                      Rol
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="CSS grade: activate to sort column ascending"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr className="even" key={user.id}>
                      <td className="sorting_1 dtr-control">{user.id}</td>
                      <td>{user.nombres}</td>
                      <td>{user.apellidos}</td>
                      <td>{user.correo}</td>
                      <td>{user.Cargo.nombre}</td>
                      <td>{user.Rol.nombre}</td>
                      <td style={{ float: 'none' }}>
                        <Link to={`/usuario/edit/${user.id}`} className='btn btn-info' style={{ margin: '2%' }} title="Editar"><i className="fas fa-edit"></i></Link>
                        <button onClick={() => deleteUser(user.id)} className='btn btn-danger'>Eliminar</button>
                        <Link to={`/usuario/change-password/${user.id}`} className='btn btn-info' style={{ margin: '2%' }} title="Cambio de Contraseña"><i className="fas fa-file"></i></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th rowSpan="1" colSpan="1">
                      ID
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Nombre
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Apellido
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Correo
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Cargo
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Rol
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Acciones
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}