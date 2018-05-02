import React, {Component} from 'react';
import {Route,Link} from 'react-router-dom';
import DetalleDocente from "./DetalleDocente";
import axios from "axios/index";

class ListaProfesores extends Component {

  constructor(props){
    super(props);

    this.state ={
      profesores: []
    }
  }

    componentDidMount(){
        axios.get('http://200.16.7.151:8080/general/listaDocente')
            .then(response =>{
                this.setState({
                    profesores: response.data.docentes
                });
            })
            .catch(error =>{
                console.log("Error obteniendo la lista de los profesores",error);
            });
    }

  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.path}`} render={() =>
          <div>
            {this.state.profesores.map((item,i)=>{
              return <p key={i}><Link to={`${this.props.match.url}/${item.codigo}`} >{item.codigo+" - "+item.nombre}</Link></p>
            })}
          </div>
        }/>
        <Route path={`${this.props.match.path}/:codigo`} component={DetalleDocente}  />

      </div>
    );
  }
}

export default ListaProfesores;