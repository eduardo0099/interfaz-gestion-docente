import React from 'react';
import axios from 'axios';

class ListaProfesores extends React.Component {

  constructor(){
    super();

    this.state = {
      profesores: []
    }

  }

  componentDidMount(){
    axios.get('http://localhost:8080/tests')
      .then(response =>{
        this.setState({
          profesores: response
        });
      })
      .catch(error =>{
        console.log("Error obteniendo los datos de los profesores");
      });
  }

  render() {
    return (
      <div>
        <p>Profesor 1</p>
        <p>Profesor 2</p>
      </div>
    );
  }
}

export default ListaProfesores;