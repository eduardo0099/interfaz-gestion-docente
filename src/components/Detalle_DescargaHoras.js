import React, {Component} from 'react';
import {Grid, Row, Table, Button, Glyphicon, Col, SplitButton, MenuItem} from 'react-bootstrap';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';

class Detalle_DescargaHoras extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            semanas: ['se']
        }
    }

    componentDidMount(){
        return axios.get('http://200.16.7.151:8080/docente/docente/horaDescDocente/Detalle_DescargaHoras')
    }

    render(){
        const columnas=[
            {text:'Semana',dataField:'semana'},
            {text:'Horas Descarga',dataField:'horas_Descarga'},
            {text:'Motivo',dataField:'motivo'}
        ];
        return <div>
            <Grid>
                <Row className="back-bar">
                    <Col md={12}>
                        <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"></Glyphicon></Button>
                        <span
                            className="professor-name"> Regresar a Descarga de Horas </span>
                    </Col>
                </Row>
                <Row>
                    <h1>Detalle de descarga de horas</h1>
                </Row>
                    <Col md={12}>
                        <BootstrapTable
                            keyField='id'
                            data={ this.state.semanas }
                            columns={ columnas }/>
                    </Col>
            </Grid>
        </div>;
    }
}

export default Detalle_DescargaHoras;