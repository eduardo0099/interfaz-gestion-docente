import React from 'react';
import 'react-table/react-table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "./BaseContainer";
import API from "../api";

export class Cursos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            infoCursos: [],
            ciclos: [],
            cicloSeleccionado: ""
        }
    }

    componentDidMount() {
        this.allCiclos();
        this.findCicloActual();
    }

    findCicloActual() {
        API.get('general/cicloActual')
            .then(response => {
                this.setState({ cicloSeleccionado: response.data.cicloActual })
                this.findCursos(response.data.cicloActual);
            })
    }

    allCiclos() {
        API.get('general/listaCiclos')
            .then(response => {
                this.setState({ ciclos: response.data.ciclos })
            })
    }

    findCursos(ciclo) {
        API.get('docente/docente/curDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then(response => {
            this.setState({ infoCursos: response.data.cursos[0].listaCursos })
        })
    }

    cambioCiclo = (event) => {
        let ciclo = event.target.value;
        this.setState({ cicloSeleccionado: ciclo });
        this.findCursos(ciclo);
    };

    render() {
        return (
            <div>
                <BaseContainer>
                    <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                        <div className="panel-heading">
                            <a className="btn btn-default pull-right m-t-md" onClick={ this.props.history.goBack }> Volver al Perfil </a>
                            <h2> Cursos </h2>
                        </div>
                        <div className="panel-body">
                            <select ref="selectorCiclos" onChange={ this.cambioCiclo }>
                                { this.state.ciclos.map((item, i) => {
                                    return <option key={ i } value={ item.descripcion }>{ item.descripcion }</option>
                                }) }
                            </select>
                            <table className="table table-striped">
                                <thead>
                                <th className="v-middle col-md-4"> Curso</th>
                                <th className="v-middle col-md-4"></th>
                                <th className="v-middle col-md-4"></th>
                                </thead>
                                <tbody>
                                { this.state.infoCursos.map(item => {
                                    return (
                                        <tr>
                                            <td className="v-middle">
                                                <span className="block text-primary"> { item.nombre } </span>
                                                <small className="block text-muted"> { item.codigo } </small>
                                                <small className="block text-muted"> Horario { item.horario } </small>
                                            </td>
                                            <td className="v-middle text-center">
                                                <span className="badge badge-blue"> { item.creditos } </span>
                                                <small className="block text-muted m-t-xs"> créditos</small>
                                            </td>
                                            <td className="v-middle text-center">
                                                <span className="badge badge-blue"> { item.horas } </span>
                                                <small className="block text-muted m-t-xs"> horas semanales </small>
                                            </td>
                                        </tr>
                                    )
                                }) }
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