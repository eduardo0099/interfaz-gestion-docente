import React, {Component} from 'react';
import {Grid, Row, Button, Glyphicon, Col} from 'react-bootstrap';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';
import {Route,Link} from 'react-router-dom';
import Detalle_SolicitudEconomica from "./Detalle_SolicitudEconomica";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class SolicitudesEconomicas extends React.Component{

    constructor(props) {

        super(props);
        this.state = {
            ayudas: [
                {id: "",
                titulo: "",
                motivo: "",
                fecha_solicitud: "",
                monto_otorgado: "",
                estado: ""}
            ],
            cicloSelect: "",
            listaCiclos: [],
        }
    }

    componentDidMount(){
        let cicloSeleccionado = "";
        let listaCi = [];
        axios.all([
            axios.get('http://200.16.7.151:8080/general/cicloActual'),
            axios.get('http://200.16.7.151:8080/general/listaCiclos'),
        ]).then(axios.spread((respCicloAct,resplistaCiclos)=>{
            cicloSeleccionado = respCicloAct.data.cicloActual;
            listaCi = resplistaCiclos.data.ciclos;
            return axios.get('http://200.16.7.151:8080/docente/ayudaEconomica/lista', {
                params: {
                    codigo: this.props.match.params.codigo,
                    ciclo: cicloSeleccionado,
                }
            });
        })).then((response) => {
                this.setState({
                    ayudas: response.data.ayudas,
                    cicloSelect: cicloSeleccionado,
                    listaCiclos: listaCi,
                })
            }
        ).catch(error => {
            console.log(`Error al obtener datos de la pantalla solicitudes economicas`,error);
        });

    }


    render(){
        const columnas = [
            {text:'Titulo',dataField:'titulo'},
            {text:'Motivo',dataField:'motivo'},
            {text:'Fecha de Registro',dataField:'fecha_solicitud'},
            {text:'Monto',dataField:'monto_otorgado'},
            {text:'Estado',dataField:'estado'}
        ];
        const selectRow ={
            mode: 'checkbox',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#00BFFF'
        };

        return (

                <div>
                <Grid>
                    <Row className="back-bar">
                        <Col md={12}>
                            <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"/></Button>
                            <span
                                className="professor-name"> Regresar a perfil docente </span>
                        </Col>
                    </Row>
                    <Row><h1>Solicitudes Economicas</h1></Row>
                    <Row>
                        <Col md={6}>
                            <p>Ciclo :
                                <select ref="selectorCiclos" onChange={this.cambioCiclo}>
                                    {this.state.listaCiclos.map((item,i)=>{
                                        return <option key={i} value={item.descripcion}>{item.descripcion}</option>
                                    })}
                                </select>
                            </p>
                        </Col>
                        <Col md={6}>
                            <p>Monto Total(solicitudes aprovadas):
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <BootstrapTable keyField='id' data={ this.state.ayudas } columns={ columnas } selectRow={selectRow}/>
                        </Col>
                    </Row>
                    <Row>
                        <div className="form-group row col-md-3">
                            <label> Ciclo </label>
                            <Select value={this.state.cicloSelect} labelKey="nombre" options={[{id: 1, nombre:'2017-1'}, {id: 2, nombre:'2018-1'}]}/>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="v-middle col-md-1 text-center"> Codigo </th>
                                    <th  className="v-middle col-md-4"> Investigacion </th>
                                    <th  className="v-middle col-md-3"> Motivo </th>
                                    <th  className="v-middle col-md-2 text-center"> Monto </th>
                                    <th  className="v-middle col-md-2 text-center"> Estado </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        this.state.ayudas.map( item => {
                                            return (
                                            <tr>
                                                <td className="v-middle text-center">
                                                    <span className="block text-primary"> 2018-08 </span>
                                                    <small className="block text-muted"> 19/09/18 </small>
                                                </td>
                                                <td className="v-middle"> { item.titulo } </td>
                                                <td className="v-middle"> { item.motivo } </td>
                                                <td className="v-middle text-center"> S/ { item.monto_otorgado } </td>
                                                <td className="v-middle text-center">
                                                    {
                                                        item.estado === 'Aprobado' ?
                                                        ( <span className="label label-success">  { item.estado }  </span> ) :
                                                        ( <span className="label label-warning">  { item.estado }  </span> )
                                                    }
                                                    </td>
                                            </tr>
                                            );
                                        })
                                    }
                            </tbody>
                            </table>
                    </Row>
                    <Row>
                        <Col md={10}>
                        </Col>
                        <Col md={2}>
                            <Link to={`${this.props.match.url}/Detalle_SolicitudEconomica`}>Detalle</Link>
                        </Col>
                    </Row>
                </Grid>
                    <Route path={`${this.props.match.path}/Detalle_SolicitudEconomica`} component={Detalle_SolicitudEconomica}/>
                </div>

        );
    }
}

export default SolicitudesEconomicas;