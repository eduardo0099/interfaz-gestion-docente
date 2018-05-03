import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from "axios/index";
import BootstrapTable from 'react-bootstrap-table-next';

export class Cursos extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
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
          ],
          ciclos: [],
          cicloSeleccionado: ""
      }
  }

  componentDidMount(){

    axios.all([
      axios.get('http://200.16.7.151:8080/general/cicloActual'),
      axios.get('http://200.16.7.151:8080/general/listaCiclos'),
    ]).then(axios.spread((respCicloAct,resplistaCiclos)=>{
      this.setState({
        cicloSeleccionado: respCicloAct.data.cicloActual,
        ciclos: resplistaCiclos.data.ciclos
      });
      return axios.get('http://200.16.7.151:8080/docente/docente/curDocente', {
        params: {
          codigo: this.props.match.params.codigo,
          ciclo: this.state.cicloSeleccionado,
        }
      });
    })).then((respcursos) => {
      this.setState({
        infoCursos: respcursos.data.cursos
      })
      }
    ).catch(error => {
      console.log(`Error al obtener datos de la pantalla cursos`,error);
    });

  }

  cambioCiclo = (event) =>{
    let nuevoCiclo = event.target.value;
    axios.get('http://200.16.7.151:8080/docente/docente/curDocente', {
      params: {
        codigo: this.props.match.params.codigo,
        ciclo: nuevoCiclo,
      }
    })
      .then((respcursos) => {
          this.setState({
            infoCursos: respcursos.data.cursos,
            cicloSeleccionado: nuevoCiclo
          })
        })
      .catch(error => {
        console.log(`Error al obtener datos de la pantalla cursos`,error);
      });
  };

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
          text: 'Codigo',
          dataField: 'codigo'
      },
      {
          text: 'Nombre',
          dataField: 'nombre'
      },
      {
          text: 'Creditos',
          dataField: 'creditos'
      }, {
            text: 'Horario',
            dataField: 'horario'
      }, {
            text: 'Horas Semanales',
            dataField: 'horas'
      }
    ];


    return(
      <div>
        <select ref="selectorCiclos" onChange={this.cambioCiclo}>
          {this.state.ciclos.map((item,i)=>{
            return <option key={i} value={item.descripcion}>{item.descripcion}</option>
          })}
        </select>
          <BootstrapTable keyField='id' data={ listaCursos } columns={ columnas }/>
      </div>
    )
  }
}


export default Cursos;