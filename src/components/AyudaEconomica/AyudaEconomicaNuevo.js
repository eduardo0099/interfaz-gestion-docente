import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";

class AyudaEconomicaNuevo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: {
            }
        }
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-offset-1 col-md-10 col-sm-12">
                            <div className="panel-heading">
                                <header className="page-header m-b-n">
                                    <a className="btn btn-default pull-right"
                                       onClick={this.props.history.goBack}> Volver </a>
                                    <p className="h2"> Nueva Solicitud Económica </p>
                                </header>
                            </div>
                            <div className="panel-body">
                                <div className="row form-group">
                                    <div className="col-md-6">
                                        <label>Docente</label>
                                        <input className="form-control"></input>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Fecha de Inicio </label>
                                        <span className="form-control"> Ruben Jordan </span>
                                    </div>
                                    <div className="col-md-3">
                                        <label> Fecha de Fin </label>
                                        <input className="form-control"></input>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Monto</label>
                                        <input className="form-control"></input>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Pais</label>
                                        <input className="form-control"></input>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-6">
                                        <label>Comentarios</label>
                                        <textarea className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer text-right">
                                <button className="btn btn-link"> Cancelar </button>
                                <button className="btn btn-primary m-l-sm"> Guardar Solicitud </button>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
            </div>
        );
    }
}

export default AyudaEconomicaNuevo;