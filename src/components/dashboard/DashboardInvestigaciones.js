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
                    estado: 'Aprobado'

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
                    estado: 'Terminado'
                }]
        }
    }

    close (){
        this.setState({show: false});
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
        console.log(investigacion);
        this.setState({investigacion: investigacion}, () => {
            this.setState({show: true})
        });
    }

    render() {
        return (
            <div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th className="col-md-4"></th>
                            <th className="col-md-3"></th>
                            <th className="col-md-3"></th>
                            <th className="col-md-2"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.investigaciones.map(i => {
                            return (
                                <tr key={i.id}>
                                    <td className="v-middle">
                                        <span className="text-primary"> {i.titulo} </span>
                                    </td>
                                    <td className="v-middle text-center" onClick={this.openModal.bind(this, i)}>
                                        <span className="badge"> {i.profesores.length} </span>
                                        <small className="block text-muted m-t-xs"> investigadores</small>
                                    </td>
                                    <td className="v-middle text-center">
                                        <i className="fa fa-file"/>
                                    </td>
                                    <td className="v-middle text-center">
                                        {this.estadoLabel(i.estado)}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                    <Modal show={this.state.show}>
                        <Modal.Header>
                            Investigaciones
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
                        <div className="modal-footer">
                            <button className="btn btn-link" onClick={this.close.bind(this)}>Cerrar</button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default DashboardInvestigaciones;