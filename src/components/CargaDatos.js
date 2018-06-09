import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Papa from 'papaparse';
import axios from 'axios';
import BaseContainer from "./BaseContainer";
import API from '../api';
import {Redirect} from 'react-router-dom';

class CargaDatos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cantidadFilas: 1,
      auth:false
    }
  };

  componentWillMount() {
    if (localStorage.getItem('jwt') == null) {
        window.location.href = "/";
    } else {
        API.get('/auth/verificaPermiso', {
            /*
            headers:{
              'x-access-token' : localStorage.getItem('jwt'),
            },
            */
            params: {
                ruta: "/carga"
            }
        }).then(resp => {
            console.log("resp", resp.data);
            this.setState({ auth: resp.data.permiso });
        }).catch(err => {
            console.log("err", err);
        })
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

    API.post('carga/cargaDatos',results)
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


    cargarDatos = () => {
      let f = document.getElementsByTagName('input');
      let t = document.getElementsByTagName('select');
      if (f[0].files.length > 0 && t[0].value !== 'vacio') {

        Papa.parse(f[0].files[0], this.configPapa);

      } else {
        alert("Error: Faltan completar campos");

      }
    };

    agregarFila = () => {
        this.setState({cantidadFilas: this.cantidadFilas + 1});
    };

    render() {
        const filaCarga =
            <tr>
                <td className="v-middle">
                    <input type="file" name="datafile"/>
                </td>
                <td className="v-middle">
                    <select className="form-control" required>
                        <option value="vacio">...</option>
                        <option value="investigaciones">Investigaciones</option>
                        <option value="encuestas">Encuestas</option>
                        <option value="docentes">Docentes</option>
                        <option value="cursos">Cursos</option>
                        <option value="horarios">Horarios</option>
                    </select>
                </td>
                <td><Button>x</Button></td>
            </tr>;
            if(!this.state.auth){
                return(<Redirect to="/home"/>);
              }
        return (

            <BaseContainer>
                <div className="panel wrapper-md col-lg-offset-1 col-lg-10 col-md-12 col-sm-12">
                    <div className="panel-heading">
                        <h2> Carga de Datos </h2>
                    </div>
                    <div className="panel-body">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th className="col-md-8">Archivo</th>
                                <th className="col-md-4">Tipo</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {filaCarga}
                            </tbody>
                        </table>
                        <div className="text-right m-t-lg">
                            <button className="btn btn-default" onClick={this.agregarFila}>Agregar Fila</button>
                            <button className="btn btn-primary m-l-md" onClick={this.cargarDatos}>Cargar Datos</button>
                        </div>
                    </div>
                </div>
            </BaseContainer>
        );
    }
}


export default CargaDatos;