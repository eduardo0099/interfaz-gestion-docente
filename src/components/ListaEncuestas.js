import React from 'react';
import { Link } from 'react-router-dom';
import {Grid, Row, Table, Button, Glyphicon, Col, SplitButton, MenuItem} from 'react-bootstrap';


class ListaEncuestas extends React.Component{

    render(){

        return (
            <div>
                <Grid>
                    <Row className="back-bar">
                        <Col md={12}>
                            <Button><Glyphicon glyph="arrow-left"></Glyphicon></Button> <span className="professor-name"> { this.props.nombreDocente } </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p>Aqui va el grafico que ahora es una img</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <p>Ciclo:
                                <SplitButton title={this.props.cicloActual} pullRight id="split-button-pull-right">
                                        {this.props.listaCiclos.map((item)=>{
                                            return <MenuItem >{item.descripcion}</MenuItem>
                                        })}
                                </SplitButton>
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Table striped bordered condensed hover>
                                <thead>
                                <tr>
                                    <th>Curso</th>
                                    <th>Horario</th>
                                    <th>Participacion</th>
                                    <th>Puntaje</th>
                                    <th>Comentarios</th>
                                </tr>
                                </thead>
                                <tbody>

                                        {this.props.encuestas.map((item) => {
                                            return <tr>
                                                        <td>{item.curso}</td>
                                                        <td>{item.horario}</td>
                                                        <td>{item.porcentaje}</td>
                                                        <td>{item.puntaje}</td>
                                                        <td><Link to={`hola/cursos`} >Ver Comentarios</Link></td>
                                                    </tr>
                                        })}

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );

    }
}

export default ListaEncuestas;