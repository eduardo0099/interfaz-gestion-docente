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
      global: {},
    };

  }

  componentDidMount(){
    axios.get('http://200.16.7.151:8080/docente/docente', {
      params: {
        codigo: this.state.codigo,
        ciclo: "2018-1",
      }
    })
      .then(function (response) {
        this.setState({
          global: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  propsDetalleDocente = {
    codigo: global.codigo,
    nombre: global.nombres,
    apellidoP: global.apellidoP,
    apellidoM: global.apellidoM,
    telefono: global.telefono,
    correo: global.correo,
    seccion: global.seccion,
    url: undefined,
    departamento:global.departamento,
  };

  render(){
    return(
      <div>
        <Route exact path="/profesores/:codigo/" render={() => <DetalleDocente {...this.propsDetalleDocente} />} />
        <Route exact path="/profesores/:codigo/cursos" render={ () => <Cursos
          ciclos={[ {id:1,descripcion:"2018-1"} ]}
          datos={global.cursos}
          codigoDocente={this.state.codigo}
        /> }/>
      </div>
    );
  }
}
export default PerfilDocente;