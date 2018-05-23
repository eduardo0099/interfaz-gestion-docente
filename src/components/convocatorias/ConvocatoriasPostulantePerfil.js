import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import {Image} from 'react-bootstrap';
import PerfilTabs from "./PerfilTabs";


class ConvocatoriasPostulantePerfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            info: {
                "codigo": "",
                "nombres": "",
                "apellidoP": "",
                "apellidoM": "",
                "telefono": "",
                "seccion": "",
                "departamento": "",
                "correo": ""
            }
        }
    }

    componentDidMount() {
        axios.get('http://200.16.7.151:8080/docente/docente/general', {
            params: {
                codigo: this.props.match.params.codigo,
                ciclo: "2018-1",
            }
        }).then(response => {
            this.setState({info: response.data});
        }).catch(error => {
            console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`, error);
        });
    }

    /*
      obtenerTipo() {
        let id = `${this.state.info.descripcion}`;
        if(id == "TPA"){
          return "Tiempo Parcial por Asignaturas (TPA)";
        }
        else{
          return "Tiempo Completo (TC)";
        }
        */

    obtenerTipo() {
        let id = `${this.state.info.descripcion}`;
        if (id === "TPA") {
            return <span> Tiempo Parcial por Asignaturas <span className="label label-primary"> TPA </span> </span>;
        }
        else {
            return <span> Tiempo Completo <span className="label label-primary m-l-xs"> TC </span> </span>;
        }
    }

    obtenerMailTo() {
        return ("mailto:" + this.state.info.correo_pucp);
    }

    render() {
        return (
            <div>
                <Route exact path={`${this.props.match.path}`} render={() =>
                    <BaseContainer>
                        <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                            <div className="panel-heading m-b-n">
                                <header className="page-header m-b-n">
                                    <a className="btn btn-default pull-right"
                                       onClick={this.props.history.goBack}> Volver </a>
                                    <p className="h2"> Ruben Jordan RIP </p>
                                </header>
                            </div>
                            <div className="panel-body m-t-n">
                                <h4 className="m-t-lg"> Informacion General </h4>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Tipo Documento</label>
                                        <span className="form-control"> Documento Nacional de Identidad </span>
                                    </div>
                                    <div className="col-md-3">
                                        <label> Numero de Documento </label>
                                        <span className="form-control"> 74059739 </span>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-6">
                                        <label>Nombres </label>
                                        <span className="form-control"> Ruben Jordan </span>
                                    </div>
                                    <div className="col-md-6">
                                        <label> Apellidos </label>
                                        <span className="form-control"> RIP EnPaz </span>
                                    </div>
                                </div>
                                <h4 className="m-t-lg"> Nacimiento </h4>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Fecha</label>
                                        <span className="form-control"> 06/06/06 </span>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Pais</label>
                                        <span className="form-control"> Peru </span>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Lugar </label>
                                        <span className="form-control"> En la clinica </span>
                                    </div>
                                </div>
                                <h4 className="m-t-lg"> Domicilio </h4>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Pais </label>
                                        <span className="form-control"> Peru </span>
                                    </div>
                                    <div className="col-md-9">
                                        <label>Direccion</label>
                                        <span
                                            className="form-control"> Av. Universitaria 167 - San Miguel - Lima </span>
                                    </div>
                                </div>
                                <h4 className="m-t-lg"> Contacto </h4>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Telefono</label>
                                        <span className="form-control"> (+51) 014244369 </span>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Celular</label>
                                        <span className="form-control"> (+51) 991142846 </span>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Correo Electronico</label>
                                        <span className="form-control"> ruben.jordan@666.com </span>
                                    </div>
                                </div>
                                <div className="m-t-lg">
                                    <PerfilTabs/>
                                </div>
                            </div>
                        </div>
                    </BaseContainer>
                }/>
            </div>
        );
    }
}

export default ConvocatoriasPostulantePerfil;