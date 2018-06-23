import React from 'react';
import BaseContainer from "./BaseContainer";
import API from "../api";
import Select from 'react-select';

export class Cursos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            infoCursos: [],
            ciclos: [],
            cicloSeleccionado: "",
            infoDocente: {},
            tipoCursos:[{id:"1",descripcion:"pregrado", nombre:"Pregrado"},
                {id:"2",descripcion:"posgrado", nombre:"Posgrado"},
                {id:"3",descripcion:"otros", nombre:"Otros"}],
            tipoSeleccionado:"pregrado",
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
                this.findDocente(response.data.cicloActual);
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
            this.setState({ infoCursos: response.data.cursos[0].listaCursos})
        })
    }


    findDocente(ciclo) {
        API.get('docente/docente/general', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then(response => {
            this.setState({ infoDocente: response.data });
        }).catch(error => {
        });
    }

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo ,tipoSeleccionado: "pregrado"});
        this.findCursos(ciclo);
    };

    findCursosXTipo(ciclo){
        API.get('docente/docente/curDocente', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: ciclo,
            }
        }).then(response => {
            if(this.state.tipoSeleccionado === "pregrado")
                this.setState({ infoCursos: response.data.cursos[0].listaCursos})
            if(this.state.tipoSeleccionado === "posgrado")
                this.setState({ infoCursos: response.data.cursos[1].listaCursos})
            if(this.state.tipoSeleccionado === "otros")
                this.setState({ infoCursos: response.data.cursos[2].listaCursos})
        })
    }

    cambioTipoCurso = (obj) => {
        let tipo = obj.descripcion;
        this.setState({tipoSeleccionado : tipo})
        this.findCursosXTipo(this.state.cicloSeleccionado);
    }

    render() {
        return (
            <div>
                <BaseContainer>
                    <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                        <div className="panel-heading">
                            <header className="page-header">
                                <a className="btn btn-default pull-right"
                                   onClick={ this.props.history.goBack }> Volver al Perfil </a>
                                <p className="h2 m-b-sm"> { this.state.infoDocente.nombres } { this.state.infoDocente.apellido_paterno } { this.state.infoDocente.apellido_materno } - Cursos</p>
                            </header>
                        </div>
                        <div className="panel-body">
                            <div className="col-md-8">
                                <div className="col-md-1">
                                    <label> Ciclo: </label>
                                </div>
                                <div className="col-md-3">
                                    <Select
                                        value={ this.state.cicloSeleccionado }
                                        onChange={ this.cambioCiclo }
                                        valueKey={ "descripcion" }
                                        labelKey={ "descripcion" }
                                        options={ this.state.ciclos }
                                        clearable={ false }
                                        searchable={false}
                                    />
                                </div>
                                <div className="col-md-1">
                                    <label> Tipo: </label>
                                </div>
                                <div className="col-md-3">
                                    <Select
                                        value={ this.state.tipoSeleccionado }
                                        onChange={ this.cambioTipoCurso }
                                        valueKey={ "descripcion" }
                                        labelKey={ "nombre" }
                                        options={ this.state.tipoCursos }
                                        clearable={ false }
                                        searchable={false}
                                    />
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <table className="table table-striped">
                                <thead>
                                <th className="v-middle col-md-4 text-center"> Curso</th>
                                <th className="v-middle col-md-4 text-center"> Unidad</th>
                                <th className="v-middle col-md-2 text-center"> Creditos</th>
                                <th className="v-middle col-md-2 text-center"> Horas</th>
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
                                                <span className="block text-muted"> { item.unidad } </span>
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