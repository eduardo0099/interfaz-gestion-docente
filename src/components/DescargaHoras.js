import React, {Component} from 'react';
import {Grid, Row, Button, Col, FormControl, FormGroup, ControlLabel,Form} from 'react-bootstrap';
import axios from "axios/index";
import Detalle_DescargaHoras from "./Detalle_DescargaHoras";
import {Route,Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";

class DescargaHoras extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            descargas:[{nombre:"",
                        codigo:"",
                        hDescargaTotal:"",
                        semana:[]
            }],
            listaDescargas:[],
            listaCiclos:[],
            cicloSelect:"",
            selectedId:-1//
        }
    }

    componentDidMount(){
        let cicloSeleccionado = "";
        let listaCi = [];
        axios.all([
            axios.get('http://200.16.7.151:8080/general/cicloActual'),
            axios.get('http://200.16.7.151:8080/general/listaCiclos'),
        ]).then(axios.spread((respCicloAct,resplistaCiclos)=>{
            cicloSeleccionado = respCicloAct.data.cicloActual;
            listaCi = resplistaCiclos.data.ciclos;
            return axios.get('http://200.16.7.151:8080/docente/docente/horaDescDocente', {
                params: {
                    codigo: this.props.match.params.codigo,
                    ciclo: cicloSeleccionado
                }
            });
        }))
            .then(response => {
                this.setState({
                    descargas: response.data.descargas,
                    cicloSelect: cicloSeleccionado,
                    listaCiclos: listaCi,
                });
                let aux = [];
                for(let i=0;i<this.state.descargas.length;i++){
                    let obj = {};
                    obj.id = i;
                    obj.nombre = this.state.descargas[i].nombre;
                    obj.codigo = this.state.descargas[i].codigo;
                    obj.hDescargaTotal = this.state.descargas[i].hDescargaTotal;
                    obj.semana = [];
                    for(let j=0;i<this.state.descargas[i].semana[j].length;i++) {
                        let sem = {};
                        sem.numero = this.state.descargas[i].semana[j].numero;
                        sem.hdescarga = this.state.descargas[i].semana[j].hdescarga;
                        sem.motivo = this.state.descargas[i].semana[j].motivo;
                        obj.semana.push(sem);
                    }
                    aux.push(obj);
                }
                this.setState({
                    listaDescargas : Array.from(new Set(aux))
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`,error);
            });
    }


    cambioCiclo = (event) =>{
        let nuevoCiclo = event.target.value;
        axios.get('http://200.16.7.151:8080/docente/docente/horaDescDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: nuevoCiclo
            }
        })
            .then(response => {
                this.setState({
                    descargas: response.data.descargas,
                    cicloSelect:nuevoCiclo
                });
                let aux = [];
                for(let i=0;i<this.state.descargas.length;i++){
                    let obj = {};
                    obj.nombre = this.state.descargas[i].nombre;
                    obj.codigo = this.state.descargas[i].codigo;
                    obj.hDescargaTotal = this.state.descargas[i].hDescargaTotal;
                    aux.push(obj);
                }
                this.setState({
                    listaDescargas : aux
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la descarga de horas`,error);
            });
    };


    render(){
        const columnas=[
            {text:'Nombre del curso',dataField:'nombre'},
            {text:'Codigo',dataField:'codigo'},
            {text:'Horas Descarga',dataField:'hDescargaTotal'},
            {text: 'Semana',dataField: 'semana', hidden: true}
        ];

        const selectRow ={
            mode: 'radio',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5',
            selected: [this.state.selectedId]
        };

        const rowEvents = {
            onClick: (e, row,rowIndex) => {
                console.log(rowIndex)
                console.log(row)
            this.setState({
                selectedId : row.id
            })
            //alert(`clicked on row with index: ${this.state.selectedId}`);
            }
        };
        let myComponent;
        if(this.state.selectedId !== -1) {
            myComponent = <Link to={`${this.props.match.url}/${this.state.selectedId}`}>Detalle</Link>
        } else {
            myComponent = <Button disabled={true}>Detalle</Button>
        }
        return(
                <div>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                        <Grid>
                            <Row>
                                <Col md={8}>
                                    <h2>Descarga de Horas</h2>
                                </Col>
                                <Col md={2}>
                                <div className="panel-heading">
                                    <a className="btn btn-default pull-right m-t-md btn-sm" onClick={this.props.history.goBack}> Volver al Perfil </a>
                                </div>
                                </Col>
                            </Row>
                            <Form horizontal>
                                <FormGroup  controlId="formHorizontalSeccion">
                                    <Col componentClass={ControlLabel} sm={1}>
                                        Ciclo:
                                    </Col>
                                    <Col sm={3}>
                                        <FormControl componentClass="select" placeholder="select"
                                                     onChange={this.cambioCiclo}>
                                            {this.state.listaCiclos.map((item, i) => {
                                                return <option key={i} value={item.descripcion}>{item.descripcion}</option>
                                            })}
                                            </FormControl>
                                    </Col>
                                </FormGroup>
                            </Form>
                        <Row>
                            <Col md={10}>
                                <BootstrapTable
                                    keyField='id'
                                    data={this.state.listaDescargas}
                                    columns={columnas}
                                    selectRow={selectRow}
                                    rowEvents = {rowEvents}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                            </Col>
                            <Col md={4}>
                                <td>{myComponent}</td>
                            </Col>
                        </Row>
                    </Grid>
                        </div>
                    </BaseContainer>
                    <Route path={`${this.props.match.path}/:id`} render={()=>
                        <Detalle_DescargaHoras {...this.state.listaDescargas[this.state.selectedId]}
                        />}
                    />
                </div>
        );
    }
}

export default DescargaHoras;