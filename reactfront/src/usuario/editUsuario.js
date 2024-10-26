import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASEURL = "http://localhost:8001/";
const URIUSERS = BASEURL + "usuarios/";
const URIROLES = BASEURL + "roles/";
const URICARGOS = BASEURL + "cargos/";

const token = localStorage.getItem('token');

export default function EditUsuario() {

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    // const [password, setPassword] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const [cargo, setCargo] = useState('');
    const [cargos, setCargos] = useState([]);
    const [roles, setRoles] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');
            await axios.put(URIUSERS + id, { nombres: nombres, apellidos: apellidos, correo: correo, rol_id: rol, cargo_id: cargo }, {
                headers: {
                    Authorization: token,
                },
            })
            navigate('/usuario/show');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
            } else {
                // Error genérico (error 500)
                setErrorMessage('Ocurrió un error al crear el usuario. Inténtalo de nuevo más tarde.');
            }
        }
    }

    useEffect(() => {
        getRoles();
        getCargos();
        getUser();
    }, [])

    const getUser = async () => {
        const res = await axios.get(URIUSERS + id, {
            headers: {
                Authorization: token,
            },
        });
        setNombres(res.data.nombres);
        setApellidos(res.data.apellidos);
        // setPassword(res.data.password);
        setCorreo(res.data.correo);
        setRol(res.data.rol_id);
        setCargo(res.data.cargo_id);
    }

    const getRoles = async () => {
        const res = await axios.get(URIROLES, {
            headers: {
                Authorization: token,
            },
        });
        setRoles(res.data);
        console.log(res.data)
    }
    const getCargos = async () => {
        const res = await axios.get(URICARGOS, {
            headers: {
                Authorization: token,
            },
        });
        console.log(res.data)
        setCargos(res.data.data);
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
                                            <input required type="text" id="nombres" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="apellidos">Apellido</label>
                                            <input required type="text" id="apellidos" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="correo">Correo</label>
                                            <input required type="email" id="correo" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="password">Contraseña</label>
                                            <input required type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div> */}
                                        <div className="form-group">
                                            <label htmlFor="rol">Rol</label>
                                            <select required id="rol" className="form-control custom-select" value={rol} onChange={(e) => setRol(e.target.value)}>
                                                <option value="" disabled selected>Seleccione uno</option>
                                                {roles.map((roli) => (
                                                    <option key={roli.id} value={roli.id}>{roli.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cargo">Cargo</label>
                                            <select required id="cargo" className="form-control custom-select" value={cargo} onChange={(e) => setCargo(e.target.value)}>
                                                <option value="" disabled selected>Seleccione uno</option>
                                                {cargos.map((cargi) => (
                                                    <option key={cargi.id} value={cargi.id}>{cargi.nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">
                                                Actualizar
                                            </button>
                                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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