import React, { Component } from 'react';
import { Grid, Row, Button, Form, FormControl, FormGroup, Col, ControlLabel } from 'react-bootstrap';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';
import Detalle_SolicitudEconomica from "./Detalle_SolicitudEconomica";
import { Route, Link } from 'react-router-dom';
import BaseContainer from "./BaseContainer";
import API from "../api";
import Select from 'react-select';

class SolicitudesEconomicas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            infoDocente: {},
            ayudas: [{
                id: "",
                titulo: "",
                motivo: "",
                fecha_solicitud: "",
                monto_otorgado: "",
                estado: ""
            }],
            cicloSeleccionado: "",
            ciclos: [],
            selectedId: -1,
            verDetalle: false
        }
    }

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({ cicloSeleccionado: response.data.cicloActual })
                this.findAyudas(response.data.cicloActual);
                this.findDocente(response.data.cicloActual);
            }).catch(error => {
                console.log("Error al obtener datos del ciclo actual");
            });
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
            alert("Error al obtener datos del docente");
        });
    }

    allCiclos() {
        API.get('general/listaCiclos')
            .then(response => {
                this.setState({ ciclos: response.data.ciclos })
            }).catch(error => {
                console.log("Error al obtener datos de los ciclos");
            });
    }

    findAyudas(ciclo) {
        API.get('docente/ayudaEconomica/lista', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then((response) => {
            this.setState({
                ayudas: response.data.ayudas,
            })
        }).catch(error => {
            console.log(`Error al obtener datos de la pantalla cursos`, error);
            alert("Error al obtener la lista de ayudas economicas");
        });
    }

    componentDidMount() {
        this.findCicloActual();
        this.allCiclos();
    }

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo })
        this.findAyudas(ciclo);
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
        console.log('listaCiclos:', this.state.listaCiclos)
        if (!this.state.verDetalle) {
            return (
                <div>
                    <Route exact path={ `${this.props.match.path}` } render={ () =>
                        <BaseContainer>
                            <div className="panel col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-12">
                                <div className="panel-heading">
                                    <header className="page-header">
                                        <a className="btn btn-default pull-right"
                                           onClick={ this.props.history.goBack }> Volver al Perfil </a>
                                        <p className="h2"> { this.state.infoDocente.nombres } { this.state.infoDocente.apellido_paterno } { this.state.infoDocente.apellido_materno }- Solicitudes Económicas</p>
                                    </header>
                                </div>
                                <div className="panel-body">
                                    <div>
                                        <div className="form-group col-md-2 row ">
                                            <label> Ciclo </label>
                                            <Select
                                                value={ this.state.cicloSeleccionado }
                                                onChange={ this.cambioCiclo }
                                                valueKey={ "descripcion" }
                                                labelKey={ "descripcion" }
                                                options={ this.state.ciclos }
                                                clearable={ false }
                                                searchable={false}
                                            />
                                        </div>
                                    </div>
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="col-md-3">Titulo</th>
                                            <th className="col-md-2 text-center">Motivo</th>
                                            <th className="col-md-2 text-center">Fecha de solicitud</th>
                                            <th className="col-md-2 text-center">Monto otorgado</th>
                                            <th className="col-md-2 text-center">Estado</th>
                                            <th className="col-md-2 text-center">Detalle</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        { this.state.ayudas.map((item, i) => {
                                            return <tr key={ item.id }>
                                                <td className="v-middle">
                                                    <span className="block text-primary"> { item.titulo } </span>
                                                </td>
                                                <td className="v-middle text-center">{ item.motivo }</td>
                                                <td className="v-middle text-center">{ item.fecha_solicitud }</td>
                                                <td className="v-middle text-center">{ item.monto_otorgado }</td>
                                                <td className="v-middle text-center">{ item.estado }</td>
                                                <td className="v-middle"><Button
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
                    }/>
                </div>
            );
        } else {
            return (
                <Detalle_SolicitudEconomica
                    volverLista={ this.regresarListaEncuesta }
                    titulo={ this.state.ayudas[this.state.selectedId].titulo }
                    motivo={ this.state.ayudas[this.state.selectedId].motivo }
                    monto_otorgado={ this.state.ayudas[this.state.selectedId].monto_otorgado }
                    fecha_solicitud={ this.state.ayudas[this.state.selectedId].fecha_solicitud }
                    estado={ this.state.ayudas[this.state.selectedId].estado }
                />
            );
        }
    }
}

export default SolicitudesEconomicas;