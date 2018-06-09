import React, {Component} from 'react';

class PerfilTesis extends Component {

    render() {
        return (
            <div className="panel padder-md row m-t-md m-l-md">
                <div className="row form-group">
                    <div className="col-md-3">
                        <label> Anio de Publicacion </label>
                        <span className="form-control"> { this.props.item.fecha_publicacion } </span>
                    </div>
                </div>
                <div className="form-group">
                    <label> Titulo </label>
                    <span className="form-control"> { this.props.item.titulo } </span>
                </div><div className="form-group">
                    <label> Resumen </label>
                    <span className="form-control"> { this.props.item.resumen } </span>
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