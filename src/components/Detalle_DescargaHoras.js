import React, {Component} from 'react';
import {Grid, Row,Col,Button,Glyphicon,ListGroup,ListGroupItem} from 'react-bootstrap';
import {Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis} from 'recharts';
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";
import {currentRole, Role} from "../auth";

class Detalle_DescargaHoras extends React.Component{

    constructor(props){
        super(props);
        this.handleOnModal= this.handleOnModal.bind(this);
        this.handleCloseModal= this.handleCloseModal.bind(this);
        this.state= {
            semana: [],
            listaSemana:[],
            showModal:false,
        }
    }

    componentWillMount(){
        this.crearListaSemana();
    }


    crearListaSemana(){
        let lista=[];
        for(let  i=0;i<16;i++) {
            let obj = {};
            obj.semana = "Semana" + " "+ (i+1);
            obj.horas = 0;
            lista.push(obj);
        }
        for(let j=0;j<this.props.semana.length;j++){
            console.log("HORAS DE DESCARGA" , this.props.semana[j]);
            let nSemana = this.props.semana[j].numero - 1;
            lista[nSemana].horas = this.props.semana[j].hDescarga;
        }
        this.setState({
            listaSemana:Array.from(new Set(lista)),
        })
    }

    handleOnModal(){
        this.setState({
            showModal:true
        })
    }

    handleCloseModal(){
        this.setState({
            showModal:false
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