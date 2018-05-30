import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import Cursos from "../Cursos";
import ConvocatoriaNuevo from "./ConvocatoriasNuevo";
import ConvocatoriasListaPostulantes from "./ConvocatoriasListaPostulantes";
import registroPostulante from "./registroPostulante";
import SimpleReactValidator from "simple-react-validator";
import API from "../../api";


class linkConvocatoria extends Component {


    constructor(props) {
        super(props);
        this.state = {
            infoConvocatoria:{},
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

    componentDidMount() {
        this.findConvocatoria();
    }

    findConvocatoria() {
        API.get('convocatoria/convocatoria/devolver', {
            params: {
                id: this.props.match.params.codigoConv,
            }
        }).then(response => {
            this.setState({ infoConvocatoria: response.data[0] });
        }).catch(error => {
            console.log(`Error al obtener datos de convocatoria ${this.props.match.params.codigoConv}`, error);
        });
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
                                <h2 style={headerStyle}>{this.state.infoConvocatoria.nombre}</h2>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    <h4>Fecha Límite: {this.state.infoConvocatoria.fecha_fin} </h4>
                                </div>
                                <div className="form-group">
                                    <h4>Cantidad de postulantes: {this.state.infoConvocatoria.cantidad_postulantes} </h4>
                                </div>
                                <div className="form-group">
                                    <h4>Estado: {this.state.infoConvocatoria.descripcion} </h4>
                                </div>
                                <div>
                                    <a className="btn btn-sm btn-primary m-t-md" href={`${this.props.match.url}/registro`}>Registrarse</a>
                                </div>
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