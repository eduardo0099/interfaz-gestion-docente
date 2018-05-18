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
            autor: '',
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


    validation(){
        var valido=1
        if(this.state.titulo.length == 0){
            alert("El campo de titulo es obligatorio");
            valido=0;
        }
        if(this.state.autor.length == 0){
            alert("El campo de autor es obligatorio");
            valido=0;
        }
        if(this.state.resumen.length == 0){
            alert("El campo de resumen es obligatorio");
            valido=0;
        }
        if(this.state.fecha_inicio == null){
            alert("El campo de fecha ini es obligatorio");
            valido=0;
        }
        if(this.state.fecha_fin == null){
            alert("El campo de fecha fin es obligatorio");
            valido=0;
        }
        return valido;
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
                    alert("Investigación registrada");
                })
                .catch(function (error) {
                    alert("Error: No se pudo registrar la investigación");
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
                <div class="container">
                    <label class="col-sm-10">
                        Título:
                        <input type="text" className="form-control" value={this.state.titulo} onChange={this.handleTitulo}></input>
                        {this.validator.message('titulo', this.state.titulo, 'required|max:20', false, {required: 'Este campo es obligatorio',max:'El número máximo de caracteres es 20'})}
                        <br></br>
                    </label>
                    <label class="col-sm-10">
                        Autor:
                        <input type="text" className="form-control" value={this.state.autor} onChange={this.handleAutor}></input>
                        {this.validator.message('titulo', this.state.autor, 'required|max:20', false, {required: 'Este campo es obligatorio',max:'El número máximo  de caracteres es 20'})}
                        <br></br>
                    </label>
                    <label class="col-sm-10">
                        Resumen:
                        <input type="text" className="form-control" value={this.state.resumen} onChange={this.handleResumen}></input>
                        {this.validator.message('titulo', this.state.resumen, 'required|max:20', false, {required: 'Este campo es obligatorio',max:'El número máximo  de caracteres es 20'})}
                        <br></br>
                    </label>
                    <label class="col-sm-10">
                        Fecha Inicio:
                        <DatePicker
                            selected={this.state.fecha_inicio}
                            onChange={this.handleFIni}
                        />
                        <br></br>
                    </label>
                    <label class="col-sm-10">
                        Fecha Fin:
                        <DatePicker
                            selected={this.state.fecha_fin}
                            onChange={this.handleFFin}
                        />
                        <br></br>
                    </label>
                </div>
                <Button onClick={this.performPostRequest}>Registrar</Button>
                <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <Button onClick={this.props.history.goBack}>Cancelar</Button>
            </div>
        );
    }
}




export default RegistroInvestigación;