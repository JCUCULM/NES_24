import React from "react";
import {Link} from 'react-router-dom'

export default function ShowDesarrollo() {
    return (
      <div className="content-wrapper style={{float : 'left'}}">
        <br />
        <div className="col-sm-6" style={{margin : '2%'}}>
            <h1>Tareas</h1>
        </div>
        
          <div className="card-body container-fluid" >
            <div
              id="example1_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
              style={{margin : '1%'}}
            >
              <div className="row">
                <div className="col-sm-12">
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
                      <tr className="even">
                        <td className="sorting_1 dtr-control">Gecko</td>
                        <td>Mozilla 1.0</td>
                        <td>Win 95+ / OSX.1+</td>
                        <td>1</td>
                        <td style={{ float: 'none' }}>
                        <Link /*to={`/edit/${blog.id}`}*/ className='btn btn-info' style={{ margin: '2%' }} title="Ver detalles"><i className="fas fa-eye"></i></Link>
                        </td>
                      </tr>
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
                          Descripcion
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