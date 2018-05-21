import React, { Component } from 'react';
import {Table,Button,PageHeader} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';

class CargaDatos extends Component{


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

  conversionCompleta = (results, file) => {

    results.type= this.obtenerTipoFile(file.name);
    console.log(results.data);
    console.log(JSON.stringify(results.data,null,2));

    axios.post('http://200.16.7.151:8080/carga/cargaDatos',results)
      .then(function (response) {
        alert("Carga de datos completa");
        //console.log(response);
      })
      .catch(function (error) {
        //console.log(error);
        alert("Error: No se pudo completar la carga");
      });
  };

  configPapa = {
    delimiter: "",	// auto-detect
    newline: "",	// auto-detect
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
    complete: this.conversionCompleta,
    error: undefined,
    download: false,
    skipEmptyLines: false,
    chunk: undefined,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    withCredentials: undefined
  };


  cargarDatos = () =>{
    let f = document.getElementsByTagName( 'input' );
    let t = document.getElementsByTagName( 'select' );
    if(f[0].files.length > 0 && t[0].value !== 'vacio'){

      Papa.parse(f[0].files[0],this.configPapa);

    }else {
      alert("Error: Faltan completar campos");
    }

  };

  agregarFila = () =>{
    this.setState({cantidadFilas: this.cantidadFilas +1 });
  };
  render() {
    const filaCarga =
      <tr>
        <td><Button>x</Button></td>
        <td><input type="file" name="datafile"/></td>
        <td>
          <select required>
            <option value="vacio">...</option>
            <option value="investigaciones">Investigaciones</option>
            <option value="encuestas">Encuestas</option>
            <option value="docentes">Docentes</option>
            <option value="cursos">Cursos</option>
            <option value="horarios">Horarios</option>
          </select>
        </td>
      </tr>;
    return (
      <div className="container">
        <PageHeader>
          Carga de datos
        </PageHeader>
        <Table responsive >
          <thead>
          <tr>
            <th> </th>
            <th>Archivo</th>
            <th >Tipo</th>
          </tr>
          </thead>
          <tbody>
            {filaCarga}
          </tbody>
        </Table>
        <Button bsStyle="primary" onClick={this.agregarFila}>AGREGAR FILA</Button>
        <Button bsStyle="warning" onClick={this.cargarDatos}>CARGAR DATOS</Button>
      </div>


    );
  }
}




export default CargaDatos;