import React from 'react';
import { Route,Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from "axios/index";
import ProfesorPerfilEncuesta from "./ProfesorPerfilEncuesta";
import BaseContainer from "./BaseContainer";
import API from '../api';
import Select from 'react-select';
import { Line } from 'rc-progress';

class ListaEncuestas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listaEncuesta: [],
            cicloSeleccionado: "2018-1",
            verComentarios: false,
            comentarioSeleccionado: -1,
            infoDocente: {},
            ciclos: [],
            auth: false,
            verAuth:false,
        }
    }
    componentWillMount() {
        if (localStorage.getItem('jwt') == null) {
            window.location.href = "/";
        } else {
            API.get('/auth/verificaPermiso', {
                /*
                headers:{
                  'x-access-token' : localStorage.getItem('jwt'),
                },
                */
                params: {
                    ruta: this.props.match.path
                }
            }).then(resp => {
                console.log("resp", resp.data);
                this.setState({ auth: resp.data.permiso, verAuth:true });
            }).catch(err => {
                console.log("err", err);
            })
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

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo })
        this.findEncuestas(ciclo);
    };

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
        if(!this.state.auth && this.state.verAuth){
            return(<Redirect to="/home"/>);
        }else if (!this.state.verAuth){
            return(<div/>);
        }
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
                                        <p className="h2 m-b-sm"> { this.state.infoDocente.nombres } { this.state.infoDocente.apellido_paterno } { this.state.infoDocente.apellido_materno } - Encuestas</p>
                                    </header>
                                </div>
                                <div className="panel-body">
                                    <div>
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
                                    </div>
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
                                                <td>
                                                    <Line percent="item.porcentaje" strokeWidth="4" strokeColor="#87cefa" />
                                                    <span className="block text-center"> { item.porcentaje } %</span>
                                                </td>
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