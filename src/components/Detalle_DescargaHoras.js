import React, {Component} from 'react';
import {Grid, Row,Col,Button,Glyphicon,ListGroup,ListGroupItem} from 'react-bootstrap';
import {Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis} from 'recharts';
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";
import {currentRole, Role} from "../auth";

class Detalle_DescargaHoras extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            semana: [{
                numero: "",
                hDescarga: "",
                motivo: ""
            }],
            listaSemana:[{semana:1,horas:null},{semana:2,horas:0},{semana:3,horas:0},{semana:4,horas:0},
                {semana:5,horas:0},{semana:6,horas:0},{semana:7,horas:0},{semana:8,horas:0},{semana:9,horas:0},
                {semana:10,horas:0},{semana:11,horas:0},{semana:12,horas:0},{semana:13,horas:0},{semana:14,horas:0},
                {semana:15,horas:0},{semana:16,horas:0}],
        }
    }

    componentWillMount(){
        this.crearListaSemana();
    }

    crearListaSemana(){
        let lista=[];
        for(let  i=1;i<=16;i++) {
            let obj = {};
            obj.semana = i;
            let horas=0;
            for (let j = 0;  j < this.state.semana.length; j++) {
                if (this.state.semana[j].numero == i ) {
                    horas=this.state.semana[j].hDescarga;
                    console.log("Horas encontrada");
                }
            }
            obj.horas=horas;
            lista.push(obj);
        }
        this.setState({
            listaSemana:Array.from(new Set(lista)),
        })
    }


    render(){
        console.log('Renderizando tabla');
        console.log(JSON.stringify(this.props, null, 2));
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
                            <div className="card-row">
                                <div className="card-graph text-center">
                                    <h5 className="block m-b-n"> Cantidad de Horas Descargadas </h5>

                                    <ResponsiveContainer height={350}>
                                        <div>
                                            <LineChart width={700} height={300} data={this.state.listaSemana}
                                                       margin={{top: 50, right: 5, left: 20, bottom: 5}}>
                                                <XAxis dataKey="semana"/>
                                                <YAxis/>
                                                <CartesianGrid strokeDasharray="3 3"/>
                                                <Tooltip/>
                                                <Legend />
                                                <Line type="monotone" dataKey="horas" stroke="#8884d8" activeDot={{r: 8}}/>
                                            </LineChart>
                                        </div>
                                    </ResponsiveContainer>
                                </div>

                            </div>
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