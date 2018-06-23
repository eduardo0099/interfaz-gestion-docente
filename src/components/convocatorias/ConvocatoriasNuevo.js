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
import {currentSeccion,currentRole,Role} from '../../auth';



class ConvocatoriaNuevo extends Component {

    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            secciones:[],
            seccion:'',

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
        this.handleSeccion = this.handleSeccion.bind(this);

    }

    componentDidMount() {
        this.allSecciones();
    }


    allSecciones (){
        API.get('/general/listaSeccionesDep')
            .then(response => {
                let aux=response.data.secciones;
                console.log('secciones:',aux);
                this.setState({
                    secciones: response.data.secciones
                });
                if(currentRole()!==Role.JEFE_DEPARTAMENTO){
                    this.setState({
                        seccion:aux[0].nombre
                    });
                }
            })
    }




    handleNombre(event) {
        this.setState({nombre: event.target.value});
    }

    handleSeccion(obj) {
        let seccion = obj.nombre;
        this.setState({ seccion: seccion })
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
        console.log('nombre:',this.state.nombre)
        console.log('seccion:',this.state.seccion)

        if( this.validator.allValid() && this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
            API.post('convocatoria/convocatoria/registrar', {
                nombre : this.state.nombre,
                seccion : this.state.seccion,
                fecha_inicio : this.armarFecha(this.state.fecha_inicio._d),
                fecha_fin : this.armarFecha(this.state.fecha_fin._d)
            })
                .then(response => {
                    alert("Convocatoria registrada");
                    this.props.history.goBack();
                })
                .catch(error => {
                    alert("Error: No se pudo registrar la investigación");
                })
        }else {
            if ( this.state.fecha_inicio !== null && this.state.fecha_fin !== null ){
                if (!this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
                    alert("La fecha de fin es menor a la fecha de inicio!");
                }
            }
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
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
                                {currentRole()=== Role.JEFE_DEPARTAMENTO || currentRole()=== Role.ASISTENTE_DEPARTAMENTO?<div className="form-group">
                                        <label> Seccion </label>
                                        <Select
                                            value={ this.state.seccion }
                                            onChange={ this.handleSeccion }
                                            valueKey={ "nombre" }
                                            labelKey={ "nombre" }
                                            options={ this.state.secciones }
                                            clearable={ false }
                                        />
                                        {this.validator.message('codigoCurso', this.state.codigoCurso, 'required', false, {required: 'Este campo es obligatorio'})}
                                    </div>
                                    :null
                                }
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
                        <button className="btn btn-primary" onClick={this.performPostRequest}> Finalizar </button>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}

export default ConvocatoriaNuevo;