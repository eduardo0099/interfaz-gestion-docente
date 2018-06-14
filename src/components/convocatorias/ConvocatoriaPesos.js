import React, {Component} from 'react';
import {Route, Link,Redirect} from 'react-router-dom';
import BaseContainer from "../BaseContainer";
import {Role,currentRole} from '../../auth.js'
import API from "../../api";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ConvocatoriaPesos extends Component{

    constructor(props){
        super(props);
        this.state={
            gradosAcademicos: [],
            docencia: [],
            experienciaProfesional: [],
            investigacion: [],
        }
    }

    gradosAcademicosChanged = (newGradoAcademico) => {
        this.setState({
            gradosAcademicos: newGradoAcademico
        });
    }

    docenciaChanged = (newDocencia) => {
        this.setState({
            docencia: newDocencia
        });
    }

    experienciaProfesionalChanged = (newexperProfe) => {
        this.setState({
            experienciaProfesional: newexperProfe
        });
    }

    investigacionProfesionalChanged = (newinvestigacion) => {
        this.setState({
            investigacion: newinvestigacion
        });
    }

    render(){
        return(
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Documentos </p>
                        </header>
                        <body>
                        <div className="panel-body">
                            <h4> Documentos</h4>
                            <div className="form-group">
                                <div className="col-md-offset-0 col-md-6">
                                    <hr/>
                                    <div className="form-group">
                                        <h5> Grados Academicos </h5>
                                        <div className="col-md-offset-1">
                                            <CheckboxGroup
                                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                                name="gradosAcademicos"
                                                value={this.state.gradosAcademicos}
                                                onChange={this.gradosAcademicosChanged}>
                                                <label><Checkbox value="Titulo Profesional"/> Título Profesional</label>
                                                <br/>
                                                <label><Checkbox value="Maestria"/> Maestría</label>
                                                <br/>
                                                <label><Checkbox value="Doctorado"/> Doctorado</label>
                                                <br/>
                                                <label><Checkbox value="Diplomatura"/> Diplomado</label>
                                            </CheckboxGroup>
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <h5> Docencia </h5>
                                        <div className="col-md-offset-1">
                                            <CheckboxGroup
                                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                                name="docencia"
                                                value={this.state.docencia}
                                                onChange={this.docenciaChanged}>
                                                <label><Checkbox value="Cargos a su curso"/> Cargos a su curso</label>
                                                <br/>
                                                <label><Checkbox value="Asesoria de Tesis"/> Asesoria de Tesis</label>
                                                <br/>
                                                <label><Checkbox value="Premios a la Docencia"/> Premios a la Docencia</label>
                                            </CheckboxGroup>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <h5> Experiencia Profesional </h5>
                                        <div className="col-md-offset-1">
                                            <CheckboxGroup
                                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                                name="Solicitar Experiencia Profesional"
                                                value={this.state.experienciaProfesional}
                                                onChange={this.experienciaProfesionalChanged}>
                                                <label><Checkbox value="Solicitar Experiencia Profesional"/> Solicitar Experiencia Profesional</label>
                                            </CheckboxGroup>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <h5> Investigacion </h5>
                                        <div className="col-md-offset-1">
                                            <CheckboxGroup
                                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                                name="Solicitar Investigacion"
                                                value={this.state.investigacion}
                                                onChange={this.investigacionProfesionalChanged}>
                                                <label><Checkbox value="Solicitar Investigacion"/> Solicitar Investigacion</label>
                                            </CheckboxGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </body>

                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaPesos;