import axios from 'axios';
import { useState, useEffect } from 'react';
import React from "react";
import { Link } from 'react-router-dom'

const BASEURL = "http://localhost:8001/";
const URIPROJECTS = BASEURL + "proyectos/";

const token = localStorage.getItem('token');

export default function ShowProyecto() {

  const [projects, setProjects] = useState([])
  useEffect(() => {
    getProjects();
  }, [])

  const getProjects = async () => {
    const res = await axios.get(URIPROJECTS, {
      headers: {
        Authorization: token,
      },
    });
    setProjects(res.data);
  }
  const deleteProject = async (id) => {
    const delete_project = window.confirm("Estas seguro de eliminar el proyecto");
    if (delete_project) {
      const res = await axios.delete(`${URIPROJECTS}${id}`, {
        headers: {
          Authorization: token,
        },
      });
      getProjects();
    }
  }

  return (
    <div className="content-wrapper ">
      <br />
      <div className="col-sm-6" style={{ margin: '2%' }}>
        <h1>Proyectos</h1>
      </div>

      <div className="card-body container-fluid" >
        <div
          id="example1_wrapper"
          className="dataTables_wrapper dt-bootstrap4"
          style={{ float: 'none' }}
        >
          <div className="row" style={{ margin: '1%' }}>
            <div className="col-sm-12">
              <Link to="/proyecto/create" className='btn btn-primary'><i className="fa fa-plus"> </i> Nuevo Poyecto</Link>
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
                      Gerente
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="example1"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Engine version: activate to sort column ascending"
                    >
                      Estado
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
                  {projects.map((proye) => (
                    <tr className="even" key={proye.id}>
                      <td className="sorting_1 dtr-control">{proye.id}</td>
                      <td>{proye.nombre}</td>
                      <td>{proye.Usuario.nombres}</td>
                      <td>{proye.estado}</td>
                      <td style={{ float: 'none' }}>
                        <Link to={`/proyecto/edit/${proye.id}`} className='btn btn-info' style={{ margin: '2%' }} title="Editar"><i className="fas fa-edit"></i></Link>
                        <button onClick={() => deleteProject(proye.id)} className='btn btn-danger'>Eliminar</button>
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
                      Gerente
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Estado
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