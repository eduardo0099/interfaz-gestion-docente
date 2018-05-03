import React, {Component} from 'react';
import {Grid, Row, Table, Button, Glyphicon, Col, SplitButton, MenuItem} from 'react-bootstrap';
import axios from "axios/index";


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
        return <div>
            <Grid>
                <Row className="back-bar">
                    <Col md={12}>
                        <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"/></Button>
                        <span
                            className="professor-name"> Regresar a perfil docente </span>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <p>Ciclo: {this.state.cicloSelect}
                        </p>
                    </Col>
                    <Col md={6}>
                        <p>Monto Total(solicitudes aprovadas):
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Motivo</th>
                                <th>Fecha de Registro</th>
                                <th>Monto</th>
                                <th>Estado</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.ayudas.map((item, i) => {
                                return <tr key={i}>
                                    <td>{item.titulo}</td>
                                    <td>{item.motivo}</td>
                                    <td>{item.fecha_solicitud}</td>
                                    <td>{item.monto_otorgado}</td>
                                    <td>{item.estado}</td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Button bsStyle="info">Detalles</Button>
                    </Col>
                </Row>

            </Grid>
        </div>;
    }
}

export default SolicitudesEconomicas;