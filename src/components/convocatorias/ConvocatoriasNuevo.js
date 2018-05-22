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

const gradosAcademicos = [
    'Título Profesional',
    'Maestría',
    'Doctorado',
    'Diplomatura'
]

class ConvocatoriaNuevo extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            gradosAcademicos: ['Título Profesional', 'Maestría', 'Doctorado', 'Diplomatura'],
            docencia: ['Cargos a su curso', 'Asesoria de Tesis', 'Premios a la docencia'],
            experienciaProfesional: ['Solicitar Experiencia Profesional'],
            investigacion: ['solInvestigacion'],
            titulo: '',
            autor: [],
            resumen: '',
            fecha_inicio: '',
            fecha_fin: '',
            archivo: null,
            showAgregar: false,
            selectedAgregar: [],
            profesores: [],
            showQuitar: false,
            selectedQuitar: [],
            autoresModal: []
        };
        this.handleTitulo = this.handleTitulo.bind(this);
        this.handleAutor = this.handleAutor.bind(this);
        this.handleResumen = this.handleResumen.bind(this);
        this.handleFIni = this.handleFIni.bind(this);
        this.handleFFin = this.handleFFin.bind(this);
    }

    handleTitulo(event) {
        this.setState({titulo: event.target.value});
    }

    handleAutor(event) {
        this.setState({autor: event.target.value});
        console.log(this.state.autor);
    }

    handleResumen(event) {
        this.setState({resumen: event.target.value});
    }

    handleFIni(date) {
        this.setState({fecha_inicio: date});
    }

    handleFFin(date) {
        this.setState({fecha_fin: date});
    }

    armarFecha(date){
        var cadena="";
        cadena=cadena+date.getFullYear();

        if (date.getMonth()<9){
            cadena=cadena+0+(date.getMonth()+1);
        }else{
            cadena=cadena+(date.getMonth()+1);
        }

        if (date.getDate()<10){
            cadena=cadena+0+date.getDate();
        }else{
            cadena=cadena+date.getDate();
        }
        console.log(cadena);
        return cadena;
    }

    validDates(fFin,fIni){
        var isafter = moment(fFin._d).isAfter(fIni._d);
        console.log('fechas validas?:',isafter)
        return isafter;
    }

    offlineData() {
        this.set({gradosAcademicos: [{id: 1, nombre: 'Pregrado'}, {id: 2, nombre: 'Maestría'}, {id: 3, nombre: 'Doctorado'}]})
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
                        <h4> Datos generales </h4>
                        <hr/>
                        <div className="form-group">
                            <label> Curso </label>
                            <input className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label> Descripción </label>
                            <input className="form-control"/>
                        </div>
                        <div className="form-group">
                            Fecha Inicio:
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_inicio}
                                onChange={this.handleFIni}
                            />
                            {this.validator.message('fechaIni', this.state.fecha_inicio, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                        <div className="form-group">
                            Fecha Fin:
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_fin}
                                onChange={this.handleFFin}
                            />
                            {this.validator.message('fechaFin', this.state.fecha_fin, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                    </div>
                    <div className="panel-body">
                        <h4> Documentos</h4>
                        <hr/>
                        <div className="form-group">
                            <label> Grados Academicos </label>
                            <CheckboxGroup
                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                name="gradosAcademicos"
                                value={this.state.gradosAcademicos}
                                onChange={this.gradosAcademicosChanged}>
                                <label><Checkbox value="tituloProfesional"/> Título Profesional</label>
                                <hr/>
                                <label><Checkbox value="mestria"/> Maestría</label>
                                <hr/>
                                <label><Checkbox value="doctorado"/> Doctorado</label>
                            </CheckboxGroup>
                        </div>
                        <div className="form-group">
                            <label> Docencia </label>
                            <CheckboxGroup
                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                name="docencia"
                                value={this.state.docencia}
                                onChange={this.docenciaChanged}>
                                <label><Checkbox value="cargosCurso"/> Cargos a su curso</label>
                                <hr/>
                                <label><Checkbox value="asesoriaTesis"/> Asesoria de Tesis</label>
                                <hr/>
                                <label><Checkbox value="premiosDocencia"/> Premios a la Docencia</label>
                            </CheckboxGroup>
                        </div>
                        <div className="form-group">
                            <label> Experiencia Profesional </label>
                            <CheckboxGroup
                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                name="experienciaProfesional"
                                value={this.state.experienciaProfesional}
                                onChange={this.experienciaProfesionalChanged}>
                                <label><Checkbox value="solExperienciaProfesional"/> Solicitar Experiencia Profesional</label>
                            </CheckboxGroup>
                        </div>
                        <div className="form-group">
                            <label> Investigacion </label>
                            <CheckboxGroup
                                checkboxDepth={2} // This is needed to optimize the checkbox group
                                name="investigacion"
                                value={this.state.investigacion}
                                onChange={this.investigacionProfesionalChanged}>
                                <label><Checkbox value="solInvestigacion"/> Solicitar Investigacion</label>
                            </CheckboxGroup>
                        </div>
                    </div>
                    <div className="panel-footer text-right">
                        <button className="btn btn-primary"> Crear Convocatoria</button>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaNuevo;