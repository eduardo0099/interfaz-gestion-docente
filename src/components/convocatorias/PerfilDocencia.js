import React, {Component} from 'react';

class PerfilDocencia extends Component {

    render() {
        return (
            <div className="panel padder-md row m-t-md m-l-md">
                <div className="row form-group">
                    <div className="col-md-3">
                        <label> Anio de Obtencion </label>
                        <span className="form-control"> 2018 </span>
                    </div>
                </div>
                <div className="form-group">
                    <label> Especialidad </label>
                    <span
                        className="form-control"> Ingeniera Informatica </span>
                </div>
                <div className="row form-group">
                    <div className="col-md-4">
                        <label> Pais </label>
                        <span className="form-control"> Peru </span>
                    </div>
                    <div className="col-md-8">
                        <label> Institucion Educativa </label>
                        <span className="form-control"> Pontifica Universidad Catolica del Peru</span>
                    </div>
                </div>
                <div className="row form-group m-b-lg">
                    <div className="col-md-4">
                        <label> Modalidad de Estudio </label>
                        <span className="form-control"> Presencial </span>
                    </div>
                    <div className="col-md-8">
                        <label className="block m-b-sm"> Estado </label>
                        <span className="label label-success"> Egresado </span>
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

export default PerfilDocencia;