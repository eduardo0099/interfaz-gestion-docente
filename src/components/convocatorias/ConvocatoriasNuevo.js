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
            paso:1,
            btnAnterior:false,
            btnFinalizar:false,
            gradosAcademicos: [],
            docencia: [],
            experienciaProfesional: [],
            investigacion: [],

            curso: '',
            descripcion: '',
            fecha_inicio: null,
            fecha_fin: null
        };
        this.handleCurso = this.handleCurso.bind(this);
        this.handleDescripcion = this.handleDescripcion.bind(this);
        this.handleFIni = this.handleFIni.bind(this);
        this.handleFFin = this.handleFFin.bind(this);
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

    handleCurso(event) {
        this.setState({curso: event.target.value});
    }

    handleDescripcion(event) {
        this.setState({descripcion: event.target.value});
    }

    handleFIni(date) {
        this.setState({fecha_inicio: date});
    }

    handleFFin(date) {
        this.setState({fecha_fin: date});
    }

    validDates(fFin,fIni){
        var isafter = moment(fFin._d).isAfter(fIni._d);
        console.log('fechas validas?:',isafter)
        return isafter;
    }

    performNext = ()=> {
        if(this.state.paso==1) {
            if (this.validator.allValid() && this.validDates(this.state.fecha_fin,this.state.fecha_inicio)) {
                //if (1) {
                this.setState({
                    paso: 2,
                    btnAnterior:true,
                    btnFinalizar:true
                });
            } else {
                if ( this.state.fecha_fin !== null && this.state.fecha_fin !== null ){
                    if (!this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
                        alert("La fecha de fin es menor a la fecha de inicio!");
                    }
                }
                this.validator.showMessages();
                // rerender to show messages for the first time
                this.forceUpdate();
            }

        }else if(this.state.paso==2){
            //if (this.validator2.allValid()) {
            if (1) {
                console.log('gradosAcademicos:',this.state.gradosAcademicos);
                console.log('docencia:',this.state.docencia);
                console.log('experienciaProfesional:',this.state.experienciaProfesional);
                console.log('investigacion:',this.state.investigacion);
            } else {
            }
        }
    }

    performBack = ()=> {
        if(this.state.paso==2) {
            if(this.state.paso==2) {
                this.setState({
                    paso: 1,
                    btnAnterior:false,
                    btnFinalizar:false
                });
            }
        }
    }


    render() {

        let btnSiguiente;
        if (this.state.btnFinalizar) {
            btnSiguiente = <button className="btn btn-primary" onClick={this.performNext}> Finalizar </button>
        } else {
            btnSiguiente = <button className="btn btn-primary" onClick={this.performNext}> Siguiente </button>
        }

        let btnAnterior;
        if (this.state.btnAnterior) {
            btnAnterior = <button className="btn btn-primary" onClick={this.performBack}> Anterior </button>
        } else {
            btnAnterior=<label></label>
        }

        let cuerpo;
        if (this.state.paso == 1) {
            cuerpo = <div className="panel-body">
                <h4> Datos generales </h4>
                <div className="form-group">
                    <div className="col-md-offset-0 col-md-7">
                        <hr/>
                        <div className="form-group">
                            <label> Curso </label>
                            <input type="text" className="form-control" value={this.state.curso} onChange={this.handleCurso}></input>
                            {this.validator.message('curso', this.state.curso, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                        <div className="form-group">
                            <label> Descripción </label>
                            <textarea type="text" className="form-control" value={this.state.descripcion} onChange={this.handleDescripcion}></textarea>
                            {this.validator.message('descripcion', this.state.descripcion, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                        <div className="form-group">
                            Fecha Inicio:
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_inicio}
                                onChange={this.handleFIni}
                            />
                            {this.validator.message('fecha_inicio', this.state.fecha_inicio, 'required', false, {required: 'Este campo es obligatorio'})}
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
                </div>
            </div>
        }else if(this.state.paso == 2){
            cuerpo =
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
                                        <label><Checkbox value="tituloProfesional"/> Título Profesional</label>
                                        <br/>
                                        <label><Checkbox value="maestria"/> Maestría</label>
                                        <br/>
                                        <label><Checkbox value="doctorado"/> Doctorado</label>
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
                                        <label><Checkbox value="cargosCurso"/> Cargos a su curso</label>
                                        <br/>
                                        <label><Checkbox value="asesoriaTesis"/> Asesoria de Tesis</label>
                                        <br/>
                                        <label><Checkbox value="premiosDocencia"/> Premios a la Docencia</label>
                                    </CheckboxGroup>
                                </div>
                            </div>
                            <div className="form-group">
                                <h5> Experiencia Profesional </h5>
                                <div className="col-md-offset-1">
                                    <CheckboxGroup
                                        checkboxDepth={2} // This is needed to optimize the checkbox group
                                        name="experienciaProfesional"
                                        value={this.state.experienciaProfesional}
                                        onChange={this.experienciaProfesionalChanged}>
                                        <label><Checkbox value="solExperienciaProfesional"/> Solicitar Experiencia Profesional</label>
                                    </CheckboxGroup>
                                </div>
                            </div>
                            <div className="form-group">
                                <h5> Investigacion </h5>
                                <div className="col-md-offset-1">
                                    <CheckboxGroup
                                        checkboxDepth={2} // This is needed to optimize the checkbox group
                                        name="investigacion"
                                        value={this.state.investigacion}
                                        onChange={this.investigacionProfesionalChanged}>
                                        <label><Checkbox value="solInvestigacion"/> Solicitar Investigacion</label>
                                    </CheckboxGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        }

        return (
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Nueva Convocatoria </p>
                        </header>
                    </div>
                    {cuerpo}

                    <div className="panel-footer text-right">
                        {btnAnterior}
                        <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                        {btnSiguiente}
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaNuevo;