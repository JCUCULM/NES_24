import axios from 'axios';
import { useState, useEffect } from 'react';
import React from "react";
import { Link, useNavigate } from 'react-router-dom'
const token = localStorage.getItem('token');
const URI = "http://localhost:8001/cargos/"

export default function ShowCargos() {
  const [cargos, setCargos] = useState([])
  const [userLogin, setUserLogin] = useState([])

  const navigate = useNavigate();
  useEffect(() => {
    getCargos();
  }, [])

  const getCargos = async () => {
    const res = await axios.get(URI, {
      headers: {
        Authorization: token,
      }
    });
    if (res.data.user.rol !== 2) {
      navigate('/');
    }
    setCargos(res.data.data);
  }
  const deleteCargo = async (id) => {
    const delete_cargo = window.confirm("Estas seguro de eliminar");
    if (delete_cargo) {
      const res = await axios.delete(`${URI}${id}`, {
        headers: {
          Authorization: token,
        }
      });
      getCargos();
    }
  }
  return (
    <div className="content-wrapper style={{float : 'left'}}">
      <br />
      <div className="col-sm-6" style={{ margin: '2%' }}>
        <h1>Cargos</h1>
      </div>

      <div className="card-body container-fluid" >
        <div
          id="example1_wrapper"
          className="dataTables_wrapper dt-bootstrap4"
          style={{ margin: '1%' }}
        >
          <div className="row">
            <div className="col-sm-12">
              <Link to="/cargos/create" className='btn btn-primary'><i className="fa fa-plus"> </i> Nuevo Cargo</Link>
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
                      Descripcion
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"

                    >
                      Area
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
                  {cargos.map((carg) => (
                    <tr className="even" key={carg.id}>
                      <td className="sorting_1 dtr-control">{carg.id}</td>
                      <td>{carg.nombre}</td>
                      <td>{carg.descripcion}</td>
                      <td>{carg.Area.nombre}</td>
                      <td style={{ float: 'none' }}>
                        <Link to={`/cargos/edit/${carg.id}`} className='btn btn-info' style={{ margin: '2%' }} title="Editar"><i className="fas fa-edit"></i></Link>
                        <button onClick={() => deleteCargo(carg.id)} className='btn btn-danger'>Eliminar</button>
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
                      Area
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Nombre
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Area
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