import React, {Component} from 'react';
import {Grid, Row,Col} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";

class Detalle_DescargaHoras extends Component{

    constructor(props){
        super(props);
        console.log(this.props);
    }
    render(){
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
                                <Row>
                                    <Col md={8}>
                                        <h2>Detalle de descarga de Horas</h2>
                                    </Col>
                                    <Col md={2}>
                                        <div className="panel-heading">
                                            <a className="btn btn-default pull-right m-t-md btn-sm" onClick={this.props.history.goBack}> Volver  </a>
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