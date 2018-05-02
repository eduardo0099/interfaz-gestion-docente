import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export class Cursos extends React.Component {

  render () {
    const columnas = [
      {
        Header: 'Nombre',
        accessor: 'cursos.nombre'
      }, {
        Header: 'Creditos',
        accessor: 'cursos.creditos'
      }, {
        Header: 'Horario',
        accessor: 'cursos.horario'
      }, {
        Header: 'Horas Semanales',
        accessor: 'cursos.horas'
      }
    ];


    return(
      <div>
        <select ref="selectorCiclos">
          {this.props.ciclos.map((item,i)=>{
            return <option key={i}>{item.descripcion}</option>
          })}
        </select>
        <ReactTable data={this.props.cursos} columns={columnas}/>
      </div>
    )
  }
}

export default Cursos;
