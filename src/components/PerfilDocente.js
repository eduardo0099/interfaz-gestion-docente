import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import DetalleDocente from './DetalleDocente';
import axios from "axios/index";
import Cursos from "../components/Cursos";

class PerfilDocente extends Component {

  constructor(props){
    super(props);
    console.log("codigo lee",props.match.params.codigo);
    this.state ={
      codigo : props.match.params.codigo,
    };

  }

  componentDidMount(){
    axios.get('http://localhost:8080/docente/docente', {
      params: {
        codigo: this.state.codigo,
        ciclo: "2018-1",
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  propsDetalleDocente = {
    codigo: 1,
    tipo: "valTipo",
    nombre: "valNombre",
    apellidoP: "valApellidoP",
    apellidoM: "valApellidoM",
    telefono: 5555555,
    correo: "val@correo.com",
    seccion: "valSeccion",
    url: undefined,
    departamento:"valDpto",
  };

  render(){
    return(
      <div>
        <Route exact path="/profesores/:codigo/" render={() => <DetalleDocente {...this.propsDetalleDocente} />} />
        <Route exact path="/profesores/:codigo/cursos" render={ () => <Cursos ciclos={[ {id:1,descripcion:"2018-1"} ]}/> }/>
      </div>
    );
  }
}
export default PerfilDocente;