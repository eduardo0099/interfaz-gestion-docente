import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "./AyudaEconomicaNuevo";
import API from "../../api";

class AyudaEconomicaDetalle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            solicitudEconomica: {
                id: this.props.match.params.idAyudaEconomica,
                motivo: '',
                monto_otorgado: '',
                fecha_solicitud: '',
                fecha_inicio: '',
                fecha_fin: '',
                comentarios_adicionales: '',
                servicio_boletos: '',
                servicio_costo_maestria: '',
                servicio_inscripcion: '',
                servicio_viaticos: '',
                profesor: {
                    codigo_profesor: '',
                    nombres: '',
                    apellido_paterno: '',
                    apellido_materno: '',
                    correo_pucp: '',
                    seccion: ''
                },
                investigacion: 'Investigando React',
                docenteSolicitante: 'Ruben Jordan',
                gastos: [
                    {id: 1, numero:'001-23020', tipo: 'Boleta', detalle: 'Impresiones y copias', monto: 35.00, observaciones: 'algo'},
                    {id: 2, numero:'001-23022', tipo: 'Boleta', detalle: 'Impresiones y copiasA', monto: 350.00, observaciones: 'algo2'},
                    {id: 3, numero:'001-23023', tipo: 'Boleta', detalle: 'Impresiones y copiasB', monto: 3500.00, observaciones: 'algo3'}
                ]
            }
        }
    }

    componentDidMount(){
        this.findSolicitud();
        console.log(this.state.ayudasEconomica);
        console.log(this.state.ayudasEconomica);
        console.log(this.state.ayudasEconomica);
        console.log(this.state.ayudasEconomica);
        console.log(this.state.ayudasEconomica);
        console.log(this.state.ayudasEconomica);
        console.log(this.state.ayudasEconomica);
    }

    findSolicitud(){
        API.get('ayudasEconomicas/ayudasEconomicas/detallar', {
            params: {
                id: this.props.match.params.idAyudaEconomica,
            }
        })
            .then(response => {
                console.log(response);
                this.setState({ solicitudEconomica: response.data });
            })
            .catch(error => {
                console.log("Error obteniendo la investigacion", error);
            });
    }

    modificarGasto(gasto, e){
        console.log(JSON.stringify(gasto, null, 2));
        //Johana en este metodo deberias abrir el modal en bsse al objeto gasto que te estoy mandando
        //este metodo se llama cada vez que se hace click en una fila de la tabla
    }

    agregarGasto(e){
        //Johana en este metodo deberias abrir el modal vacio para registrar
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header">
                                    <a className="btn btn-default pull-right"
                                       onClick={this.props.history.goBack}> Volver </a>
                                    <p className="h2 m-b-sm"> Solicitud
                                        Economica {this.state.solicitudEconomica.id} </p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <h5> Informacion General de Docente</h5>
                                <hr/>
                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label> Codigo </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.profesor.codigo_profesor} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Profesor Solicitante </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.docenteSolicitante} </span>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-8">
                                        <label> Motivo </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.motivo} </span>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label> Monto Solicitado </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.monto} </span>
                                    </div>
                                </div>
                        
                            </div>
                            <div className="panel-footer text-right">
                                <button className="btn btn-primary" onClick={ this.agregarGasto()}> Agregar Gasto </button>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
                <Route path={`${this.props.match.path}/nuevo`} component={AyudaEconomicaNuevo}/>
            </div>
        );
    }
}

export default AyudaEconomicaDetalle;
