import React, {Component} from 'react';
import {Grid, Row, Table, Button, Glyphicon, Col, SplitButton, MenuItem} from 'react-bootstrap';
import axios from "axios/index";
import Detalle_DescargaHoras from "./Detalle_DescargaHoras";
import {Route,Link} from 'react-router-dom';


class DescargaHoras extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            descargas:[{"nombre":"",
                        "codigo":"",
                        "hDescargaTotal":"",
                        "semana":[]}]
        }
    }

    componentDidMount(){
        axios.get('http://200.16.7.151:8080/docente/docente/horaDescDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: "2018-1"
            }
        })
            .then(response => {
                this.setState({
                    descargas: response.data.descargas
                });
            })
            .catch(error => {
                console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`,error);
            });
    }

    render(){
        return <div>
            <Grid>
                <Row className="back-bar">
                    <Col md={12}>
                        <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"></Glyphicon></Button>
                        <span
                            className="professor-name"> Regresar a perfil docente </span>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <p>Ciclo:
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Nombre del curso</th>
                                <th>Horario</th>
                                <th>Horas Descarga</th>
                                <th> </th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.descargas.map((item, i) => {
                                return <tr key={i}>
                                    <td>{item.nombre}</td>
                                    <td>{item.codigo}</td>
                                    <td>{item.hDescargaTotal}</td>
                                    <td><Link to={`${this.props.match.url}/detalle_DescargaHoras`} >Detalle</Link></td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Grid>
            <Route path={`${this.props.match.path}/Detalle_DescargaHoras`} render={ () =>
                <Detalle_DescargaHoras semana = {[this.state.descargas.semana]}
            />}/>
        </div>;
    }

}

export default DescargaHoras;