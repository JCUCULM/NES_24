import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI = "http://localhost:8001/areas/"

export default function CreateArea() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const navigate = useNavigate();

    const store = async (e) => {
        e.preventDefault();
        await axios.post(URI, { nombre: nombre, descripcion: descripcion })
        navigate('/areas/show');
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
                                            <label htmlFor="nombre">Nombre</label>
                                            <input required type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="descripcion">Descripción</label>
                                            <textarea required type="text" id="descripcion" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
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