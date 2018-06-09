import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel,  Dropdown, Glyphicon, MenuItem,Modal} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "../AyudaEconomica/AyudaEconomicaNuevo";
import API from "../../api";
import AyudaEconomicaDetalle from "../AyudaEconomica/AyudaEconomicaDetalle";
import AyudaEconomicaAprobar from "../AyudaEconomica/AyudaEconomicaAprobar";


class DashboardCursos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showDetalleCurso:false,
            selectedNombre:'',
            cursos: [
                {
                    id: 20,
                    codigo: 'INF666',
                    nombre: 'Chistemas Operativos',
                    seccion: 'Chinformatica',
                    creditos: 20,
                    tipo:'Pregrado',
                }],
            horariosSes:[
                {
                    id:1,
                    horario:"0666",
                    profesor:"Viktor Khlebnikov",
                    codigo_prof:"18456666",
                    sesiones:"LUN 3am-6pm v666"
                }
            ]
        }
    }
/*
    componentDidMount() {
        this.findCicloActual();
        this.allCiclos();
    }*/

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({ cicloSeleccionado: response.data.cicloActual })
                this.findAyudas(response.data.cicloActual);
            })
    }

    allCiclos() {
        API.get('general/listaCiclos')
            .then(response => {
                this.setState({ ciclos: response.data.ciclos })
            })
    }

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo })
        this.findAyudas(ciclo);
        this.reestablecerFiltros();
    };

    handleMostrarCurso(obj, event){
        this.setState({showDetalleCurso: true,
        selectedNombre:obj.nombre});
    }

    handleClose(){
        this.setState({showDetalleCurso: false});
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.ruta}`} render={() =>
                    <div className="panel ">
                        <div className="panel-body row">
                            <Panel>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="col-md-2 "> Curso</th>
                                        <th className="col-md-2"> Sección</th>
                                        <th className="col-md-2 text-center"> Créditos</th>
                                        <th className="col-md-2 text-center"> Tipo</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.cursos.map(curso => {
                                        return (
                                            <tr onClick={this.handleMostrarCurso.bind(this,curso)}>
                                                <td className="v-middle">
                                                    <span className="block text-primary"> { curso.nombre } </span>
                                                    <small className="block text-muted"> { curso.codigo } </small>
                                                </td>
                                                <td className="v-middle ">
                                                    <span> {curso.seccion}</span>
                                                </td>
                                                <td className="v-middle text-center">
                                                    <span className="badge badge-blue"> { curso.creditos } </span>
                                                </td>
                                                <td className="v-middle text-center">
                                                    <span> {curso.tipo}</span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </Panel>
                        </div>
                    </div>
                }/>
                <Modal show={this.state.showDetalleCurso} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.selectedNombre}: Horarios</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th className="col-md-1 "> Horario</th>
                                    <th className="col-md-2"> Profesor</th>
                                    <th className="col-md-4 "> Sesiones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.horariosSes.map(horarioSes => {
                                    return (
                                        <tr>
                                            <td className="v-middle">
                                                <span className="block text-primary text-md"> { horarioSes.horario } </span>
                                            </td>
                                            <td className="v-middle ">
                                                <span className="block"> {horarioSes.profesor}</span>
                                                <small className="block text-muted"> { horarioSes.codigo_prof } </small>
                                            </td>
                                            <td className="v-middle">
                                                <span> { horarioSes.sesiones } </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

                            <div className=" text-right">
                                <button className="btn btn-sm  ">Descargar Programa Analítico</button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default DashboardCursos;