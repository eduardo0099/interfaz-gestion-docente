import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel,  Dropdown, Glyphicon, MenuItem,FormControl,Modal} from 'react-bootstrap';
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
            cursoText:'',
            showDetalleCurso:false,
            selectedNombre:'',
            cursosAux:[],
            cursos: [
                {
                    id: 20,
                    codigo: 'INF666',
                    nombre: 'Chistemas Operativos',
                    seccion: 'Chinformatica',
                    creditos: 20,
                    tipo_curso:'Pregrado',
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

    componentDidMount() {
        this.findCursos();
    }

    findCursos() {
        API.get('/general/listaCurso')
            .then(response => {
                console.log(response);
                this.setState({
                    cursos: response.data.curso,
                    cursosAux: response.data.curso
                })
            }).catch(error => {
            console.log("Error obteniendo la lista de cursos", error);
        });
    }

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

    busquedaNombreProfesor = e => {
        this.setState({
            cursoText: e.target.value,
        })

        if (this.state.cursoText == '') {//la lista no esta filtrada
            var aux = this.state.cursos.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1 || d.codigo.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        else {//el filtro tiene algo
            var aux = this.state.cursosAux.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1 || d.codigo.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        this.setState({
            cursos: aux
        })
    }

    render() {
        return (
            <div>
                <div className="col-md-4">
                    <FormControl type="text" placeholder="Buscar Curso"
                                 value={ this.state.cursoText}
                                 onChange={ this.busquedaNombreProfesor.bind(this) }/>
                </div>
                <br></br>
                <br></br>
                <Route exact path={`${this.props.ruta}`} render={() =>
                    <div className="panel ">
                        <div className="panel-body row">
                            <Panel>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="col-md-3 "> Curso</th>
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
                                                    <span> {curso.tipo_curso}</span>
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