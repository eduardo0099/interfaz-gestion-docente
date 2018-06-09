import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel,  Dropdown, Glyphicon, MenuItem} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "../AyudaEconomica/AyudaEconomicaNuevo";
import API from "../../api";
import AyudaEconomicaDetalle from "../AyudaEconomica/AyudaEconomicaDetalle";
import AyudaEconomicaAprobar from "../AyudaEconomica/AyudaEconomicaAprobar";

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

class DashboardCursos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            cursos: [
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
            console.log('listaCBProfesor0:',listaCBProfesor[0]);
            console.log('listaCBProfesor1:',listaCBProfesor[1]);
            console.log('Prueba obj:');
            if(JSON.stringify(listaCBProfesor[0])===JSON.stringify(listaCBProfesor[1])){
                console.log('ala mrdd');
            }
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

    render() {
        return (
            <div>
                <Route exact path={`${this.props.ruta}`} render={() =>
                    <BaseContainer>
                        <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <h2> Ayudas Económicas </h2>
                            </div>
                            <div className="panel-body row">
                                <div className="col-md-12">
                                    <Panel>
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
                                            {this.state.cursos.map(ayuda => {
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
                                                                    <MenuItem href={'/ayudaeconomica/id/' + ayuda.id}>Ver
                                                                        Detalle</MenuItem>
                                                                    <MenuItem href={'/ayudaeconomica/' + ayuda.id + '/Detalle'}>Ver
                                                                        Detalle JD</MenuItem>
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
                <Route path={`${this.props.ruta}/:idAyudaEconomica/Detalle`} component={AyudaEconomicaAprobar}/>
                <Route path={`${this.props.ruta}/id/:idAyudaEconomica`} component={AyudaEconomicaDetalle}/>
            </div>
        );
    }
}

export default DashboardCursos;