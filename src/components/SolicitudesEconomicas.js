import React, {Component} from 'react';
import {Grid, Row, Table, Button, Glyphicon, Col, SplitButton, MenuItem} from 'react-bootstrap';


class SolicitudesEconomicas extends React.Component{
    render(){
        return(
            <div>
                <Grid>
                    <Row className="back-bar">
                        <Col md={12}>
                            <Button><Glyphicon glyph="arrow-left"></Glyphicon></Button> <span className="professor-name"> { this.props.nombreDocente } </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <p>Ciclo:
                            </p>
                        </Col>
                        <Col md={6}>
                            <p>Monto Total(solicitudes aprovadas):</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Table striped bordered condensed hover>
                                <thead>
                                <tr>
                                    <th>Motivo</th>
                                    <th>Monto</th>
                                    <th>Fecha de Registro</th>
                                    <th>Estado</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.props.solicitud.map((item) => {
                                        return <tr>
                                            <td>{item.motivo}</td>
                                            <td>{item.monto}</td>
                                            <td>{item.fechaRegistro}</td>
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
            </div>
        );
    }
}

export default SolicitudesEconomicas;