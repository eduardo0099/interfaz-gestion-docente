import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class ListaProfesores extends React.Component {

  constructor(){
    super();

    this.state = {
      profesores: []
    }

  }

  componentDidMount(){
    axios.get('http://localhost:8080/listaDocentes')
      .then(response =>{
        this.setState({
          profesores: response.data.profesores
        });
      })
      .catch(error =>{
        console.log("Error obteniendo los datos de los profesores");
      });
  }

  render() {
    return (
      <div>
        {this.state.profesores.map((item,i)=>{
          //return <p key={i}>{item.codigo+" - "+item.nombres+" "+item.apellidoP+" "+item.apellidoM}</p>
          return <Link to={`/perfilDocente/${item.codigo}`} >{item.codigo+" - "+item.nombres+" "+item.apellidoP+" "+item.apellidoM}</Link>
        })}
      </div>
    );
  }
}

export default ListaProfesores;