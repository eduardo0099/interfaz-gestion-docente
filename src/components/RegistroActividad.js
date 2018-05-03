import React, { Component } from 'react';
import {Table,Button,PageHeader} from 'react-bootstrap';
//import Papa from 'papaparse';
import axios from 'axios';
import '../styles/RegistroDocente.css';

class RegistroActividad extends Component{


    constructor(props){
        super(props);

        this.state = {
            cantidadFilas: 1
        }
    }

    configPapa = {
        delimiter: "",  // auto-detect
        newline: "",  // auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: false,
        trimHeader: false,
        dynamicTyping: false,
        preview: 0,
        encoding: "",
        worker: false,
        comments: false,
        step: undefined,
        error: undefined,
        download: false,
        skipEmptyLines: false,
        chunk: undefined,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        withCredentials: undefined
    };

    registroCorrecto = () =>{
        alert("Actividad registrada correctamente");
    };

    registroFallido = () =>{
        alert("Hay un dato inválido en el registro. \nPor favor, verifique sus datos");
    };

    render() {
        return (
            <div className="container">
                <PageHeader>
                    Registro de Actividad
                </PageHeader>
                <div class="container">
                    <input type="text" className="form-control" placeholder="Nombre de la actividad"></input>
                    <br></br>
                    <input type="text" className="form-control" placeholder="Tipo de Actividad"></input>
                    <br></br>
                    <input type="text" className="form-control" placeholder="Fecha Inicio"></input>
                    <br></br>
                    <input type="text" className="form-control" placeholder="Fecha Fin" className="form-control"></input>
                    <br></br>
                </div>
                <div class="centro">
                    <Button bsStyle="primary" onClick={this.registroCorrecto}>AÑADIR</Button>
                    <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                    <Button bsStyle="warning" onClick={this.registroFallido}>CANCELAR</Button>
                </div>
            </div>
        );
    }
}

export default RegistroActividad;