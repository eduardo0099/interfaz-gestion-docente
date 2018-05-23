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

    //componentWillMount() {
    //    this.allCiclos();
    //    this.findCicloActual();
    //}

    //allCiclos() {
    //    axios.get('http://200.16.7.151:8080/general/listaCiclos')
    //        .then(response => {
    //            this.setState({ciclos: response.data.ciclos});
    //        })
    //}


    //findCicloActual() {
    //    axios.get('http://200.16.7.151:8080/general/cicloActual')
    //        .then(response => {
    //            this.setState({ciclo: {id: 1, descripcion: '2018-1'}}, () => {
    //                this.search();
    //            });
    //        })
    //}

    //search() {
    //    axios.get('http://200.16.7.151:8080/docente/ayudaEconomica/lista', {
    //        params: {
    //            codigo: this.props.match.params.codigo,
    //            ciclo: this.state.ciclo.descripcion,
    //        }
    //    }).then(response => {
    //        console.log(response);
    //    })
    //}

    handleChangeCiclo(option) {
        this.setState({ciclo: option}, () => this.search());
    }

    render() {
        console.log(this.props);
        const columnas = [
            {text:'Titulo',dataField:'titulo'},
            {text:'Motivo',dataField:'motivo'},
            {text:'Fecha de Registro',dataField:'fecha_solicitud'},
            {text:'Monto',dataField:'monto_otorgado'},
            {text:'Estado',dataField:'estado'}
        ];
        //Agrega radio buttons a las filas de la tabla, solo permite seleccionar una fila
        const selectRow = {
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
        //Permite bloquear el boton Detalle para obligar al usuario a presionar una solicitud.
        let myComponent;
        if(this.state.selectedId !== -1) {
            myComponent = <Link to={`${this.props.match.url}/${this.state.selectedId}/Detalle_SolicitudEconomica`}>Detalle</Link>
        } else {
            myComponent = <Button disabled={true}>Detalle</Button>
        }
        return (
            <div>
            <BaseContainer>
                <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver al Perfil </a>
                            <p className="h2 m-b-sm"> Solicitudes Economicas </p>
                        </header>
                    </div>
                    <Grid>
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
                                <BootstrapTable keyField='id' rowEvents={rowEvents} selectRow={selectRow}
                                                data={this.state.ayudas} columns={columnas}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={8}>
                            </Col>
                            <Col md={2}>
                                <td>{myComponent}</td>
                            </Col>
                        </Row>
                    </Grid>
                <Route path={`${this.props.match.path}/:idSolicitud/Detalle_SolicitudEconomica`} render={()=>
                    <Detalle_SolicitudEconomica {...this.state.ayudas[this.state.selectedId - 1]}
                    />}
                />
                    </div>
            </BaseContainer>
            </div>
        );
    }
}

export default SolicitudesEconomicas;