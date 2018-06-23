import React from 'react';
import 'react-table/react-table.css';
import axios from "axios/index";
import '../styles/Actividades.css';
import {Button} from 'react-bootstrap';
import { Route } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";
import RegistroActividad from "./RegistroActividad";
import ModificarActividad from "./ModificarActividad";
import API from "../api";
import Select from 'react-select';
import {currentRole, Role} from "../auth";

export class Actividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
            actividades: [],
            ciclos: [],
            cicloSeleccionado: "",
            infoDocente: {},
            dateInit: new Date(),
            dateFin: new Date(),
        }
    }

    componentDidMount() {
        this.findCicloActual();
        this.allCiclos();
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

    findCicloActual(){
        API.get('general/cicloActual')
            .then(response => {
                this.setState({cicloSeleccionado: response.data.cicloActual})
                this.findActividades(response.data.cicloActual);
                this.findDocente(response.data.cicloActual);
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
        this.findActividades(ciclo);
    };

    findActividades(ciclo) {
        API.get('/docente/docente/actDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then(response => {
            this.setState({
                actividades: response.data.actividades
            })
        }).catch(error => {
            console.log("Error obteniendo la lista de las investigaciones", error);
        });
    }

    guardar = () => {
        var titulo = document.getElementsByName("titulo")[0].value;
        var fechaIni = document.getElementsByName("fechaIni")[0].value;
        var fechaFin = document.getElementsByName("fechaFin")[0].value;
    }

    eliminar = () => {
        if (window.confirm('Seguro que deseas eliminar esta investigacion?')) {
            // Save it!
            let selectedId = this.state.selectedId;
            API.delete('docente/actividad/eliminar', {
                data: {
                    id: this.state.selectedId
                }
            })
                .then(function (response) {
                    alert("Investigación eliminada");
                })
                .catch(function (error) {
                    alert("Error: No se pudo eliminar la investigación");
                })

            this.setState({
                actividades: this.state.actividades.filter(function (el) {
                    return el.id !== selectedId;
                })
            })
        } else {
            // Do nothing!
        }
    }

    onChange = date => this.setState({date})

    render() {
        console.log(this.state);

        const columns = [
            {
                dataField: 'id',
                text: 'ID',
                hidden: true
            }, {
                text: 'Nombre de la Actividad',
                dataField: 'titulo'
            }, {
                text: 'Tipo',
                dataField: 'tipo'
            }, {
                text: 'Fecha Inicio',
                dataField: 'fecha_inicio'
            }, {
                text: 'Fecha Fin',
                dataField: 'fecha_fin',
            }, {
                text: 'Estado',
                dataField: 'estado',
            }
        ];
        const selectRow = {
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5',
            selected: [this.state.selectedId]
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(rowIndex)
                console.log(row)
                this.setState({
                    selectedId: row.id,
                })
            }
        };

        console.log(this.props)

        function myFunction(x) {
            console.log("Row index is: " + x.rowIndex);
        }

        let myComponent;
        if (this.state.selectedId !== -1) {
            myComponent = <Button disabled={false} href={`${this.props.match.url}/${this.state.selectedId}/ModificarActividad`}>Modificar</Button>
        } else {
            myComponent = <Button disabled={true}>Modificar</Button>
        }

        let eliminar;
        if (this.state.selectedId !== -1) {
            eliminar = <Button disabled={false} onClick={this.eliminar}>Eliminar</Button>
        } else {
            eliminar = <Button disabled={true}>Eliminar</Button>
        }

        console.log(this.props)

        return (
            <div>
                <Route exact path={ `${this.props.match.path}` } render={ () =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header">
                                    <a className="btn btn-default pull-right"
                                       onClick={ this.props.history.goBack }> Volver al Perfil </a>
                                    <p className="h2 m-b-sm"> { this.state.infoDocente.nombres } { this.state.infoDocente.apellido_paterno } { this.state.infoDocente.apellido_materno } - Actividades</p>
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
                                                searchable={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="m-t-md">
                                    <BootstrapTable keyField='id' data={ this.state.actividades } columns={ columns } rowEvents={ rowEvents } selectRow={ selectRow }/>
                                </div>
                            </div>

                            { !(currentRole() === Role.JEFE_DEPARTAMENTO)?
                                <div className="m-t-md">
                                    <a className="btn btn-primary" href={ `${this.props.match.url}/RegistroActividad` }>Registrar</a>
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    { eliminar }
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    { myComponent }
                                </div>
                                :
                                <div></div>
                            }

                        </div>
                    </BaseContainer>
                }/>

                <Route path={`${this.props.match.path}/RegistroActividad`} component={RegistroActividad}/>
                <Route path={`${this.props.match.path}/:idActividad/ModificarActividad`} component={ModificarActividad}/>

            </div>
        );
    }
}

export default Actividades;
    