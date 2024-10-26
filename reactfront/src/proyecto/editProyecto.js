import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASEURL = "http://localhost:8001/";
const URIPROJECTS = BASEURL + "proyectos/";
const URIUSERS = BASEURL + "usuarios/";

const token = localStorage.getItem('token');

export default function EditProyecto() {

    const [nombre, setNombre] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [tipo, setTipo] = useState('');
    const [descripcion, setDescripcion] = useState('Aki va la ruta del file XD');
    const [estado, setEstado] = useState('No iniciado');
    const [usuario, setUsuario] = useState('');
    const [usuarios, setUsuarios] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('empresa', empresa);
        formData.append('tipo', tipo);
        formData.append('estado', estado);
        formData.append('usuario_id', usuario);

        const fileInput = document.querySelector('#documentacion');
        if (fileInput.files.length > 0) {
            formData.append('documentacion', fileInput.files[0]);
        }

        try {
            await axios.put(URIPROJECTS + id, formData, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data' // Este encabezado es importante para enviar archivos
                },
            });
            navigate('/proyecto/show');
        } catch (err) {
            console.error("Error al subir el archivo", err);
        }
    }

    useEffect(() => {
        getUsers();
        getProject();
    }, [])

    const getProject = async () => {
        const res = await axios.get(URIPROJECTS + id, {
            headers: {
                Authorization: token,
            },
        });
        setNombre(res.data.nombre);
        setEmpresa(res.data.empresa);
        setTipo(res.data.tipo);
        setDescripcion(res.data.descripcion);
        setEstado(res.data.estado);
        setUsuario(res.data.usuario_id);
    }

    const getUsers = async () => {
        const res = await axios.get(URIUSERS, {
            headers: {
                Authorization: token,
            },
        });
        console.log(res.data)
        setUsuarios(res.data.data);
    }

    return (
        <div className="content-wrapper">
            <div className="content-fluid" >
                <section className="content  ">
                    <div className="row">
                        <div className="col-md-9 " style={{ float: 'left' }}> <br />
                            <div className="card card-primary" style={{ margin: '2%' }}>
                                <div className="card-header">
                                    <h3 className="card-title">Edicion</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={update}>
                                        <div className="form-group">
                                            <label htmlFor="nombres">Nombre</label>
                                            <input required type="text" id="nombres" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="empresa">Empresa</label>
                                            <input required type="text" id="empresa" className="form-control" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tipo">Tipo</label>
                                            <input required type="text" id="tipo" className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="gerente">Gerente</label>
                                            <select required id="gerente" className="form-control custom-select" value={usuario} onChange={(e) => setUsuario(e.target.value)} >
                                                <option selected disabled value="">Seleccione uno</option>
                                                {usuarios.map((user) => (
                                                    <option key={user.id} value={user.id}>{user.nombres}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="doc">Documentacion</label>
                                            <div className="input-group">
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input" id="documentacion"  accept="pdf"/>
                                                    <label className="custom-file-label" htmlFor="documentacion">Seleccione</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="estado">Estado</label>
                                            <select id="estado" className="form-control custom-select" value={estado} onChange={(e) => setEstado(e.target.value)} >
                                                <option key={0} value="No Iniciado">No iniciado</option>
                                                <option key={1} value="Analisis">Analisis</option>
                                                <option key={2} value="Desarrollo">Desarrollo</option>
                                                <option key={3} value="Finalizado">Finalizado</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">
                                                Actualizar
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