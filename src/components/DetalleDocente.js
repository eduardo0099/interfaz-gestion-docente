import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import fotoAnonima from '../resources/images/anonimo.png';
import axios from "axios/index";
import Cursos from "./Cursos";
import ListasEncuestas from "./ListaEncuestas";
import ListaInvestigaciones from "./ListaInvestigaciones"
import SolicitudesEconomicas from "./SolicitudesEconomicas"
import DescargaHoras from "./DescargaHoras"
import Actividades from "./Actividades"
import BaseContainer from "./BaseContainer";
import { Image, Button } from 'react-bootstrap';
import API from '../api';
import email from '../resources/images/email.jpg';
import phone from '../resources/images/phone.png';

class DetalleDocente extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: {
                "codigo": "",
                "nombres": "",
                "apellidoP": "",
                "apellidoM": "",
                "telefono": "",
                "seccion": "",
                "departamento": "",
                "correo": ""
            }
        }
    }

    componentDidMount() {
        API.get('docente/docente/general', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: "2018-1",
            }
        }).then(response => {
            this.setState({ info: response.data });
        }).catch(error => {
            console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`, error);
            alert("Error al obtener datos del profesor");
        });
    }

    obtenerTipo() {
        let id = `${this.state.info.descripcion}`;
        if (id === "TPA") {
            return <span> Tiempo Parcial por Asignaturas <span className="label label-primary"> TPA </span> </span>;
        }
        else {
            return <span> Tiempo Completo <span className="label label-primary m-l-xs"> TC </span> </span>;
        }
    }

    obtenerMailTo() {
        return ("mailto:" + this.state.info.correo_pucp);
    }

    render() {
        return (
            <div className="m-t-md">
                <Route exact path={ `${this.props.match.path}` } render={ () =>
                    <BaseContainer>
                        <div className="font-small pt-4 mt-4">
                            <div className="m-t-sm">
                                <div class="col-md-2">
                                    <Button className="btn btn-primary col-md-12 m-t-lg" bsSize="lg" href={ `${this.props.match.url}/cursos` }>Cursos</Button>
                                </div>
                                <div class="col-md-2">
                                    <Button className="btn btn-primary col-md-12 m-t-lg" bsSize="lg" href={ `${this.props.match.url}/descargaHoras` }>Descarga de Horas</Button>
                                </div>
                                <div class="col-md-2">
                                    <Button className="btn btn-primary col-md-12 m-t-lg" bsSize="lg" href={ `${this.props.match.url}/encuestas` }>Encuestas</Button>
                                </div>
                                <div class="col-md-2">
                                    <Button className="btn btn-primary col-md-12 m-t-lg" bsSize="lg" href={ `${this.props.match.url}/investigaciones` }>Investigaciones</Button>
                                </div>
                                <div class="col-md-2">
                                    <Button className="btn btn-primary col-md-12 m-t-lg" bsSize="lg" href={ `${this.props.match.url}/solicitudesEconomicas` }>Solicitudes</Button>
                                </div>
                                <div class="col-md-2">
                                    <Button className="btn btn-primary col-md-12 m-t-lg" bsSize="lg" href={ `${this.props.match.url}/Actividades` }>Actividades</Button>
                                </div>
                            </div>
                            <div class="col-md-12 m-t-lg">
                                <div class="panel panel-primary m-b-md">
                                    <div class="panel panel-heading panel-heading-profesor">
                                        <h3 class="panel-title boldHeader"> { `${this.state.info.apellido_paterno} ${this.state.info.apellido_materno}, ${this.state.info.nombres}` } </h3>
                                    </div>
                                    <div class="panel-body panel-perfil-profesor">
                                        <div class="col-md-offset-1 col-md-3">
                                            <h4> Código </h4>
                                            <span className="block"> { this.state.info.codigo } </span>
                                            <h4 className="block m-t-lg"> Contacto </h4>
                                            <span className="block"> Teléfono: { this.state.info.telefono } </span>
                                            <span className="block m-t-xs"> Correo: <a href={ this.obtenerMailTo() }> { this.state.info.correo_pucp } </a> </span>
                                        </div>
                                        <div className="col-md-4">
                                            <h4> Tipo </h4>
                                            <span className="block">{ this.obtenerTipo() }</span>
                                            <h4> Departamento/Sección </h4>
                                            <span className="block">Departamento de { this.state.info.departamento }</span>
                                            <span className="block m-t-xs">Sección de { this.state.info.seccion }</span>
                                        </div>
                                        <div className="col-md-3">
                                            <Image src={ fotoAnonima } circle/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BaseContainer>
                }/>

                <Route path={ `${this.props.match.path}/cursos` } component={ Cursos }/>
                <Route path={ `${this.props.match.path}/investigaciones` } component={ ListaInvestigaciones }/>
                <Route path={ `${this.props.match.path}/encuestas` } component={ ListasEncuestas }/>
                <Route path={ `${this.props.match.path}/solicitudesEconomicas` } component={ SolicitudesEconomicas }/>
                <Route path={ `${this.props.match.path}/descargaHoras` } component={ DescargaHoras }/>
                <Route path={ `${this.props.match.path}/actividades` } component={ Actividades }/>

            </div>
        );
    }
}

export default DetalleDocente;