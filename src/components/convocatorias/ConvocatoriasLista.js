import React, {Component} from 'react';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import {Route} from 'react-router-dom';
import DetalleConvocatoria from "./DetalleConvocatoria";
import {Row, Grid, Table, Button, PageHeader, Modal, Popover, Tooltip, OverlayTrigger, Col} from 'react-bootstrap';

class ConvocatoriasLista extends Component {

    state: {
        convocatorias: []
    }

    componentWillMount() {
        // search();
        this.offlineSearch();
    }

    search() {
        axios.get('http://200.16.7.151:8080/convocatoria/lista')
            .then(response => {
                this.setState({convocatorias: response.data});
            })
    }

    offlineSearch() {
        this.setState({
            convocatorias: [
                {
                    id: '1',
                    codigo: 'CONV001',
                    nombre: 'Convocatoria de Asistente de Docencia',
                    estado: 'Creada',
                    curso: {id: 2, nombre: 'Sistemas Operativos', codigo: 'INF298'},
                    seccion: {id: 4, nombre: 'Sección de Ing. Informática'},
                    departamento: {id: 3, nombre: 'Departamento de Ingeniería'},
                    fechaInicio: '20/08/12',
                    fechaFin: '20/08/12',
                    fechaRegistro: '20/08/12',
                    cantidadPostulantes: 20
                },
                {
                    id: '2',
                    codigo: 'CONV002',
                    nombre: 'Convocatoria de Jefe de Práctica',
                    estado: 'Finalizada',
                    curso: {id: 5, nombre: 'Ingeniería de Software', codigo: 'INF248'},
                    seccion: {id: 4, nombre: 'Sección de Ing. Informática'},
                    departamento: {id: 3, nombre: 'Departamento de Ingeniería'},
                    fechaInicio: '20/08/12',
                    fechaFin: '20/08/12',
                    fechaRegistro: '20/08/12',
                    cantidadPostulantes: 1
                }
            ]
        });
    }

    labelEstado(estado) {
        switch (estado) {
            case 'Creada':
                return <span class="label label-default"> Creado </span>;
            case 'Abierta':
                return <span class="label label-success"> Cerrado </span>;
            case 'Cerrada':
                return <span class="label label-danger"> Cerrado </span>;
            case 'Cancelada':
                return <span class="label label-danger"> Cancelado </span>;
            case 'Finalizada':
                return <span class="label label-success"> Finalizado </span>;
            default:
                return <span></span>;
        }
    }



    render() {
        var headerStyle = {
            color: 'black'
        }
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <button className="btn btn-sm btn-primary pull-right m-t-md"> Nueva Convocatoria </button>
                                <h2 style={headerStyle}> Convocatorias </h2>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="v-middle col-md-1 text-center"> Código</th>
                                        <th className="v-middle col-md-4"> Nombre</th>
                                        <th className="v-middle col-md-3"> Curso</th>
                                        <th className="v-middle col-md-3"></th>
                                        <th className="v-middle col-md-1 text-center"> Estado</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.convocatorias.map(item => {
                                            return (
                                                <tr>
                                                    <td className="v-middle text-center">
                                                        <Button className="block text-primary" href={'/convocatorias/' + item.codigo}> {item.codigo} </Button>
                                                        <small className="block text-muted"> {item.fechaRegistro} </small>
                                                    </td>
                                                    <td className="v-middle">
                                                        <span> {item.nombre} </span>
                                                    </td>
                                                    <td className="v-middle">
                                                        <span className="block text-primary"> {item.curso.nombre} </span>
                                                        <small className="block text-muted"> {item.curso.codigo} </small>
                                                    </td>
                                                    <td className="v-middle text-center">
                                                        <p className="badge"> {item.cantidadPostulantes} </p>
                                                        <span className="block small text-muted m-t-xs"> postulantes </span>
                                                    </td>
                                                    <td className="v-middle text-center">
                                                        {this.labelEstado(item.estado)}
                                                    </td>
                                                    <td>

                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
                <Route path={`${this.props.match.path}/:codigoConv`} component={DetalleConvocatoria}/>
            </div>
        );
    }

}

export default ConvocatoriasLista;