import React from 'react';
import BaseContainer from "./BaseContainer";
import {Route} from 'react-router-dom';
import API from "../api";
import Select from 'react-select';
import { Button, Modal } from 'react-bootstrap';
import RegistroInvestigacion from "./RegistroInvestigacion";
import ModificarInvestigacion from "./ModificarInvestigacion";
import {Role, currentRole} from "../auth";
import {Panel,  Dropdown, Glyphicon, MenuItem} from 'react-bootstrap';


export class ListaInvestigaciones extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
            investigaciones: [],
            verComentarios: false,
            ciclos: [],
            cicloSeleccionado: "",
            infoDocente: {},
            selectedTitulo:"",
            selectedResumen:"",
            show: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    componentDidMount() {
        this.allCiclos();
        this.findCicloActual();
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

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo })
        this.findInvestigaciones(ciclo);
    };

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleHide() {
        this.setState({ show: false });
    }

    handleMostrarResumen(obj, event){
        this.setState({show: true,
            selectedTitulo:obj.titulo,
            selectedResumen:obj.resumen});
    }

    eliminar = (item,e) => {
        if (window.confirm('Seguro que deseas eliminar esta investigacion?')) {
            // Save it!
            let selectedId = item.id;
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
                                <p className="h2 m-b-sm"> { this.state.infoDocente.nombres } { this.state.infoDocente.apellido_paterno } { this.state.infoDocente.apellido_materno } - Investigaciones</p>
                            </header>
                        </div>
                        <div className="panel-body">
                            <div className="col-md-8">
                                <div className="col-md-1">
                                    <label> Ciclo: </label>
                                </div>
                                <div className="col-md-3">
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
                                <th className="v-middle col-md-4 text-center"> Titulo</th>
                                <th className="v-middle col-md-2 text-center"> Fecha Inicio</th>
                                <th className="v-middle col-md-2 text-center"> Estado</th>
                                <th className="v-middle col-md-2 text-center"> Archivo</th>
                                <th className="v-middle col-md-2 text-center"> Resumen</th>
                                <th className="v-middle col-md-2 text-center">&nbsp;</th>
                                </thead>
                                <tbody>
                                { this.state.investigaciones.map(item => {
                                    return <tr keyField='id' rowEvents={ rowEvents } selectRow={ selectRow } >
                                        <td className="v-middle">
                                            <span className="block text-primary"> { item.titulo } </span>
                                        </td>
                                        <td className="v-middle text-center">
                                            <span className="block text-muted"> 02/05/2018 </span>
                                        </td>
                                        <td className="v-middle text-center">
                                            <span className="block text-muted"> { item.estado }  </span>
                                        </td>
                                        <td className="v-middle text-center">
                                            <Button bsStyle="info">Descargar</Button>
                                        </td>
                                        <td className="v-middle text-center modal-container" >
                                            <Button bsStyle="info" onClick={this.handleMostrarResumen.bind(this,item)} >Ver</Button>
                                        </td>
                                        {!(currentRole() === Role.JEFE_DEPARTAMENTO) ?
                                            <td className="v-middle">
                                                <Dropdown className="dropdown-options" pullRight>
                                                    <Dropdown.Toggle className="dropdown-options" noCaret="true">
                                                        <Glyphicon glyph="option-vertical"/>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <MenuItem onClick={this.eliminar.bind(this, item)}>Eliminar</MenuItem> :
                                                        <MenuItem href={ `${this.props.match.url}/${item.id}/ModificarInvestigacion` }>Modificar</MenuItem>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            :
                                            <td></td>
                                        }
                                    </tr>
                                }) }
                                </tbody>
                            </table>
                        </div>

                        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.selectedTitulo}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.selectedResumen}
                            </Modal.Body>
                        </Modal>

                    { !(currentRole() === Role.JEFE_DEPARTAMENTO)?
                        <div className="m-t-md">
                            <a className="btn btn-primary" href={ `${this.props.match.url}/RegistroInvestigacion` }>Registrar</a>
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

                <Route path={ `${this.props.match.path}/RegistroInvestigacion` } component={ RegistroInvestigacion }/>
                <Route path={ `${this.props.match.path}/:idInvestigacion/ModificarInvestigacion` } component={ ModificarInvestigacion }/>
            </div>
        )

    }
}


export default ListaInvestigaciones;