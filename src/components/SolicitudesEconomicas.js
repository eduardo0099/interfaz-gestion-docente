import React, {Component} from 'react';
import {Grid, Row, Button, Glyphicon, Col} from 'react-bootstrap';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';
import Detalle_SolicitudEconomica from "./Detalle_SolicitudEconomica";
import {Route,Link} from 'react-router-dom';

class SolicitudesEconomicas extends Component{

    constructor(props) {

        super(props);
        this.state = {
            ayudas: [
                {id: "",
                titulo: "",
                motivo: "",
                fecha_solicitud: "",
                monto_otorgado: "",
                estado: ""}
            ],
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

    render(){
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
            clickToSelect: true
        };
        //
        const rowEvents = {
            onClick: (e, row,rowIndex) => {
                this.setState({
                    selectedId : rowIndex
                })
                //alert(`clicked on row with index: ${this.state.selectedId}`);
            }
        };

        //Permite bloquear el boton Detalle para obligar al usuario a presionar una solicitud.
        let myComponent;
        if(this.state.selectedId !== -1) {
            myComponent = <Link to={`${this.props.match.url}/${this.state.selectedId}`}>Detalle</Link>
        } else {
            myComponent = <Button disabled={true}>Detalle</Button>
        }
            return (
                <div>
                    <Route exact path={`${this.props.match.path}`} render={() =>
                      <Grid>
                        <Row className="back-bar">
                          <Col md={12}>
                            <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"/></Button>
                            <span
                              className="professor-name"> Regresar a perfil docente </span>
                          </Col>
                        </Row>
                        <Row><h1>Solicitudes Economicas</h1></Row>
                        <Row>
                          <Col md={6}>
                            <p>Ciclo :
                              <select ref="selectorCiclos" onChange={this.cambioCiclo}>
                                {this.state.listaCiclos.map((item, i) => {
                                  return <option key={i} value={item.descripcion}>{item.descripcion}</option>
                                })}
                              </select>
                            </p>
                          </Col>
                          <Col md={6}>
                            <p>Monto Total(solicitudes aprovadas):
                            </p>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12}>
                            <BootstrapTable keyField='id' rowEvents={rowEvents} selectRow={selectRow}
                                            data={this.state.ayudas} columns={columnas}/>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={10}>
                          </Col>
                          <Col md={2}>
                            <td>{myComponent}</td>
                          </Col>
                        </Row>
                      </Grid>
                    }/>
                    <Route path={`${this.props.match.path}/:id`} render={()=>
                        <Detalle_SolicitudEconomica {...this.state.ayudas[this.state.selectedId]}
                        />}
                    />
                </div>
            );
    }
}

export default SolicitudesEconomicas;