import React from 'react';
import Select from 'react-select';
import {Panel, Dropdown} from 'react-bootstrap';
import API from '../../api';

class DashboardAyudaEconomica extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ayudas: [
                {
                    id: 20,
                    codigo_solicitud: 'SOL001',
                    titulo: 'Investigando las Causas de las Investigaciones 1',
                    motivo: 'Compra de Materiales',
                    monto_otorgado: 8000000.63,
                    estado: 'Aprobado',
                    fechaSolicitud: '12/12/12',
                    profesor: {
                        codigo_profesor: 20112728,
                        nombres: 'Freddy',
                        apellido_paterno: 'Espinoza',
                        apellido_materno: 'Paz',
                        correo_pucp: 'fpaz@pucp.edu.pe',
                        tipo_profesor: 'TC',
                        seccion: 'Informatica'
                    }
                }]
        }
    }

    componentDidMount() {
        this.findAyudas();
    }

    componentWillReceiveProps=(nextProps)=> {

        console.log('nextprops: ',nextProps);
        if(nextProps.seccion.id!==0) {
            this.findAyudasSeccion(nextProps);
        }else{
            this.findAyudas();
        }
    }

    findAyudas() {
        API.get('/dashboard/listarAyudasEconomicas')
            .then(response => {
                console.log('ayudas: ',response.data);
                this.setState({
                    ayudas:response.data.ayudas,
                })
            }).catch(error => {
            console.log("Error obteniendo la lista de cursos", error);
        });
    }

    findAyudasSeccion(nextProps) {
        API.get('/dashboard/listarAyudasEconomicasSeccion', {
            params: {
                seccion: nextProps.seccion.id,
            }
        })
            .then(response => {
                console.log('ayudas nextprops: ',response.data );
                this.setState({
                    ayudas:response.data.ayudas,
                })
            }).catch(error => {
            console.log("Error obteniendo la lista de cursos", error);
        });
    }


    labelEstado = (estado) => {
        switch (estado) {
            case 'Aprobado':
                return <span className="label label-success"> Aprobado </span>
            case 'Pendiente':
                return <span className="label label-warning"> Pendiente </span>
            case 'Rechazado':
                return <span className="label label-danger"> Rechazado </span>
        }
    }

    render() {
        return (
            <div>
                <div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th className="col-md-1 text-center"> Código</th>
                            <th className="col-md-3"> Investigación</th>
                            <th className="col-md-3"> Profesor</th>
                            <th className="col-md-2"> Motivo</th>
                            <th className="col-md-2 text-center"> Monto</th>
                            <th className="col-md-1 text-center"> Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.ayudas.map(ayuda => {
                            return (
                                <tr>
                                    <td className="v-middle text-center">
                                        <b className="text-primary text-md"> {ayuda.codigo_solicitud} </b>
                                    </td>
                                    <td className="v-middle">
                                        <span> {ayuda.titulo}</span>
                                    </td>
                                    <td className="v-middle">
                                        <span className="block"> {ayuda.profesor.nombres} {ayuda.profesor.apellido_paterno}</span>
                                        <small className="block text-muted"> {ayuda.profesor.tipo_profesor}</small>
                                        <small className="block text-muted"> {ayuda.profesor.seccion}</small>
                                    </td>
                                    <td className="v-middle">
                                        <span> {ayuda.motivo}</span>
                                    </td>
                                    <td className="v-middle text-center">
                                        <span className="text-md"> S/ {ayuda.monto_otorgado} </span>
                                    </td>
                                    <td className="v-middle text-center">
                                        {this.labelEstado(ayuda.estado)}
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default DashboardAyudaEconomica;