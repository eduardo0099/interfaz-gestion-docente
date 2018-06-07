import React from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import Select from 'react-select';
import {Panel} from 'react-bootstrap';
import BaseContainer from "../BaseContainer";
import ConvocatoriaNuevo from "../convocatorias/ConvocatoriasNuevo";
import AyudaEconomicaNuevo from "./AyudaEconomicaNuevo";
import API from "../../api";
import ConfirmationModal from "../ConfirmationModal";

class AyudaEconomicaAprobar extends React.Component {

    constructor(props) {
        super(props);
        this.confirmationAceptar = React.createRef();
        this.confirmationRechazar = React.createRef();
        this.state = {

            solicitudEconomica: {
                id: 2,
                codigo: 'AYU001',
                investigacion: 'Investigando React',
                nombreDocente: 'Ruben Jordan',
                correo_pucp: '',
                seccion: '',
                motivo: 'Motivo 1',
                monto_otorgado: 350000,
                fecha_solicitud: '',
                fecha_inicio: '',
                comentarios_adicionales: '',
                fecha_fin: '',
                gastos: [
                    {id: 1, numero:'001-23020', tipo: 'Boleta', detalle: 'Impresiones y copias', monto: 35.00, observaciones: 'algo'},
                    {id: 2, numero:'001-23022', tipo: 'Boleta', detalle: 'Impresiones y copiasA', monto: 350.00, observaciones: 'algo2'},
                    {id: 3, numero:'001-23023', tipo: 'Boleta', detalle: 'Impresiones y copiasB', monto: 3500.00, observaciones: 'algo3'}
                ]
            }
        }
    }

    componentWillMount() {
        this.findSolicitud();
    }
    findSolicitud(){
        API.get('ayudasEconomicas/ayudasEconomicas/devuelveJustificacion', {
            params: {
                id:  this.props.match.params.idAyudaEconomica
            }
        }).then(response => {
            const ae = response.data.ayudaEconomica;
            this.setState({
                solicitudEconomica: {
                    id: ae.id,
                    gastos: ae.justificacion,
                    motivo: ae.motivo,
                    monto_otorgado: ae.monto_otorgado,
                    nombreDocente: ae.docenteSolicitante.nombres,
                    correo_pucp: ae.docenteSolicitante.correo_pucp,
                    codigo: ae.codigo,
                    seccion: ae.docenteSolicitante.seccion,
                    investigacion: ae.investigacion.titulo,
                    fecha_solicitud: ae.fecha_solicitud,
                    fecha_inicio: ae.fecha_inicio,
                    fecha_fin: ae.fecha_fin,
                    comentarios_adicionales: ae.comentarios_adicionales,
                }
            });
        })
    }

    openConfirmationAceptar = () => {
        this.confirmationAceptar.current.open();
    }

    openConfirmationRechazar = () => {
        this.confirmationRechazar.current.open();
    }

    aprobarSolicitud(e){
        ///ayudasEconomicas/ayudasEconomicas/modificar
        API.put('ayudasEconomicas/ayudasEconomicas/modificar', {
            id: this.state.solicitudEconomica.id,
            estado_ayuda: 2
        }).then(response => {
            this.confirmationAceptar.current.close();
            this.props.history.goBack;
        })
    }

    rechazarSolicitud(e){
        console.log("rechaza");
        ///ayudasEconomicas/ayudasEconomicasAsistente/rechazar
        API.put('ayudasEconomicas/ayudasEconomicas/modificar', {
            id: this.state.solicitudEconomica.id,
            estado_ayuda: 3
        }).then(response => {
            this.confirmationRechazar.current.close();
        }).catch(err =>{
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <ConfirmationModal ref={this.confirmationAceptar} message={"Seguro que desea aceptar la ayuda economica?"} okaction = { this.aprobarSolicitud.bind(this) }/>
                        <ConfirmationModal ref={this.confirmationRechazar} message={"Serguro que desea rechazar la ayuda economica?"} okaction={ this.rechazarSolicitud.bind(this) }/>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header">
                                    <a className="btn btn-default pull-right"
                                       onClick={this.props.history.goBack}> Volver </a>
                                    <p className="h2 m-b-sm"> Solicitud
                                        Economica {this.state.solicitudEconomica.codigo} </p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <h5> Informacion General del docente</h5>
                                <hr/>
                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label> Codigo </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.codigo} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Profesor Solicitante </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.nombreDocente} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Correo PUCP </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.correo_pucp} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Seccion </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.seccion} </span>
                                    </div>
                                </div>
                                <h5> Detalle de la Solicitud </h5>
                                <hr/>
                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label> Motivo </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.motivo} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Monto </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.monto_otorgado} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Fecha Registro de Solicitud </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.fecha_solicitud} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Fecha Inicio </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.fecha_inicio} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Fecha Fin </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.fecha_fin} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Comentarios Adicionales </label>
                                        <spam className="form-control"> {this.state.solicitudEconomica.comentarios_adicionales} </spam>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <div className="text-center">
                                    <button className="btn btn-danger m-r-sm btn-lg" onClick={this.openConfirmationRechazar.bind(this)}> Rechazar </button>
                                    <button className="btn btn-success btn-lg" onClick={this.openConfirmationAceptar.bind(this)}> Aprobar </button>
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

export default AyudaEconomicaAprobar;