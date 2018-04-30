import React, { Component } from 'react';
import {Table,Button,PageHeader} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import '../styles/RegistroDocente.css';

class RegistroDocente extends Component{


  constructor(props){
    super(props);

    this.state = {
      cantidadFilas: 1
    }
  }

  obtenerTipoFile= nombreFile => {
    let t = document.getElementsByTagName( 'select' );
    return t[0].value;
  };

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

  agregarFila = () =>{
    this.setState({cantidadFilas: this.cantidadFilas +1 });
  };
  render() {
    return (
      <div className="container">
        <PageHeader>
          Registro de docente
        </PageHeader>
        <div class="container">
          <input type="text" className="form-control" placeholder="Apellido paterno del docente"></input>
          <br></br>
          <input type="text" className="form-control" placeholder="Apellido materno del docente"></input>
          <br></br>
          <input type="text" className="form-control" placeholder="Nombres del docente"></input>
          <br></br>
          <input type="text" className="form-control" placeholder="Teléfono del docente" className="form-control"></input>
          <br></br>
          <input type="text" className="form-control" placeholder="Correo electrónico del docente" className="form-control"></input>
          <br></br>
          <input type="text" className="form-control" placeholder="Sección del docente" className="form-control"></input>
          <br></br>
          <input type="text" className="form-control" placeholder="Departamento del docente" className="form-control"></input>
          <br></br>
        </div>
        <div class="centro">
          <Button bsStyle="primary" onClick={this.agregarFila}>REGISTRAR DOCENTE</Button>
          <label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
          <Button bsStyle="warning" onClick={this.cargarDatos}>CANCELAR REGISTRO</Button>
        </div>
      </div>
    );
  }
}

export default RegistroDocente;