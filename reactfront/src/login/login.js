import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BASEURL = "http://localhost:8001/";

export default function ShowLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/'); 
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(BASEURL + 'login', { correo: email, password });
            localStorage.setItem('token', response.data.token); 
            // navigate('/');
            window.location.reload(); 
        } catch (err) {
            console.log(err)
            setError('Error de autenticación');
        }
    };
    return (
        <div className="content-wrapper">
            <div className="login-box">
                <div className="login-logo">
                    <b>NES</b>
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Inicie sesion</p>
                        <form onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Correo Electronico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label for="remember">
                                            Recuerdame
                                        </label>
                                    </div>
                                </div> */}

                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>

                            </div>
                        </form>

                        {error && <p>{error}</p>}

                    </div>

                </div>
            </div>

        </div>
    );
}