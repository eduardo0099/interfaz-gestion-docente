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
          profesores: response.data
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
          console.log(item);
          return <p key={i}>{item.idCliente+" - "+item.nombCliente+" - "+item.fechaVenta
          +" - "+item.idProducto+" - "+item.nombProd+" - "+item.precioUni+" - "+item.subTotal}</p>
        })}
      </div>
    );
  }
}

export default ListaProfesores;