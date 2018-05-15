import React, { Component } from 'react';
import 'react-table/react-table.css';
import axios from "axios/index";
import '../styles/Actividades.css';
import {Grid,Button, Col} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import {Route} from 'react-router-dom';
import SkyLight from 'react-skylight';

export class Actividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId:-1,
            actividades: [
                {
                    id:"",
                    titulo:"",
                    tipo:"",
                    fecha_inicio:"",
                    fecha_fin:"",
                    estado:"",
                }
            ],
            ciclos:[],
            cicloSeleccionado: ""
        }
    }

    componentDidMount(){
        axios.get('http://200.16.7.151:8080/docente/docente/actDocente?codigo='+this.props.match.params.codigo+'&ciclo=2018-1')
            .then(response => {
                this.setState({
                    actividades: response.data.actividades
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la actividad ${this.props.match.params.codigo}`,error);
            })
    }

    eliminar = () =>{
        if(this.state.selectedId!=-1){
            if (window.confirm('Seguro que deseas eliminar esta actividad?')) {
                // Save it!
                axios.delete('http://200.16.7.151:8080/docente/actividad/eliminar', {
                    data:{
                        id:this.state.selectedId
                    }
                })
                    .then(function (response) {
                        alert("Actividad eliminada");
                    })
                    .catch(function (error) {
                        alert("Error: No se pudo eliminar la actividad");
                    })
            } else {
                // Do nothing!
            }
        }else{
            alert(`Seleccionar una actividad!`);
        }
    }

    render(){
        console.log(this.state);

        const columns = [
            {
                dataField: 'id',
                text: 'ID',
                hidden: true
            }, {
                text: 'Nombre de la Actividad',
                dataField: 'titulo'
            }, {
                text: 'Tipo',
                dataField: 'tipo'
            }, {
                text: 'Fecha Inicio',
                dataField: 'fecha_inicio'
            }, {
                text: 'Fecha Fin',
                dataField: 'fecha_fin',
            }, {
                text: 'Estado',
                dataField: 'estado',
            }
        ];
        const selectRow = {
            mode: 'radio',
            clickToSelect: true
        };

        const rowEvents = {
            onClick: (e, row) => {
                this.setState({
                    selectedId: row.id
                });
                //alert(`clicked on row with index: ${this.state.selectedId}`);
            }
        };

        console.log(this.props)

        function myFunction(x) {
            console.log("Row index is: " + x.rowIndex);
        }
        let myComponent;
        if(this.state.selectedId !== -1) {
            //myComponent = <Link to={`${this.props.match.url}/${this.state.selectedId}/ModificarActividad`}>Modificar</Link>
        } else {
            myComponent = <label onClick={this.modificar}>Modificar</label>
        }

        return (
            <div>
                <h2>Actividades</h2>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <Grid>
                        <Col md={12}>
                            <Col md={12}>
                                <BootstrapTable keyField='id' data={ this.state.actividades } columns={ columns }
                                                selectRow={ selectRow } rowEvents={ rowEvents } />

                            </Col>
                            <Col md={2}>
                                <div className="col-md-2">
                                    <button className="btn btn-primary"
                                            onClick={() => this.refs.simpleDialog.show()}>Nueva Actividad</button>
                                </div>
                                <Button onClick={this.eliminar}>Eliminar</Button>
                                {myComponent}
                            </Col>
                        </Col>
                    </Grid>
                }/>

                <SkyLight hideOnOverlayClicked ref="simpleDialog">
                    <div className="panel panel-default">
                        <div className="panel-heading">Registrar Nueva Actividad</div>
                        <div className="panel-body">
                            <input type="text" placeholder="Título" className="form-control"
                                   name="titulo" onChange={this.handleChange}/>
                            <select className="form-control">
                                <option>Congreso</option>
                                <option>Taller</option>
                                <option>Visita</option>
                                <option>Capacitacion</option>
                            </select>

                            <input type="text" placeholder="Fecha Inicio" className="form-control"
                                   name="" onChange={this.handleChange}/>
                            <button className="btn btn-primary" onClick={this.handleSubmit}>Guardar</button>
                        </div>
                    </div>
                </SkyLight>

            </div>
        );
    }
}

export default Actividades;
