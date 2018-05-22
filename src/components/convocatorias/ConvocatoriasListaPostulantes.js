import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import Cursos from "../Cursos";
import ConvocatoriaNuevo from "./ConvocatoriasNuevo";

class ConvocatoriasListaPostulantes extends Component {

    state: {
        nombre:'',
        fechaLimite:'',
        cantPostulantes:'',
        cantAceptados:'',
        postulantes: []
    }

    componentWillMount() {
        // search();
        this.offlineSearch();
    }

    search() {
        axios.get('http://200.16.7.151:8080/convocatoria/general', {
            params: {
                codigo: this.props.match.params.codigoConv,
            }
        })
            .then(response => {
                this.setState({
                    nombre: response.data.nombre,
                    fechaLimite: response.data.fechaLimite,
                    cantPostulantes: response.data.cantPostulantes,
                    cantAceptados: response.data.cantAceptados,
                    postulantes: response.data});
            })
    }

    offlineSearch() {
        this.setState({
            nombre: 'Convocatoria de Asistente de Docencia - Sistemas Operativos',
            fechaLimite: '20/08/12',
            cantPostulantes: 2,
            cantAceptados: 1,
            postulantes: [
                {
                    id: '1',
                    codigo: 'POS001',
                    nombre: 'Rubén Jordán RIP',
                    numeroDocumento: '74836789',
                    documento: {
                        nombre: 'Documento Nacional de Identidad',
                        simbolo: 'DNI'
                    },
                    fechaPostulacion: '12/12/12',
                    estadoPostulacion: 'Aceptado',
                    estadoDocumentos: 'Verificados',
                },
                {
                    id: '2',
                    codigo: 'POS002',
                    nombre: 'Rubén RIP',
                    numeroDocumento: '74456789',
                    documento: {
                        nombre: 'Documento Nacional de Identidad',
                        simbolo: 'DNI'
                    },
                    fechaPostulacion: '12/12/12',
                    estadoPostulacion: 'Rechazado',
                    estadoDocumentos: 'Inconsistentes',
                },
            ]
        });
    }

    labelDocumento(estado) {
        switch (estado) {
            case 'Verificados':
                return <span className="label label-success"> Verificados </span>;
            case 'Inconsistentes':
                return <span className="label label-danger"> Inconsistentes </span>;
            case 'Sin Verificar':
                return <span className="label label-danger"> Sin Verificar </span>;
        }
    }

    labelPostulacion(estado) {
        switch (estado) {
            case 'Aceptado':
                return <span className="label label-success"> Aceptado </span>;
            case 'Rechazado':
                return <span className="label label-danger"> Rechazado </span>;
            case 'Pendiente':
                return <span className="label label-danger"> Sin Verificar </span>;
        }
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h2> {this.state.nombre} </h2>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-offset-0 col-md-4">
                                    <h5> Fecha límite de Postulación: </h5>
                                    <h5> Cantidad de postulantes: </h5>
                                    <h5> Cantidad de postulantes aceptados: </h5>
                                    <h5></h5>
                                </div>
                                <div className="col-md-5">
                                    <h5> {this.state.fechaLimite} </h5>
                                    <h5> {this.state.cantPostulantes} </h5>
                                    <h5> {this.state.cantAceptados} </h5>
                                    <h5></h5>
                                </div>
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th className="v-middle col-md-1 text-center"> Código</th>
                                        <th className="v-middle col-md-2"> Nombre</th>
                                        <th className="v-middle col-md-3 text-center"> Fecha Postulacion</th>
                                        <th className="v-middle col-md-3 text-center"> Estado Documentos</th>
                                        <th className="v-middle col-md-3 text-center"> Estado Postulación</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.postulantes.map(item => {
                                            return (
                                                <tr>
                                                    <td className="v-middle text-center">
                                                        <span className="block text-primary"> {item.codigo} </span>
                                                    </td>
                                                    <td className="v-middle">
                                                        <span className="block text-primary"> {item.nombre} </span>
                                                        <small className="block text-muted"> {item.documento.simbolo} {item.numeroDocumento}</small>
                                                    </td>
                                                    <td className="v-middle text-center">
                                                        <span className="block"> {item.fechaPostulacion} </span>
                                                    </td>
                                                    <td className="v-middle text-center">
                                                        {this.labelDocumento(item.estadoDocumentos)}
                                                    </td>
                                                    <td className="v-middle text-center">
                                                        {this.labelPostulacion(item.estadoPostulacion)}
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
                <Route path={`${this.props.match.path}/nuevo`} component={ConvocatoriaNuevo}/>
            </div>
        );
    }

}

export default ConvocatoriasListaPostulantes;