import React from 'react';
import Select from 'react-select';
import {Panel, Dropdown, Glyphicon, MenuItem} from 'react-bootstrap';
import API from "../../api";
import {Modal} from 'react-bootstrap';

class DashboardInvestigaciones extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            showResumen: false,
            investigacion: {
                profesores: []
            },
            investigaciones: [
                {
                    titulo: 'Investigando React 10',
                    profesores: [
                        {
                            id: 1,
                            nombre: 'Johann Morales',
                            codigo: '20141909',
                            email: 'johann.morales@pucp.edu.pe',
                            telefono: '01 4244369',
                            celular: '991142846'
                        },
                        {
                            id: 2,
                            nombre: 'Morales Johann',
                            codigo: '20141909',
                            email: 'johann.morales@pucp.edu.pe',
                            telefono: '01 4244369',
                            celular: '991142846'
                        }
                    ],
                    estado: 'Aprobado',
                    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',

                },
                {
                    titulo: 'Investigando React 10',
                    profesores: [
                        {
                            id: 1,
                            nombre: 'Johann Morales',
                            codigo: '20141909',
                            email: 'johann.morales@pucp.edu.pe',
                            telefono: '01 4244369',
                            celular: '991142846'
                        },
                        {
                            id: 2,
                            nombre: 'Morales Johann',
                            codigo: '20141909',
                            email: 'johann.morales@pucp.edu.pe',
                            telefono: '01 4244369',
                            celular: '991142846'
                        }
                    ],
                    estado: 'Terminado',
                    resumen: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                }]
        }
    }

    close() {
        this.setState({show: false});
    }


    closeResumen() {
        this.setState({showResumen: false});
    }


    estadoLabel = (estado) => {
        switch (estado) {
            case 'Pendiente':
                return <span className="label label-warning"> Pendiente </span>
            case 'Aprobado':
                return <span className="label label-success"> Aprobado </span>
            case 'Terminado':
                return <span className="label label-primary"> Terminado </span>
        }
    }

    openModal = (investigacion, e) => {
        this.setState({investigacion: investigacion}, () => {
            this.setState({show: true})
        });
    }

    openModalResumen = (investigacion, e) => {
        this.setState({investigacion: investigacion}, () => {
            this.setState({showResumen: true})
        });
    }

    render() {
        return (
            <div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th className="col-md-3">Titulo</th>
                            <th className="col-md-3"></th>
                            <th className="col-md-3 text-center">Documento</th>
                            <th className="col-md-3 text-center">Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.investigaciones.map(i => {
                            return (
                                <tr key={i.id}>
                                    <td className="v-middle">
                                        <a className="text-primary pointer"
                                           onClick={this.openModalResumen.bind(this, i)}> {i.titulo} </a>
                                    </td>
                                    <td className="v-middle text-center" onClick={this.openModal.bind(this, i)}>
                                        <span className="badge"> {i.profesores.length} </span>
                                        <small className="block text-muted m-t-xs"> investigadores</small>
                                    </td>
                                    <td className="v-middle text-center">
                                        <button type="button" className="btn btn-primary btn-xs">
                                            <i className="fa fa-file-alt"/>
                                        </button>
                                    </td>
                                    <td className="v-middle text-center">
                                        {this.estadoLabel(i.estado)}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <Modal show={this.state.show} onHide={this.close.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title> {this.state.investigacion.titulo}: Investigadores </Modal.Title>
                        </Modal.Header>
                        <div className="modal-body">
                            <table className="table table-striped table-hover">
                                <tbody>
                                {this.state.investigacion.profesores.map(p => {
                                    return (
                                        <tr key={p.id}>
                                            <td className="v-middle col-md-6">
                                                <span className="block text-primary"> {p.nombre} </span>
                                                <small className="block text-muted"> {p.codigo} </small>
                                            </td>
                                            <td className="v-middle col-md-6">
                                                <span className="block m-t-xs m-b-xs"><i
                                                    class="fa fa-envelope text-primary"></i> {p.email}</span>
                                                <span className="block m-b-xs m-l-xs "><i
                                                    class="fa fa-mobile"></i> {p.celular}</span>
                                                <span className="block m-b-xs"><i
                                                    class="fa fa-phone"></i> {p.telefono}</span>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </Modal>
                    <Modal show={this.state.showResumen} onHide={this.closeResumen.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title> {this.state.investigacion.titulo}</Modal.Title>
                        </Modal.Header>
                        <div className="modal-body text-justify">
                            {this.state.investigacion.resumen}
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default DashboardInvestigaciones;