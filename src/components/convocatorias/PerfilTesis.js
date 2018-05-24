import React, {Component} from 'react';

class PerfilTesis extends Component {

    render() {
        return (
            <div className="panel padder-md row m-t-md m-l-md">
                <div className="row form-group">
                    <div className="col-md-3">
                        <label> Anio de Publicacion </label>
                        <span className="form-control"> 2018 </span>
                    </div>
                </div>
                <div className="form-group">
                    <label> Titulo </label>
                    <span
                        className="form-control"> Ingeniera Informatica </span>
                </div><div className="form-group">
                    <label> Resumen </label>
                    <textarea
                        className="form-control"> Ingeniera Informatica </textarea>
                </div>
                <div className="form-group">
                    <label> Premios </label>
                    <textarea
                        className="form-control"> Ingeniera Informatica </textarea>
                </div>
                <div className="row form-group">
                    <div className="col-md-3">
                        <button className="btn btn-primary"> Descargar
                            Evidencia
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PerfilTesis;