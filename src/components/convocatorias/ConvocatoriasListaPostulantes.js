import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import Cursos from "../Cursos";
import ConvocatoriaNuevo from "./ConvocatoriasNuevo";
import registroPostulante from "./registroPostulante";
import linkConvocatoria from "./linkConvocatoria";
import ConvocatoriasPostulantePerfil from "./ConvocatoriasPostulantePerfil";
import API from '../../api.js';

class ConvocatoriasListaPostulantes extends Component {


    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            fecha_limite: '',
            postulantes: []
        }

    }

    componentWillMount() {
        // search();
        this.search();
    }

    search() {
        API.get('convocatoria/convocatoria/detalle', {
            params: {
                id: this.props.match.params.codigoConv
            }
        }).then(response => {
            this.setState(response.data[0]);
        })
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
                return <span className="label label-warning"> Sin Verificar </span>;
        }
    }

    render() {
        return (
            <div>
                <Route exact path={ `${this.props.match.path}` } render={ () =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h2> { this.state.nombre } </h2>
                            </div>
                            <div className="panel-body">
                                <div className="col-md-offset-0 col-md-4">
                                    <h5> Fecha límite de Postulación: </h5>
                                    <h5> Cantidad de postulantes: </h5>
                                    <h5> Cantidad de postulantes aceptados: </h5>
                                    <h5></h5>
                                </div>
                                <div className="col-md-5">
                                    <h5> { this.state.fecha_limite } </h5>
                                    <h5> { this.state.cantPostulantes } </h5>
                                    <h5> { this.state.cantAceptados } </h5>
                                    <h5></h5>
                                </div>

                                <a className="btn btn-default pull-right" href={ `${this.props.history.location.pathname}/link` }> URL </a>

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
                                                        <a className="block text-primary" href={ `${this.props.history.location.pathname}/postulante/${item.id}` }> { item.codigo } AC S</a>
                                                    </td>
                                                    <td className="v-middle">
                                                        <span className="block text-primary"> { item.nombre } </span>
                                                    </td>
                                                    <td className="v-middle text-center">
                                                        <span className="block"> { item.fecha_postulacion } </span>
                                                    </td>
                                                    <td className="v-middle text-center">
                                                        { this.labelDocumento(item.estadoDocumentos) }
                                                    </td>
                                                    <td className="v-middle text-center">
                                                        { this.labelPostulacion(item.estado_postulacion) }
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
                <Route path={ `${this.props.match.path}/postulante/:id` } component={ ConvocatoriasPostulantePerfil }/>
                <Route path={ `${this.props.match.path}/link` } component={ linkConvocatoria }/>
            </div>
        );
    }

}

export default ConvocatoriasListaPostulantes;