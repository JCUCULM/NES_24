import axios from 'axios';
import { useState, useEffect } from 'react';
import React from "react";
import { Link, useNavigate } from 'react-router-dom'

const BASEURL = "http://localhost:8001/";
const URITAREAS = BASEURL + "tareas/";

const token = localStorage.getItem('token');

export default function ShowTarea() {

  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userLogin, setUserLogin] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    getTareas();
  }, [])

  const getTareas = async () => {
    const res = await axios.get(URITAREAS, {
      headers: {
        Authorization: token,
      },
    });
    if (res.data.user.rol == 1) {
      navigate('/');
    }
    setTareas(res.data.data);
    setUserLogin(res.data.user);
  }
  const deleteTarea = async (id) => {
    const delete_tarea = window.confirm("Estas seguro de eliminar la tarea");
    if (delete_tarea) {
      const res = await axios.delete(`${URITAREAS}${id}`, {
        headers: {
          Authorization: token,
        },
      });
      getTareas();
    }
  }

  const download = async (idtarea) => {
    setCargando(true);
    try {
      setErrorMessage('');
      const respuesta = await axios.get(URITAREAS + 'file1/' + idtarea, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(respuesta.data);
      const elementoA = document.createElement('a');
      elementoA.href = url;
      elementoA.download = 'documentacion' + idtarea + '_File.pdf';
      elementoA.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        // Error genérico (error 500)
        setErrorMessage('Ocurrió un error al descargar el archivo. Inténtalo de nuevo más tarde.');
      }
    }
    finally {
      setCargando(false);
    }
  }
  const downloadPrueba = async (idtarea) => {
    setCargando(true);
    try {
      setErrorMessage('');
      const respuesta = await axios.get(URITAREAS + 'file2/' + idtarea, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(respuesta.data);
      const elementoA = document.createElement('a');
      elementoA.href = url;
      elementoA.download = 'PruebaDeFinalizacion' + idtarea + '_File.pdf';
      elementoA.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        console.log("aki")
        setErrorMessage(error.response.data.message);
      } else {
        console.log("aki2")
        // Error genérico (error 500)
        setErrorMessage('Ocurrió un error al descargar el archivo. Inténtalo de nuevo más tarde.');
      }
    }
    finally {
      setCargando(false);
    }
  }

  return (
    <div className="content-wrapper style={{float : 'left'}}">
      <br />
      <div className="col-sm-6" style={{ margin: '2%' }}>
        <h1>Tareas</h1>
      </div>

      <div className="card-body container-fluid" >
        <div
          id="example1_wrapper"
          className="dataTables_wrapper dt-bootstrap4"
          style={{ margin: '1%' }}
        >
          <div className="row">
            <div className="col-sm-12">
              {userLogin.rol === 2 && (
                <>
                  <Link to="/tareas/create" className='btn btn-primary'><i className="fa fa-plus"> </i> Nueva Tarea</Link>
                </>
              )}
              
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
                      Proyecto
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

                    >
                      Nombre
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
                      Usuario
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
                  {tareas.map((tare) => (
                    <tr className="even" key={tare.id}>
                      <td className="sorting_1 dtr-control">{tare.id}</td>
                      <td>{tare.Project.nombre}</td>
                      <td>{tare.Area.nombre}</td>
                      <td>{tare.nombre}</td>
                      <td>{tare.estado}</td>
                      <td>{tare.Usuario.nombres}</td>
                      <td style={{ float: 'none' }}>
                        <Link
                          to={`/tareas/edit/${tare.id}`}
                          className='btn btn-info'
                          style={{ marginRight: '8px' }}
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>

                        {userLogin.rol === 2 && (
                          <button
                            onClick={() => deleteTarea(tare.id)}
                            className='btn btn-danger'
                            style={{ marginRight: '8px' }}
                            title="Eliminar"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}

                        {tare.descripcion != '' && (
                          <button
                            title='Documentacion del requerimiento'
                            onClick={() => download(tare.id)}
                            disabled={cargando}
                            className='btn btn-primary'
                            style={{ marginRight: '8px' }}
                          >
                            {cargando ? (
                              'Cargando...'
                            ) : (
                              <>
                                <i className="fas fa-file-download"></i> Doc
                              </>
                            )}
                          </button>
                        )}

                        {(tare.prueba_doc != '' && userLogin.rol === 2) && (
                          <button
                            title='Documento de prueba de finalizacion'
                            onClick={() => downloadPrueba(tare.id)}
                            disabled={cargando}
                            className='btn btn-success'
                            style={{ marginRight: '8px' }}
                          >
                            {cargando ? (
                              'Cargando...'
                            ) : (
                              <>
                                <i className="fas fa-file-download"></i> DocPrueba
                              </>
                            )}
                          </button>
                        )}
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
                      Proyecto
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Area
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Nombre
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Estado
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Usuario
                    </th>
                    <th rowSpan="1" colSpan="1">
                      Acciones
                    </th>
                  </tr>
                </tfoot>
              </table>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}