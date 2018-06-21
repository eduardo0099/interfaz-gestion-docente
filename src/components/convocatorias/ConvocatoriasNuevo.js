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

class ConvocatoriaNuevo extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            cursos:[],
            paso:1,
            btnAnterior:false,
            btnFinalizar:false,
            gradosAcademicos: [],
            docencia: [],
            experienciaProfesional: [],
            investigacion: [],

            nombre: '',
            codigoCurso:'',
            descripcion: '',
            fecha_inicio: null,
            fecha_fin: null
        };
        this.handleNombre = this.handleNombre.bind(this);
        this.handleDescripcion = this.handleDescripcion.bind(this);
        this.handleFIni = this.handleFIni.bind(this);
        this.handleFFin = this.handleFFin.bind(this);
        this.handleCodigoCurso = this.handleCodigoCurso.bind(this);

    }

    componentDidMount() {
        this.allCursos();
    }

    allCursos() {
        API.get('general/listaCurso')
            .then(response => {
                this.setState({ cursos: response.data.curso })
            })
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

    handleNombre(event) {
        this.setState({nombre: event.target.value});
    }

    handleCodigoCurso(obj) {
        let codCurso = obj.codigo;
        this.setState({ codigoCurso: codCurso })
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
                this.performPostRequest()
            } else {
            }
        }
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
                        <div className="form-group">
                            <div className="col-md-offset-0 col-md-7">
                                <hr/>
                                <div className="form-group">
                                    <label> Nombre </label>
                                    <input type="text" className="form-control" value={this.state.nombre} onChange={this.handleNombre}></input>
                                    {this.validator.message('nombre', this.state.nombre, 'required', false, {required: 'Este campo es obligatorio'})}
                                </div>
                                <div className="form-group">
                                    <label> Código curso </label>
                                    <Select
                                        value={ this.state.codigoCurso }
                                        onChange={ this.handleCodigoCurso }
                                        valueKey={ "codigo" }
                                        labelKey={ "codigo" }
                                        options={ this.state.cursos }
                                        clearable={ false }
                                    />
                                    {this.validator.message('codigoCurso', this.state.codigoCurso, 'required', false, {required: 'Este campo es obligatorio'})}
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
                    <div className="panel-footer text-right">
                        <button className="btn btn-primary" onClick={this.performNext}> Finalizar </button>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaNuevo;