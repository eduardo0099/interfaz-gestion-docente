import React, { Component } from 'react';
import {Row,Grid,Table,Button,PageHeader} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Papa from 'papaparse';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator'


class RegistroInvestigación extends Component{


    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state={
            titulo: '',
            autor: this.props.match.params.codigo,
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
    }

    performPostRequest = ()=> {
        if( this.validator.allValid() ){
            axios.post('http://200.16.7.151:8080/docente/investigacion/registrar', {
                titulo: this.state.titulo,
                autor: this.state.autor,
                resumen: this.state.resumen,
                fecha_inicio: this.armarFecha(this.state.fecha_inicio._d),
                fecha_fin: this.armarFecha(this.state.fecha_fin._d),
                archivo:null
            })
                .then(function (response) {
                    alert("Investigación modificada");
                })
                .catch(function (error) {
                    alert("Error: No se pudo modificar la investigación");
                })
        }else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    render(){

        console.log(this.props);
        return (
            <div className="container">
                <PageHeader>
                    Registrar Informe
                </PageHeader>
                <Grid>
                    <Row>
                        Título:
                        <input type="text" className="form-control" value={this.state.titulo} onChange={this.handleTitulo}></input>
                        {this.validator.message('titulo', this.state.titulo, 'required|max:100', false, {required: 'Este campo es obligatorio',max:'El número máximo de caracteres es 20'})}
                        <br></br>
                    </Row>
                    <Row >
                        Autor:
                        <input type="text" className="form-control" value={this.state.autor} onChange={this.handleAutor}></input>
                        {this.validator.message('autor', this.state.autor, 'required|integer', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                    </Row>
                    <Row >
                        Resumen:
                        <input type="text" className="form-control" value={this.state.resumen} onChange={this.handleResumen}></input>
                        {this.validator.message('resumen', this.state.resumen, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                    </Row>
                    <Row>
                        Fecha Inicio:
                        <DatePicker
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.fecha_inicio}
                            onChange={this.handleFIni}
                        />
                        {this.validator.message('fechaIni', this.state.fecha_inicio, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                    </Row>
                    <Row>
                        Fecha Fin:
                        <DatePicker
                            dateFormat="DD/MM/YYYY"
                            selected={this.state.fecha_fin}
                            onChange={this.handleFFin}
                        />
                        {this.validator.message('fechaFin', this.state.fecha_fin, 'required', false, {required: 'Este campo es obligatorio'})}
                        <br></br>
                    </Row>
                </Grid>
                <Button onClick={this.performPostRequest}>Registrar</Button>
                <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <Button onClick={this.props.history.goBack}>Cancelar</Button>
            </div>
        );
    }
}




export default RegistroInvestigación;