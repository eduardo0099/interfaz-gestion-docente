import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';
import RegistroActividad from "./RegistroActividad"
import {HashRouter ,BrowserRouter,Router,Route,Link} from 'react-router-dom';
import {Grid,Row,Table,Button, Glyphicon,Col} from 'react-bootstrap';

export class Actividades extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actividades: [
                {
                    titulo:"aaa",
                    tipo:"congreso",
                    fecha_inicio:"",
                    fecha_fin:"",
                    estado:"",
                }
            ],
            ciclos: [
                {
                    id:1,
                    descripcion:"2018-1"
                }
            ],
            cicloSeleccionado: ""
        }
    }

    componentDidMount(){
        axios.get('http://200.16.7.151:8080/docente/docente/actDocente?codigo='+this.props.match.params.codigo+'&ciclo=2018-1')
            .then(response => {
                this.setState({
                    actividades: response.data.actividades
                });
            })
            .catch(error => {
                console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`,error);
            });
    }

    render () {
        console.log(this.state);

        const columnas = [
            {
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

        return(
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <Grid>
                        <select ref="selectorTipo">
                            {this.state.ciclos.map((item,i)=>{
                                return <option key={i}>{item.descripcion}</option>
                            })}
                        </select>
                        <BootstrapTable keyField='id' data={ this.state.actividades } columns={ columnas }/>
                        <Link to={`${this.props.match.url}/registroActividad`}>Registrar</Link>
                    </Grid>
                }/>
                <Route path={`${this.props.match.path}/registroActividad`} render={()=> <RegistroActividad/>}/>

            </div>
        )
    }
}

export default Actividades;
