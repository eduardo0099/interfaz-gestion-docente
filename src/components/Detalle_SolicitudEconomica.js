import React, {Component} from 'react';
import {Grid, Row, Button, Glyphicon, ListGroup, ListGroupItem, Col, Panel} from 'react-bootstrap';
import axios from "axios/index";
import {Route,Link} from 'react-router-dom';

class Detalle_SolicitudEconomica extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log('Renderizando tabla');
        console.log(JSON.stringify(this.props, null, 2));
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
                                <ListGroup>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Motivo: </Col> <Col md={4}> {this.props.motivo } </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Monto: </Col> <Col md={4}> { this.props.monto} </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Fecha de registro: </Col> <Col md={4}>  { this.props.fechaSolicitud} </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Estado:  </Col> <Col md={4}> { this.props.estado }  </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Fecha de Inicio: </Col> <Col md={4}> </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Fecha de Fin: </Col> <Col md={4}>  </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Comentarios Adicionales: </Col> <Col md={4}> </Col> </Row> </Grid> </ListGroupItem>

                                </ListGroup>
                            </panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Detalle_SolicitudEconomica;