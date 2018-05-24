import React from 'react';
import 'react-table/react-table.css';
import axios from "axios/index";
import '../styles/Actividades.css';
import {Button, Col, Grid} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import {Route} from 'react-router-dom';
import SkyLight from 'react-skylight';
import DatePicker from 'react-date-picker'
import BaseContainer from "./BaseContainer";
import RegistroInvestigacion from "./RegistroInvestigacion";
import ModificarInvestigacion from "./ModificarInvestigacion";
import RegistroActividad from "./RegistroActividad";
import ModificarActividad from "./ModificarActividad";

export class Actividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
            actividades: [
                {
                    id: "",
                    titulo: "",
                    tipo: "",
                    fecha_inicio: "",
                    fecha_fin: "",
                    estado: "",
                }
            ],
            ciclos: [],
            cicloSeleccionado: "",
            dateInit: new Date(),
            dateFin: new Date(),
        }
    }

    componentDidMount() {
        axios.get('http://200.16.7.151:8080/docente/docente/actDocente?codigo=' + this.props.match.params.codigo + '&ciclo=2018-1')
            .then(response => {
                this.setState({
                    actividades: response.data.actividades
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la actividad ${this.props.match.params.codigo}`, error);
            })
    }

    guardar = () => {
        var titulo = document.getElementsByName("titulo")[0].value;
        var fechaIni = document.getElementsByName("fechaIni")[0].value;
        var fechaFin = document.getElementsByName("fechaFin")[0].value;
    }

    eliminar = () => {
        if (window.confirm('Seguro que deseas eliminar esta investigacion?')) {
            // Save it!
            let selectedId = this.state.selectedId;
            axios.delete('http://200.16.7.151:8080/docente/actividad/eliminar', {
                data: {
                    id: this.state.selectedId
                }
            })
                .then(function (response) {
                    alert("Investigación eliminada");
                })
                .catch(function (error) {
                    alert("Error: No se pudo eliminar la investigación");
                })

            this.setState({
                actividades: this.state.actividades.filter(function (el) {
                    return el.id !== selectedId;
                })
            })
        } else {
            // Do nothing!
        }
    }

    onChange = date => this.setState({date})

    render() {
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
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: '#93a3b5',
            selected: [this.state.selectedId]
        };

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(rowIndex)
                console.log(row)
                this.setState({
                    selectedId: row.id,
                })
            }
        };

        console.log(this.props)

        function myFunction(x) {
            console.log("Row index is: " + x.rowIndex);
        }

        let myComponent;
        if (this.state.selectedId !== -1) {
            myComponent = <Button disabled={false} href={`${this.props.match.url}/${this.state.selectedId}/ModificarActividad`}>Modificar</Button>
        } else {
            myComponent = <Button disabled={true}>Modificar</Button>
        }

        let eliminar;
        if (this.state.selectedId !== -1) {
            eliminar = <Button disabled={false} onClick={this.eliminar}>Eliminar</Button>
        } else {
            eliminar = <Button disabled={true}>Eliminar</Button>
        }

        console.log(this.props)

        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <a className="btn btn-default pull-right m-t-md" onClick={this.props.history.goBack}> Volver al Perfil </a>
                                <h1> Actividades </h1>
                            </div>
                            <div className="panel-body">
                                <div className="m-t-md">
                                    <BootstrapTable keyField='id' data={this.state.actividades} columns={columns}  rowEvents={rowEvents} selectRow={selectRow}/>
                                </div>
                                <div className="m-t-md">
                                    <a className="btn btn-default" href={`${this.props.match.url}/RegistroActividad`}>Registrar</a>
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    {eliminar}
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    {myComponent}
                                </div>
                            </div>
                        </div>
                    </BaseContainer>
                }/>

                <Route path={`${this.props.match.path}/RegistroActividad`} component={RegistroActividad}/>
                <Route path={`${this.props.match.path}/:idActividad/ModificarActividad`} component={ModificarActividad}/>

            </div>
        );
    }
}

export default Actividades;
