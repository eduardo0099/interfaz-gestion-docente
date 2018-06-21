import React, {Component} from 'react';
import {Grid, Row,Col,Button,Glyphicon,ListGroup,ListGroupItem} from 'react-bootstrap';
import {Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis} from 'recharts';
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
            }],
        }
    }

    llenarHoras(){
        let arreglo = this.props.semana;
        let newArreglo = [];
        for(let i=0;i<arreglo.length;i++){
            console.log(arreglo[i].hDescarga);
            newArreglo.push(arreglo[i].hDescarga);
        }
        console.log(newArreglo);
    }

    render(){
        console.log('Renderizando tabla');
        let arreglo = this.props.semana;
        let newArreglo = [];
        for(let i=0;i<arreglo.length;i++){
            console.log(arreglo[i].hDescarga);
            newArreglo.push(arreglo[i].hDescarga);
        }
        console.log(newArreglo);
        console.log(JSON.stringify(this.state, null, 2));

        const columnas=[
            {text:'Semana',dataField:'numero'},
            {text:'Horas Descarga',dataField:'hDescarga'},
            {text:'Motivo',dataField:'motivo'},
        ];
        return (
            <div>
                <BaseContainer>
                    <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                        <div className="panel-heading">
                            <header className="page-header">
                                <a className="btn btn-default pull-right" onClick={this.props.volverLista}>volver</a>
                                <p className="h2 m-b-sm" >
                                    <small>Detalle de descarga de horas</small>
                                </p>
                            </header>
                            <div className="panel-body">
                                <Col md={12}>
                                    <BootstrapTable
                                        keyField='id'
                                        data={this.props.semana}
                                        columns={columnas}/>
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