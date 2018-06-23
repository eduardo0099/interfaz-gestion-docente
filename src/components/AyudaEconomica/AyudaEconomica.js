import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel,  Dropdown, Glyphicon, MenuItem,Row,Col} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "./AyudaEconomicaNuevo";
import API from "../../api";
import AyudaEconomicaDetalle from "./AyudaEconomicaDetalle";
import AyudaEconomicaAprobar from "./AyudaEconomicaAprobar";
import {Role, currentRole} from "../../auth";

function onlyUnique(array) {
    var BreakException = {};
    let aux=[];
    array.forEach(entry => {
        let repetido=0;
        if(aux.length==0){
            aux=[...aux,entry];
        }

        try{
            aux.forEach(entry2=>{
                if(JSON.stringify(entry)==JSON.stringify(entry2)){
                    repetido=1;
                    throw BreakException;
                }
            });
            aux=[...aux,entry];
        } catch (e) {
            if (e !== BreakException) throw e;
        }

    });
    return aux;
}

class AyudaEconomica extends React.Component {

    constructor(props){
        super(props);
        console.log(currentRole());
        this.state = {
            montoMinVal:'',
            montoMaxVal:'',
            investigacionSelect:-1,
            estadoSelect:-1,
            motivoSelect:-1,
            seccionSelect:-1,
            profesorSelect:'',
            codigoProfesorSelect:-1,
            codigoSelect:-1,
            idCodigoSolSelect:-1,
            montoMin:-1,
            montoMax:-1,
            fechaIni:-1,
            fechaFin:-1,

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
                    monto_otorgado: 8000000.63,
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
        this.handleMontoMin = this.handleMontoMin.bind(this);
        this.handleMontoMax = this.handleMontoMax.bind(this);
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
                listaCBProfesor=[...listaCBProfesor,{codigo:entry.profesor.codigo_profesor,nombres:entry.profesor.nombres +" "+ entry.profesor.apellido_paterno +" "+ entry.profesor.apellido_materno}];
                listaCBSeccion=[...listaCBSeccion,{seccion:entry.profesor.seccion}];
                listaCBMotivo=[...listaCBMotivo,{motivo:entry.motivo}];
                listaCBEstado=[...listaCBEstado,{estado:entry.estado}];
                listaCBCodigo=[...listaCBCodigo,{codigo:entry.codigo_solicitud,id:entry.id}];
            });
            /*console.log('listaCBProfesor0:',listaCBProfesor[0]);
            console.log('listaCBProfesor1:',listaCBProfesor[1]);
            console.log('Prueba obj:');
            if(JSON.stringify(listaCBProfesor[0])===JSON.stringify(listaCBProfesor[1])){
                console.log('worked');
            }*/
            this.setState({
                ayudas: response.data.ayudaEconomica,
                ayudasMostrar: response.data.ayudaEconomica,
                listaCBInvestigaciones:onlyUnique(listaCBInvestigaciones),
                listaCBProfesor:onlyUnique(listaCBProfesor),
                listaCBSeccion:onlyUnique(listaCBSeccion),
                listaCBMotivo:onlyUnique(listaCBMotivo),
                listaCBEstado:onlyUnique(listaCBEstado),
                listaCBCodigo:onlyUnique(listaCBCodigo)
            })
        }).catch(error => {
            console.log("Error obteniendo la lista de las investigaciones", error);
        });
    }

    cambioCiclo = (obj) => {
        let ciclo = obj.descripcion;
        this.setState({ cicloSeleccionado: ciclo })
        this.findAyudas(ciclo);
        this.reestablecerFiltros();
    };

    handleInvestigacion(obj) {
        if(obj==null){
            this.setState({
                investigacionSelect: -1
            })
        }else {
            this.setState({investigacionSelect: obj.titulo})
        }
    }

    handleEstado(obj) {
        if(obj==null){
            this.setState({
                estadoSelect: -1
            })
        }else {
            this.setState({estadoSelect: obj.estado})
        }
    }

    handleMotivo(obj) {
        if(obj==null){
            this.setState({
                motivoSelect: -1
            })
        }else {
            this.setState({motivoSelect: obj.motivo})
        }
    }

    handleSeccion(obj) {
        if(obj==null){
            this.setState({
                seccionSelect: -1
            })
        }else {
            this.setState({seccionSelect: obj.seccion})
        }
    }

    handleProfesor(obj) {
        if(obj==null){
            this.setState({
                codigoProfesorSelect: -1,
                profesorSelect: ''
            })
        }else {
            this.setState({
                codigoProfesorSelect: obj.codigo,
                profesorSelect: obj.nombres
            })
        }
    }

    handleCodigo(obj) {
        if(obj==null){
            this.setState({
                codigoSelect: -1,
                idCodigoSolSelect: -1
            })
        }else {
            this.setState({
                codigoSelect: obj.codigo,
                idCodigoSolSelect: obj.id
            })
        }
    }

    handleMontoMin(event) {
        this.setState({
            montoMin: event.target.value,
            montoMinVal:event.target.value
        });
    }

    handleMontoMax(event) {
        this.setState({
            montoMax: event.target.value,
            montoMaxVal:event.target.value
        });
    }


    realizarFiltro=()=>{
        console.log('investigacionSelect:',this.state.investigacionSelect);
        console.log('estadoSelect:',this.state.estadoSelect);
        console.log('motivoSelect:',this.state.motivoSelect);
        console.log('seccionSelect:',this.state.seccionSelect);
        console.log('profesorSelect:',this.state.codigoProfesorSelect);
        console.log('codigoSelect:',this.state.idCodigoSolSelect);
        console.log('montoMin:',this.state.montoMin);
        console.log('montoMax:',this.state.montoMax);


        API.get('ayudasEconomicas/ayudasEconomicas/filtrar', {
            params: {
                ciclo:this.state.cicloSeleccionado,
                codigo_ayuda:this.state.idCodigoSolSelect,
                codigo_inv:-1,
                titulo:this.state.investigacionSelect,
                codigo_profesor:this.state.codigoProfesorSelect,
                seccion:this.state.seccionSelect,
                motivo:this.state.motivoSelect,
                estado:this.state.estadoSelect,
                montoMin:this.state.montoMin,
                montoMax:this.state.montoMax,
                fecha_inicio:-1,
                fecha_fin:-1
            }
        }).then(response => {
            console.log('response:',response);
            this.setState({ayudasMostrar: response.data.ayudaEconomica});
        }).catch(error => {
            console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`, error);
        });
    }

    reestablecerFiltros =() =>{
        this.setState({
            investigacionSelect:-1,
            estadoSelect:-1,
            motivoSelect:-1,
            seccionSelect:-1,
            codigoProfesorSelect:-1,
            codigoSelect:-1,
            idCodigoSolSelect:-1,
            montoMin:-1,
            montoMax:-1,
            fechaIni:-1,
            fechaFin:-1,
            montoMinVal:'',
            montoMaxVal:'',
            profesorSelect:'',
            ayudasMostrar:this.state.ayudas
        });
    }


    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                { (currentRole() != Role.JEFE_DEPARTAMENTO) ?
                                    <a className="btn btn-sm btn-primary pull-right m-t-md"
                                   href={`${this.props.match.url}/nuevo`}> Nueva </a> :
                                   " " }
                                <h2> Ayudas Económicas </h2>
                            </div>
                            <div className="panel-body row">

                                <div className="col-md-3">
                                    <Panel>
                                        <Panel.Heading> Búsqueda </Panel.Heading>
                                        <Panel.Body>
                                            <div className="form-group">
                                                <label> Código </label><Select
                                                value={ this.state.codigoSelect }
                                                onChange={ this.handleCodigo }
                                                valueKey={ "codigo" }
                                                labelKey={ "codigo" }
                                                options={ this.state.listaCBCodigo }
                                                clearable={ true }
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
                                                    clearable={ true }
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
                                                    clearable={ true }
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
                                                    clearable={ true }
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
                                                    clearable={ true }
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
                                                    clearable={ true }
                                                />

                                            </div>

                                            <div className="form-group">
                                                <Panel>
                                                    <Panel.Heading> Monto </Panel.Heading>
                                                    <Panel.Body>
                                                        <div className="form-horizontal">
                                                            <div className="form-group">
                                                                <label
                                                                    className="control-label col-md-2"> Mín </label>
                                                                <div className="col-md-10">
                                                                    <input type="number"
                                                                           className="form-control" value={ this.state.montoMinVal } onChange ={this.handleMontoMin}></input>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label
                                                                    className="control-label col-md-2"> Máx </label>
                                                                <div className="col-md-10">
                                                                    <input type="number"
                                                                           className="form-control" value={ this.state.montoMaxVal } onChange ={this.handleMontoMax}></input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Panel.Body>
                                                </Panel>
                                            </div>

                                            <div>
                                                <button className="btn btn-primary btn-block" onClick={this.realizarFiltro}> Filtrar</button>
                                            </div>
                                            <br></br>
                                            <div>
                                                <button className="btn btn-block" onClick={this.reestablecerFiltros}> Reestablecer filtros</button>
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
                                                <th></th>
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
                                                            <span className="text-md"> S/ {ayuda.monto_otorgado} </span>
                                                        </td>
                                                        <td className="v-middle text-center">
                                                            <span className={"label label-" + ({
                                                                'Aprobado': 'success',
                                                                'Pendiente': 'warning',
                                                                'Rechazado': 'danger'
                                                            }[ayuda.estado])}> {ayuda.estado} </span>
                                                        </td>
                                                        <td className="v-middle">
                                                            <Dropdown className="dropdown-options" pullRight>
                                                                <Dropdown.Toggle className="dropdown-options" noCaret="true">
                                                                    <Glyphicon glyph="option-vertical"/>
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    { (currentRole() === Role.JEFE_DEPARTAMENTO) ?
                                                                        <MenuItem href={'/ayudaeconomica/' + ayuda.id + '/Detalle'}>Ver Detalle</MenuItem> :
                                                                        <MenuItem href={'/ayudaeconomica/id/' + ayuda.id}>Ver Detalle</MenuItem> }
                                                                </Dropdown.Menu>
                                                            </Dropdown>
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
                <Route path={`${this.props.match.path}/:idAyudaEconomica/Detalle`} component={AyudaEconomicaAprobar}/>
                <Route path={`${this.props.match.path}/id/:idAyudaEconomica`} component={AyudaEconomicaDetalle}/>
            </div>
        );
    }
}

export default AyudaEconomica;