import React, {Component} from 'react';
import {Route,Link,Redirect} from 'react-router-dom';
import DetalleDocente from "./DetalleDocente";
import BaseContainer from "./BaseContainer";
import fotoAnonima from '../resources/images/anonimo.png';
import email from '../resources/images/email.jpg';
import phone from '../resources/images/phone.png';
import Collapsible from 'react-collapsible';
import axios from "axios/index";
import {Glyphicon, Dropdown, MenuItem, Col, FormControl, Form, FormGroup, ControlLabel, Panel, Button, Radio} from 'react-bootstrap';
import API from '../api';
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
            auth: false,
            verAuth: false,
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
                    ruta: "/profesores"
                }
            }).then(resp => {
                console.log("resp", resp.data);
                this.setState({ auth: resp.data.permiso,verAuth:true });
            }).catch(err => {
                console.log("err", err);
            })
        }
    }

    componentDidMount() {
        API.get('general/listaDocente')
            .then(response => {
                console.log(response);
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
        var divStyle = {
            color: 'white',
            backgroundColor: '#87cefa',
        };
        if(!this.state.auth && this.state.verAuth){
            return(<Redirect to="/home"/>);
        }else if (!this.state.verAuth){
            return(<div/>);
        }
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h2> Profesores </h2>
                            </div>
                            <div className="row">
                                <div className="col-md-1"></div>
                                <Form horizontal>
                                    <FormGroup controlId="formHorizontalSeccion">
                                        <Col sm={ 4 }>
                                            <FormControl type="text" placeholder="Buscar Nombre Profesor"
                                                         value={ this.state.profeText}
                                                         onChange={ this.busquedaNombreProfesor.bind(this) }/>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </div>

                            <div className="row">

                                <div className="col-md-1" style={divStyle}><p className="bold">Foto</p></div>
                                <div className="col-md-5" style={divStyle}><p class="bold">Nombre</p></div>
                                <div className="col-md-4" style={divStyle}><p className="bold">Informacion de contacto</p></div>
                                <div className="col-md-1" style={divStyle}><p className="bold">Tipo</p></div>
                            </div>

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
                                                <td className="col-md-6">
                                                    <div className="row">
                                                        <div className="col-xs-6 col-md-6">
                                                            <div className="col-md-1">
                                                                <Image src={ email } width="20" height="20"/>
                                                            </div>
                                                            <div className="col-md-2">
                                                                <span className="block text-muted">{ profesor.correo_pucp } </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xs-6 col-md-6"><div className="col-md-1">
                                                            <Image src={ phone } width="20" height="20"/>
                                                        </div>
                                                            <div className="col-md-2">
                                                                <span className="block text-muted">{ profesor.telefono }</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="col-md-4">
                                                    <span className={"label label-" + ({
                                                        'TC': 'success',
                                                        'TPA': 'warning',
                                                    }[profesor.descripcion])}> {profesor.descripcion} </span>
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