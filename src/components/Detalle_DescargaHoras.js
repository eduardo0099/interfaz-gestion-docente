import React, {Component} from 'react';
import {Grid, Row, Table, Button, Glyphicon, Col, SplitButton, MenuItem} from 'react-bootstrap';
import axios from "axios/index";


class Detalle_DescargaHoras extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            semana: []
        }
    }




    render(){
        return <div>
            <Grid>
                <Row className="back-bar">
                    <Col md={12}>
                        <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"></Glyphicon></Button>
                        <span
                            className="professor-name"> Regresar a perfil docente </span>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Semana</th>
                                <th>Horas Descarga</th>
                                <th>Motivo</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Grid>
        </div>;
    }
}

export default Detalle_DescargaHoras;