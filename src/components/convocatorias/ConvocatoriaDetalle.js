import React, {Component} from 'react';
import {Route, Link,Redirect} from 'react-router-dom';
import BaseContainer from "../BaseContainer";


class ConvocatoriaDetalle extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 1,
            codigo: 1,
            nombre: "Profesor de Sistemas Operativos",
            estado: "Abierta",
            fecha_inicio: "2018-05-18",
            fecha_registro: "2018-05-18",
            fecha_fin: "2018-06-18",
            cantidadPostulantes: 2,
            curso: {
                "id": 2,
                "nombre": "Sistemas operativos",
                "codigo": "INF239"
            },
            seccion: {
                "id": 1,
                "nombre": "Informatica"
             }
        }
    }

    render(){
        return(
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Detalle de Convocatoria </p>
                        </header>
                    </div>
                        <div className="panel-body">
                            <h4> Datos generales </h4>
                            <div className="col-md-offset-0 col-md-7">
                                <hr/>
                                <div className="form-group"></div>
                            </div>


                        </div>
                    <div className="panel-footer text-right">

                        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaDetalle;