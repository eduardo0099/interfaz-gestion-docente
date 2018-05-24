import React, { Component } from 'react';
import {Row,Grid,Table,Button,PageHeader,Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
//import Papa from 'papaparse';
import axios from 'axios';
import '../styles/RegistroDocente.css';
import moment from "moment";
import SimpleReactValidator from "simple-react-validator";

class RegistroActividad extends Component{


    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            titulo:"",
            tipo:"",
            fecha_inicio:"",
            fecha_fin:"",
            estado:"Asistira",
            idProfesor:"20112728",
            ciclo:"2018-1",
            lugar:"PUCP"

        };
        this.handleTitulo = this.handleTitulo.bind(this);
        this.handleTipo = this.handleTipo.bind(this);
        this.handleFIni = this.handleFIni.bind(this);
        this.handleFFin = this.handleFFin.bind(this);
        this.handleEstado = this.handleEstado.bind(this)
    }

    handleTitulo(event) {
        this.setState({titulo: event.target.value});
    }

    handleTipo(event) {
        this.setState({tipo: event.target.value});
        console.log(this.state.tipo);
    }

    handleFIni(date) {
        this.setState({fecha_inicio: date});
    }

    handleFFin(date) {
        this.setState({fecha_fin: date});
    }

    handleEstado(event) {
        this.setState({estado: event.target.value});
        console.log(this.state.estado);
    }

    armarFecha(date){
        var cadena="";
        //cadena=cadena+date.getFullYear();
		
		
		if (date.getDate()<10){
            cadena=cadena+0+date.getDate();
        }else{
            cadena=cadena+date.getDate();
        }
		cadena += "-";
        if (date.getMonth()<9){
            cadena=cadena+0+(date.getMonth()+1);
        }else{
            cadena=cadena+(date.getMonth()+1);
        }
		cadena = cadena + "-";
		cadena=cadena+date.getFullYear();
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
            axios.post('http://200.16.7.151:8080/docente/actividad/registrar', {
                idProfesor: this.state.idProfesor,
                ciclo: this.state.ciclo,
                tipo: this.state.tipo,
                titulo: this.state.titulo,
                fecha_inicio: this.armarFecha(this.state.fecha_inicio._d),
                fecha_fin: this.armarFecha(this.state.fecha_fin._d),
                estado: this.state.estado,
                lugar: this.state.lugar
            })
                .then(response => {
                    alert("Actividad registrada");
                    this.props.history.goBack();
                })
                .catch(error => {
                    alert("Error: No se pudo registrar la actividad");
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
            <div className="container">
                <PageHeader>
                    Registrar Actividad
                </PageHeader>
                <Grid>
                    <Row>
                        <Col md={12}>
                            Título:
                            <input type="text" className="form-control" value={this.state.titulo} onChange={this.handleTitulo}></input>
                            {this.validator.message('titulo', this.state.titulo, 'required|max:100', false, {required: 'Este campo es obligatorio',max:'El número máximo de caracteres es 50'})}
                            <br></br>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={12}>
                            Tipo:
                            <input type="text" className="form-control" value={this.state.tipo} onChange={this.handleTipo}></input>
                            {this.validator.message('tipo', this.state.tipo, 'required|max:20', false, {required: 'Este campo es obligatorio'})}
                            <br></br>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            Fecha Inicio:
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_inicio}
                                onChange={this.handleFIni}
                            />
                            {this.validator.message('fechaIni', this.state.fecha_inicio, 'required', false, {required: 'Este campo es obligatorio'})}
                            <br></br>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            Fecha Fin:
                            <DatePicker
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.fecha_fin}
                                onChange={this.handleFFin}
                            />
                            {this.validator.message('fechaFin', this.state.fecha_fin, 'required', false, {required: 'Este campo es obligatorio'})}
                            <br></br>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={12}>
                            Estado:
                            <input type="text" disabled={true} className="form-control" value={this.state.estado} onChange={this.handleEstado}></input>
                            {this.validator.message('estado', this.state.estado, 'required|max:20', false, {required: 'Este campo es obligatorio'})}
                            <br></br>
                        </Col>
                    </Row>
                </Grid>
                <Button onClick={this.performPostRequest}>Registrar</Button>
                <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <Button onClick={this.props.history.goBack}>Cancelar</Button>
            </div>
        );
    }

}

export default RegistroActividad;