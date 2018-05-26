import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import {Panel} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";

class AyudaEconomica extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            ayudas: [
                {
                    id: 20,
                    codigo: 'SOL001',
                    profesor: {
                        id: 1,
                        nombre: 'Viktor Kalashnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 1'},
                    motivo: {id: 13, descripcion: 'Compra de Materiales'},
                    estado: {id: 12, descripcion: 'Aprobado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12',
                },
                {
                    id: 21,
                    codigo: 'SOL002',
                    profesor: {
                        id: 1,
                        nombre: 'Alejando Khlebnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 2'},
                    motivo: {id: 13, descripcion: 'Compra de Café'},
                    estado: {id: 12, descripcion: 'Rechazado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12'
                },
                {
                    id: 21,
                    codigo: 'SOL002',
                    profesor: {
                        id: 1,
                        nombre: 'Alejando Khlebnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 2'},
                    motivo: {id: 13, descripcion: 'Compra de Café'},
                    estado: {id: 12, descripcion: 'Rechazado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12'
                },
                {
                    id: 21,
                    codigo: 'SOL002',
                    profesor: {
                        id: 1,
                        nombre: 'Alejando Khlebnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 2'},
                    motivo: {id: 13, descripcion: 'Compra de Café'},
                    estado: {id: 12, descripcion: 'Rechazado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12'
                },
                {
                    id: 20,
                    codigo: 'SOL001',
                    profesor: {
                        id: 1,
                        nombre: 'Viktor Kalashnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 1'},
                    motivo: {id: 13, descripcion: 'Compra de Materiales'},
                    estado: {id: 12, descripcion: 'Aprobado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12',
                },
                {
                    id: 20,
                    codigo: 'SOL001',
                    profesor: {
                        id: 1,
                        nombre: 'Viktor Kalashnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 1'},
                    motivo: {id: 13, descripcion: 'Compra de Materiales'},
                    estado: {id: 12, descripcion: 'Aprobado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12',
                },
                {
                    id: 20,
                    codigo: 'SOL001',
                    profesor: {
                        id: 1,
                        nombre: 'Viktor Kalashnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 1'},
                    motivo: {id: 13, descripcion: 'Compra de Materiales'},
                    estado: {id: 12, descripcion: 'Aprobado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12',
                },
                {
                    id: 21,
                    codigo: 'SOL002',
                    profesor: {
                        id: 1,
                        nombre: 'Alejando Khlebnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 2'},
                    motivo: {id: 13, descripcion: 'Compra de Café'},
                    estado: {id: 12, descripcion: 'Rechazado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12'
                },
                {
                    id: 20,
                    codigo: 'SOL001',
                    profesor: {
                        id: 1,
                        nombre: 'Viktor Kalashnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 1'},
                    motivo: {id: 13, descripcion: 'Compra de Materiales'},
                    estado: {id: 12, descripcion: 'Aprobado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12',
                },
                {
                    id: 20,
                    codigo: 'SOL001',
                    profesor: {
                        id: 1,
                        nombre: 'Viktor Kalashnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 1'},
                    motivo: {id: 13, descripcion: 'Compra de Materiales'},
                    estado: {id: 12, descripcion: 'Aprobado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12',
                },
                {
                    id: 20,
                    codigo: 'SOL001',
                    profesor: {
                        id: 1,
                        nombre: 'Viktor Kalashnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 1'},
                    motivo: {id: 13, descripcion: 'Compra de Materiales'},
                    estado: {id: 12, descripcion: 'Aprobado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12',
                },
                {
                    id: 20,
                    codigo: 'SOL001',
                    profesor: {
                        id: 1,
                        nombre: 'Viktor Kalashnikov',
                        codigo: '12033102',
                        seccion: 'Secc. Ingeiería Informática',
                        tipoProfesor: 'Docente Contratado'
                    },
                    investigacion: {id: 1, titulo: 'Investigando las Causas de las Investigaciones 1'},
                    motivo: {id: 13, descripcion: 'Compra de Materiales'},
                    estado: {id: 12, descripcion: 'Aprobado'},
                    montoOtorgado: 8000000.63,
                    montoJustificado: 8000000.63,
                    fechaSolicitud: '12/12/12',
                    fechaAceptacion: '12/12/12',
                }]
        }
    }

    render() {
        return (
            <div>
                <BaseContainer>
                    <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                        <div className="panel-heading">
                            <a className="btn btn-sm btn-primary pull-right m-t-md" href={`${this.props.match.url}/nuevo`}> Nueva </a>
                            <h2> Ayudas Económicas  </h2>
                        </div>
                        <div className="panel-body row">

                    <div className="col-md-3">
                    <Panel>
                        <Panel.Heading> Búsqueda </Panel.Heading>
                        <Panel.Body>
                            <div className="form-group">
                                <label> Investigación </label>
                                <Select
                                    name="form-field-name"
                                    options={[]}
                                />
                            </div>
                            <div className="form-group">
                                <label> Profesor </label>
                                <Select
                                    name="form-field-name"
                                    options={[]}
                                />
                            </div>
                            <div className="form-group">
                                <label> Sección </label>
                                <Select
                                    name="form-field-name"
                                    options={[]}
                                />
                            </div>
                            <div className="form-group">
                                <label> Motivo </label>
                                <Select
                                    name="form-field-name"
                                    options={[]}
                                />
                            </div>
                            <div className="form-group">
                                <label> Estado </label>
                                <Select
                                    name="form-field-name"
                                    options={[]}
                                />
                            </div>
                            <div className="form-group">
                                <Panel>
                                    <Panel.Heading> Monto </Panel.Heading>
                                    <Panel.Body>
                                        <div className="form-horizontal">
                                            <div className="form-group">
                                                <label className="control-label col-md-2"> Mínimo </label>
                                                <div className="col-md-10">
                                                    <input type="number" className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-md-2"> Máximo </label>
                                                <div className="col-md-10">
                                                    <input type="number" className="form-control"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </Panel.Body>
                                </Panel>
                            </div>
                            <div className="form-group">
                                <Panel>
                                    <Panel.Heading> Fecha </Panel.Heading>
                                    <Panel.Body>
                                        <div className="form-horizontal">
                                            <div className="form-group">
                                                <label className="control-label col-md-2"> Mínimo </label>
                                                <div className="col-md-10">
                                                    <input type="date" className="form-control"></input>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-md-2"> Máximo </label>
                                                <div className="col-md-10">
                                                    <input type="date" className="form-control"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </Panel.Body>
                                </Panel>
                            </div>
                            <div>
                                <button className="btn btn-primary btn-block"> Filtrar </button>
                            </div>
                        </Panel.Body>
                    </Panel>
                </div>
                <div className="col-md-9">
                    <Panel>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th className="col-md-1 text-center"> Codigo </th>
                                <th className="col-md-3"> Investigación </th>
                                <th className="col-md-3"> Profesor </th>
                                <th className="col-md-2"> Motivo </th>
                                <th className="col-md-2 text-center"> Monto </th>
                                <th className="col-md-1 text-center"> Estado </th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.ayudas.map( ayuda => {
                                return (
                                    <tr>
                                        <td className="v-middle text-center">
                                            <b className="text-primary text-md"> { ayuda.codigo } </b>
                                        </td>
                                        <td className="v-middle">
                                            <span> { ayuda.investigacion.titulo }</span>
                                        </td>
                                        <td className="v-middle">
                                            <span className="block"> { ayuda.profesor.nombre }</span>
                                            <small className="block text-muted"> { ayuda.profesor.tipoProfesor }</small>
                                            <small className="block text-muted"> { ayuda.profesor.seccion }</small>
                                        </td>
                                        <td className="v-middle">
                                            <span> { ayuda.motivo.descripcion }</span>
                                        </td>
                                        <td className="v-middle text-center">
                                            <span className="text-md"> S/ 200.00 </span>
                                        </td>
                                        <td className="v-middle text-center">
                                            <span className={"label label-"+ ({'Aprobado': 'success', 'Rechazado': 'danger'}[ayuda.estado.descripcion])}> { ayuda.estado.descripcion } </span>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </Panel>
                </div>
                        </div>
                    </div>
                </BaseContainer>
            </div>
        );
    }
}

export default AyudaEconomica;
