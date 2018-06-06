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
                id: 2,
                codigo: 'AYU001',
                investigacion: 'Investigando React',
                docenteSolicitante: 'Ruben Jordan',
                motivo: 'Motivo 1',
                monto_otorgado: 350000,
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
                   docenteSolicitante: ae.docenteSolicitante.nombres,
                   codigo: ae.codigo,
                   investigacion: ae.investigacion.titulo
               }
           });
       })
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
                                        Economica {this.state.solicitudEconomica.codigo} </p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <h5> Informacion General </h5>
                                <hr/>
                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label> Codigo </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.codigo} </span>
                                    </div>
                                    <div className="col-md-4">
                                        <label> Profesor Solicitante </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.docenteSolicitante} </span>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-8">
                                        <label> Investigación </label>
                                        <span className="form-control"> {this.state.solicitudEconomica.investigacion} </span>
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
                                        <span className="form-control"> {this.state.solicitudEconomica.monto_otorgado} </span>
                                    </div>
                                </div>
                                <h5> Gastos Financieros Declarados </h5>
                                <hr/>
                                <table className="table table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th className="col-md-3">Documento</th>
                                        <th className="col-md-3">Detalle</th>
                                        <th className="col-md-3">Monto (S/)</th>
                                        <th className="col-md-3">Observaciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.solicitudEconomica.gastos.map(gasto => {
                                        return (
                                            <tr key={gasto.id} onClick={this.modificarGasto.bind(this, gasto)}>
                                                <td className="v-middle">
                                                    <span className="block text-muted m-t-xs"> {gasto.tipo}</span>
                                                    <span className="block text-primary m-b-xs"> {gasto.numero}</span>
                                                </td>
                                                <td className="v-middle">
                                                    <span> {gasto.detalle}</span>
                                                </td>
                                                <td className="v-middle">
                                                    <span> {gasto.monto}</span>
                                                </td>
                                                <td className="v-middle">
                                                    <span> {gasto.observaciones}</span>
                                                </td>
                                            </tr>
                                        )})
                                    }
                                    </tbody>
                                </table>
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
