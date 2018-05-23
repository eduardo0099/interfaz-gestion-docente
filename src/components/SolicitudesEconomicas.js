import React, {Component} from 'react';
import {Grid, Row, Button, Form,FormControl,FormGroup, Col, ControlLabel} from 'react-bootstrap';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';
import Detalle_SolicitudEconomica from "./Detalle_SolicitudEconomica";
import {Route,Link} from 'react-router-dom';
import BaseContainer from "./BaseContainer";

class SolicitudesEconomicas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ayudas: [{
                id: "",
                titulo: "",
                motivo: "",
                fecha_solicitud: "",
                monto_otorgado: "",
                estado: ""
            }],
            cicloSelect: "",
            listaCiclos: [],
            selectedId:-1,
            verDetalle:false
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
            return axios.get('http://200.16.7.151:8080/docente/ayudaEconomica/lista', {
                params: {
                    codigo: this.props.match.params.codigo,
                    ciclo: cicloSeleccionado,
                }
            });
        })).then((response) => {
                this.setState({
                    ayudas: response.data.ayudas,
                    cicloSelect: cicloSeleccionado,
                    listaCiclos: listaCi,
                })
            }
        ).catch(error => {
            console.log(`Error al obtener datos de la pantalla solicitudes economicas`,error);
        });

    }

    cambioCiclo = (event) =>{
        let nuevoCiclo = event.target.value;
        axios.get('http://200.16.7.151:8080/docente/ayudaEconomica/lista', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: nuevoCiclo,
            }
        })
            .then((response) => {
                this.setState({
                    ayudas: response.data.ayudas,
                    cicloSeleccionado: nuevoCiclo
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la pantalla cursos`,error);
            });
    };

    regresarListaEncuesta = () => {
        this.setState({
            selectedId: -1,
            verDetalle: false,
        });
    };

    mostarComentarios = (index) => {
        this.setState({
            selectedId: index,
            verDetalle: true,
        });
    };

    render() {
        if (!this.state.verComentarios) {
            return (
                <div>
                    <Route exact path={`${this.props.match.path}`} render={() =>
                        <BaseContainer>
                            <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                                <div className="panel-heading">
                                    <header className="page-header m-t-sm">
                                        <a className="btn btn-default pull-right"
                                           onClick={this.props.history.goBack}> Volver al Perfil </a>
                                        <p className="h2 m-b-sm"> Solicitudes Economicas </p>
                                    </header>
                                </div>
                                <Grid>
                                    <Form horizontal>
                                        <FormGroup controlId="formHorizontalSeccion">
                                            <Col componentClass={ControlLabel} sm={1}>
                                                Ciclo:
                                            </Col>
                                            <Col sm={3}>
                                                <FormControl componentClass="select" placeholder="select"
                                                             onChange={this.cambioCiclo}>
                                                    {this.state.listaCiclos.map((item, i) => {
                                                        return <option key={i}
                                                                       value={item.descripcion}>{item.descripcion}</option>
                                                    })}
                                                </FormControl>
                                            </Col>
                                        </FormGroup>
                                    </Form>
                                    <div className="panel-body">
                                        <Col md={10}>
                                            <table className="table table-striped">
                                                <thead>
                                                <tr>
                                                    <th className="col-md-3">Titulo</th>
                                                    <th className="col-md-2 text-center">Motivo</th>
                                                    <th className="col-md-2 text-center">Fecha de solicitud</th>
                                                    <th className="col-md-2 text-center">Monto otorgado</th>
                                                    <th className="col-md-2 text-center">Estado</th>
                                                    <th className="col-md-2 text-center">Detalle</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.ayudas.map((item, i) => {
                                                    return <tr key={i}>
                                                        <td className="v-middle">
                                                            <span className="block text-primary"> {item.titulo} </span>
                                                        </td>
                                                        <td className="v-middle text-center">{item.motivo}</td>
                                                        <td className="v-middle text-center">{item.fecha_solicitud}</td>
                                                        <td className="v-middle text-center">{item.monto_otorgado}</td>
                                                        <td className="v-middle text-center">{item.estado}</td>
                                                        <td className="v-middle"><Button
                                                            onClick={() => this.mostarComentarios(i)}>Ver
                                                            Detalle</Button>
                                                        </td>
                                                    </tr>
                                                })}
                                                </tbody>
                                            </table>
                                        </Col>
                                    </div>
                                </Grid>
                            </div>
                        </BaseContainer>
                    }/>
                </div>
            );
        }else{
            return(
                <Detalle_SolicitudEconomica
                    volverLista={this.regresarListaEncuesta}
                    titulo = {this.state.ayudas[this.state.selectedId].titulo}
                    motivo = {this.state.ayudas[this.state.selectedId].motivo}
                    monto_otorgado = {this.state.ayudas[this.state.selectedId].motivo}
                    fecha_soliciud = {this.state.ayudas[this.state.selectedId].fecha_solicitud}
                    estado = {this.state.ayudas[this.state.selectedId].estado}
                />
            );
        }
    }
}

export default SolicitudesEconomicas;