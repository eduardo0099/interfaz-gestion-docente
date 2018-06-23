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
            requiere_docencia_cargo: 1,
            requiere_docencia_premio: 1,
            requiere_experiencia: 1,
            requiere_grado_diplomatura: 1,
            requiere_grado_doctorado: 1,
            requiere_grado_maestria: 1,
            requiere_grado_titulo: 1,
            requiere_investigacion: 1,
            peso_docencia_asesoria: 40,
            peso_docencia_cargo: 30,
            peso_docencia_premio: 50,
            peso_experiencia: 20,
            peso_grado_diplomatura: 90,
            peso_grado_doctorado: 80,
            peso_grado_maestria: 70,
            peso_grado_titulo: 60,
            peso_investigacion: 10
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
        let estado=this.state.descripcion;
        let requisitos;
        if(this.state.descripcion==="Abierta"){
            let asesoria=null;
            let cargo=null;
            let premio=null;
            let experiencia=null;
            let diplomatura=null;
            let doctorado=null;
            let maestria=null;
            let titulo=null;
            let investigacion=null;
            if(this.state.requiere_docencia_asesoria){
                asesoria=<div>
                    <label>Asesoría docencia</label>
                    <br></br>
                </div>

            }
            if(this.state.requiere_docencia_cargo){
                cargo=<div>
                    <label>Cargo docencia</label>
                    <br></br>
                </div>
            }
            if(this.state.requiere_docencia_premio){
                premio=
                    <div>
                        <label>Premio docencia</label>
                        <br></br>
                    </div>
            }
            if(this.state.requiere_experiencia){
                experiencia=
                    <div>
                        <label>Experiencia laboral</label>
                        <br></br>
                    </div>
            }
            if(this.state.requiere_grado_diplomatura){
                diplomatura=
                    <div>
                        <label>Diplomatura</label>
                        <br></br>
                    </div>
            }
            if(this.state.requiere_grado_doctorado){
                doctorado=
                    <div>
                        <label>Doctorado</label>
                        <br></br>
                    </div>
            }
            if(this.state.requiere_grado_maestria){
                maestria=
                    <div>
                        <label>Maestria</label>
                        <br></br>
                    </div>
            }
            if(this.state.requiere_grado_titulo){
                titulo=
                    <div>
                        <label>Titulo</label>
                        <br></br>
                    </div>
            }
            if(this.state.requiere_investigacion){
                investigacion=
                    <div>
                        <label>Investigaciones</label>
                        <br></br>
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
                                    <div className="panel-body"></div>
                                    <label htmlFor="disabledTextInput">Nombre:</label>
                                    <input type="text" id="disabledTextInput" className="form-control"
                                           placeholder={this.state.nombre}></input>
                                    <div className="form-group"></div>
                                    <div className="form-group"></div>
                                    <label htmlFor="disabledTextInput">Fecha de Inicio:</label>
                                    <input type="text" id="disabledTextInput" className="form-control"
                                           placeholder={this.state.fecha_inicio}></input>
                                    <div className="form-group"></div>
                                    <label htmlFor="disabledTextInput">Fecha de Fin:</label>
                                    <input type="text" id="disabledTextInput" className="form-control"
                                           placeholder={this.state.fecha_fin}></input>
                                    <div className="form-group"></div>
                                    <label htmlFor="disabledTextInput">Estado:</label>
                                    <input className="form-control" id="exampleFormControlTextarea1" rows="3"
                                           type="text" id="disabledTextInput" className="form-control"
                                           placeholder={this.state.descripcion}></input>
                                    <div className="form-group"></div>
                                    {requisitos}
                                </fieldset>
                            </div>
                        </div>
                        <div className="panel-footer text-right">
                            {currentRole()=== Role.JEFE_DEPARTAMENTO && estado == "Creada"?
                                <div>
                                    <button className="btn btn-primary" onClick={this.aprobarConvocatoria}> Aprobar </button>
                                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                                    <button className="btn btn-primary" onClick={this.cancelarConvocatoria}> Cancelar </button>
                                </div>
                                :
                                <div>
                                    {estado == "Aprobada" ?
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