import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from "axios/index";

export class Cursos extends React.Component {
  constructor(props){
    super(props);
    this.state={
      infoCursos: [
        {
          "tipo": "pregrado",
          "listaCursos": []
        },
        {
          "tipo": "posgrado",
          "listaCursos": []
        },
        {
          "tipo": "otros",
          "listaCursos": []
        }
      ]
      ,
      ciclos: [{id:1, descripcion:"2017-1"},{id:1, descripcion:"2017-2"},{id:1, descripcion:"2018-1"},{id:1, descripcion:"2018-2"}],
      cicloSeleccionado: "2018-1"
    }
  }


  componentDidMount(){
    axios.get('http://200.16.7.151:8080/docente/curDocente', {
      params: {
        codigo: this.props.match.params.codigo,
        ciclo: this.state.cicloSeleccionado,
      }
    })
      .then(response => {
        this.setState({
          infoCursos: response.data.cursos
        });
      })
      .catch(error => {
        console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`,error);
      });
  }


  render () {

    let listaCursos = [];
    let tipoCursos= ["pregrado", "postgrado", "otros"];
    for(let i=0;i<this.state.infoCursos.length;i++){
      for(let j= 0; j<this.state.infoCursos[i].listaCursos.length; j++){
        listaCursos.push({
          codigo: this.state.infoCursos[i].listaCursos[j].codigo,
          nombre: this.state.infoCursos[i].listaCursos[j].nombre,
          horario: this.state.infoCursos[i].listaCursos[j].horario,
          unidad: this.state.infoCursos[i].listaCursos[j].unidad,
          horas: this.state.infoCursos[i].listaCursos[j].horas,
          creditos: this.state.infoCursos[i].listaCursos[j].creditos,
          tipo: tipoCursos[i],
        })
      }
    }
    const columnas = [
      {
        Header: 'Codigo',
        accessor: 'codigo'
      },
      {
        Header: 'Nombre',
        accessor: 'nombre'
      },
      {
        Header: 'Creditos',
        accessor: 'creditos'
      }, {
        Header: 'Horario',
        accessor: 'horario'
      }, {
        Header: 'Horas Semanales',
        accessor: 'horas'
      }
    ];


    return(
      <div>
        <select ref="selectorCiclos">
          {this.state.ciclos.map((item,i)=>{
            return <option key={i}>{item.descripcion}</option>
          })}
        </select>
        <ReactTable data={listaCursos} columns={columnas}/>
      </div>
    )
  }
}
export default Cursos;
