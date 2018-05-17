import React from 'react';
import {Table, Grid, Row, Col, Button, Glyphicon, ListGroup, ListGroupItem, Panel} from 'react-bootstrap';
import './../styles/ProfesorPerfilEncuesta.css';

class ProfesorPerfilEncuesta extends React.Component {

    constructor(){
        super();

        this.state = {
            horarioProfesor: {
                profesor: 'Viktor Kalashnikav',
                ciclo: '2017-2',
                curso: 'Informatica Medieval',
                codigo: '0789',
                participacion: 99,
                puntaje: 80,
                encuestas: ['Pta que buen profe', 'TOdo bien con este pata', 'xd', 'Un comentario bastante largo ahora solo para proba xddddddddddddddddddd', 'demasiado bueno este profesor deberian darle un premio h3h']
            }

        }

    }

    render() {
        return (
            <div>
                <Grid>
                    <Row className="back-bar">
                        <Col md={12}>
                            <Button><Glyphicon glyph="arrow-left"></Glyphicon></Button> <span className="professor-name"> { this.state.horarioProfesor.profesor } </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Panel>
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3"> Encuesta </Panel.Title>
                                </Panel.Heading>
                                <ListGroup>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Ciclo: </Col> <Col md={4}> { this.state.horarioProfesor.ciclo } </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Curso: </Col> <Col md={4}> { this.state.horarioProfesor.curso } </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Horario: </Col> <Col md={4}>  { this.state.horarioProfesor.codigo } </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Participación:  </Col> <Col md={4}> { this.state.horarioProfesor.participacion }%  </Col> </Row> </Grid> </ListGroupItem>
                                    <ListGroupItem> <Grid> <Row> <Col md={2}> Puntaje </Col> <Col md={4}> { this.state.horarioProfesor.puntaje }/100 </Col> </Row> </Grid> </ListGroupItem>
                                </ListGroup>
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <Panel>
                                <Panel.Body>
                                    <img src="./../resources/piechart.png"/>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <table className="table table-striped">
                            </table>
                            <Panel>
                                <Panel.Heading>
                                    <Panel.Title componentClass="h3"> Comentarios </Panel.Title>
                                </Panel.Heading>
                                <ListGroup>
                                    { this.state.horarioProfesor.encuestas.map( encuesta => {
                                        return ( <ListGroupItem> { encuesta } </ListGroupItem> )
                                    })}
                                </ListGroup>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default ProfesorPerfilEncuesta;
