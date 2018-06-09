import React, {Component} from 'react';
import {Grid, Row,Col,Button,Glyphicon,ListGroup,ListGroupItem} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";

class Detalle_DescargaHoras extends React.Component{

    constructor(props){
        super(props);
        this.state={
            semana:[{
                numero:"",
                hDescarga:"",
                motivo:""
            }]
        }
    }

    render(){
        console.log('Renderizando tabla');
        console.log(JSON.stringify(this.props, null, 2));

        const columnas=[
            {text:'Semana',dataField:'numero'},
            {text:'Horas Descarga',dataField:'hDescarga'},
            {text:'Motivo',dataField:'motivo'}
        ];
        return (
            <div>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <Grid>
                                <Row className="back-bar">
                                    <Col md={12}>
                                        <Button onClick={this.props.volverLista}><Glyphicon glyph="arrow-left"/></Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={8}>
                                        <h2>Detalle de descarga de Horas</h2>
                                    </Col>
                                    <Col md={2}>
                                        <div className="panel-heading">
                                        </div>
                                    </Col>
                                </Row>
                                <Col md={6}>
                                    <BootstrapTable
                                        keyField='id'
                                        data={this.props.semana}
                                        columns={columnas}/>
                                </Col>
                                <Col>
                                    Falta cuadro estadistico del horasXsemanaCiclo
                                </Col>
                            </Grid>
                        </div>
                    </BaseContainer>
            </div>
        );
    }
}

export default Detalle_DescargaHoras;