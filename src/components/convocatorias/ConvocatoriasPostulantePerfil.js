import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from "axios/index";
import BaseContainer from "../BaseContainer";
import {Image} from 'react-bootstrap';
import PerfilTabs from "./PerfilTabs";
import API from '../../api'

class ConvocatoriasPostulantePerfil extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
   "postulante":[  
      {  
         "id":2,
         "nombres":"Darma",
         "apellido_paterno":"FaseDos",
         "apellido_materno":"YokoChan",
         "correo":"darmasama@gmail.com",
         "fecha_nacimiento":"1994-06-18",
         "numero_documento":54132890,
         "tipo_documento":"Documento Nacional de Identidad",
         "sexo":"masculino",
         "pais_nacimiento":"Japón",
         "lugar_nacimiento":"America Mura ",
         "direccion_domicilio":"Triangle park  - Osaka",
         "pais_domicilio":"Japón",
         "telefono":"(+51)111111111",
         "celular":"(+51)1123581317",
         "estado_postulante":"Pendiente",
         "id_convocatoria":1
      }
   ],
   "postulante_investigacion":[],
   "postulante_experiencia":[],
   "postulante_docencia_cargo":[],
   "postulante_docencia_premio":[],
   "postulante_docencia_asesoria":[],
   "postulante_grado_titulo":[],
   "postulante_grado_maestria":[],
   "postulante_grado_doctorado":[],
   "postulante_grado_diplomatura":[]
        }
    }

    componentDidMount() {
        API.get('convocatoria/convocatoria/postulante/devolver', {
            params: {
                id_postulante: this.props.match.params.id,
            }
        }).then(response => {
            console.log(JSON.stringify(response.data));
            this.setState({info: response.data}, () => console.log(this.state));
        }).catch(error => {
            console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`, error);
        });
    }

    obtenerTipo() {
        let id = `${this.state.info.descripcion}`;
        if (id === "TPA") {
            return <span> Tiempo Parcial por Asignaturas <span className="label label-primary"> TPA </span> </span>;
        }
        else {
            return <span> Tiempo Completo <span className="label label-primary m-l-xs"> TC </span> </span>;
        }
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
                                    <p className="h2"> {this.state.postulante[0].nombres} </p>
                                </header>
                            </div>
                            <div className="panel-body m-t-n">
                                <h4 className="m-t-lg"> Informacion General </h4>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Tipo Documento</label>
                                        <span className="form-control"> {this.state.postulante[0].tipo_documento} </span>
                                    </div>
                                    <div className="col-md-3">
                                        <label> Numero de Documento </label>
                                        <span className="form-control"> {this.state.postulante[0].numero_documento} </span>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-md-6">
                                        <label>Nombres </label>
                                        <span className="form-control">  {this.state.postulante[0].nombres}  </span>
                                    </div>
                                    <div className="col-md-6">
                                        <label> Apellidos </label>
                                        <span className="form-control"> {this.state.postulante[0].apellido_paterno}  {this.state.postulante[0].apellido_materno}  </span>
                                    </div>
                                </div>
                                <h4 className="m-t-lg"> Nacimiento </h4>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Fecha</label>
                                        <span className="form-control">  {this.state.postulante[0].fecha_nacimiento} </span>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Pais</label>
                                        <span className="form-control">  {this.state.postulante[0].pais_nacimiento}  </span>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Lugar </label>
                                        <span className="form-control">  {this.state.postulante[0].lugar_nacimiento}  </span>
                                    </div>
                                </div>
                                <h4 className="m-t-lg"> Domicilio </h4>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Pais </label>
                                        <span className="form-control">  {this.state.postulante[0].pais_domicilio}  </span>
                                    </div>
                                    <div className="col-md-9">
                                        <label>Direccion</label>
                                        <span
                                            className="form-control">  {this.state.postulante[0].direccion_domicilio} </span>
                                    </div>
                                </div>
                                <h4 className="m-t-lg"> Contacto </h4>
                                <div className="row form-group">
                                    <div className="col-md-3">
                                        <label>Telefono</label>
                                        <span className="form-control">   {this.state.postulante[0].telefono}  </span>
                                    </div>
                                    <div className="col-md-3">
                                        <label>Celular</label>
                                        <span className="form-control">  {this.state.postulante[0].celular}  </span>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Correo Electronico</label>
                                        <span className="form-control">  {this.state.postulante[0].correo} </span>
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