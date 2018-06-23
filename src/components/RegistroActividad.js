import React, { Component } from 'react';
import {Row,Grid,Table,Button,PageHeader,Col} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
//import Papa from 'papaparse';
import axios from 'axios';
import '../styles/RegistroDocente.css';
import moment from "moment";
import SimpleReactValidator from "simple-react-validator";
import BaseContainer from "./BaseContainer";
import Select from 'react-select';
import API from "../api";

class RegistroActividad extends Component{


    constructor(props){
        super(props);
        this.validator = new SimpleReactValidator();
        this.state = {
            titulo:"",
            fecha_inicio:"",
            fecha_fin:"",
            estado:"Asistira",
            idProfesor:this.props.match.params.codigo,
            ciclo:"",
            lugar:"PUCP",
            listaTipo: [{id:"1",descripcion:"Congreso"},{id:"2",descripcion:"Visita"}],
            tipoSeleccionado:"",

        };
        console.log(this.props.match.params);
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
        //console.log(this.state.tipo);
    }

    handleFIni(date) {
        this.setState({fecha_inicio: date});
    }

    handleFFin(date) {
        this.setState({fecha_fin: date});
    }

    handleEstado(event) {
        this.setState({estado: event.target.value});
        //console.log(this.state.estado);
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
        //console.log(cadena);
        return cadena;
    }

    validDates(fFin,fIni){
        var isafter = moment(fFin._d).isAfter(fIni._d);
        //console.log('fechas validas?:',isafter)
        return isafter;
    }

    componentDidMount() {
        this.listarTipo();
        this.findCicloActual();
    }

    listarTipo(){
        API.get('general/listaTipoActividad')
            .then(response => {
                this.setState({listaTipo: response.data.tipo_actividad})
            }).catch(error => {
                alert("No se puede obtener los datos de los tipos de actividades");
            });
    }

    findCicloActual(){
        API.get('general/cicloActual')
            .then(response => {
                this.setState({ciclo: response.data.cicloActual})
            }).catch(error => {
                alert("No se puede obtener los datos del ciclo actual");
            });
    }

    performPostRequest = ()=> {
        if( this.validator.allValid() && this.validDates(this.state.fecha_fin,this.state.fecha_inicio)){
            API.post('docente/actividad/registrar', {
                idProfesor: this.state.idProfesor,
                ciclo: this.state.ciclo,
                tipo: this.state.tipoSeleccionado,
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

    cambioTipo = (obj) => {
        this.setState({ tipoSeleccionado: obj.descripcion })
    };

    render(){

        //console.log(this.props);
        return (
            <div>
                <BaseContainer>
                    <div className="panel col-lg-offset-2 col-lg-8 col-md-12 col-sm-12">
                        <div className="panel-body">
                            <PageHeader>
                                Registrar Actividad
                            </PageHeader>
                            <Grid>
                                <Row>
                                    <Col md={6}>
                                        Título:
                                        <input type="text" className="form-control" value={this.state.titulo} onChange={this.handleTitulo}></input>
                                        {this.validator.message('titulo', this.state.titulo, 'required|max:100', false, {required: 'Este campo es obligatorio',max:'El número máximo de caracteres es 50'})}
                                        <br></br>
                                    </Col>
                                </Row>
                                <Row >
                                    <Col md={12}>
                                        <div className="form-group col-md-4 row ">
                                        <label> Tipo: </label>
                                        <Select
                                            value={ this.state.tipoSeleccionado }
                                            onChange={ this.cambioTipo }
                                            valueKey={ "descripcion" }
                                            labelKey={ "descripcion" }
                                            options={ this.state.listaTipo }
                                            clearable={ false }
                                        />
                                    </div>
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
                            </Grid>
                            <Button onClick={this.performPostRequest}>Registrar</Button>
                            <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                            <Button onClick={this.props.history.goBack}>Cancelar</Button>
                        </div>
                    </div>
                </BaseContainer>
            </div>
        );
    }

}

export default RegistroActividad;