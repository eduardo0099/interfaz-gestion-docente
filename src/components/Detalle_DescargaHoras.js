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
                    <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                        <div className="panel-heading">
                            <header className="page-header">
                                <a className="btn btn-default pull-right" onClick={this.props.volverLista}>volver</a>
                                <p className="h2 m-b-sm" >
                                    <small>Detalle de descarga de Horas</small>
                                </p>
                            </header>
                            <div className="panel-body">
                                <Col md={6}>
                                    <BootstrapTable
                                        keyField='id'
                                        data={this.props.semana}
                                        columns={columnas}/>
                                </Col>
                                <Col>
                                    Falta cuadro estadistico del horasXsemanaCiclo
                                </Col>
                            </div>
                        </div>
                    </div>
                </BaseContainer>
            </div>
        );
    }
}

export default Detalle_DescargaHoras;