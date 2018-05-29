import React, { Component } from 'react';
import {Row,Grid,Button,PageHeader,Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import moment from "moment";
import BaseContainer from "./BaseContainer";


class RegistroInvestigación extends Component{


    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state={
            titulo: '',
            autor: [this.props.match.params.codigo],
            resumen: '',
            fecha_inicio: null,
            fecha_fin: null,
            archivo:null
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

    performPostRequest = ()=> {
        if( this.validator.allValid() && this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
            axios.post('http://200.16.7.151:8080/docente/investigacion/registrar', {
                titulo: this.state.titulo,
                autor: this.state.autor,
                resumen: this.state.resumen,
                fecha_inicio: this.armarFecha(this.state.fecha_inicio._d),
                fecha_fin: this.armarFecha(this.state.fecha_fin._d),
                archivo:null
            })
                .then(response => {
                    alert("Investigación registrada");
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

    render(){

        console.log(this.props);
        return (
            <BaseContainer>
                <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <header className="page-header m-t-sm">
                            <a className="btn btn-default pull-right" onClick={this.props.history.goBack}> Volver </a>
                            <p className="h2 m-b-sm"> Registrar Investigación </p>
                        </header>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label> Título </label>
                            <input type="text" className="form-control" value={this.state.titulo} onChange={this.handleTitulo}></input>
                            {this.validator.message('titulo', this.state.titulo, 'required|max:100', false, {required: 'Este campo es obligatorio',max:'El número máximo de caracteres es 20'})}
                        </div>
                        <div className="form-group ">
                            <label> Autor </label>
                            <input type="text" disabled={true} className="form-control" value={this.state.autor} onChange={this.handleAutor}></input>
                            {this.validator.message('autor', this.state.autor, 'required|integer', false, {required: 'Este campo es obligatorio'})}
                        </div>
                        <div className="form-group">
                            <label> Resumen </label>
                            <textarea type="text" className="form-control" value={this.state.resumen} onChange={this.handleResumen}></textarea>
                            {this.validator.message('resumen', this.state.resumen, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                        <div className="form-group">
                            <label> Fecha Inicio </label>
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_inicio}
                                onChange={this.handleFIni}
                            />
                            {this.validator.message('fechaIni', this.state.fecha_inicio, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                        <div className="form-group">
                            <label> Fecha Fin </label>
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_fin}
                                onChange={this.handleFFin}
                            />
                            {this.validator.message('fechaFin', this.state.fecha_fin, 'required', false, {required: 'Este campo es obligatorio'})}
                        </div>
                    </div>
                    <div className="panel-footer text-right">
                        <button className="btn btn-primary" onClick={this.performPostRequest}>Registrar</button>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}




export default RegistroInvestigación;