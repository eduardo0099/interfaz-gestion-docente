import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';

class ListaEncuestas extends React.Component {

  constructor(props){
    super(props);
      this.state = {
        encuestas: props.encuestas
      }

      if(this.state.encuestas === undefined){
        this.state.encuestas = [];
      } 
  }

  render() {
    return (
      <div>
        <Table striped >
          <thead>
            <tr>
              <th> Puntaje </th>
              <th> Comentario </th>
            </tr>
          </thead>
          <tbody>
            {this.state.encuestas.map( (encuesta) => {
              return (
                  <tr key={ encuesta.id }>
                    <td>  { encuesta.puntaje } </td>
                    <td> { encuesta.comentario } </td>
                  </tr>
                )
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

ListaEncuestas.propTypes = {
  encuestas: PropTypes.array
};


export default ListaEncuestas;