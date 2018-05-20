import React from 'react';
import {Route} from 'react-router-dom';
import {Grid, Row, Table, Button, Glyphicon, Col} from 'react-bootstrap';
import axios from "axios/index";
import ProfesorPerfilEncuesta from "./ProfesorPerfilEncuesta";
import BaseContainer from "./BaseContainer";

class ListaEncuestas extends React.Component {


    constructor(props) {

        super(props);
        this.state = {
            listaEncuesta: [],
            cicloSeleccionado: "2018-1",
            verComentarios: false,
            comentarioSeleccionado: -1,
            nombreProfesor: "",
        }
    }

    componentDidMount() {
        axios.get('http://200.16.7.151:8080/docente/docente/encDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: this.state.cicloSeleccionado,
            }
        }).then(response => {
            console.log(JSON.stringify(response.data, null, 2))
            this.setState({listaEncuesta: response.data.encuestas});
        }).catch(error => {
            console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`);
        });

        axios.get('http://200.16.7.151:8080/docente/docente/general', {
            params: {
                codigo: this.props.match.params.codigo
            }
        }).then(response => {
            this.setState({
                nombreProfesor: `${response.data.nombres} ${response.data.apellido_paterno} ${response.data.apellido_materno}`
            });
        }).catch(error => {
            console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`);
        });
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
                    <Route exact path={`${this.props.match.path}`} render={() =>
                        <BaseContainer>
                            <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                                <div className="panel-heading">
                                    <a className="btn btn-default pull-right m-t-md" onClick={this.props.history.goBack}> Volver al Perfil </a>
                                    <h2> Encuestas </h2>
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

                                        {this.state.listaEncuesta.map((item, i) => {
                                            return <tr key={i}>
                                                <td className="v-middle">
                                                    <span className="block text-primary"> {item.curso} </span>
                                                    <small className="block text-muted"> {item.codigo} </small>
                                                    <small
                                                        className="block text-muted"> Horario {item.horario} </small>
                                                </td>
                                                <td className="v-middle text-center">{item.porcentaje}%</td>
                                                <td className="v-middle text-center">{item.puntaje}</td>
                                                <td className="v-middle"><Button
                                                    onClick={() => this.mostarComentarios(i)}>Ver
                                                    Comentarios</Button></td>
                                            </tr>
                                        })}
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
                    volverLista={this.regresarListaEncuesta}
                    profesor={this.state.nombreProfesor}
                    ciclo={this.state.listaEncuesta[this.state.comentarioSeleccionado].ciclo}
                    curso={this.state.listaEncuesta[this.state.comentarioSeleccionado].curso}
                    codigo={this.state.listaEncuesta[this.state.comentarioSeleccionado].codigo}
                    participacion={this.state.listaEncuesta[this.state.comentarioSeleccionado].porcentaje}
                    puntaje={this.state.listaEncuesta[this.state.comentarioSeleccionado].puntaje}
                    encuestas={this.state.listaEncuesta[this.state.comentarioSeleccionado].comentarios}
                />
            );
        }
    }
}

export default ListaEncuestas;