import React, { Component } from 'react';
import { Grid, Row, Button,Modal } from 'react-bootstrap';
import axios from "axios/index";
import Detalle_DescargaHoras from "./Detalle_DescargaHoras";
import BaseContainer from "./BaseContainer";
import API from "../api";
import Select from 'react-select';
import {Role,currentRole} from "../auth";
import NuevaDescargaHoras from "./NuevaDescargaHoras";
import {Route} from 'react-router-dom';

class DescargaHoras extends React.Component {
    constructor(props) {
        super(props);
        this.handleOpenModal=this.handleOpenModal.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.state = {
            descargas: [],
            ciclos: [],
            cicloSelect: "",
            selectedId: -1,
            verDetalle: false,
            infoDocente: {},
            showModalMod:false,
            nombreSelcc:"",
            horarioSelecc:"",
            totalHorasSelecc:-1,
            cicloActual:-1,
            semana:-1,
            horas:-1,
            motivo:"",
        }
        this.changeHoras=this.changeHoras.bind(this);
        this.changeSemana=this.changeSemana.bind(this);
        this.changeMotivo=this.changeMotivo.bind(this);
    }

    componentDidMount() {
        this.findCicloActual();
        this.allCiclos();
    }

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({
                    cicloSeleccionado: response.data.cicloActual,
                    cicloActual:response.data.cicloActual
                })
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
            showModalMod: false,
        });
    };

    mostarComentarios = (index) => {
        this.setState({
            selectedId: index,
            verDetalle: true,
        });
    };

    handleModificar(descarga,e){
        {(currentRole()===Role.JEFE_DEPARTAMENTO )?
            this.setState({
                showModalMod : false,
            })
            :
            this.setState({
                showModalMod : true,
            })
        }
        this.setState({
            nombreSelcc:descarga.nombre,
            horarioSelecc:descarga.codigo,
            totalHorasSelecc:descarga.hDescargaTotal,
        },()=>{
            this.handleOpenModal;
        })

    }

    handleOpenModal(){
        {currentRole()===Role.JEFE_DEPARTAMENTO ||currentRole()===Role.COORDINADOR?
            this.setState({
                showModalMod : false,
            })
            :
            this.setState({
                showModalMod : false,
            })
        }
    }
    handleClose(){
        this.setState({
            showModalMod : false,
        })
    }

    changeSemana(event){
        this.setState({
            semana:event.target.value,
        })
    }

    changeHoras(event){
        this.setState({
            horas:event.target.value,
        })
    }

    changeMotivo(event){
        this.setState({
            motivo:event.target.value,
        })
    }

    render() {
        if (!this.state.verDetalle) {
            return (
                <div>
                    <Route exact path={ `${this.props.match.path}` } render={() =>
                        <BaseContainer>
                            <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                                <div className="panel-heading">
                                    <header className="page-header">
                                        <a className="btn btn-default pull-right"
                                           onClick={this.props.history.goBack}> Volver al Perfil </a>
                                        <p className="h2 m-b-sm"> {this.state.infoDocente.nombres} {this.state.infoDocente.apellido_paterno} {this.state.infoDocente.apellido_materno} -
                                            Descarga de Horas</p>
                                    </header>
                                </div>
                                <div className="panel-body">
                                    <div className="col-md-6">
                                        <div className="col-md-2">
                                            <label> Ciclo: </label>
                                        </div>
                                        <div className="col-md-4">
                                            <Select
                                                value={this.state.cicloSeleccionado}
                                                onChange={this.cambioCiclo}
                                                valueKey={"descripcion"}
                                                labelKey={"descripcion"}
                                                options={this.state.ciclos}
                                                clearable={false}
                                                searchable={false}
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

                                        {this.state.descargas.map((descarga, i) => {
                                            return <tr key={i} onClick={this.handleModificar.bind(this, descarga)}>
                                                <td className="v-middle">
                                                    <span className="block text-primary"> {descarga.nombre} </span>
                                                </td>
                                                <td className="v-middle text-center">{descarga.codigo}</td>
                                                <td className="v-middle text-center">{descarga.hDescargaTotal}</td>
                                                <td className="v-middle">
                                                    <Button onClick={() => this.mostarComentarios(i)}>Ver
                                                        Detalle</Button>
                                                </td>
                                            </tr>
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    {(currentRole() === Role.JEFE_DEPARTAMENTO) || currentRole()===Role.COORDINADOR ?
                                        <span></span>
                                        :
                                        <div>
                                            <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                            <a className="btn btn-primary"
                                               href={`${this.props.match.url}/RegistroNuevaDescarga`}
                                               role="button">Nuevo</a>
                                        </div>
                                    }
                                </div>
                            </div>
                        </BaseContainer>
                    }/>
                    <Route path={ `${this.props.match.path}/RegistroNuevaDescarga` } component={ NuevaDescargaHoras }/>
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