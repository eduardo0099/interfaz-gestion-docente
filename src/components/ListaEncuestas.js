import React from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios/index";
import ProfesorPerfilEncuesta from "./ProfesorPerfilEncuesta";
import BaseContainer from "./BaseContainer";
import API from '../api';

class ListaEncuestas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaEncuesta: [],
            cicloSeleccionado: "2018-1",
            verComentarios: false,
            comentarioSeleccionado: -1,
            infoDocente: {},
            ciclos: []
        }
    }

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({ cicloSeleccionado: response.data.cicloActual })
                this.findEncuestas(response.data.cicloActual);
                this.findDocente(response.data.cicloActual);
            })
    }

    allCiclos() {
        API.get('general/listaCiclos')
            .then(response => {
                this.setState({ ciclos: response.data.ciclos })
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
        });
    }

    findEncuestas(ciclo) {
        API.get('docente/docente/encDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then((response) => {
            this.setState({ listaEncuesta: response.data.encuestas })
        }).catch(error => {
        });
    }

    componentDidMount() {
        this.findCicloActual();
        this.allCiclos();
    }

    mostarComentarios = (index) => {
        this.setState({
            comentarioSeleccionado: index,
            verComentarios: true,
        });
    };

    regresarListaEncuesta = () => {
        this.setState({
            comentarioSeleccionado: -1,
            verComentarios: false,
        });
    };

    render() {
        if (!this.state.verComentarios) {
            return (
                <div>
                    <Route exact path={ `${this.props.match.path}` } render={ () =>
                        <BaseContainer>
                            <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                                <div className="panel-heading">
                                    <header className="page-header">
                                        <a className="btn btn-default pull-right"
                                           onClick={ this.props.history.goBack }> Volver al Perfil </a>
                                        <p className="h2 m-b-sm"> { this.state.infoDocente.nombres } { this.state.infoDocente.apellido_paterno } { this.state.infoDocente.apellido_materno }
                                            <small className="block m-t-xs"> Encuestas </small>
                                        </p>
                                    </header>
                                </div>
                                <div className="panel-body">
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th className="col-md-4">Curso</th>
                                            <th className="col-md-4 text-center">Participacion</th>
                                            <th className="col-md-4 text-center">Puntaje</th>
                                            <th className>Comentarios</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        { this.state.listaEncuesta.map((item, i) => {
                                            return <tr key={ i }>
                                                <td className="v-middle">
                                                    <span className="block text-primary"> { item.curso } </span>
                                                    <small className="block text-muted"> { item.codigo } </small>
                                                    <small
                                                        className="block text-muted"> Horario { item.horario } </small>
                                                </td>
                                                <td className="v-middle text-center">{ item.porcentaje }%</td>
                                                <td className="v-middle text-center">{ item.puntaje }</td>
                                                <td className="v-middle"><Button
                                                    onClick={ () => this.mostarComentarios(i) }>Ver
                                                    Comentarios</Button></td>
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
                <ProfesorPerfilEncuesta
                    volverLista={ this.regresarListaEncuesta }
                    profesor={ this.state.nombreProfesor }
                    ciclo={ this.state.listaEncuesta[this.state.comentarioSeleccionado].ciclo }
                    curso={ this.state.listaEncuesta[this.state.comentarioSeleccionado].curso }
                    codigo={ this.state.listaEncuesta[this.state.comentarioSeleccionado].codigo }
                    participacion={ this.state.listaEncuesta[this.state.comentarioSeleccionado].porcentaje }
                    puntaje={ this.state.listaEncuesta[this.state.comentarioSeleccionado].puntaje }
                    encuestas={ this.state.listaEncuesta[this.state.comentarioSeleccionado].comentarios }
                />
            );
        }
    }
}

export default ListaEncuestas;