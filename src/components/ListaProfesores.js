import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom';
import DetalleDocente from "./DetalleDocente";
import BaseContainer from "./BaseContainer";
import fotoAnonima from '../resources/images/anonimo.png';
import Collapsible from 'react-collapsible';
import axios from "axios/index";
import {Glyphicon, Dropdown, MenuItem, Col, FormControl, Form, FormGroup, ControlLabel, Panel, Button, Radio} from 'react-bootstrap';
import API from '../api';
import { EmailShareButton, ViberIcon, EmailIcon } from 'react-share';
import {Role, currentRole} from '../auth';
import { Image } from 'react-bootstrap';

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
                                {currentRole() === Role.JEFE_DEPARTAMENTO ? 1: 2}
                            </div>
                            <Col md={ 10 }>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalSeccion">
                                        <Col sm={ 4 }>
                                            <FormControl type="text" placeholder="Buscar Nombre Profesor"
                                                         value={ this.state.profeText}
                                                         onChange={ this.busquedaNombreProfesor.bind(this) }/>
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
                                                <td className="col-md-1">
                                                    <Image src={ fotoAnonima } circle width="50" height="50"/>
                                                </td>
                                                <td className="col-md-6">
                                                    <span className="block text-primary"><Link to={"/profesores/"+profesor.codigo}> {profesor.nombre}</Link> </span>
                                                    <small className="block text-muted"> Codigo: {profesor.codigo} </small>
                                                </td>
                                                <td className="col-md-4">

                                                    <EmailShareButton children={<EmailIcon size={16} round={true} />}><span>{ profesor.correo_pucp }</span></EmailShareButton>
                                                    <ViberIcon size={16} round={true}/>
                                                    <ViberIcon size={16} round={true}/>
                                                </td>
                                                <td className="col-md-4">
                                                    <span className="block text-muted">{profesor.descripcion}</span>
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