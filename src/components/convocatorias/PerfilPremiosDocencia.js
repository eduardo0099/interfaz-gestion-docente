import React, {Component} from 'react';

class PerfilPremiosDocencia extends Component {

    render() {
        return (
            <div className="panel padder-md row m-t-md m-l-md">
                <div className="row form-group">
                    <div className="col-md-3">
                        <label> Descripcion </label>
                        <span className="form-control"> { this.props.item.descripcion } </span>
                    </div>
                </div>
                <div className="form-group">
                    <label> URL </label>
                    <span className="form-control"> { this.props.item.url_premio } </span>
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

export default PerfilPremiosDocencia;