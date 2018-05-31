import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "./AyudaEconomicaNuevo";
import API from "../../api";

class AyudaEconomica extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            investigacionSelect:'',
            estadoSelect:'',
            motivoSelect:'',
            seccionSelect:'',
            profesorSelect:'',
            codigoSelect:'',
            ayudasMostrar:[],
            ciclos: [],
            cicloSeleccionado: "",
            listaFiltro:[],
            listaCBInvestigaciones:[],
            listaCBProfesor:[],
            listaCBSeccion:[],
            listaCBMotivo:[],
            listaCBEstado:[],
            listaCBCodigo:[],
            ayudas: [
                {
                    id: 20,
                    codigo_solicitud: 'SOL001',
                    titulo: 'Investigando las Causas de las Investigaciones 1',
                    motivo: 'Compra de Materiales',
                    montoOtorgado: 8000000.63,
                    estado:'Aprobado',
                    fechaSolicitud: '12/12/12',
                    profesor: {
                        codigo_profesor:20112728,
                        nombres:"Freddy",
                        apellido_paterno:"Espinoza",
                        apellido_materno:"Paz",
                        correo_pucp:"fpaz@pucp.edu.pe",
                        tipo_profesor:"TC",
                        seccion:"Informatica"
                    },
                }]
        }

        this.handleInvestigacion = this.handleInvestigacion.bind(this);
        this.handleEstado = this.handleEstado.bind(this);
        this.handleMotivo = this.handleMotivo.bind(this);
        this.handleSeccion = this.handleSeccion.bind(this);
        this.handleProfesor = this.handleProfesor.bind(this);
        this.handleCodigo = this.handleCodigo.bind(this);
    }

    componentDidMount() {
        this.findCicloActual();
        this.allCiclos();
    }

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

    findAyudas(ciclo) {
        API.get('ayudasEconomicas/ayudasEconomicas/listar', {
            params: {
                ciclo: ciclo,
            }
        }).then(response => {
            let listaCBInvestigaciones=[];
            let listaCBProfesor=[];
            let listaCBSeccion=[];
            let listaCBMotivo=[];
            let listaCBEstado=[];
            let listaCBCodigo=[];
            response.data.ayudaEconomica.forEach(function (entry) {
                listaCBInvestigaciones=[...listaCBInvestigaciones,{titulo:entry.titulo}];
                listaCBProfesor=[...listaCBProfesor,{nombres:entry.profesor.nombres}];
                listaCBSeccion=[...listaCBSeccion,{seccion:entry.profesor.seccion}];
                listaCBMotivo=[...listaCBMotivo,{motivo:entry.motivo}];
                listaCBEstado=[...listaCBEstado,{estado:entry.estado}];
                listaCBCodigo=[...listaCBCodigo,{codigo:entry.codigo_solicitud}];
            });
            this.setState({
                ayudas: response.data.ayudaEconomica,
                ayudasMostrar: response.data.ayudaEconomica,
                listaCBInvestigaciones:listaCBInvestigaciones.filter( this.onlyUnique ),
                listaCBProfesor:listaCBProfesor.filter( this.onlyUnique ),
                listaCBSeccion:listaCBSeccion.filter( this.onlyUnique ),
                listaCBMotivo:listaCBMotivo.filter( this.onlyUnique ),
                listaCBEstado:listaCBEstado.filter( this.onlyUnique ),
                listaCBCodigo:listaCBCodigo.filter( this.onlyUnique )
            })
        }).catch(error => {
            console.log("Error obteniendo la lista de las investigaciones", error);
        });
    }

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo })
        this.findAyudas(ciclo);
    };

    handleInvestigacion(obj) {
        this.setState({ investigacionSelect: obj.titulo })
    }

    handleEstado(obj) {
        this.setState({ estadoSelect: obj.estado })
    }

    handleMotivo(obj) {
        this.setState({ motivoSelect: obj.motivo })
    }

    handleSeccion(obj) {
        this.setState({ seccionSelect: obj.seccion })
    }

    handleProfesor(obj) {
        this.setState({ profesorSelect: obj.nombres })
    }

    handleCodigo(obj) {
        this.setState({ codigoSelect: obj.codigo })
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    realizarFiltro=()=>{
        let listaFiltro=[];
        if(this.state.codigoSelect!=''){
            let ayudas= this.state.ayudas;
            let codigo=this.state.codigoSelect;
            ayudas.forEach(entry => {
                if(entry.codigo_solicitud===codigo){
                    listaFiltro= [...listaFiltro, entry]
                }
            });
        }
        if(this.state.investigacionSelect!=''){
            let ayudas= this.state.ayudas;
            let investigacion=this.state.investigacionSelect;
            ayudas.forEach(entry => {
                if(entry.titulo===investigacion){
                    listaFiltro= [...listaFiltro, entry]
                }
            });
        }
        if(this.state.profesorSelect!=''){
            let ayudas= this.state.ayudas;
            let profesor=this.state.profesorSelect;
            ayudas.forEach(entry => {
                if(entry.profesor.nombres===profesor){
                    listaFiltro= [...listaFiltro, entry]
                }
            });
        }
        if(this.state.motivoSelect!=''){
            let ayudas= this.state.ayudas;
            let motivo=this.state.motivoSelect;
            ayudas.forEach(entry => {
                if(entry.motivo===motivo){
                    listaFiltro= [...listaFiltro, entry]
                }
            });
        }
        if(this.state.seccionSelect!=''){
            let ayudas= this.state.ayudas;
            let seccion=this.state.seccionSelect;
            ayudas.forEach(entry => {
                if(entry.profesor.seccion===seccion){
                    listaFiltro= [...listaFiltro, entry]
                }
            });
        }
        if(this.state.estadoSelect!=''){
            let ayudas= this.state.ayudas;
            let estado=this.state.estadoSelect;
            ayudas.forEach(entry => {
                if(entry.estado===estado){
                    listaFiltro= [...listaFiltro, entry]
                }
            });
        }
        var unique = listaFiltro.filter( this.onlyUnique );
        this.setState(() => ({
            ayudasMostrar: unique
        }));
        console.log('listaFiltro:',unique);
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <a className="btn btn-sm btn-primary pull-right m-t-md"
                                   href={`${this.props.match.url}/nuevo`}> Nueva </a>
                                <h2> Ayudas Económicas </h2>
                            </div>
                            <div className="panel-body row">

                                <div className="col-md-3">
                                    <Panel>
                                        <Panel.Heading> Búsqueda </Panel.Heading>
                                        <Panel.Body>
                                            <div className="form-group">
                                                <label> Código </label>
                                                <Select
                                                    value={ this.state.codigoSelect }
                                                    onChange={ this.handleCodigo }
                                                    valueKey={ "codigo" }
                                                    labelKey={ "codigo" }
                                                    options={ this.state.listaCBCodigo }
                                                    clearable={ false }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label> Investigación </label>
                                                <Select
                                                    value={ this.state.investigacionSelect }
                                                    onChange={ this.handleInvestigacion }
                                                    valueKey={ "titulo" }
                                                    labelKey={ "titulo" }
                                                    options={ this.state.listaCBInvestigaciones }
                                                    clearable={ false }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label> Profesor </label>
                                                <Select
                                                    value={ this.state.profesorSelect }
                                                    onChange={ this.handleProfesor }
                                                    valueKey={ "nombres" }
                                                    labelKey={ "nombres" }
                                                    options={ this.state.listaCBProfesor }
                                                    clearable={ false }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label> Sección </label>
                                                <Select
                                                    value={ this.state.seccionSelect }
                                                    onChange={ this.handleSeccion }
                                                    valueKey={ "seccion" }
                                                    labelKey={ "seccion" }
                                                    options={ this.state.listaCBSeccion }
                                                    clearable={ false }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label> Motivo </label>
                                                <Select
                                                    value={ this.state.motivoSelect }
                                                    onChange={ this.handleMotivo }
                                                    valueKey={ "motivo" }
                                                    labelKey={ "motivo" }
                                                    options={ this.state.listaCBMotivo }
                                                    clearable={ false }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label> Estado </label>
                                                <Select
                                                    value={ this.state.estadoSelect }
                                                    onChange={ this.handleEstado }
                                                    valueKey={ "estado" }
                                                    labelKey={ "estado" }
                                                    options={ this.state.listaCBEstado }
                                                    clearable={ false }
                                                />
                                            </div>
                                            <div>
                                                <button className="btn btn-primary btn-block" onClick={this.realizarFiltro}> Filtrar</button>
                                            </div>
                                        </Panel.Body>
                                    </Panel>
                                </div>
                                <div className="col-md-9">
                                    <Panel>
                                        <div>
                                            <div className="form-group col-md-2 row ">
                                                <label> Ciclo </label>
                                                <Select
                                                    value={ this.state.cicloSeleccionado }
                                                    onChange={ this.cambioCiclo }
                                                    valueKey={ "descripcion" }
                                                    labelKey={ "descripcion" }
                                                    options={ this.state.ciclos }
                                                    clearable={ false }
                                                />
                                            </div>
                                        </div>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th className="col-md-1 text-center"> Código</th>
                                                <th className="col-md-3"> Investigación</th>
                                                <th className="col-md-3"> Profesor</th>
                                                <th className="col-md-2"> Motivo</th>
                                                <th className="col-md-2 text-center"> Monto</th>
                                                <th className="col-md-1 text-center"> Estado</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.ayudasMostrar.map(ayuda => {
                                                return (
                                                    <tr>
                                                        <td className="v-middle text-center">
                                                            <b className="text-primary text-md"> {ayuda.codigo_solicitud} </b>
                                                        </td>
                                                        <td className="v-middle">
                                                            <span> {ayuda.titulo}</span>
                                                        </td>
                                                        <td className="v-middle">
                                                            <span className="block"> {ayuda.profesor.nombres} {ayuda.profesor.apellido_paterno}</span>
                                                            <small
                                                                className="block text-muted"> {ayuda.profesor.tipo_profesor}</small>
                                                            <small
                                                                className="block text-muted"> {ayuda.profesor.seccion}</small>
                                                        </td>
                                                        <td className="v-middle">
                                                            <span> {ayuda.motivo}</span>
                                                        </td>
                                                        <td className="v-middle text-center">
                                                            <span className="text-md"> S/ 200.00 </span>
                                                        </td>
                                                        <td className="v-middle text-center">
                                                            <span className={"label label-" + ({
                                                                'Aprobado': 'success',
                                                                'Pendiente': 'warning',
                                                                'Rechazado': 'danger'
                                                            }[ayuda.estado])}> {ayuda.estado} </span>
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
                    </BaseContainer>
                }/>
                <Route path={`${this.props.match.path}/nuevo`} component={AyudaEconomicaNuevo}/>
            </div>
        );
    }
}

export default AyudaEconomica;
