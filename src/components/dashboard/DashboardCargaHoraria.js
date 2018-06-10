import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel,  Dropdown, Glyphicon, MenuItem,Modal,FormControl} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "../AyudaEconomica/AyudaEconomicaNuevo";
import API from "../../api";
import AyudaEconomicaDetalle from "../AyudaEconomica/AyudaEconomicaDetalle";
import AyudaEconomicaAprobar from "../AyudaEconomica/AyudaEconomicaAprobar";


class DashboardCargaHoraria extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            profeText: '',
            ciclos:[{id:'1',descripcion:'2018-1'},
                {id:'2',descripcion:'2017-2'}],
            cicloSeleccionado:'2018-1',
            descargaHorasAux:[
                {
                    nombre:"viktor khlebnikov",
                    codigo:"20126666",
                    hDictado:1,
                    hInvestigacion:1,
                    hDeuda:0
                },
                {
                    nombre:"guani sama",
                    codigo:"20106969",
                    hDictado:1,
                    hInvestigacion:1,
                    hDeuda:10
                }
            ],
            descargaHoras:[
                {
                    nombre:"viktor khlebnikov",
                    codigo:"20126666",
                    hDictado:1,
                    hInvestigacion:1,
                    hDeuda:0
                },
                {
                    nombre:"guani sama",
                    codigo:"20106969",
                    hDictado:1,
                    hInvestigacion:1,
                    hDeuda:10
                }
            ]
        }
    }
    /*
        componentDidMount() {
            this.findCicloActual();
            this.allCiclos();
        }*/

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({ cicloSeleccionado: response.data.cicloActual })
                this.findAyudas(response.data.cicloActual);
            })
    }

    allCiclos() {
        API.get('general/listaCiclos')
            .then(response => {
                this.setState({ ciclos: response.data.ciclos })
            })
    }

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo })
        //this.findAyudas(ciclo);
    };

    busquedaNombreProfesor = e => {
        this.setState({
            profeText: e.target.value,
        })

        if (this.state.profeText == '') {//la lista no esta filtrada
            var aux = this.state.descargaHoras.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1 || d.codigo.indexOf(e.target.value) !== -1
            });
        }
        else {//el filtro tiene algo
            var aux = this.state.descargaHorasAux.filter((d) => {
                return d.nombre.toUpperCase().indexOf(e.target.value.toUpperCase()) !== -1 || d.codigo.indexOf(e.target.value) !== -1
            });
        }
        this.setState({
            descargaHoras: aux
        })
    }

    render() {
        return (
            <div>
                <div className="form-group col-md-7 ">
                    <label className="v-middle col-md-2" > Ciclo: </label>
                    <Select
                        className="v-middle col-md-5"
                        value={ this.state.cicloSeleccionado }
                        onChange={ this.cambioCiclo }
                        valueKey={ "descripcion" }
                        labelKey={ "descripcion" }
                        options={ this.state.ciclos }
                        clearable={ false }
                    />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4">
                    <FormControl type="text" placeholder="Buscar Profesor"
                                 value={ this.state.profeText}
                                 onChange={ this.busquedaNombreProfesor.bind(this) }/>
                </div>
                <br></br>
                <br></br>
                <div className="panel ">
                    <div className="panel-body row">
                        <Panel>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th className="col-md-3 "> Profesor</th>
                                    <th className="col-md-3 text-center"> Horas Dictado</th>
                                    <th className="col-md-3 text-center"> Horas Investigación</th>
                                    <th className="col-md-3 text-center"> Horas Deuda</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.descargaHoras.map(desHora => {
                                    return (
                                        <tr>
                                            <td className="v-middle">
                                                { desHora.hDeuda>0 ?  <span className="badge badge-red "> ! </span> : <span className="badge-red "></span> }
                                            </td>
                                            <td className="v-middle">
                                                <span className="block text-primary"> { desHora.nombre } </span>
                                                <small className="block text-muted"> { desHora.codigo } </small>
                                            </td>
                                            <td className="v-middle text-center">
                                                <span className="badge badge-blue"> { desHora.hDictado } </span>
                                            </td>
                                            <td className="v-middle text-center">
                                                <span className="badge badge-blue"> { desHora.hInvestigacion } </span>
                                            </td>
                                            <td className="v-middle text-center">
                                                <span className="badge badge-blue"> { desHora.hDeuda } </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardCargaHoraria;