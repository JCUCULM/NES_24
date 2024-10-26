import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BASEURL = "http://localhost:8001/";
const URIUSERS = BASEURL + "usuarios/";

const token = localStorage.getItem('token');

export default function EditPassUsuario() {

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [passwordAnt, setPasswordAnt] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage('');
            await axios.put(URIUSERS + "changepass/" + id, { passwordAnt: passwordAnt, password: password, passwordConfirm: passwordConfirm }, {
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
        setCorreo(res.data.correo);
    }

    return (
        <div className="content-wrapper">
            <div className="content-fluid" >
                <section className="content  ">
                    <div className="row">
                        <div className="col-md-9 " style={{ float: 'left' }}> <br />
                            <div className="card card-primary" style={{ margin: '2%' }}>
                                <div className="card-header">
                                    <h3 className="card-title">Actualizacion de contraseña</h3>
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
                                            <input disabled type="text" id="nombres" className="form-control" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="apellidos">Apellido</label>
                                            <input disabled type="text" id="apellidos" className="form-control" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="correo">Correo</label>
                                            <input disabled type="text" id="correo" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="passwordAnt">Contraseña Actual</label>
                                            <input required type="password" id="passwordAnt" className="form-control" value={passwordAnt} onChange={(e) => setPasswordAnt(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Contraseña Nueva</label>
                                            <input required type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="passwordConfirm">Confirmar Contraseña Nueva</label>
                                            <input required type="password" id="passwordConfirm" className="form-control" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary">
                                                Actualizar Contraseña
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