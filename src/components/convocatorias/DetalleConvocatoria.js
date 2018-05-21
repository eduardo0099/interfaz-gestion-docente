import React, {Component} from 'react';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";

class DetalleConvocatoria extends Component {

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
                    postulantes: response.data.postulantes
                });
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
                    nombre: 'Jose Luis Gil',
                    fechaInicio: '02/08/12',
                    estadoDoc: 'Completo',
                    estadoPostulacion: 'Aceptado'
                },
                {
                    id: '1',
                    codigo: 'POS002',
                    nombre: 'Victor Khlebnikov',
                    fechaInicio: '12/08/12',
                    estadoDoc: 'Incompleto',
                    estadoPostulacion: 'Rechazado'
                }
            ]
        });
    }

    labelEstado(estado) {
        switch (estado) {
            case 'Aceptado':
                return <span class="label label-success"> Aceptado </span>;
            case 'Rechazado':
                return <span class="label label-danger"> Rechazado </span>;
            case 'Completo':
                return <span class="label label-success"> Completo </span>;
            case 'Incompleto':
                return <span class="label label-danger"> Incompleto </span>;
            default:
                return <span></span>;
        }
    }



    render() {
        var headerStyle = {
            color: 'black'
        }
        return (
            <BaseContainer>
                <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <h2 style={headerStyle}> {this.state.nombre} </h2>
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
                                <th className="v-middle col-md-4"> Nombre</th>
                                <th className="v-middle col-md-3"> Fecha Postulación</th>
                                <th className="v-middle col-md-2"> Estado Documentos</th>
                                <th className="v-middle col-md-2 text-center"> Estado Postulación</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.postulantes.map(item => {
                                    return (
                                        <tr>
                                            <td className="v-middle text-center">
                                                <span> {item.codigo} </span>
                                            </td>
                                            <td className="v-middle">
                                                <span> {item.nombre} </span>
                                            </td>
                                            <td className="v-middle">
                                                <span> {item.fechaInicio} </span>
                                            </td>
                                            <td className="v-middle text-center">
                                                {this.labelEstado(item.estadoDoc)}
                                            </td>
                                            <td className="v-middle text-center">
                                                {this.labelEstado(item.estadoPostulacion)}
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
        );
    }

}

export default DetalleConvocatoria;