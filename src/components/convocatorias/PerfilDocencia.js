import React, {Component} from 'react';

class PerfilDocencia extends Component {

    render() {
        return (
            <div className="panel padder-md row m-t-md m-l-md">
                <div className="row form-group">
                    <div className="col-md-3">
                        <label> Fecha de Obtencion </label>
                        <span className="form-control"> {this.props.item.fecha_obtencion} </span>
                    </div>
                </div>
                <div className="form-group">
                    <label> Especialidad </label>
                    <span
                        className="form-control"> {this.props.item.especialidad}</span>
                </div>
                <div className="row form-group">
                    <div className="col-md-4">
                        <label> Pais </label>
                        <span className="form-control"> {this.props.item.pais} </span>
                    </div>
                    <div className="col-md-8">
                        <label> Institucion Educativa </label>
                        <span className="form-control"> {this.props.item.institucion}</span>
                    </div>
                </div>
                <div className="row form-group m-b-lg">
                    <div className="col-md-4">
                        <label> Modalidad de Estudio </label>
                        <span className="form-control"> {this.props.item.modalidad} </span>
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