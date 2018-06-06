import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom';
import DetalleDocente from "./DetalleDocente";
import BaseContainer from "./BaseContainer";
import Collapsible from 'react-collapsible';
import axios from "axios/index";
import {Glyphicon, Dropdown, MenuItem, Col, FormControl, Form, FormGroup, ControlLabel, Panel, Button, Radio} from 'react-bootstrap';
import API from '../api';

class ListaProfesores extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: 'true',
            error: '',
            profesores: [],
            profesoresAux: [],
            profeText: '',
            codigoText: '',
            filtroSeccionKey: "Todos",
            filtro1: -1,
            open: false,
            secciones: [],
        }
    }

    componentDidMount() {
        API.get('general/listaDocente')
            .then(response => {
                this.setState({loading: false, profesores: response.data.docentes, profesoresAux: response.data.docentes});
            })
            .catch(error => {
                this.setState({
                    error: `${error}`,
                    loading: false
                });
            });
        this.allSecciones();
    }

    allSecciones() {
        API.get('general/listaSecciones')
            .then(response => {
                this.setState({ secciones: response.data.secciones })
            })
    }
    /*
    handleFiltroSeccionkey = e => {
        if (e.target.value === "Todos") {
            this.setState({
                filtroSeccionkey: e.target.value,
                filtro1: -1
            })
        } else {
            this.setState({
                filtroSeccionkey1: e.target.value,
                listaProfesoresParcial: this.state.listaProfesoresTotal.filter(c => c.seccion === e.target.value),
                filtro1: 1,
                listaFiltrada1: this.state.listaProfesoresParcial
            })
        }
    }
    */

    busquedaNombreProfesor = e => {
        this.setState({
            profeText: e.target.value,
        })

        if (this.state.profeText == '') {//la lista no esta filtrada
            var aux = this.state.profesores.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        else {//el filtro tiene algo
            var aux = this.state.profesoresAux.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1
            });
        }
        this.setState({
            profesores: aux
        })
    }


    busquedaCodigoProfesor = e => {
        this.setState({
            codigoText: e.target.value
        })

        if (this.state.codigoText == '') {//la lista no esta filtrada
            var aux = this.state.profesores.filter((d) => {
                return d.codigo.indexOf(e.target.value) !== -1
            });
        }
        else {//el filtro tiene algo
            var aux = this.state.profesoresAux.filter((d) => {
                return d.codigo.indexOf(e.target.value) !== -1
            });
        }
        this.setState({
            profesores: aux
        })
    }


    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h2> Profesores </h2>
                            </div>

                            <Col md={ 10 }>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalSeccion">




                                        <Col sm={ 4 }>
                                            <FormControl type="text" placeholder="Buscar Nombre Profesor"
                                                         value={ this.state.profeText}
                                                         onChange={ this.busquedaNombreProfesor.bind(this) }/>
                                        </Col>

                                        <Col sm={ 6 }>
                                            <Button onClick={() => this.setState({ open: !this.state.open })}>
                                                Búsqueda avanzada
                                            </Button>
                                            <br />
                                            <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
                                                <Panel.Collapse>
                                                    <Panel.Body>
                                                        <FormGroup>
                                                            <label> Secciones </label>
                                                            <p> </p>
                                                            <Radio name="radioGroup" inline>
                                                                1
                                                            </Radio>{' '}
                                                            <Radio name="radioGroup" inline>
                                                                2
                                                            </Radio>{' '}
                                                            <Radio name="radioGroup" inline>
                                                                3
                                                            </Radio>

                                                        </FormGroup>
                                                    </Panel.Body>
                                                </Panel.Collapse>
                                            </Panel>
                                        </Col>



                                    </FormGroup>
                                </Form>
                            </Col>

                            <div className="panel-body">
                                <table className="table table-striped table-hover">
                                    <tbody>
                                    {this.state.profesores.map(profesor => {
                                        return (
                                            <tr className="pointer">
                                                <td className="col-md-12">
                                                    <span className="block text-primary"><Link to={"/profesores/"+profesor.codigo}> {profesor.nombre}</Link> </span>
                                                    <small className="block text-muted"> {profesor.codigo} </small>
                                                </td>
                                                <td className="v-middle">
                                                    <Dropdown className="dropdown-options" pullRight>
                                                        <Dropdown.Toggle className="dropdown-options" noCaret="true">
                                                            <Glyphicon glyph="option-vertical"/>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <MenuItem href={'/profesores/' + profesor.codigo}>Ver
                                                                Perfil</MenuItem>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
                <Route path={`${this.props.match.path}/:codigo`} component={DetalleDocente}/>
            </div>
        );
    }
}

export default ListaProfesores;