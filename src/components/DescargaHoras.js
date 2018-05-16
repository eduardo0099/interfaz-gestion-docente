import React, {Component} from 'react';
import {Grid, Row, Button, Glyphicon, Col} from 'react-bootstrap';
import axios from "axios/index";
import Detalle_DescargaHoras from "./Detalle_DescargaHoras";
import {Route,Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';

class DescargaHoras extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            descargas:[{"nombre":"",
                        "codigo":"",
                        "hDescargaTotal":"",
                        "semana":[]}],
            listaCiclos:[],
            cicloSelect:"",
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
            })
            .catch(error => {
                console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`,error);
            });
    }

    render(){
        const columnas=[
            {text:'Nombre del curso',dataField:'nombre'},
            {text:'Codigo',dataField:'codigo'},
            {text:'Horas Descarga',dataField:'hDescargaTotal'}
        ];

        const selectRow ={
            mode: 'checkbox',
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#00BFFF'
        };

        return(
                <div>
                    <Grid>
                        <Row className="back-bar">
                            <Col md={12}>
                                <Button onClick={this.props.history.goBack}><Glyphicon
                                    glyph="arrow-left"></Glyphicon></Button>
                                <span
                                    className="professor-name"> Regresar a perfil docente </span>
                            </Col>
                        </Row>
                        <Row><h1>Descarga de Horas</h1></Row>
                        <Row>
                            <Col md={12}>
                                <p>Ciclo :
                                    <select ref="selectorCiclos" onChange={this.state.cicloSelect}>
                                        {this.state.listaCiclos.map((item, i) => {
                                            return <option key={i} value={item.descripcion}>{item.descripcion}</option>
                                        })}
                                    </select>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <BootstrapTable
                                    keyField='id'
                                    data={this.state.descargas}
                                    columns={columnas}
                                    selectRow={selectRow}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                            </Col>
                            <Col md={2}>
                                <Link to={`${this.props.match.url}/Detalle_DescargaHoras`}>Detalle</Link>
                            </Col>
                        </Row>
                    </Grid>
                    <Route path={`${this.props.match.path}/Detalle_DescargaHoras`} component={Detalle_DescargaHoras}/>
                </div>
        );
    }
}

export default DescargaHoras;