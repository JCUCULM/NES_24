import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASEURL = "http://localhost:8001/";
const URITAREAS = BASEURL + "tareas/";
const URIAREAS = BASEURL + "areas/";
const URIPROJECTS = BASEURL + "proyectos/";
const URIUSERS = BASEURL + "usuarios/";

const token = localStorage.getItem('token');

export default function CreateTarea() {

    const [proyecto_id, setProyecto] = useState('');
    const [area_id, setArea] = useState(0);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('No iniciado');
    const [usuario, setUsuario] = useState('');
    const [prueba, setPrueba] = useState('');
    const [visto_bueno, setVistobueno] = useState(0);
    const [usuarios, setUsuarios] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [areas, setAreas] = useState([]);
    const [userLogin, setUserLogin] = useState([])

    useEffect(() => {
        getUsers();
        getAreas();
        getProjects();
    }, [])

    const getUsers = async () => {
        const res = await axios.get(URIUSERS, {
            headers: {
                Authorization: token,
            },
        });
        console.log(res.data)
        if (res.data.user.rol !== 2) {
            navigate('/');
        }
        setUsuarios(res.data.data);
        setUserLogin(res.data.user);
    }
    const getAreas = async () => {
        const res = await axios.get(URIAREAS, {
            headers: {
                Authorization: token,
            },
        });
        console.log(res.data)
        setAreas(res.data);
    }
    const getProjects = async () => {
        const res = await axios.get(URIPROJECTS, {
            headers: {
                Authorization: token,
            },
        });
        console.log(res.data)
        setProyectos(res.data);
    }

    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('proyecto_id', proyecto_id);
        formData.append('area_id', area_id);
        formData.append('nombre', nombre);
        formData.append('estado', estado);
        formData.append('usuario_id', usuario);
        formData.append('prueba_doc', prueba);
        formData.append('visto_bueno', visto_bueno);

        const fileInput = document.querySelector('#documentacion');
        if (fileInput.files.length > 0) {
            formData.append('documentacion', fileInput.files[0]); // Añade el archivo al FormData
        }

        try {
            await axios.post(URITAREAS, formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data' // Este encabezado es importante para enviar archivos
                },
            });
            navigate('/tareas/show');
        } catch (err) {
            console.error("Error al subir el archivo", err);
        }
    }

    return (
        <div className="content-wrapper">
            <div className="content-fluid" >
                <section className="content  ">
                    <div className="row">
                        <div className="col-md-9 " style={{ float: 'left' }}> <br />
                            <div className="card card-primary" style={{ margin: '2%' }}>
                                <div className="card-header">
                                    <h3 className="card-title">Registro</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={store}>
                                        <div className="form-group">
                                            <label htmlFor="proyecto">Proyecto</label>
                                            <select required id="proyecto" className="form-control custom-select" value={proyecto_id || ''} onChange={(e) => setProyecto(e.target.value)}>
                                                <option disabled value="">Seleccione uno</option>
                                                {proyectos
                                                    .filter(proy => proy.usuario_id == userLogin.id)
                                                    .map((proy) => (
                                                        <option key={proy.id} value={proy.id}>{proy.nombre}</option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="area">Area</label>
                                            <select required id="area" className="form-control custom-select" value={area_id || ''} onChange={(e) => {
                                                setArea(e.target.value);
                                                // getUsers();
                                                // updateUsers();
                                            }}>
                                                <option disabled value="">Seleccione uno</option>
                                                {areas.map((area) => (
                                                    <option key={area.id} value={area.id}>{area.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input required type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="filepruebadoc">Descripción (Documentacion)</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="documentacion" />
                                                    <label className="custom-file-label" htmlFor="documentacion">Seleccione</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="estado">Estado</label>
                                            <select required id="estado" className="form-control custom-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                                                <option value="No iniciado">No iniciado</option>
                                                <option value="En Proceso">En Proceso</option>
                                                <option value="Finalizado">Finalizado</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="usuario">Empleado</label>
                                            <select required id="usuario" className="form-control custom-select" value={usuario || ''} onChange={(e) => setUsuario(e.target.value)}>
                                                <option disabled value="">Seleccione uno</option>
                                                {usuarios
                                                    .filter(user => user.Cargo.area_id == area_id)
                                                    .map((user) => (
                                                        <option key={user.id} value={user.id}>{user.nombres} {user.apellidos}</option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">
                                                Registrar
                                            </button>
                                        </div>
                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>
            </div>
        </div>
    );
}