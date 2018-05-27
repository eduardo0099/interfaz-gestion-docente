import React from 'react';
import { Button } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import RegistroInvestigacion from "./RegistroInvestigacion"
import ModificarInvestigacion from "./ModificarInvestigacion"
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";
import API from "../api";

export class ListaInvestigaciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
            investigaciones: [],
            ciclos: [],
            cicloSeleccionado: "",
            infoDocente: {}
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

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({ cicloSeleccionado: response.data.cicloActual })
                this.findInvestigaciones(response.data.cicloActual);
                this.findDocente(response.data.cicloActual);
            })
    }

    allCiclos() {
        API.get('general/listaCiclos')
            .then(response => {
                this.setState({ ciclos: response.data.ciclos })
            })
    }

    cambioCiclo = (event) => {
        let ciclo = event.target.value;
        this.findInvestigaciones(ciclo);
    };

    findInvestigaciones(ciclo) {
        API.get('/docente/docente/invDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then(response => {
            this.setState({
                investigaciones: response.data.investigaciones
            })
        }).catch(error => {
            console.log("Error obteniendo la lista de las investigaciones", error);
        });
    }


    eliminar = () => {
        if (window.confirm('Seguro que deseas eliminar esta investigacion?')) {
            // Save it!
            let selectedId = this.state.selectedId;
            API.delete('docente/investigacion/eliminar', {
                data: {
                    id: this.state.selectedId
                }
            }).then(function (response) {
                alert("Investigación eliminada");
            }).catch(function (error) {
                alert("Error: No se pudo eliminar la investigación");
            })

            this.setState({
                investigaciones: this.state.investigaciones.filter(function (el) {
                    return el.id !== selectedId;
                })
            })
        } else {
            // Do nothing!
        }
    }


    render() {

        const columns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'titulo',
            text: 'Nombre'
        }, {
            dataField: 'resumen',
            text: 'Descripcion'
        }];

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

        let myComponent;
        if (this.state.selectedId !== -1) {
            myComponent = <Button disabled={ false } href={ `${this.props.match.url}/${this.state.selectedId}/ModificarInvestigacion` }>Modificar</Button>
        } else {
            myComponent = <Button disabled={ true }>Modificar</Button>
        }

        let eliminar;
        if (this.state.selectedId !== -1) {
            eliminar = <Button disabled={ false } onClick={ this.eliminar }>Eliminar</Button>
        } else {
            eliminar = <Button disabled={ true }>Eliminar</Button>
        }

        return (
            <div>
                <Route exact path={ `${this.props.match.path}` } render={ () =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header">
                                    <a className="btn btn-default pull-right"
                                       onClick={ this.props.history.goBack }> Volver al Perfil </a>
                                    <p className="h2 m-b-sm"> {this.state.infoDocente.nombres} {this.state.infoDocente.apellido_paterno}  {this.state.infoDocente.apellido_materno} <small className="block m-t-xs"> Investigaciones</small> </p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <div>
                                    <p>Ciclo:
                                        <select ref="selectorCiclos" onChange={ this.cambioCiclo }>
                                            { this.state.ciclos.map((item, i) => {
                                                return <option key={ i } value={ item.descripcion }>{ item.descripcion }</option>
                                            }) }
                                        </select>
                                    </p>
                                </div>
                                <div className="m-t-md">
                                    <BootstrapTable keyField='id' data={ this.state.investigaciones } columns={ columns } rowEvents={ rowEvents } selectRow={ selectRow }/>
                                </div>
                                <div className="m-t-md">
                                    <a className="btn btn-primary" href={ `${this.props.match.url}/RegistroInvestigacion` }>Registrar</a>
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    { eliminar }
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    { myComponent }
                                </div>
                            </div>
                        </div>
                    </BaseContainer>
                }/>

                <Route path={ `${this.props.match.path}/RegistroInvestigacion` } component={ RegistroInvestigacion }/>
                <Route path={ `${this.props.match.path}/:idInvestigacion/ModificarInvestigacion` } component={ ModificarInvestigacion }/>

            </div>
        )
    }
}

export default ListaInvestigaciones;