import axios from 'axios';
import { useState, useEffect } from 'react';
import React from "react";
import { Link } from 'react-router-dom'

const URI = "http://localhost:8001/areas/"

export default function ShowAreas() {
  const [areas, setArea] = useState([])
  useEffect(() => {
    getAreas();
  }, [])

  const getAreas = async () => {
    const res = await axios.get(URI);
    setArea(res.data);
  }
  const deleteArea = async (id) => {
    const delete_area = window.confirm("Estas seguro de eliminar");
    if (delete_area) {
      const res = await axios.delete(`${URI}${id}`);
      getAreas();
    }
  }
  return (
    <div className="content-wrapper style={{float : 'left'}}">
      <br />
      <div className="col-sm-6" style={{ margin: '2%' }}>
        <h1>Areas</h1>
      </div>

      <div className="card-body container-fluid" >
        <div
          id="example1_wrapper"
          className="dataTables_wrapper dt-bootstrap4"
          style={{ margin: '1%' }}
        >
          <div className="row">
            <div className="col-sm-12">
              <Link to="/areas/create" className='btn btn-primary'><i className="fa fa-plus"> </i> Nueva Area</Link>
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
                      aria-label="CSS grade: activate to sort column ascending"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {areas.map((area) => (
                    <tr className="even" key={area.id}>
                      <td className="sorting_1 dtr-control">{area.id}</td>
                      <td>{area.nombre}</td>
                      <td>{area.descripcion}</td>
                      <td style={{ float: 'none' }}>
                        <Link to={`/areas/edit/${area.id}`} className='btn btn-info' style={{ margin: '2%' }} title="Editar"><i className="fas fa-edit"></i></Link>
                        <button onClick={() => deleteArea(area.id)} className='btn btn-danger'>Eliminar</button>
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