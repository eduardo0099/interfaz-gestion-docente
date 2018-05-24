import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import Cursos from "../Cursos";
import ConvocatoriaNuevo from "./ConvocatoriasNuevo";
import ConvocatoriasListaPostulantes from "./ConvocatoriasListaPostulantes";
import registroPostulante from "./registroPostulante";
import SimpleReactValidator from "simple-react-validator";


class linkConvocatoria extends Component {


    constructor(props) {
        super(props);
        this.state = {
            curso:'Sistemas Operativos',
            descripcion:'Convocatoria de Asistente de Docencia',
            fechaIni:'06/06/06',
            fechaFin:'06/06/06',
            tituloProf:false,
            maestria:false,
            doctorado:false,
            cargos:false,
            asesoria:false,
            premios:false,
            expProf:false,
            investigacion:false
        };
    }


    render() {
        var headerStyle = {
            color: 'black'
        }
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h2 style={headerStyle}>{this.state.descripcion} - {this.state.curso}</h2>
                            </div>
                            <div className="panel-body">
                                <h3>Fecha Límite: {this.state.fechaFin} </h3>
                            </div>
                            <div className="col-md-offset-1">
                                <a className="btn btn-sm btn-primary m-t-md" href={`${this.props.match.url}/registro`}>Registrarse</a>
                            </div>
                        </div>
                    </BaseContainer>
                }/>

                <Route path={`${this.props.match.path}/registro`} component={registroPostulante}/>

            </div>
        );
    }

}

export default linkConvocatoria;