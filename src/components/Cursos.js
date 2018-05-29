import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";

export class Cursos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            infoCursos: [
                {
                    "tipo": "pregrado",
                    "listaCursos": []
                },
                {
                    "tipo": "posgrado",
                    "listaCursos": []
                },
                {
                    "tipo": "otros",
                    "listaCursos": []
                }
            ],
            ciclos: [],
            cicloSeleccionado: "",
            listadoCursos:[]
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
            return axios.get('http://200.16.7.151:8080/docente/docente/curDocente', {
                params: {
                    codigo: this.props.match.params.codigo,
                    ciclo: this.state.cicloSeleccionado,
                }
            });
        })).then((respcursos) => {
                this.setState({
                    infoCursos: respcursos.data.cursos
                })
            }
        ).catch(error => {
            console.log(`Error al obtener datos de la pantalla cursos`, error);
        });

    }

    cambioCiclo = (event) => {
        let nuevoCiclo = event.target.value;
        axios.get('http://200.16.7.151:8080/docente/docente/curDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: nuevoCiclo,
            }
        }).then((respcursos) => {
            let temp = [];
            respcursos.data.cursos.forEach(curso => {
                temp = temp.concat(curso.listaCursos);
            });
            console.log(JSON.stringify(temp, null, 2));

                this.setState({
                    listadoCursos: temp,
                    cicloSeleccionado: nuevoCiclo
                })
            })
            .catch(error => {
                console.log(`Error al obtener datos de la pantalla cursos`, error);
            });
    };

    render() {
        return (
            <div>
                <BaseContainer>
                    <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                        <div className="panel-heading">
                            <a className="btn btn-default pull-right m-t-md" onClick={this.props.history.goBack}> Volver al Perfil </a>
                            <h2> Cursos </h2>
                        </div>
                        <div className="panel-body">
                        <select ref="selectorCiclos" onChange={this.cambioCiclo}>
                            {this.state.ciclos.map((item, i) => {
                                return <option key={i} value={item.descripcion}>{item.descripcion}</option>
                            })}
                        </select>
                        <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="v-middle col-md-4">Curso</th>
                                <th className="v-middle col-md-4"></th>
                                <th className="v-middle col-md-4"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listadoCursos.map( curso => {
                                return (
                                <tr>
                                <td className="-v-middle">
                                    <span className="block text-primary"> { curso.nombre } </span>
                                    <small className="block text-muted"> { curso.codigo } </small>
                                    <small className="block text-muted"> Horario { curso.horario } </small>
                                </td>
                                <td className="-v-middle text-center">
                                    <span className="badge"> { curso.creditos } </span>
                                    <small className="block text-muted m-t-xs"> créditos </small>
                                </td>
                                <td className="-v-middle text-center">
                                       <span className="badge"> { curso.horas } </span>
                                    <small className="block text-muted m-t-xs"> horas semanales </small>
                                </td>
                                </tr>
                                )
                            })}
                        </tbody>
                        </table>
                        </div>
                    </div>
                </BaseContainer>
            </div>
        )
    }
}


export default Cursos;