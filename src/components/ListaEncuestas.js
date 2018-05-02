import React from 'react';
import {Route, Link } from 'react-router-dom';
import {Grid,Row,Table,Button, Glyphicon,Col} from 'react-bootstrap';
import axios from "axios/index";

class ListaEncuestas extends React.Component{


  constructor(props){

    super(props);
    this.state= {
      encuestas: []
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


  render(){
    return (
      <div>
        <Route exact path={`${this.props.match.path}`} render={() =>
          <Grid>
            <Row className="back-bar">
              <Col md={12}>
                <Button onClick={this.props.history.goBack}><Glyphicon glyph="arrow-left"/></Button> <span className="professor-name">Volver a perfil docente</span>
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

                  {this.state.encuestas.map((item,i) => {
                    return <tr key={i}>
                      <td>{item.curso}</td>
                      <td>{item.horario}</td>
                      <td>{item.porcentaje}</td>
                      <td>{item.puntaje}</td>
                      <td><Link to={`${this.props.match.url}/${item.id}`} >Ver Comentarios</Link></td>
                    </tr>
                  })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Grid>
        } />

      </div>
    );

  }
}

export default ListaEncuestas;