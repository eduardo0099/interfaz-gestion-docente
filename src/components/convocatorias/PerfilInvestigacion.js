import React, {Component} from 'react';

class PerfilInvestigacion extends Component {

    render() {
        return (
            <div className="panel padder-md row m-t-md m-l-md">
                <div className="row form-group">
                    <div className="col-md-12">
                        <label> Titulo </label>
                        <span className="form-control"> { this.props.item.titulo } </span>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-12">
                        <label> Resumen </label>
                        <span className="form-control"> { this.props.item.resumen } </span>
                    </div>
                </div>
                <div className="row form-group">
                    <div className="col-md-6">
                        <label> Fecha </label>
                        <span className="form-control"> { this.props.item.fecha} </span>
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

export default PerfilInvestigacion;