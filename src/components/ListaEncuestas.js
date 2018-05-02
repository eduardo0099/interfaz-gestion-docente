import React from 'react';
import {Route, Link } from 'react-router-dom';
import {Grid,Row,Table,Button, Glyphicon,Col} from 'react-bootstrap';
import axios from "axios/index";
import ProfesorPerfilEncuesta from "./ProfesorPerfilEncuesta";

class ListaEncuestas extends React.Component{


  constructor(props){

    super(props);
    this.state= {
      listaEncuesta: [],
      cicloSeleccionado: "2018-1",
      verComentarios: false,
      comentarioSeleccionado: -1,
    }
  }

  componentDidMount(){
    axios.get('http://200.16.7.151:8080/docente/docente/encDocente', {
      params: {
        codigo: this.props.match.params.codigo,
        ciclo: this.state.cicloSeleccionado,
      }
    })
      .then(response => {
        this.setState({
          encuestas: response.data.encuestas
        });
      })
      .catch(error => {
        console.log(`Error al obtener datos del profesor ${this.props.match.params.codigo}`,error);
      });
  }

  mostarComentarios = (index) =>{
    this.setState({
      verComentarios:true,
      comentarioSeleccionado: index
    });
  };

  render(){
    console.log("Mostrar",this.state.verComentarios);
    if(!this.state.verComentarios) {
      return (
        <div>
          <Route exact path={`${this.props.match.path}`} render={() =>
            <Grid>
              <Row className="back-bar">
                <Col md={12}>
                  <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"/></Button> <span
                  className="professor-name">Volver a perfil docente</span>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <p>Aqui va el grafico que ahora es una img</p>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <p>Aqui va el combobox</p>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                      <th>Cursos</th>
                      <th>Horario</th>
                      <th>Participacion</th>
                      <th>Puntaje</th>
                      <th>Comentarios</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.listaEncuesta.map((item, i) => {
                      return <tr key={i}>
                        <td>{item.curso}</td>
                        <td>{item.horario}</td>
                        <td>{item.porcentaje}</td>
                        <td>{item.puntaje}</td>
                        <td><Button onClick={this.mostarComentarios(i)}>Ver Comentarios</Button></td>
                      </tr>
                    })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Grid>
          }/>

        </div>
      );
    }else{
      return(
        <ProfesorPerfilEncuesta
          profesor={"NOMBRE PROFESOR"}
          ciclo={this.state.listaEncuesta[this.state.cicloSeleccionado].ciclo}
          curso={this.state.listaEncuesta[this.state.cicloSeleccionado].curso}
          codigo={"INF999"}
          participacion={this.state.listaEncuesta[this.state.cicloSeleccionado].porcentaje}
          puntaje={this.state.listaEncuesta[this.state.cicloSeleccionado].puntaje}
          encuestas={['Pta que buen profe', 'TOdo bien con este pata', 'xd', 'Un comentario bastante largo ahora solo para proba xddddddddddddddddddd', 'demasiado bueno este profesor deberian darle un premio h3h']}
        />
      );
    }
  }
}

export default ListaEncuestas;