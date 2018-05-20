import React from 'react';
import axios from "axios/index";
import Select from 'react-select';
import {Link, Route} from 'react-router-dom';
import {Button, Col, Glyphicon, Grid, Row} from 'react-bootstrap';
import Detalle_SolicitudEconomica from "./Detalle_SolicitudEconomica";
import BaseContainer from "./BaseContainer";

class SolicitudesEconomicas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ayudas: [],
            ciclo: {},
            ciclos: [],
        }
    }

    componentWillMount() {
        this.allCiclos();
        this.findCicloActual();
    }

    allCiclos() {
        axios.get('http://200.16.7.151:8080/general/listaCiclos')
            .then(response => {
                this.setState({ciclos: response.data.ciclos});
            })
    }

    findCicloActual() {
        axios.get('http://200.16.7.151:8080/general/cicloActual')
            .then(response => {
                this.setState({ciclo: {id: 1, descripcion: '2018-1'}}, () => {
                    this.search();
                });
            })
    }

    search() {
        axios.get('http://200.16.7.151:8080/docente/ayudaEconomica/lista', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: this.state.ciclo.descripcion,
            }
        }).then(response => {
            console.log(response);
        })
    }

    handleChangeCiclo(option) {
        this.setState({ciclo: option}, () => this.search());
    }

    render() {
        return (

            <div>
                <BaseContainer>
                    <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                        <div className="panel-heading">
                            <a className="btn btn-default pull-right m-t-md btn-sm" onClick={this.props.history.goBack}> Volver al Perfil </a>
                            <h2> Solicitudes Económicas </h2>
                        </div>
                        <div className="panel-body">
                            <div className="form-group row col-md-3">
                                <label> Ciclo </label>
                                <Select value={this.state.ciclo}
                                        labelKey="descripcion"
                                        valueKey="id"
                                        onChange={this.handleChangeCiclo.bind(this)}
                                        options={this.state.ciclos}/>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th className="v-middle col-md-1 text-center"> Codigo</th>
                                    <th className="v-middle col-md-4"> Investigacion</th>
                                    <th className="v-middle col-md-3"> Motivo</th>
                                    <th className="v-middle col-md-2 text-center"> Monto</th>
                                    <th className="v-middle col-md-2 text-center"> Estado</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.ayudas.map(item => {
                                        return (
                                            <tr>
                                                <td className="v-middle text-center">
                                                    <span className="block text-primary"> 2018-08 </span>
                                                    <small className="block text-muted"> 19/09/18</small>
                                                </td>
                                                <td className="v-middle"> {item.titulo} </td>
                                                <td className="v-middle"> {item.motivo} </td>
                                                <td className="v-middle text-center"> S/ {item.monto_otorgado} </td>
                                                <td className="v-middle text-center">
                                                    {
                                                        item.estado === 'Aprobado' ?
                                                            (<span
                                                                className="label label-success">  {item.estado}  </span>) :
                                                            (<span
                                                                className="label label-warning">  {item.estado}  </span>)
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                        <Grid>
                            <Row>
                                <Col md={10}>
                                </Col>
                                <Col md={2}>
                                    <Link to={`${this.props.match.url}/Detalle_SolicitudEconomica`}>Detalle</Link>
                                </Col>
                            </Row>
                        </Grid>
                    </div>
                </BaseContainer>
                <Route path={`${this.props.match.path}/Detalle_SolicitudEconomica`}
                       component={Detalle_SolicitudEconomica}/>
            </div>

        );
    }
}

export default SolicitudesEconomicas;