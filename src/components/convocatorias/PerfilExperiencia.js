import React, {Component} from 'react';

class PerfilExperiencia extends Component {

    render() {
        return (
            <div className="panel padder-md row m-t-md m-l-md">
                <div className="row form-group">
                    <div className="col-md-12">
                        <label> Descripcion </label>
                        <span className="form-control"> { this.props.item.descripcion } </span>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                        <label> Fecha Inicio </label>
                        <span className="form-control"> { this.props.item.fecha_inicio } </span>
                    </div>
                    <div className="col-md-6">
                        <label> Fecha Fin </label>
                        <span className="form-control"> { this.props.item.fecha_fin } </span>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                        <label> Institucion </label>
                        <span className="form-control"> { this.props.item.institucion } </span>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-3">
                        <button className="btn btn-primary"> Descargar Evidencia </button>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}

export default PerfilExperiencia;