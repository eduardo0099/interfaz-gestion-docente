import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {Grid,Row,Table,Button, Glyphicon,Col,PageHeader} from 'react-bootstrap';
import {HashRouter ,BrowserRouter,Router,Route,Link} from 'react-router-dom';
import RegistroInvestigacion from "./RegistroInvestigacion"
import ModificarInvestigacion from "./ModificarInvestigacion"
import axios from "axios/index";
import './../styles/ListaInvestigaciones.css';
import BootstrapTable from 'react-bootstrap-table-next';

let idSel=-1

export class ListaInvestigaciones extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedId:-1,
            investigaciones:[
                {
                    id:1,
                    titulo:"uno",
                    resumen:"resumen"},
                {
                    id:2,
                    titulo:"dos",
                    resumen:"resumen2"}
            ],
            ciclos: [],
            cicloSeleccionado: ""
        }
    }

    componentDidMount(){
        axios.all([
            axios.get('http://200.16.7.151:8080/general/cicloActual'),
            axios.get('http://200.16.7.151:8080/general/listaCiclos'),
        ]).then(axios.spread((respCicloAct,resplistaCiclos)=>{
            this.setState({
                cicloSeleccionado: respCicloAct.data.cicloActual,
                ciclos: resplistaCiclos.data.ciclos
            });
            return axios.get('http://200.16.7.151:8080/docente/docente/invDocente', {
                params: {
                    codigo: this.props.match.params.codigo,
                    ciclo: this.state.cicloSeleccionado,
                }
            });
        })).then((response) => {
                this.setState({
                    investigaciones: response.data.investigaciones
                })
            }
        ).catch(error => {
            console.log("Error obteniendo la lista de las investigaciones",error);
        });
    }

    cambioCiclo = (event) =>{
        let nuevoCiclo = event.target.value;
        axios.get('http://200.16.7.151:8080/docente/docente/invDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo:nuevoCiclo,
            }
        })
            .then((response) => {
                this.setState({
                    investigaciones: response.data.investigaciones
                })
            })
            .catch(error => {
                console.log("Error obteniendo la lista de las investigaciones",error);
            });
    };

    eliminar = () =>{
        if (window.confirm('Seguro que deseas eliminar esta investigacion?')) {
            // Save it!
            axios.delete('http://200.16.7.151:8080/docente/investigacion/eliminar', {
                data:{
                    id:this.state.selectedId
                }
            })
                .then(function (response) {
                    alert("Investigación eliminada");
                })
                .catch(function (error) {
                    alert("Error: No se pudo eliminar la investigación");
                })
        } else {
            // Do nothing!
        }
    }


    render () {

        const columns = [{
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'titulo',
            text: 'Nombre'
        }, {
            dataField: 'resumen',
            text: 'Descripcion'
        }];

        const selectRow = {
            mode: 'radio',
            clickToSelect: true
        };

        let myComponent;
        if (this.state.selectedId !== -1) {
            myComponent = <Button disabled={false} href={`${this.props.match.url}/${this.state.selectedId}/ModificarInvestigacion`}>Modificar</Button>
        } else {
            myComponent = <Button disabled={true}>Modificar</Button>
        }

        let eliminar;
        if (this.state.selectedId !== -1) {
            eliminar = <Button disabled={false} onClick={this.eliminar}>Eliminar</Button>
        }else {
            eliminar = <Button disabled={true}>Eliminar</Button>
        }


        const rowEvents = {
            onClick: (e, row) => {
                console.log(e)
                this.setState({
                    selectedId:row.id
                })
            }
        };

        console.log(this.props)

        return(
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
                        <Col md={12}>
                        <PageHeader>
                            Investigaciones
                        </PageHeader>
                            <Row>
                                <Col md={6}>
                                    <p>Ciclo :
                                        <select ref="selectorCiclos" onChange={this.cambioCiclo}>
                                            {this.state.ciclos.map((item,i)=>{
                                                return <option key={i} value={item.descripcion}>{item.descripcion}</option>
                                            })}
                                        </select>
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={12}>
                            <BootstrapTable keyField='id' data={ this.state.investigaciones } columns={ columns }
                                            rowEvents={ rowEvents }  selectRow={ selectRow }/>

                        </Col>
                        <Col md={12}>
                            <Button href={`${this.props.match.url}/RegistroInvestigacion`}>Registrar</Button>
                            <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            {eliminar}
                            <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            {myComponent}
                        </Col>
                    </Grid>
                }/>

                <Route path={`${this.props.match.path}/RegistroInvestigacion`} component={RegistroInvestigacion}/>
                <Route path={`${this.props.match.path}/:idInvestigacion/ModificarInvestigacion`} component={ModificarInvestigacion}/>

            </div>
        )
    }
}

export default ListaInvestigaciones;