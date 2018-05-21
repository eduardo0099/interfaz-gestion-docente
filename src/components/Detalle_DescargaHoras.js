import React, {Component} from 'react';
import {Grid, Row, Table, Button, Glyphicon, Col, SplitButton, MenuItem} from 'react-bootstrap';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';
import {Route,Link} from 'react-router-dom';

class Detalle_DescargaHoras extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            semanas: [{numero:"",
                        hDescarga:"",
                        motivo:""}]
        }
    }

    

    render(){
        const columnas=[
            {text:'Semana',dataField:'numero'},
            {text:'Horas Descarga',dataField:'hDescarga'},
            {text:'Motivo',dataField:'motivo'}
        ];
        console.log(this.state);
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>

                        <Grid>
                            <Row className="back-bar">
                                <Col md={12}>
                                    <Button onClick={this.props.history.goBack}><Glyphicon
                                        glyph="arrow-left"></Glyphicon></Button>
                                    <span
                                        className="professor-name"> Regresar a Descarga de Horas </span>
                                </Col>
                            </Row>
                            <Row>
                                <h1>Detalle de descarga de horas</h1>
                            </Row>
                            <Col md={6}>
                                <BootstrapTable
                                    keyField='id'
                                    data={this.state.semanas}
                                    columns={columnas}/>
                            </Col>
                            <Col>
                                Falta cuadro estadistico del horasXsemanaCiclo
                            </Col>
                        </Grid>

                }/>
            </div>
        );
    }
}

export default Detalle_DescargaHoras;