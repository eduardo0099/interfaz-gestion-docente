import React, {Component} from 'react';
import {Grid, Row, Button, Glyphicon, Col} from 'react-bootstrap';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';

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
        return <div>
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
                        <BootstrapTable keyField='id' data={ this.state.ayudas } columns={ columnas }/>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                    </Col>
                    <Col md={2}>
                        <Button bsStyle="info">Detalles</Button>
                    </Col>
                </Row>

            </Grid>
        </div>;
    }
}

export default SolicitudesEconomicas;