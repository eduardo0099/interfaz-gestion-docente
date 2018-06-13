import React, { Component } from 'react';
import { Grid, Row, Button, Col, FormControl, FormGroup, ControlLabel, Form } from 'react-bootstrap';
import axios from "axios/index";
import Detalle_DescargaHoras from "./Detalle_DescargaHoras";
import BaseContainer from "./BaseContainer";
import API from "../api";
import Select from 'react-select';
import {currentRole, Role} from "../auth";
import {Route} from 'react-router-dom';


class DescargaHoras extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descargas: [],
            ciclos: [],
            cicloSelect: "",
            selectedId: -1,
            verDetalle: false,
            infoDocente: {}
        }
    }

    componentDidMount() {
        this.findCicloActual();
        this.allCiclos();
    }

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({ cicloSeleccionado: response.data.cicloActual })
                this.findDescargas(response.data.cicloActual);
                this.findDocente(response.data.cicloActual);
            })
    }

    findDocente(ciclo) {
        API.get('docente/docente/general', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then(response => {
            this.setState({ infoDocente: response.data });
        }).catch(error => {
            console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`, error);
        });
    }

    allCiclos() {
        API.get('general/listaCiclos')
            .then(response => {
                this.setState({ ciclos: response.data.ciclos })
            })
    }

    findDescargas(ciclo) {
        API.get('docente/docente/horaDescDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then((response) => {
            this.setState({
                descargas: response.data.descargas,
            })
        }).catch(error => {
            console.log(`Error al obtener datos de la pantalla cursos`, error);
        });
    }

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo });
        this.findDescargas(ciclo);
    };

    regresarListaEncuesta = () => {
        this.setState({
            selectedId: -1,
            verDetalle: false,
        });
    };

    mostarComentarios = (index) => {
        this.setState({
            selectedId: index,
            verDetalle: true,
        });
    };


    render() {
        if (!this.state.verDetalle) {
            return (
                <div>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header">
                                    <a className="btn btn-default pull-right"
                                       onClick={ this.props.history.goBack }> Volver al Perfil </a>
                                    <p className="h2 m-b-sm"> { this.state.infoDocente.nombres } { this.state.infoDocente.apellido_paterno } { this.state.infoDocente.apellido_materno } - Descarga de Horas</p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-6">
                                    <div className="col-md-2">
                                        <label> Ciclo: </label>
                                    </div>
                                    <div className="col-md-4">
                                        <Select
                                            value={ this.state.cicloSeleccionado }
                                            onChange={ this.cambioCiclo }
                                            valueKey={ "descripcion" }
                                            labelKey={ "descripcion" }
                                            options={ this.state.ciclos }
                                            clearable={ false }
                                        />
                                    </div>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="col-md-3">Curso</th>
                                        <th className="col-md-2 text-center">Horario</th>
                                        <th className="col-md-2 text-center">Horas de descarga</th>
                                        <th className="col-md-2 text-center">Detalle</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    { this.state.descargas.map((item, i) => {
                                        return <tr key={ i }>
                                            <td className="v-middle">
                                                <span className="block text-primary"> { item.nombre } </span>
                                            </td>
                                            <td className="v-middle text-center">{ item.codigo }</td>
                                            <td className="v-middle text-center">{ item.hDescargaTotal }</td>
                                            <td className="v-middle text-center"><Button
                                                onClick={ () => this.mostarComentarios(i) }>Ver
                                                Detalle</Button>
                                            </td>
                                        </tr>
                                    }) }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </BaseContainer>
                </div>
            );
        }
        else {
            return (
                <Detalle_DescargaHoras
                    volverLista={ this.regresarListaEncuesta }
                    semana={ this.state.descargas[this.state.selectedId].semana }
                />
            );
        }
    }
}

export default DescargaHoras;