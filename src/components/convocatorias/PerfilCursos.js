import React, {Component} from 'react';

class PerfilCursos extends Component {

    render() {
        return (
            <div className="panel padder-md row m-t-md m-l-md">
                <div className="row form-group">
                    <div className="col-md-3">
                        <label> Anio </label>
                        <span className="form-control"> 2018 </span>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                        <label> Nombre </label>
                        <span
                            className="form-control"> Ingenieria de Software </span>
                    </div>
                    <div className="col-md-6">
                        <label> Institucion Educativa</label>
                        <span className="form-control"> Pontificia Univerisdad Catolica del Peru</span>
                    </div>
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

export default PerfilCursos;