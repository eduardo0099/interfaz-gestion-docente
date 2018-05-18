import React, { Component } from 'react';
import {Row,Grid,Table,Button,PageHeader} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class ModificarInvestigacion extends Component{


    constructor(props){
        super(props);
        this.state={
            titulo: '',
            autor: '',
            resumen: '',
            fecha_inicio: '',
            fecha_fin: '',
            archivo:null
        };
        this.handleTitulo = this.handleTitulo.bind(this);
        this.handleAutor = this.handleAutor.bind(this);
        this.handleResumen = this.handleResumen.bind(this);
        this.handleFIni = this.handleFIni.bind(this);
        this.handleFFin = this.handleFFin.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8080/docente/docente/investigacion', {
            params: {
                id: this.props.match.params.idInvestigacion,
            }
        })
            .then(response =>{
                console.log(response);
                this.setState({
                    titulo: response.data.investigacion.titulo,
                    autor: response.data.autores[0],
                    resumen: response.data.investigacion.resumen,
                });
            })
            .catch(error =>{
                console.log("Error obteniendo la investigacion",error);
            });
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
        var valido=this.validation();
        if(valido==1) {
            axios.put('http://200.16.7.151:8080/docente/investigacion/actualizar', {
                id: this.props.match.params.idInvestigacion,
                titulo: this.state.titulo,
                autor: this.state.autor,
                resumen: this.state.resumen,
                fecha_inicio: this.armarFecha(this.state.fecha_inicio._d),
                fecha_fin: this.armarFecha(this.state.fecha_fin._d),
                archivo: null
            })
                .then(function (response) {
                    alert("Investigación registrada");
                })
                .catch(function (error) {
                    alert("Error: No se pudo registrar la investigación");
                })
        }
    }

    render() {

        console.log(this.props.match.params.idInvestigacion);
        return (
            <div className="container">
                <PageHeader>
                    Editar Informe
                </PageHeader>
                <div class="container">
                    <label class="col-sm-12">
                        Título:
                    <input type="text" className="form-control" value={this.state.titulo} onChange={this.handleTitulo}></input>
                    <br></br>
                    </label>
                    <label class="col-sm-12">
                        Autor:
                    <input type="text" className="form-control" value={this.state.autor} onChange={this.handleAutor}></input>
                    <br></br>
                    </label>
                    <label class="col-sm-12">
                        Resumen:
                    <input type="text" className="form-control" value={this.state.resumen} onChange={this.handleResumen}></input>
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
                        <label className="col-sm-10"/>
                    <br></br>
                    </label>
                </div>
                    <Button onClick={this.performPostRequest}>Modificar</Button>
                <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <Button onClick={this.props.history.goBack}>Cancelar</Button>
            </div>
        );
    }
}




export default ModificarInvestigacion;