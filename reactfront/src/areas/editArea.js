import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

const URI = "http://localhost:8001/areas/"

export default function EditArea() {

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const navigate = useNavigate();

    const {id} =useParams();

    const update = async (e) => {
        e.preventDefault();
        await axios.put(URI+id, { nombre: nombre, descripcion: descripcion })
        navigate('/areas/show');
    }

    useEffect(()=>{
        getArea();
    },[])

    const getArea=async()=>{
        const res=await axios.get(URI+id);
        setNombre(res.data.nombre);
        setDescripcion(res.data.descripcion);
    }

    return (
        <div className="content-wrapper">
            <div className="content-fluid" >
                <section className="content  ">
                    <div className="row">
                        <div className="col-md-9 " style={{ float: 'left' }}> <br />
                            <div className="card card-primary" style={{ margin: '2%' }}>
                                <div className="card-header">
                                    <h3 className="card-title">Edicion de registro</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={update}>
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