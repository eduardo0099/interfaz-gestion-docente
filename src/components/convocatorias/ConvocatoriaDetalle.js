import React, {Component} from 'react';
import {Route, Link,Redirect} from 'react-router-dom';
import BaseContainer from "../BaseContainer";
import {Role,currentRole} from '../../auth.js'
import API from "../../api";
import ConvocatoriaPesos from "./ConvocatoriaPesos";
import ConvocatoriaNuevo from "./ConvocatoriasNuevo";
import ConvocatoriaCampos from "./convocatoriaCampos";
import {Panel,Image, Col, Grid, Row,FormGroup} from 'react-bootstrap';


class ConvocatoriaDetalle extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 1,
            nombre: "Sistemas operativos",
            fecha_inicio: "2018-05-18",
            fecha_fin: "2018-06-18",
            cantidad_postulantes: 2,
            cantidad_postulantes_aceptados: 0,
            descripcion: "Abierta",
            requiere_docencia_asesoria: 1,
            requiere_docencia_cargo: 0,
            requiere_docencia_premio: 0,
            requiere_experiencia: 0,
            requiere_grado_diplomatura: 0,
            requiere_grado_doctorado: 0,
            requiere_grado_maestria: 0,
            requiere_grado_titulo: 0,
            requiere_investigacion: 0,
            peso_docencia_asesoria: 40,
            peso_docencia_cargo: 30,
            peso_docencia_premio: 50,
            peso_experiencia: 20,
            peso_grado_diplomatura: 90,
            peso_grado_doctorado: 80,
            peso_grado_maestria: 70,
            peso_grado_titulo: 60,
            peso_investigacion: 10,
            estado:""
        }

    }

    componentDidMount(){
        API.get('/convocatoria/convocatoria/devolver', {
            params: {
                id: this.props.match.params.id_convocatoria
            }
        }).then(response => {
            console.log(response.data[0])
            this.setState(response.data[0]);
        }).catch(err => {
            console.log("err", err);
        })
    }


    aprobarConvocatoria = ()=> {
        if (window.confirm('Seguro que deseas aprobar esta convocatoria?')) {
            API.put('convocatoria/convocatoria/modificar', {
                id : this.props.match.params.id_convocatoria,
                estado_convocatoria : "Aprobada"
            })
                .then(response => {
                    alert("Convocatoria Aprobada");
                    window.location.reload();
                })
                .catch(error => {
                    alert("Error: No se pudo aprobar la Convocatoria");
                })
        } else {
            // Do nothing!
        }
    }

    cancelarConvocatoria = ()=> {
        if (window.confirm('Seguro que deseas cancelar esta convocatoria?')) {
            API.put('convocatoria/convocatoria/modificar', {
                id : this.props.match.params.id_convocatoria,
                estado_convocatoria : "Cancelada"
            })
                .then(response => {
                    alert("Convocatoria Cancelada");
                    window.location.reload();
                })
                .catch(error => {
                    alert("Error: No se pudo Cancelar la Convocatoria");
                })
        } else {
            // Do nothing!
        }
    }

    render(){
        let estado=this.state.estado;
        let requisitos;
        if(this.state.estado==="Abierta"){
            let asesoria=null;
            let asesoriaPeso=null;

            let cargo=null;
            let cargoPeso=null;

            let premio=null;
            let premioPeso=null;

            let experiencia=null;
            let experienciaPeso=null;

            let diplomatura=null;
            let diplomaturaPeso=null;

            let doctorado=null;
            let doctoradoPeso=null;

            let maestria=null;
            let maestriaPeso=null;

            let titulo=null;
            let tituloPeso=null;

            let investigacion=null;
            let investigacionPeso=null;
            if(this.state.requiere_docencia_asesoria){
                asesoria=<div>
                    <span className="form-control">  {"Asesoría docencia"} </span>
                </div>

                asesoriaPeso=<div>
                    <span className="form-control">  {this.state.peso_docencia_asesoria} </span>
                </div>

            }
            if(this.state.requiere_docencia_cargo){
                cargo=<div>
                    <span className="form-control">  {"Cargo docencia"} </span>
                </div>

                cargoPeso=<div>
                    <span className="form-control">  {this.state.peso_docencia_cargo} </span>
                </div>
            }
            if(this.state.requiere_docencia_premio){
                premio=
                    <div>
                        <span className="form-control">  {"Premio docencia"} </span>
                    </div>

                premioPeso=<div>
                    <span className="form-control">  {this.state.peso_docencia_premio} </span>
                </div>
            }
            if(this.state.requiere_experiencia){
                experiencia=
                    <div>
                        <span className="form-control">  {"Experiencia laboral"} </span>
                    </div>

                experienciaPeso=<div>
                    <span className="form-control">  {this.state.peso_experiencia} </span>
                </div>
            }
            if(this.state.requiere_grado_diplomatura){
                diplomatura=
                    <div>
                        <span className="form-control">  {"Diplomatura"} </span>
                    </div>

                diplomaturaPeso=<div>
                    <span className="form-control">  {this.state.peso_grado_diplomatura} </span>
                </div>
            }
            if(this.state.requiere_grado_doctorado){
                doctorado=
                    <div>
                        <span className="form-control">  {"Doctorado"} </span>
                    </div>

                doctoradoPeso=<div>
                    <span className="form-control">  {this.state.peso_grado_doctorado} </span>
                </div>
            }
            if(this.state.requiere_grado_maestria){
                maestria=
                    <div>
                        <span className="form-control">  {"Maestria"} </span>
                    </div>

                maestriaPeso=<div>
                    <span className="form-control">  {this.state.peso_grado_maestria} </span>
                </div>
            }
            if(this.state.requiere_grado_titulo){
                titulo=
                    <div>
                        <span className="form-control">  {"Titulo"} </span>
                    </div>

                tituloPeso=<div>
                    <span className="form-control">  {this.state.peso_grado_titulo} </span>
                </div>
            }
            if(this.state.requiere_investigacion){
                investigacion=
                    <div>
                        <span className="form-control">  {"Investigaciones"} </span>
                    </div>

                investigacionPeso=<div>
                    <span className="form-control">  {this.state.peso_investigacion} </span>
                </div>
            }
            requisitos=
                <div className="panel-body">
                    <Row >
                        <label>Requisitos:</label>
                    </Row>
                    <Row>
                        <Col md={6}>
                            {asesoria}
                            {cargo}
                            {premio}
                            {investigacion}
                            {experiencia}
                            {titulo}
                            {maestria}
                            {doctorado}
                            {diplomatura}
                        </Col>

                        <Col md={2}>
                            {asesoriaPeso}
                            {cargoPeso}
                            {premioPeso}
                            {investigacionPeso}
                            {experienciaPeso}
                            {tituloPeso}
                            {maestriaPeso}
                            {doctoradoPeso}
                            {diplomaturaPeso}
                        </Col>
                    </Row>
                </div>
        }else{
            requisitos=null
        }
        return(
            <div>
            <Route exact path={`${this.props.match.path}`} render={() =>
                <BaseContainer>
                    <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                        <div className="panel-heading">
                            <header className="page-header m-t-sm">
                                <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                                <p className="h2 m-b-sm"> Detalle de Convocatoria </p>
                            </header>
                        </div>
                        <div className="panel-body">
                            <h4> Datos generales </h4>
                            <div className="col-md-offset-0 col-md-10">
                                <hr/>
                                <fieldset disabled>
                                    <label>Nombre:</label>
                                    <span className="form-control">{this.state.nombre}</span>
                                    <br></br>
                                    <label>Fecha de Inicio:</label>
                                    <span className="form-control">{this.state.fecha_inicio}</span>
                                    <br></br>
                                    <label>Fecha de Fin:</label>
                                    <span className="form-control">{this.state.fecha_fin}</span>
                                    <br></br>
                                    <label>Estado:</label>
                                    <span className="form-control">{this.state.estado}</span>
                                    <br></br>
                                    {requisitos}
                                </fieldset>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            {currentRole()=== Role.JEFE_DEPARTAMENTO && estado === "Creada"?
                                <div>
                                    <button className="btn btn-primary" onClick={this.aprobarConvocatoria}> Aprobar </button>
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    <button className="btn btn-primary" onClick={this.cancelarConvocatoria}> Cancelar </button>
                                </div>
                                :
                                <div>
                                    {estado === "Aprobada" ?
                                        <div>
                                            <Link className="btn  btn-primary " to={`${this.props.history.location.pathname}/agregarCampos`} >Agregar Campos</Link>

                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </BaseContainer>
            }/>
            <Route path={`${this.props.match.path}/agregarCampos`} component={ConvocatoriaCampos}/>
            </div>
        );
    }
}

export default ConvocatoriaDetalle;