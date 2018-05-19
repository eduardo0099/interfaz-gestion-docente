import React, {Component} from 'react';
import {Grid, Row, Button, Glyphicon, ListGroup, ListGroupItem, Col, Panel} from 'react-bootstrap';
import axios from "axios/index";
import {Route,Link} from 'react-router-dom';

class Detalle_SolicitudEconomica extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }

    render(){
        return(
            <div>
                <Grid>
                    <Row><h1>Detalle de Solicitud Economica</h1></Row>
                    <Row>
                        <Col md={6}>
                            <panel>
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3"> Informacion Principal: </Panel.Title>
                                </Panel.Heading>
                                    {this.props.solicitud.map( item => {
                                        return <tr>(<div>
                                            <ListGroup>
                                                <ListGroupItem> <Grid> <Row> <Col md={2}> Motivo: </Col> <Col md={4}> {item.motivo } </Col> </Row> </Grid> </ListGroupItem>
                                                <ListGroupItem> <Grid> <Row> <Col md={2}> Monto: </Col> <Col md={4}> { item.monto_otorgado} </Col> </Row> </Grid> </ListGroupItem>
                                                <ListGroupItem> <Grid> <Row> <Col md={2}> Fecha de registro: </Col> <Col md={4}>  { item.fechaSolicitud} </Col> </Row> </Grid> </ListGroupItem>
                                                <ListGroupItem> <Grid> <Row> <Col md={2}> Estado:  </Col> <Col md={4}> { item.estado }  </Col> </Row> </Grid> </ListGroupItem>
                                                <ListGroupItem> <Grid> <Row> <Col md={2}> Fecha de Inicio: </Col> <Col md={4}> </Col> </Row> </Grid> </ListGroupItem>
                                                <ListGroupItem> <Grid> <Row> <Col md={2}> Fecha de Fin: </Col> <Col md={4}>  </Col> </Row> </Grid> </ListGroupItem>
                                                <ListGroupItem> <Grid> <Row> <Col md={2}> Comentarios Adicionales: </Col> <Col md={4}> </Col> </Row> </Grid> </ListGroupItem>
                                            </ListGroup>
                                        </div>)</tr>;
                                    })}
                            </panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Detalle_SolicitudEconomica;