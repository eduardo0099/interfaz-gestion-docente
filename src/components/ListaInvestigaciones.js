import React from 'react';
import {Button} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import RegistroInvestigacion from "./RegistroInvestigacion"
import ModificarInvestigacion from "./ModificarInvestigacion"
import axios from "axios/index";
import './../styles/ListaInvestigaciones.css';
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";

export class ListaInvestigaciones extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
            investigaciones: [
                {
                    id: 1,
                    titulo: "uno",
                    resumen: "resumen"
                },
                {
                    id: 2,
                    titulo: "dos",
                    resumen: "resumen2"
                }
            ],
            ciclos: [],
            cicloSeleccionado: ""
        }
    }

    componentDidMount() {
        axios.all([
            axios.get('http://200.16.7.151:8080/general/cicloActual'),
            axios.get('http://200.16.7.151:8080/general/listaCiclos'),
        ]).then(axios.spread((respCicloAct, resplistaCiclos) => {
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
            console.log("Error obteniendo la lista de las investigaciones", error);
        });
    }

    cambioCiclo = (event) => {
        let nuevoCiclo = event.target.value;
        axios.get('http://200.16.7.151:8080/docente/docente/invDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: nuevoCiclo,
            }
        })
            .then((response) => {
                this.setState({
                    investigaciones: response.data.investigaciones
                })
            })
            .catch(error => {
                console.log("Error obteniendo la lista de las investigaciones", error);
            });
    };

    eliminar = () => {
        if (window.confirm('Seguro que deseas eliminar esta investigacion?')) {
            // Save it!
            let selectedId = this.state.selectedId;
            axios.delete('http://200.16.7.151:8080/docente/investigacion/eliminar', {
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
                investigaciones: this.state.investigaciones.filter(function (el) {
                    return el.id !== selectedId;
                })
            })
        } else {
            // Do nothing!
        }
    }


    render() {

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

        let myComponent;
        if (this.state.selectedId !== -1) {
            myComponent = <Button disabled={false} href={`${this.props.match.url}/${this.state.selectedId}/ModificarInvestigacion`}>Modificar</Button>
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
                                <h1> Investigaciones </h1>
                            </div>
                            <div className="panel-body">
                                <div>
                                    <p>Ciclo:
                                        <select ref="selectorCiclos" onChange={this.cambioCiclo}>
                                            {this.state.ciclos.map((item, i) => {
                                                return <option key={i} value={item.descripcion}>{item.descripcion}</option>
                                            })}
                                        </select>
                                    </p>
                                </div>
                                <div className="m-t-md">
                                    <BootstrapTable keyField='id' data={this.state.investigaciones} columns={columns}  rowEvents={rowEvents} selectRow={selectRow}/>
                                </div>
                                <div className="m-t-md">
                                    <a className="btn btn-default" href={`${this.props.match.url}/RegistroInvestigacion`}>Registrar</a>
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    {eliminar}
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    {myComponent}
                                </div>
                            </div>
                        </div>
                    </BaseContainer>
                }/>

                <Route path={`${this.props.match.path}/RegistroInvestigacion`} component={RegistroInvestigacion}/>
                <Route path={`${this.props.match.path}/:idInvestigacion/ModificarInvestigacion`} component={ModificarInvestigacion}/>

            </div>
        )
    }
}

export default ListaInvestigaciones;