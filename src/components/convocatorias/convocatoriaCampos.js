import React, {Component} from 'react';
import {Row, Grid, Table, Button, PageHeader, Modal, Popover, Tooltip, OverlayTrigger, Col} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import BootstrapTable from 'react-bootstrap-table-next';
import BaseContainer from "../BaseContainer";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import API from "../../api";
import Select from 'react-select';

const gradosAcademicos = [
    'Título Profesional',
    'Maestría',
    'Doctorado',
    'Diplomatura'
]

class ConvocatoriaCampos extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            btnFinalizar:false,
            gradosAcademicos: [],
            docencia: [],
            experienciaProfesional: [],
            investigacion: [],

        };

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



    performPostRequest = ()=> {
        console.log('postrequest:')
        let gradAcadRegistrar=[];
        let docenciaRegistrar=[];
        let expProfRegistrar=[];
        let investigacionRegistrar=[];

        this.state.gradosAcademicos.forEach(function(entry) {
            let elemento  = {descripcion: entry, peso:10};
            gradAcadRegistrar= [...gradAcadRegistrar, elemento];
        });

        this.state.docencia.forEach(function(entry) {
            let elemento  = {descripcion: entry, peso:10};
            docenciaRegistrar= [...docenciaRegistrar, elemento];
        });

        this.state.experienciaProfesional.forEach(function(entry) {
            let elemento  = {descripcion: entry, peso:10};
            expProfRegistrar= [...expProfRegistrar, elemento];
        });

        this.state.investigacion.forEach(function(entry) {
            let elemento  = {descripcion: entry, peso:10};
            investigacionRegistrar= [...investigacionRegistrar, elemento];
        });
        //console.log('gradAcadRegistrar:',gradAcadRegistrar);
        //console.log('docenciaRegistrar:',docenciaRegistrar);
        //console.log('expProfRegistrar:',expProfRegistrar);
        //console.log('investigacionRegistrar:',investigacionRegistrar);
        if( this.validator.allValid() && this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
            API.post('convocatoria/convocatoria/registrar', {
                nombre : this.state.nombre,
                codigo_curso : this.state.codigoCurso,
                fecha_inicio : this.armarFecha(this.state.fecha_inicio._d),
                fecha_fin : this.armarFecha(this.state.fecha_fin._d),
                grados_academicos:gradAcadRegistrar,
                docencia:docenciaRegistrar,
                experiencia_profesional:expProfRegistrar,
                investigacion:investigacionRegistrar,
            })
                .then(response => {
                    alert("Convocatoria registrada");
                    this.props.history.goBack();
                })
                .catch(error => {
                    alert("Error: No se pudo registrar la investigación");
                })
        }else {
            if ( this.state.fecha_fin !== null && this.state.fecha_fin !== null ){
                if (!this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
                    alert("La fecha de fin es menor a la fecha de inicio!");
                }
            }
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    performNext = ()=> {}



    render() {




        return (
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Nueva Convocatoria </p>
                        </header>
                    </div>
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
                    <div className="panel-footer text-right">
                        <button className="btn btn-primary" onClick={this.performNext}> Guardar </button>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaCampos;